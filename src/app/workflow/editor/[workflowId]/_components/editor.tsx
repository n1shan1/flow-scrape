import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import TopBar from "./topbar/topbar";
import TaskMenu from "./task-menu";
import { FlowValidationContextProvider } from "@/components/context/flow-validation-context";
import { WorkflowStatus } from "@/types/workflow/status-type";
type Props = {
  workflow: Workflow;
};

function Editor({ workflow }: Props) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="h-full w-full flex flex-col overflow-hidden">
          <TopBar
            isPublished={workflow.status === WorkflowStatus.PUBLISHED}
            workflowId={workflow.id}
            title={workflow.name}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
}

export default Editor;
