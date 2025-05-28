import { ExecutionEnvironment } from "@/types/executor/env-type";
import { TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { ExtractTextFromElementExecutor } from "./extract-text-from-html";
import { FillInputExecutorExecutor } from "./fill-input-executor";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ClickElement } from "../task/click-element";
import { ClickElementExecutor } from "./click-element-executor";
import { WaitForElementExecutor } from "./wait-for-element-executor";

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
  FILL_INPUT: FillInputExecutorExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
};
