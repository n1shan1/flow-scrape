import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { CodeIcon, GlobeIcon, LucideIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  Type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from Page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-primary/80" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
    },
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
