import { Suspense } from "react";
import CreateWorkflowDialog from "./_components/create-workflow-dialog";
import UserWorkflows from "./_components/user-workflows";
import UserWorkflowsSkeleton from "./_components/user-workflows-suspense";

type Props = {};

function WorkflowsPage({}: Props) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your Workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className="h-full py-8">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

export default WorkflowsPage;
