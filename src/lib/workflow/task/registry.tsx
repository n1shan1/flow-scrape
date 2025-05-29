import { TaskType } from "@/types/node/task";
import { ExtractTextFromElement } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";
import { WorkflowTask } from "@/types/workflow/status-type";
import { FillInputTask } from "./fill-input";
import { ClickElement } from "./click-element";
import { WaitforElement } from "./wait-for-element";
import { DeliverViaWebhook } from "./deliver-via-webhook";
import { ExtractDataWithAI } from "./extract-data-with-ai";
import { ReadPropertyFromJSON } from "./read-property-from-json";
import { AddPropertyToJSON } from "./add-property-to-json";
import { NavigateURL } from "./navigate-url";
import { ScrollElement } from "./scroll-element";

export type Registry = {
  [K in TaskType]: WorkflowTask;
};
export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElement,
  WAIT_FOR_ELEMENT: WaitforElement,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhook,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAI,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJSON,
  ADD_PROPERTY_TO_JSON: AddPropertyToJSON,
  NAVIGATE_URL: NavigateURL,
  SCROLL_ELEMENT: ScrollElement,
};
