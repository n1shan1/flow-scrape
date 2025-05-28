"use server";
import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow(workflowId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("Workflow is not in published status");
  }

  await prisma.workflow.update({
    where: {
      userId,
      id: workflowId,
    },
    data: {
      executionPlan: null,
      status: WorkflowStatus.DRAFT,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${workflowId}`);
}
