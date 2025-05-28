import { ExecutionPhaseStatus } from "@/types/workflow/status-type";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";

type Props = {
  status: ExecutionPhaseStatus;
};

function PhaseStatusBadge({ status }: Props) {
  switch (status) {
    case ExecutionPhaseStatus.RUNNING:
      return (
        <Loader2Icon size={25} className="animate-spin stroke-yellow-600" />
      );
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashedIcon size={25} className="text-muted-foreground" />;

    case ExecutionPhaseStatus.FAILED:
      return <CircleXIcon size={25} className="stroke-destructive" />;

    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheckIcon size={25} className="stroke-green-500" />;

    default:
      return <div className="rounded-full">{status}</div>;
  }
}

export default PhaseStatusBadge;
