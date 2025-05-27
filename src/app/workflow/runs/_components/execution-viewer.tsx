"use client";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/get-workflow-execution-with-phases";
import { GetWorkflowPhaseDetails } from "@/actions/workflows/get-workflow-phase-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatesToDurationString } from "@/lib/helper/dates-to-duration-string";
import { GetPhasesTotalCost } from "@/lib/helper/phases";
import { WorkflowExecutionStatus } from "@/types/workflow/status-type";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import React from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

type Props = {
  initialData: ExecutionData;
};

function ExecutionViewer({ initialData }: Props) {
  if (!initialData) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        No execution data available
      </div>
    );
  }
  const [selectedPhase, setSelectedPhase] = React.useState<string | null>(null);
  const query = useQuery({
    queryKey: ["initialData", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData.id),
    refetchInterval: (query) =>
      query.state.data?.status === WorkflowExecutionStatus.RUNNING
        ? 1000
        : false,
  });

  const duration = DatesToDurationString(
    query.data?.startedAt,
    query.data?.completedAt
  );
  const creditsConsumed = GetPhasesTotalCost(query.data?.ExecutionPhase || []);

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;
  return (
    <div className="flex w-full h-full">
      <aside className="w-[300px] max-w-[300px] min-w-[300px] border-r-2 border-separate border-border flex flex-col overflow-hidden flex-grow">
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={
              query.data?.status ? (
                <span className="capitalize">{query.data.status}</span>
              ) : (
                "-"
              )
            }
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started At"
            value={
              query.data?.startedAt ? (
                <span className="lowercase">
                  {formatDistanceToNow(new Date(query.data.startedAt), {
                    addSuffix: true,
                  })}
                </span>
              ) : (
                "-"
              )
            }
          />
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className="animate-spin" size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits Consumed"
            value={creditsConsumed}
          />
        </div>
        <Separator />
        <div className="flex justify-center items-center py-2 px-4">
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        <div className="overflow-auto h-full px-2 py-4">
          {query.data?.ExecutionPhase.map((phase, index) => (
            <Button
              onClick={() => {
                if (isRunning) return;
                setSelectedPhase(phase.id);
              }}
              key={phase.id}
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              className="w-full mb-2 justify-between"
            >
              <div className="flex items-center gap-2">
                <Badge variant={"default"}>{index + 1}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
      <div className="flex h-full w-full">
        <pre>{JSON.stringify(phaseDetails.data, null, 4)}</pre>
      </div>
    </div>
  );
}

export default ExecutionViewer;

function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  const Icon = icon;
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
}
