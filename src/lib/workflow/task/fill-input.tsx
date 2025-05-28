import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { PenIcon } from "lucide-react";

export const FillInputTask = {
  Type: TaskType.FILL_INPUT,
  label: "Fill Input",
  icon: (props) => <PenIcon className="stroke-orange-500" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
