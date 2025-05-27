import { TaskType } from "@/types/node/task";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ExecutionEnvironment } from "@/types/executor/env-type";
import { WorkflowTask } from "@/types/workflow/status-type";
import { ExtractTextFromElement } from "../task/extract-text-from-element";
import { ExtractTextFromElementExecutor } from "./extract-text-from-html";

type ExecutorFunction<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFunction<WorkflowTask>;
};
export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
};
