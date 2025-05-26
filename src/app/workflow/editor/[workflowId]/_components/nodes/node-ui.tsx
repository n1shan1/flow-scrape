"use client";
import React, { memo } from "react";
import NodeCard from "./node-card";
import { NodeProps } from "@xyflow/react";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/node/app-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/node/task";
import NodeInputs, { NodeInput } from "./node-inputs";
import NodeOutputs, { NodeOutput } from "./node-outputs";

const NodeUi = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.Type as TaskType];
  return (
    <NodeCard isSelected={!!props.selected} nodeId={props.id}>
      <NodeHeader nodeId={props.id} taskType={nodeData.Type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput nodeId={props.id} key={input.name} input={input} />
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput nodeId={props.id} key={output.name} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeUi;
NodeUi.displayName = "NodeUi";
