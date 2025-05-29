import { ExecutionEnvironment } from "@/types/executor/env-type";
import { TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { AddPropertyToJSONExecutor } from "./add-property-to-json-executor";
import { ClickElementExecutor } from "./click-element-executor";
import { DeliverViaWebhookExecutor } from "./deliver-via-webhook-executor";
import { ExtractDataWithAIExecutor } from "./extract-data-with-ai-executor";
import { ExtractTextFromElementExecutor } from "./extract-text-from-html";
import { FillInputExecutorExecutor } from "./fill-input-executor";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { NavigateURLExecutor } from "./navigate-url-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ReadPropertyFromJSONExecutor } from "./read-propert-from-json-executor";
import { ScrollElementExecutor } from "./scroll-element-executor";
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
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAIExecutor,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJSONExecutor,
  ADD_PROPERTY_TO_JSON: AddPropertyToJSONExecutor,
  NAVIGATE_URL: NavigateURLExecutor,
  SCROLL_ELEMENT: ScrollElementExecutor,
};
