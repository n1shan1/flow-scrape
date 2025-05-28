"use server";
import { prisma } from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers/calculate-workflow-cost";
import { WorkflowStatus } from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not in draft status");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("Failed to generate execution plan from flow definition");
  }

  if (!result.executionPlan) {
    throw new Error("Execution plan is empty");
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes);
  await prisma.workflow.update({
    where: {
      userId,
      id,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      status: WorkflowStatus.PUBLISHED,
      creditsCost: creditsCost,
    },
  });
  revalidatePath(`/workflow/editor/${id}`);
}
