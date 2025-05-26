"use client";

import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import React from "react";

type Props = {};

function DeleteEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            onClick={() =>
              setEdges((eds) => eds.filter((e) => e.id !== props.id))
            }
            type="button"
            aria-label="Delete edge"
            title="Delete edge"
            variant={"outline"}
            size={"icon"}
            className="w-5 h-5 border cursor-pointer rounded-full text-xs flex items-center justify-center
            hover:bg-primary hover:text-white active:bg-primary focus:outline-none focus:ring-2 focus:bg-primary focus:ring-offset-2"
          >
            X
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default DeleteEdge;
