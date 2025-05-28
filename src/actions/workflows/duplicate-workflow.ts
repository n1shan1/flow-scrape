"use server";
import { prisma } from "@/lib/prisma";
import {
  DuplicateWorkflowSchema,
  DuplicateWorkflowSchemaType,
} from "@/types/workflow/duplicate-workflow-schema";
import { WorkflowStatus } from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DuplicateWorkflow(form: DuplicateWorkflowSchemaType) {
  const { success, error, data } = DuplicateWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error(`Invalid form data: ${error.message}`);
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const sourceWorkflow = await prisma.workflow.findUnique({
    where: {
      id: data.workflowId,
      userId,
    },
  });

  if (!sourceWorkflow) {
    throw new Error(
      "Workflow not found or you do not have permission to duplicate it"
    );
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition,
    },
  });

  if (!result) {
    throw new Error("Failed to duplicate workflow");
  }

  revalidatePath("/workflows");
}
