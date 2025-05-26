import { TaskType } from "@/types/node/task";
import { ExtractTextFromElement } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";
import { WorkflowTask } from "@/types/workflow/status-type";

export type Registry = {
  [K in TaskType]: WorkflowTask;
};
export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};
