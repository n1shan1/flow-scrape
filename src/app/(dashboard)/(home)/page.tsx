import { GetPeriods } from "@/actions/analytics/GetPeriods";
import { waitFor } from "@/lib/waitFor";
import { Period } from "@/types/analytics/analytics";
import { Suspense } from "react";
import PeriodSelector from "./_components/period-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { GetStatsCardValue } from "@/actions/analytics/get-stats-card-value";
import { CirclePlayIcon, CoinsIcon, Waypoints } from "lucide-react";
import StatsCard from "./_components/stats-card";
import { GetWorkflowExecutionStats } from "@/actions/analytics/get-workflow-execution-stats";
import ExecutionStatusChart from "./_components/execution-status-chart";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/get-credits-usage-in-period";
import CreditUsageChart from "../billing/_components/credit-usage-chart";

type Props = { searchParams?: { month?: string; year?: string } };

function HomePage({ searchParams }: Props) {
  const currentDate = new Date();
  const month = searchParams?.month;
  const year = searchParams?.year;
  const period: Period = {
    month: month ? Number(month) : currentDate.getMonth(),
    year: year ? Number(year) : currentDate.getFullYear(),
  };
  return (
    <div className="flex flex-col gap-6 p-6 h-full flex-1 rounded-lg min-h-screen">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Home</h1>
          <Suspense
            fallback={<Skeleton className="w-[180px] h-[40px] rounded-md" />}
          >
            <PeriodSelectorWrapper selectedPeriod={period} />
          </Suspense>
        </div>
        <p className="text-muted-foreground text-base">
          Welcome back! Here’s a summary of your recent activity.
        </p>
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCardsWrapper selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </section>
    </div>
  );
}

export default HomePage;

export async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const periods = await GetPeriods();

  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

export async function StatsCardsWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetStatsCardValue(selectedPeriod);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <StatsCard
        title="Workflow Executions"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="Phase Executions"
        value={data.phaseExecutions}
        icon={Waypoints}
      />
      <StatsCard
        title="Credits Consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  );
}

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetWorkflowExecutionStats(selectedPeriod);
  return <ExecutionStatusChart chartData={data} />;
}
async function CreditsUsageInPeriod({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetCreditsUsageInPeriod(selectedPeriod);
  return <CreditUsageChart chartData={data} />;
}
