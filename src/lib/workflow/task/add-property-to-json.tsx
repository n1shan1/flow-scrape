import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { DatabaseIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const AddPropertyToJSON = {
  Type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Click Element",
  icon: (props: LucideProps) => (
    <DatabaseIcon className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Property Name",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property Value",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Updated JSON",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
