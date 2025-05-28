"use client";

import { RunWorkflow } from "@/actions/workflows/run-workflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = { workflowId: string };

function RunButton({ workflowId }: Props) {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Workflow executed successfully!", {
        id: "flow-execution",
      });
    },
    onError: () => {
      toast.error(
        "Failed to execute workflow. Please check the console for details.",
        { id: "flow-execution" }
      );
    },
  });
  return (
    <Button
      disabled={mutation.isPending}
      variant={"default"}
      size={"sm"}
      className="flex items-center gap-2"
      onClick={() => {
        toast.loading("Executing workflow...", {
          id: "flow-execution",
          duration: 5000,
        });
        mutation.mutate({
          workflowId,
        });
      }}
    >
      <PlayIcon size={16} className="stroke-white" />
      Execute
    </Button>
  );
}

export default RunButton;
