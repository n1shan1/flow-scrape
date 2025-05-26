"use client";
import React, { memo } from "react";
import NodeCard from "./node-card";
import { NodeProps } from "@xyflow/react";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/node/app-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/node/task";
import NodeInputs, { NodeInput } from "./node-inputs";

const NodeUi = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.Type as TaskType];
  return (
    <NodeCard isSelected={!!props.selected} nodeId={props.id}>
      <NodeHeader taskType={nodeData.Type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput nodeId={props.id} key={input.name} input={input} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeUi;
NodeUi.displayName = "NodeUi";
