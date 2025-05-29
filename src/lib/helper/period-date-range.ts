import { Period } from "@/types/analytics/analytics";
import { endOfMonth, startOfMonth } from "date-fns";

export function PeriodDateRange(period: Period) {
  const startDate = startOfMonth(new Date(period.year, period.month));
  const endDate = endOfMonth(new Date(period.year, period.month));
  return {
    startDate,
    endDate,
  };
}
