import React, { Suspense } from "react";
import UserWorkflowsSkeleton from "./_components/user-workflows-suspense";
import UserWorkflows from "./_components/user-workflows";
import CreateWorkflowDialog from "./_components/create-workflow-dialog";

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
