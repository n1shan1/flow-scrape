"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GetCreditsUsageInPeriod } from "@/actions/analytics/get-credits-usage-in-period";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CoinsIcon, Layers2Icon } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type ChartData = Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>;

const chartConfig = {
  success: { label: "Success", color: "hsl(var(--chart-2))" },
  failed: { label: "Failed", color: "hsl(var(--chart-1))" },
};

function CreditUsageChart({ chartData }: { chartData: ChartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <CoinsIcon className="w-6 h-6 text-primary" />
          Credit Usage Statistics
        </CardTitle>
        <CardDescription>
          Daily credit usage statistics, including successful and failed
          transactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[200px] w-full" config={chartConfig}>
          <BarChart
            data={chartData}
            height={200}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Bar
              dataKey={"success"}
              type={"bump"}
              radius={[0, 0, 4, 4]}
              fillOpacity={0.8}
              fill="var(--color-success)"
              stroke="var(--color-success)"
              stackId={"a"}
            />
            <Bar
              dataKey={"failed"}
              type={"bump"}
              radius={[4, 4, 0, 0]}
              fillOpacity={0.8}
              fill="var(--color-failed)"
              stroke="var(--color-failed)"
              stackId={"a"}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default CreditUsageChart;
