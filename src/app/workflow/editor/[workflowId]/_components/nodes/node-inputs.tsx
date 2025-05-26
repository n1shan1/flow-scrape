import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/node/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";

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
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField nodeId={nodeId} param={input} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
