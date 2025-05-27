"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/node/app-node";
import { TaskType } from "@/types/node/task";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

type Props = {
  taskType: TaskType;
  nodeId: string;
};

function NodeHeader({ taskType, nodeId }: Props) {
  const task = TaskRegistry[taskType];
  const Icon = task.icon;
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2">
      <Icon size={20} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={10} />
            {task.credits}
          </Badge>

          {!task.isEntryPoint && (
            <>
              <Button
                onClick={() => deleteElements({ nodes: [{ id: nodeId }] })}
                variant={"ghost"}
                size={"icon"}
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const newX = node.position.x + node.measured?.height! * 3;
                  const newY = node.position.y;
                  const newNode = CreateFlowNode(node.data.Type, {
                    x: newX,
                    y: newY,
                  });
                  addNodes([newNode]);
                }}
                variant={"ghost"}
                size={"icon"}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}

          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
