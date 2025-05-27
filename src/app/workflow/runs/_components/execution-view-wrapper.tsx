import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/get-workflow-execution-with-phases";
import { waitFor } from "@/lib/waitFor";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import ExecutionViewer from "./execution-viewer";

type Props = {
  executionId: string;
};

async function ExecutionViewWrapper({ executionId }: Props) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        No execution found
      </div>
    );
  }

  return <ExecutionViewer initialData={workflowExecution} />;
}

export default ExecutionViewWrapper;
