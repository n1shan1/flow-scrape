import { getUserWorkflows } from "@/actions/workflows/getUserWorkflows";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "./create-workflow-dialog";
import WorkflowCard from "./workflow-card";

type Props = {};

async function UserWorkflows({}: Props) {
  const workflows = await getUserWorkflows();

  if (!workflows) {
    return (
      <Alert
        variant={"destructive"}
        className="flex flex-col items-start justify-center"
      >
        <AlertCircle className="size-6 mr-2" />
        <AlertTitle>
          Something went wrong white fetching the workflows.
        </AlertTitle>
        <AlertDescription>
          If the issue persists, please contact the support team.
        </AlertDescription>
      </Alert>
    );
  }
  if (workflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p className="text-foreground text-lg font-bold">
            No workflows Created Yet
          </p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first Workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your First Workflow" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((wf) => (
        <WorkflowCard key={wf.id} workflow={wf} />
      ))}
    </div>
  );
}

export default UserWorkflows;
