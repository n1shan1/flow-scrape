import { useContext } from "react";
import { FlowValidationContext } from "../context/flow-validation-context";

function useFlowValidationContext() {
  const context = useContext(FlowValidationContext);
  if (!context) {
    throw new Error(
      "useFlowValidationContext must be used within a FlowValidationContextProvider"
    );
  }
  return context;
}

export default useFlowValidationContext;
