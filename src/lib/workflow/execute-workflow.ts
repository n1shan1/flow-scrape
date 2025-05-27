import {
  EnvironmentType,
  ExecutionEnvironment,
} from "@/types/executor/env-type";
import { LogCollector } from "@/types/logs/log";
import { AppNode } from "@/types/node/app-node";
import { TaskParamType } from "@/types/node/task";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow/status-type";
import { ExecutionPhase } from "@prisma/client";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { Browser, Page } from "puppeteer";
import "server-only";
import { CreateLogCollector } from "../log";
import { prisma } from "../prisma";
import { waitFor } from "../waitFor";
import { ExecutorRegistry } from "./executor/registry";
import { TaskRegistry } from "./task/registry";

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: {
      workflow: true,
      ExecutionPhase: true,
    },
  });

  if (!execution) {
    throw new Error("Execution was not found");
  }

  const environment: EnvironmentType = {
    phases: {},
  };
  const edges = JSON.parse(execution.definition).edges as Edge[];
  await InitializeWorkflowExecution(execution.id, execution.workflowId);

  await InitializePhasesStatus(execution);
  let creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of execution.ExecutionPhase) {
    await waitFor(4000);
    const phaseExecution = await ExecuteWorkflowPhase(
      phase,
      environment,
      edges
    );
    if (!phaseExecution) {
      executionFailed = true;
      break;
    }
    //TODO: consumed credits
  }

  await FinalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed
  );
  await cleanupEnvironment(environment);

  revalidatePath("/workflow/runs");
}

async function InitializeWorkflowExecution(
  executionId: string,
  workflowId: string
) {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
    },
  });
}

async function InitializePhasesStatus(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.ExecutionPhase.map((phase: any) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  });
}

async function FinalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number
) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      completedAt: new Date(),
      creditsConsumed: creditsConsumed,
      status: finalStatus,
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {
      //ignore this
    });
}

async function ExecuteWorkflowPhase(
  phase: ExecutionPhase,
  environment: EnvironmentType,
  edges: Edge[]
) {
  const logCollector = CreateLogCollector();
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;
  SetupEnvironmentForPhase(node, environment, edges);
  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhaseStatus.COMPLETED,
      completedAt: new Date(),
      inputs: JSON.stringify(environment.phases[node.id]?.inputs),
      outputs: JSON.stringify(environment.phases[node.id]?.outputs),
    },
  });

  const creditsRequired = TaskRegistry[node.data.Type].credits;
  console.log("@EXECUTION", {
    phaseName: node.data.name,
    phaseId: phase.id,
    nodeId: node.id,
    startedAt,
    creditsRequired,
  });

  //TODO: decrement credits from user

  const success = await ExecutePhase(phase, node, environment, logCollector);
  const outputs = environment.phases[node.id]?.outputs;
  await FinalizePhaseExecution(phase.id, success, outputs, logCollector);
  return { success };
}

async function FinalizePhaseExecution(
  phaseId: string,
  success: boolean,
  outputs: any,
  logCollector: LogCollector
) {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            logLevel: log.level,
            message: log.message,
            timeStamp: log.timestamp,
          })),
        },
      },
    },
  });
}

async function ExecutePhase(
  phase: ExecutionPhase,
  node: AppNode,
  environment: EnvironmentType,
  logCollector: LogCollector
): Promise<boolean> {
  const runFn = ExecutorRegistry[node.data.Type];
  if (!runFn) {
    console.error(`No executor found for node type: ${node.data.Type}`);
    return false;
  }
  const executionEnvironment: ExecutionEnvironment<any> =
    await createExecutionEnvironment(node, environment, logCollector);
  return await runFn(executionEnvironment);
}

function createExecutionEnvironment(
  node: AppNode,
  environment: EnvironmentType,
  logCollector: LogCollector
): ExecutionEnvironment<any> {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },
    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => (environment.browser = browser),
    getPage: () => environment.page,
    setPage: (page: Page) => (environment.page = page),
    log: logCollector,
  };
}

async function SetupEnvironmentForPhase(
  node: AppNode,
  environment: EnvironmentType,
  edges: Edge[]
) {
  environment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputs = TaskRegistry[node.data.Type].inputs;
  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) {
      continue;
    }
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    //get input from previous phase outputs
    const connectedEdges = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );

    if (!connectedEdges) {
      console.error(
        "No connected edges found for input:",
        input.name,
        "node ID:",
        node.id
      );
      continue;
    }
    const outputValue =
      environment.phases[connectedEdges.source]?.outputs[
        connectedEdges.sourceHandle!
      ];

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
}

async function cleanupEnvironment(environment: EnvironmentType) {
  if (environment.browser) {
    await environment.browser
      .close()
      .catch((error) => console.log("Cannot close browser", error));
    environment.browser = undefined;
  }
}
