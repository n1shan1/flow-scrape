import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/node/task";
import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";
import { ColorForHandle } from "./common";

type Props = { children: ReactNode };

function NodeOutputs({ children }: Props) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
}

export default NodeOutputs;

export function NodeOutput({
  output,
  nodeId,
}: {
  output: TaskParam;
  nodeId: string;
}) {
  return (
    <div className="flex justify-end relative p-3 bg-background">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !h-4 !w-4",
          ColorForHandle[output.type]
        )}
        id={output.name}
        type="source"
        position={Position.Right}
      />
    </div>
  );
}
