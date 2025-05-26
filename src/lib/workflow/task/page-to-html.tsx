import { TaskParamType, TaskType } from "@/types/node/task";
import { CodeIcon, GlobeIcon, LucideIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  Type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from Page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-primary/80" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
};
