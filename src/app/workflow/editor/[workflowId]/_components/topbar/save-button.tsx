"use client";
import { UpdateWorkflow } from "@/actions/workflows/update-workflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = { workflowId: string };

function SaveButton({ workflowId }: Props) {
  const { toObject } = useReactFlow();
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Workflow updated successfully", { id: "workflow-update" });
    },
    onError: (error) => {
      toast.error(`Error updating workflow: ${error.message}`, {
        id: "workflow-update",
      });
    },
  });
  return (
    <Button
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", {
          id: "workflow-update",
        });
        mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
      size={"lg"}
      variant={"outline"}
      className="flex items-center gap-2"
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
          Saving...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <CheckIcon className="size-4" />
          Save
        </span>
      )}
    </Button>
  );
}

export default SaveButton;
