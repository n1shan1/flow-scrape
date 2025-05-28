"use client";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/get-workflow-execution-with-phases";
import { GetWorkflowPhaseDetails } from "@/actions/workflows/get-workflow-phase-details";
import ReactCountUp from "@/components/global/react-count-up-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatesToDurationString } from "@/lib/helper/dates-to-duration-string";
import { GetPhasesTotalCost } from "@/lib/helper/phases";
import { cn } from "@/lib/utils";
import { LogLevel } from "@/types/logs/log";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow/status-type";
import { ExecutionLog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Link2Off,
  Loader2,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import PhaseStatusBadge from "./phase-status-badge";
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
    queryKey: ["phaseDetails", selectedPhase, query.data?.status],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    //while running we automatically select the current phase
    const phases = query.data?.ExecutionPhase || [];
    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1
      )[0];
      setSelectedPhase(phaseToSelect.id);
      return;
    }
    const phaseToSelect = phases.toSorted((a, b) =>
      a.completedAt! > b.completedAt! ? -1 : 1
    )[0];
    setSelectedPhase(phaseToSelect.id);
  }, [query.data?.ExecutionPhase, isRunning, setSelectedPhase]);

  return (
    <div className="flex w-full h-full">
      <aside className="w-[300px] max-w-[300px] min-w-[300px] border-r-2 border-separate border-border flex flex-col overflow-hidden flex-grow">
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={
              <div className="flex gap-2 items-center">
                <PhaseStatusBadge
                  status={query.data?.status as ExecutionPhaseStatus}
                />
                <span className="text-xs capitalize">{query.data?.status}</span>
              </div>
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
            value={<ReactCountUp value={creditsConsumed} />}
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
              <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
            </Button>
          ))}
        </div>
      </aside>
      <div className="flex h-full w-full">
        {isRunning ? (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <p className="font-bold">Run is in Progress, Please Wait...</p>
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : null}
        {!isRunning && !selectedPhase ? (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <Link2Off size={30} className="text-muted-foreground" />
            <p className="font-bold">No Phase Selected</p>
            <p className="text-sm text-muted-foreground">
              Select a phase from the left sidebar to view details.
            </p>
          </div>
        ) : null}

        {!isRunning && selectedPhase ? (
          <div className="flex flex-col py-4 px-6 gap-4 overflow-auto w-full h-full">
            <div className="flex gap-2 items-center">
              <Badge variant={"outline"} className="space-x-4">
                <div className="flex items-center gap-2">
                  <CoinsIcon className="stroke-foreground" size={15} />
                  <span>Credits:</span>
                </div>
                <span>{phaseDetails.data?.creditsCost}</span>
              </Badge>
              <Badge variant={"outline"} className="space-x-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="stroke-foreground" size={15} />
                  <span>Duration:</span>
                </div>
                <span>
                  {DatesToDurationString(
                    phaseDetails.data?.startedAt
                      ? new Date(phaseDetails.data.startedAt)
                      : undefined,
                    phaseDetails.data?.completedAt
                      ? new Date(phaseDetails.data.completedAt)
                      : undefined
                  ) || "-"}
                </span>
              </Badge>
            </div>
            <ParameterViewer
              title={"Inputs"}
              subtitle={"Inputs used for this phase."}
              paramsJson={phaseDetails.data?.inputs}
            />
            <ParameterViewer
              title={"Outputs"}
              subtitle={"Outputs generated for this phase."}
              paramsJson={phaseDetails.data?.outputs}
            />

            <LogViewer logs={phaseDetails.data?.logs} />
          </div>
        ) : null}
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

function ParameterViewer({
  title,
  subtitle,
  paramsJson,
}: {
  title: string;
  subtitle?: string;
  paramsJson?: string | null;
}) {
  const params = paramsJson ? JSON.parse(paramsJson) : undefined;

  return (
    <Card>
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-col gap-2">
          {(!params || Object.keys(params).length === 0) && (
            <p className="text-sm">No Parameters generated by this phase.</p>
          )}

          {params &&
            Object.entries(params).map(([key, value], index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground flex-1 basis-1/3">
                  {key}
                </p>
                <Input
                  value={value as string}
                  readOnly
                  className="flex-1 basis-2/3"
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LogViewer({ logs }: { logs?: ExecutionLog[] | undefined }) {
  if (!logs || logs.length === 0) {
    return (
      <Card>
        <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
          <CardTitle className="text-base">Logs</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            No logs available for this phase.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">Logs</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Logs generated during the execution of this phase.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader className="text-muted-foreground text-sm">
            <TableRow>
              <TableHead className="">Time</TableHead>
              <TableHead className="">Level</TableHead>
              <TableHead className="">Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell
                  width={190}
                  className="text-xs text-muted-foreground p-[2px] pl-2"
                >
                  {log.timeStamp.toLocaleString()}
                </TableCell>
                <TableCell className="p-4" width={100}>
                  <p
                    className={cn(
                      "uppercase text-xs font-bold text-center rounded-md px-2 py-1 text-white",
                      (log.logLevel as LogLevel) === "error" &&
                        "bg-destructive",
                      (log.logLevel as LogLevel) === "info" && "bg-primary"
                    )}
                  >
                    {log.logLevel}
                  </p>
                </TableCell>
                <TableCell className="text-sm">{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
