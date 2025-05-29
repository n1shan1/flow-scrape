import { GetWorkflowExecutions } from "@/actions/workflows/get-workflow-executions";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import TopBar from "../../editor/[workflowId]/_components/topbar/topbar";
import ExecutionsTable from "../_components/executions-table";

type Props = { params: { workflowId: string } };

function WorkflowIdPage({ params }: Props) {
  return (
    <div className="h-full w-full overflow-auto">
      <TopBar
        workflowId={params.workflowId}
        hideButtons
        title="All Runs"
        subTitle="List all your Workflows Runs"
      />
      <Suspense
        fallback={
          <div className="h-full w-full flex flex-col items-center justify-center gap-2">
            <Loader2Icon className="animate-spin" size={35} />
            <span>Loading executions...</span>
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}

export default WorkflowIdPage;

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return <div className="p-4">No executions found for this workflow.</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="py-6 w-full">
        <div className="flex items-center justify-center flex-col gap-4 h-full w-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center mb-4">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No Runs have been triggered for this workflow Yet.
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new Run in the Editor page.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container py-6 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
}
