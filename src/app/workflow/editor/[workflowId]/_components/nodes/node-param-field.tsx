"use client";
import { AppNode } from "@/types/node/app-node";
import { TaskParam, TaskParamType } from "@/types/node/task";
import { useReactFlow } from "@xyflow/react";
import ParamString from "./param/param-string";
import { useCallback } from "react";

type Props = { param: TaskParam; nodeId: string };

function NodeParamField({ param, nodeId }: Props) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId || "") as AppNode;
  const value = node?.data.inputs[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId!, {
        inputs: {
          ...node.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, nodeId, node.data.inputs, param.name]
  );
  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <ParamString
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not IMPLEMENTED</p>
        </div>
      );
  }
}

export default NodeParamField;
