"use client";
import ExecutionStatusIndicator, {
  ExecutionStatusLabel,
} from "@/app/workflow/runs/_components/execution-status-indicator";
import TooltipWrapper from "@/components/global/tooltip-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  WorkflowExecutionStatus,
  WorkflowStatus,
} from "@/types/workflow/status-type";
import { Workflow } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {
  ChevronRightIcon,
  ClockIcon,
  CoinsIcon,
  CornerDownRightIcon,
  FileTextIcon,
  MoreVerticalIcon,
  MoveRightIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteWorkflowDialog from "./delete-workflow-dialog";
import DuplicateWorkflowDialog from "./duplicate-workflow-dialog";
import RunButton from "./run-button";
import SchedulerDialog from "./scheduler-dialog";
const colorMap = {
  [WorkflowStatus.DRAFT]: "bg-primary/50 ",
  [WorkflowStatus.PUBLISHED]: "bg-green-500 dark:bg-green-900",
};

type Props = {
  workflow: Workflow;
};

function WorkflowCard({ workflow }: Props) {
  const isDraft = workflow.status === "DRAFT";

  return (
    <Card className="border border-separate border-border dark:shadow-primary/50 overflow-hidden group/card">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex items-center justify-center rounded-full w-10 h-10 transition-transform group-hover/card:scale-110",
              [colorMap[workflow.status as WorkflowStatus]]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-4 stroke-white" />
            ) : (
              <PlayIcon className="size-4 stroke-white" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <TooltipWrapper content={workflow.description}>
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className="text-foreground font-bold text-lg hover:text-primary transition-colors"
                >
                  {workflow.name}
                </Link>
              </TooltipWrapper>
              <Badge
                variant="outline"
                className={cn(
                  "px-2 py-0.5 text-xs font-medium",
                  isDraft
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                )}
              >
                {workflow.status}
              </Badge>
              <DuplicateWorkflowDialog workflowId={workflow.id} />
            </div>
            <ScheduleSection
              creditsCost={workflow.creditsCost}
              isDraft={isDraft}
              workflowId={workflow.id}
              cronJob={workflow.cron}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isDraft && <RunButton workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon className="size-4" />
            <span className="text-sm font-normal">Edit</span>
          </Link>
          <WorkflowActions
            workflowId={workflow.id}
            workflowName={workflow.name}
          />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  );
}

const WorkflowActions = ({
  workflowName,
  workflowId,
}: {
  workflowName: string;
  workflowId: string;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-2" variant={"outline"}>
            <TooltipWrapper content="More Actions" side="top">
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon className="size-4" />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
          >
            <TrashIcon className="size-4 stroke-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
const ScheduleSection = ({
  isDraft,
  creditsCost,
  workflowId,
  cronJob,
}: {
  isDraft: boolean;
  creditsCost: number;
  workflowId: string;
  cronJob: string | null;
}) => {
  if (isDraft) return null;
  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="size-4 text-muted-foreground" />
      <SchedulerDialog
        key={`${cronJob}-${workflowId}`}
        cronJob={cronJob}
        workflowId={workflowId}
      />
      <MoveRightIcon className="size-4 text-muted-foreground" />
      <TooltipWrapper content={"Credit Consumption for a full Run."}>
        <div className="flex items-center gap-3">
          <Badge
            variant={"outline"}
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <CoinsIcon className="size-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
};

export default WorkflowCard;

function LastRunDetails({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === "DRAFT";
  if (isDraft) {
    return null;
  }
  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
  const formattedStartedAt = lastRunAt
    ? formatDistanceToNow(lastRunAt, { addSuffix: true })
    : null;

  const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");
  const nextScheduleUTC =
    nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");
  return (
    <div className="bg-secondary/90 px-4 py-1 flex justify-between items-center text-muted-foreground">
      <div className="flex items-center gap-2 text-sm">
        {lastRunAt && (
          <Link
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
            className="flex items-center gap-2 text-sm group"
          >
            <span>Last run:</span>
            <ExecutionStatusIndicator
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel
              status={lastRunStatus as WorkflowExecutionStatus}
            />

            <span>{formattedStartedAt}</span>
            <ChevronRightIcon
              size={14}
              className="group-hover:translate-x-0 transition -translate-x-[2px]"
            />
          </Link>
        )}
        {!lastRunAt && (
          <span className="text-sm text-muted-foreground">
            No runs yet for this workflow.
          </span>
        )}
      </div>
      {nextRunAt && (
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon className="stroke-muted-foreground" size={12} />
          <span>Next Run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  );
}
