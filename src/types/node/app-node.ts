import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";

export interface AppNodeData {
  Type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export type ParamProps = {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
};
