import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import TopBar from "./topbar/topbar";
import TaskMenu from "./task-menu";
type Props = {
  workflow: Workflow;
};

function Editor({ workflow }: Props) {
  return (
    <ReactFlowProvider>
      <div className="h-full w-full flex flex-col overflow-hidden">
        <TopBar workflowId={workflow.id} title={workflow.name} />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
