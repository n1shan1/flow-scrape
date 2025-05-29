import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workflow/status-type";

type Props = { status: WorkflowExecutionStatus };

const indicatorColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "bg-slate-400",
  RUNNING: "bg-yellow-400",
  FAILED: "bg-red-400",
  COMPLETED: "bg-green-400",
};

function ExecutionStatusIndicator({ status }: Props) {
  return (
    <div className={cn("w-3 h-3 rounded-full", indicatorColors[status])} />
  );
}

const labelColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "text-slate-400",
  RUNNING: "text-yellow-400",
  FAILED: "text-red-400",
  COMPLETED: "text-green-400",
};

export default ExecutionStatusIndicator;

export function ExecutionStatusLabel({
  status,
}: {
  status: WorkflowExecutionStatus;
}) {
  return <span className={cn("lowercase", labelColors[status])}>{status}</span>;
}
