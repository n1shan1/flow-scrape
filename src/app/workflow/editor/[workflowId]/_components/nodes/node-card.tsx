"use client";
import useFlowValidationContext from "@/components/hooks/use-flow-vaidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React from "react";

type Props = {
  nodeId: string;
  children: React.ReactNode;
  isSelected: boolean;
};

function NodeCard({ nodeId, children, isSelected }: Props) {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidationContext();
  const hasInvalidInputs = invalidInputs.some(
    (input) => input.nodeId === nodeId
  );
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) {
          return;
        }
        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;

        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          duration: 500,
          zoom: 1,
        });
      }}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
}

export default NodeCard;
