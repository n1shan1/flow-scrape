import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { BrainIcon, LucideProps } from "lucide-react";

export const ExtractDataWithAI = {
  Type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract Data with AI",
  icon: (props: LucideProps) => (
    <BrainIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 6,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIALS,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    {
      name: "Extracted Data",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
