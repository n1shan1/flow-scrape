"use client";
import { RunWorkflow } from "@/actions/workflows/run-workflow";
import useExecutionPlan from "@/components/hooks/use-execution-plan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

function ExecuteButton({ workflowId }: Props) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const { mutate, isPending } = useMutation({
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
      disabled={isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          toast.error(
            "Failed to generate execution plan. Please check the flow.",
            {
              id: "flow-execution",
            }
          );
          return;
        }
        mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
        toast.loading("Executing workflow...", {
          id: "flow-execution",
          duration: 5000,
        });
        console.log("Execution Plan", plan);
      }}
      variant={"default"}
      size={"lg"}
      className="flex items-center gap-2"
    >
      <PlayIcon size={16} className="stroke-white" />
      Execute
    </Button>
  );
}

export default ExecuteButton;
