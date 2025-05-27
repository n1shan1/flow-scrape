"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not Authenticated");
  }

  return await prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      workflowExecution: {
        userId,
      },
    },
    include: {
      logs: {
        orderBy: {
          timeStamp: "asc",
        },
      },
    },
  });
}
