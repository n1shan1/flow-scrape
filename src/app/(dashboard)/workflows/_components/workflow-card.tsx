"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TooltipWrapper from "@/components/global/tooltip-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow/status-type";
import { Workflow } from "@prisma/client";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteWorkflowDialog from "./delete-workflow-dialog";

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
    <Card className="border border-separate border-border dark:shadow-primary/50 overflow-hidden">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex items-center justify-center rounded-full w-10 h-10",
              [colorMap[workflow.status as WorkflowStatus]]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-4 stroke-white" />
            ) : (
              <PlayIcon className="size-4 stroke-white" />
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <Link
              href={`/workflow/editor/${workflow.id}`}
              className="text-foreground font-bold text-lg"
            >
              {workflow.name}
            </Link>
            <p
              className={cn("px-2 py-1 text-xs text-white rounded-md", [
                colorMap[workflow.status as WorkflowStatus] ||
                  "bg-gray-100 dark:bg-gray-900",
              ])}
            >
              {workflow.status}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
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

export default WorkflowCard;
