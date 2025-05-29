"use server";

import { PeriodDateRange } from "@/lib/helper/period-date-range";
import { prisma } from "@/lib/prisma";
import { Period } from "@/types/analytics/analytics";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";
type Stats = Record<
  string,
  {
    success: number;
    failed: number;
  }
>;
export async function GetCreditsUsageInPeriod(period: Period) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const dateRange = PeriodDateRange(period);
  const executionPhases = await prisma.executionPhase.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: {
        in: [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED],
      },
    },
  });
  const dateFormat = "yyyy-MM-dd";
  const stats: Stats = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate,
  })
    .map((date) => format(date, dateFormat))
    .reduce((acc: any, date) => {
      acc[date] = {
        success: 0,
        failed: 0,
      };
      return acc;
    }, {});

  executionPhases.forEach((phase) => {
    const dateKey = format(phase.startedAt!, dateFormat);
    if (phase.status === ExecutionPhaseStatus.COMPLETED) {
      stats[dateKey].success += Number(phase.creditsCost!) || 0;
    } else if (phase.status === ExecutionPhaseStatus.FAILED) {
      stats[dateKey].failed += Number(phase.creditsCost!) || 0;
    }
  });

  const resultData = Object.entries(stats).map(
    ([date, { success, failed }]) => ({
      date,
      success,
      failed,
    })
  );
  // const totalSuccess = resultData.reduce((acc, curr) => acc + curr.success, 0);
  // const totalFailed = resultData.reduce((acc, curr) => acc + curr.failed, 0);
  return resultData;
}
