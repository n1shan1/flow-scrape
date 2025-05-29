"use server";

import { PeriodDateRange } from "@/lib/helper/period-date-range";
import { prisma } from "@/lib/prisma";
import { Period } from "@/types/analytics/analytics";
import { WorkflowExecutionStatus } from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";
type Stats = Record<
  string,
  {
    success: number;
    failed: number;
  }
>;
export async function GetWorkflowExecutionStats(period: Period) {
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

  executions.forEach((execution) => {
    const dateKey = format(execution.startedAt!, dateFormat);
    if (execution.status === WorkflowExecutionStatus.COMPLETED) {
      stats[dateKey].success += 1;
    } else if (execution.status === WorkflowExecutionStatus.FAILED) {
      stats[dateKey].failed += 1;
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
