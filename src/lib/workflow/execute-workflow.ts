import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow/status-type";
import { revalidatePath } from "next/cache";
import "server-only";
import { prisma } from "../prisma";
import { waitFor } from "../waitFor";
import { ExecutionPhase } from "@prisma/client";
import { AppNode } from "@/types/node/app-node";
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

  const env = {
    phases: {},
  };

  await InitializeWorkflowExecution(execution.id, execution.workflowId);

  await InitializePhasesStatus(execution);
  let creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of execution.ExecutionPhase) {
    await waitFor(4000);
    const phaseExecution = await ExecuteWorkflowPhase(phase);
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
  //TODO: cleanup the env

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

async function ExecuteWorkflowPhase(phase: ExecutionPhase) {
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;

  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhaseStatus.COMPLETED,
      completedAt: new Date(),
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

  const success = ExecutePhase(phase, node);
  await FinalizePhaseExecution(phase.id, success);
  return { success };
}

async function FinalizePhaseExecution(phaseId: string, success: boolean) {
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
    },
  });
}

async function ExecutePhase(
  phase: ExecutionPhase,
  node: AppNode
): Promise<boolean> {}
