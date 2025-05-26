import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { GlobeIcon, LucideIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  Type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-primary" {...props} />
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "eg: https://example.com",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
} satisfies WorkflowTask;
