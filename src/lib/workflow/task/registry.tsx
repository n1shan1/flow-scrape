import { TaskType } from "@/types/node/task";
import { ExtractTextFromElement } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";
import { WorkflowTask } from "@/types/workflow/status-type";
import { FillInputTask } from "./fill-input";
import { ClickElement } from "./click-element";
import { WaitforElement } from "./wait-for-element";
import { DeliverViaWebhook } from "./deliver-via-webhook";

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
};
