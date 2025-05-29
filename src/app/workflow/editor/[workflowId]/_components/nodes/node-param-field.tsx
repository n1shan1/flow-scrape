"use client";
import { AppNode } from "@/types/node/app-node";
import { TaskParam, TaskParamType } from "@/types/node/task";
import { useReactFlow } from "@xyflow/react";
import ParamString from "./param/param-string";
import { useCallback } from "react";
import BrowserInstanceParam from "./param/browser-instance-param";
import SelectParam from "./param/select-param";
import CredentialsParam from "./param/credentials-param";

type Props = { param: TaskParam; nodeId: string; disabled: boolean };

function NodeParamField({ param, nodeId, disabled }: Props) {
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
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );

    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.CREDENTIALS:
      return (
        <CredentialsParam
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
