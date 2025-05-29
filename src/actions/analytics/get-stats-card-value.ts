"use server";

import { PeriodDateRange } from "@/lib/helper/period-date-range";
import { prisma } from "@/lib/prisma";
import { Period } from "@/types/analytics/analytics";
import { WorkflowExecutionStatus } from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";

export async function GetStatsCardValue(period: Period) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const dateRange = PeriodDateRange(period);
  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: {
        in: [WorkflowExecutionStatus.COMPLETED, WorkflowExecutionStatus.FAILED],
      },
    },
    select: {
      creditsConsumed: true,
      ExecutionPhase: {
        where: {
          creditsCost: {
            not: null,
          },
        },
        select: {
          creditsCost: true,
        },
      },
    },
  });

  const stats = {
    workflowExecutions: executions.length,
    creditsConsumed: 0,
    phaseExecutions: 0,
  };
  stats.creditsConsumed = executions.reduce(
    (acc, execution) => acc + (execution.creditsConsumed || 0),
    0
  );
  stats.phaseExecutions = executions.reduce(
    (acc, execution) => acc + (execution.ExecutionPhase.length || 0),
    0
  );

  return stats;
}
