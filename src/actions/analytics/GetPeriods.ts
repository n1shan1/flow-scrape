"use server";
import { prisma } from "@/lib/prisma";
import { Period } from "@/types/analytics/analytics";
import { auth } from "@clerk/nextjs/server";

export async function GetPeriods() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const years = await prisma.workflowExecution.aggregate({
    where: {
      userId,
    },
    _min: { startedAt: true },
  });
  const periods: Period[] = [];
  const minYears = years._min.startedAt
    ? years._min.startedAt.getFullYear()
    : new Date().getFullYear();

  for (let year = minYears; year <= minYears; year++) {
    for (let month = 0; month < 12; month++) {
      periods.push({ year, month });
    }
  }
  return periods;
}
