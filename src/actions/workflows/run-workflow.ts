"use server";
import { prisma } from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow";
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId: userId,
    },
  });

  if (!workflow) {
    throw new Error(
      "Workflow not found or you do not have permission to run it"
    );
  }
  let executionPlan: WorkflowExecutionPlan;

  if (!flowDefinition) {
    throw new Error("Flow definition is required");
  }
  const flow = JSON.parse(flowDefinition);

  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("Invalid flow definition: " + result.error);
  }

  if (!result.executionPlan) {
    throw new Error("Execution plan could not be generated");
  }

  executionPlan = result.executionPlan;
  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId: workflow.id,
      userId: userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      ExecutionPhase: {
        create: executionPlan.flatMap((phase) =>
          phase.nodes.flatMap((node) => {
            return {
              userId: userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.Type].label,
            };
          })
        ),
      },
    },
    select: {
      id: true,
      ExecutionPhase: true,
    },
  });

  if (!execution) {
    throw new Error("Failed to create workflow execution");
  }
  ExecuteWorkflow(execution.id);
  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
