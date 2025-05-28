import { AppNode } from "@/types/node/app-node";
import { TaskRegistry } from "../task/registry";

export const CalculateWorkflowCost = (node: AppNode[]) => {
  return node.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.Type].credits;
  }, 0);
};
