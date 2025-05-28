"use client";
import { UnpublishWorkflow } from "@/actions/workflows/unpublish-workflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { CloudOff } from "lucide-react";
import { toast } from "sonner";
type Props = {
  workflowId: string;
};

function UnpublishButton({ workflowId }: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished successfully!", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Failed to unpublish workflow.", { id: workflowId });
    },
  });
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        mutate(workflowId);
        toast.loading("Un-publishing workflow...", {
          id: workflowId,
          duration: 5000,
        });
      }}
      variant={"outline"}
      size={"lg"}
      className="flex items-center gap-2"
    >
      <CloudOff size={16} className="stroke-gree-400" />
      Unpublish
    </Button>
  );
}
export default UnpublishButton;
