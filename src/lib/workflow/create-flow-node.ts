import { AppNode } from "@/types/node/app-node";
import { TaskType } from "@/types/node/task";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      Type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 }, //! Probable cause of error
  };
}
