import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { FileJson2, LucideProps } from "lucide-react";

export const ReadPropertyFromJSON = {
  Type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read Property from JSON",
  icon: (props: LucideProps) => (
    <FileJson2 className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property Name",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Property Value",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
