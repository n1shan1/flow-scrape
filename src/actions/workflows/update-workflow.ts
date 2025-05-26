"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const UpdateWorkflow = async ({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) => {
  if (!id || !definition) {
    throw new Error("Invalid input: id and definition are required");
  }
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
    throw new Error(
      "Workflow not found or you do not have permission to update it"
    );
  }
  const updatedWorkflow = await prisma.workflow.update({
    where: {
      id: workflow.id,
    },
    data: {
      definition,
    },
  });

  revalidatePath(`/workflows`);
  return updatedWorkflow;
};
