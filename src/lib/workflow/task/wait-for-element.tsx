import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { EyeIcon, LucideProps } from "lucide-react";

export const WaitforElement = {
  Type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for Element",
  icon: (props: LucideProps) => (
    <EyeIcon className="stroke-amber-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
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
      name: "Visibility",
      type: TaskParamType.SELECT,
      required: true,
      hideHandle: true,
      options: [
        { label: "Visible", value: "visible" },
        { label: "Hidden", value: "hidden" },
      ],
    },
  ] as const,
  outputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
