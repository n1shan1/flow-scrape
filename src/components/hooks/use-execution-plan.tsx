import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from "@/lib/workflow/execution-plan";
import { AppNode, AppNodeMissingInputs } from "@/types/node/app-node";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { toast } from "sonner";
import useFlowValidationContext from "./use-flow-vaidation";

function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const { invalidInputs, clearErrors, setInvalidInputs } =
    useFlowValidationContext();
  const handleErrors = useCallback(
    (error: {
      type: FlowToExecutionPlanValidationError;
      invalidElements?: AppNodeMissingInputs[];
    }) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error(
            "No entry point found in the workflow. Please ensure there is at least one node marked as an entry point."
          );
          break;

        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error(
            "Some nodes have invalid inputs. Please check the highlighted nodes for missing or incorrect inputs."
          );
          setInvalidInputs(error.invalidElements || []);
          break;

        default:
          toast.error(
            "An unknown error occurred while generating the execution plan."
          );
          break;
      }
    },
    [setInvalidInputs, clearErrors]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (error) {
      handleErrors(error);
      return null;
    }
    clearErrors();
    return executionPlan;
  }, [toObject, handleErrors, clearErrors]);

  return generateExecutionPlan;
}

export default useExecutionPlan;
