"use client";

import { GetWorkflowExecutions } from "@/actions/workflows/get-workflow-executions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatesToDurationString } from "@/lib/helper/dates-to-duration-string";
import { Badge } from "@/components/ui/badge";
import ExecutionStatusIndicator from "./execution-status-indicator";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow/status-type";
import { CoinsIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>;

type Props = { workflowId: string; initialData: InitialDataType };

function ExecutionsTable({ workflowId, initialData }: Props) {
  const query = useQuery({
    queryKey: ["executions", workflowId],
    initialData,
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5 * 1000, // 5 seconds
  });
  const router = useRouter();
  return (
    <div className="overflow-auto p-6">
      <Card>
        <Table className="h-full">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Consumed</TableHead>
              <TableHead className="text-right text-xs text-muted-foreground">
                Started At (desc)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="gap-2 h-full overflow-auto p-4">
            {query.data?.map((execution) => {
              const duration = DatesToDurationString(
                execution.startedAt,
                execution.completedAt
              );
              const formattedStartedAt =
                execution.startedAt &&
                formatDistanceToNow(execution.startedAt, { addSuffix: true });
              return (
                <TableRow
                  key={execution.id}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => {
                    router.push(`/workflow/runs/${workflowId}/${execution.id}`);
                  }}
                >
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold">{execution.id}</span>
                      <div className="text-muted-foreground text-xs">
                        <span className="">Triggered Via: </span>
                        <Badge variant={"outline"}>{execution.trigger}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <ExecutionStatusIndicator
                          status={execution.status as WorkflowExecutionStatus}
                        />
                        <span className="font-semibold capitalize">
                          {execution.status}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-xs mx-5">
                        {duration}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <CoinsIcon size={16} className="text-primary" />
                        <span className="font-semibold capitalize">
                          {execution.creditsConsumed}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-xs mx-5">
                        Credits
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formattedStartedAt}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default ExecutionsTable;
