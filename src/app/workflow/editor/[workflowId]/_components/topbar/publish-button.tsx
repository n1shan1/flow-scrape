"use client";
import { PublishWorkflow as P } from "@/actions/workflows/publish-workflow";
import useExecutionPlan from "@/components/hooks/use-execution-plan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
type Props = {
  workflowId: string;
};

function PublishButton({ workflowId }: Props) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const { mutate, isPending } = useMutation({
    mutationFn: P,
    onSuccess: () => {
      toast.success("Workflow published successfully!", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Failed to publish workflow.", { id: workflowId });
    },
  });
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          toast.error(
            "Failed to generate execution plan. Please check the flow.",
            {
              id: workflowId,
            }
          );
          return;
        }
        mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
        toast.loading("Publishing workflow...", {
          id: workflowId,
          duration: 5000,
        });
      }}
      variant={"outline"}
      size={"lg"}
      className="flex items-center gap-2"
    >
      <UploadCloud size={16} className="stroke-gree-400" />
      Publish
    </Button>
  );
}
export default PublishButton;
