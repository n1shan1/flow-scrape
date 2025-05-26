"use client";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { AppNode } from "@/types/node/app-node";
import { TaskType } from "@/types/node/task";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import NodeUi from "./nodes/node-ui";

type Props = {
  workflow: Workflow;
};

const nodeTypes = {
  FlowScrapeNode: NodeUi,
};
const fitViewOptions = { padding: 1 };
const snapGrid: [number, number] = [50, 50];

function FlowEditor({ workflow }: Props) {
  const { theme } = useTheme();

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) {
        throw new Error("Invalid workflow structure");
      }
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewPort) {
        return;
      }

      const { x = 0, y = 0, zoom = 1 } = flow.viewPort;
      setViewport({ x, y, zoom });
    } catch (error) {
      console.error("Invalid workflow definition:", error);
      return;
    }
  }, [workflow.definition, setNodes, setEdges]);
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const taskType = e.dataTransfer.getData("application/reactflow");
      if (!taskType || !taskType.length) {
        return;
      }

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode = CreateFlowNode(taskType as TaskType, position);
      setNodes((currentNodes) => currentNodes.concat(newNode));
    },
    [screenToFlowPosition]
  );
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitView
        colorMode={theme === "dark" ? "dark" : "light"}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
