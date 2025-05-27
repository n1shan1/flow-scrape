import TopBar from "@/app/workflow/editor/[workflowId]/_components/topbar/topbar";
import React, { Suspense } from "react";
import ExecutionViewWrapper from "../../_components/execution-view-wrapper";
import { Loader2 } from "lucide-react";

type Props = {
  params: {
    workflowId: string;
    executionId: string;
  };
};

function ExecutionPage({ params }: Props) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <TopBar
        title="Workflow Run Details"
        subTitle={`Run ID: ${params.executionId}`}
        workflowId={params.workflowId}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          }
        >
          <ExecutionViewWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  );
}

export default ExecutionPage;
