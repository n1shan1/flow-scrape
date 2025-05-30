import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserWorkflows() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated!");

  return await prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
