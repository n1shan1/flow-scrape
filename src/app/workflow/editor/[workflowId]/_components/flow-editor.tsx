"use client";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/node/app-node";
import { TaskType } from "@/types/node/task";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import DeleteEdge from "./edges/delete-edge";
import NodeUi from "./nodes/node-ui";

type Props = {
  workflow: Workflow;
};

const nodeTypes = {
  FlowScrapeNode: NodeUi,
};

const edgeTypes = {
  default: DeleteEdge,
};
const fitViewOptions = { padding: 1 };
const snapGrid: [number, number] = [50, 50];

function FlowEditor({ workflow }: Props) {
  const { theme } = useTheme();

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

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
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      if (!connection.targetHandle) return;
      const node = nodes.find((n) => n.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [setEdges, nodes, updateNodeData]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // no self connections
      if (connection.source === connection.target) {
        console.log("Invalid connection: self-connection not allowed");
        return false;
      }

      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);
      if (!sourceNode || !targetNode) {
        console.log("Invalid connection: source or target node not found");
        return false;
      }

      const sourceTask = TaskRegistry[sourceNode.data.Type];
      const targetTask = TaskRegistry[targetNode.data.Type];

      const output = sourceTask.outputs.find(
        (o) => o.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (i) => i.name === connection.targetHandle
      );

      if (!output || !input) {
        console.log("Invalid connection: output or input not found");
        return false;
      }

      if (output.type !== input.type) {
        console.log(
          `Invalid connection: type mismatch - output:${output.type} input:${input.type}`
        );
        return false;
      }
      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };
      const detectedCycle = hasCycle(targetNode);
      return !detectedCycle;
    },
    [nodes, edges]
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitView
        colorMode={theme === "dark" ? "dark" : "light"}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        {/* <MiniMap /> */}
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
