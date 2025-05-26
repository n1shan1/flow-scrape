import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/node/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";

type Props = {
  children?: React.ReactNode;
};

function NodeInputs({ children }: Props) {
  return <div className="flex flex-col divide-y-2 gap-2">{children}</div>;
}

export default NodeInputs;

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  return (
    <div className="flex justify-start relative p-3 bg-background w-full">
      <NodeParamField nodeId={nodeId} param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
}
