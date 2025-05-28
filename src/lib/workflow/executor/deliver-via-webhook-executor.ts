import { ExecutionEnvironment } from "@/types/executor/env-type";
import { FillInputTask } from "../task/fill-input";
import { waitFor } from "@/lib/waitFor";
import { ClickElement } from "../task/click-element";
import { DeliverViaWebhook } from "../task/deliver-via-webhook";
export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhook>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error(
        "Input -> Target URL is required but not provided."
      );
    }
    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("Input -> Body is required but not provided.");
    }
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;
    if (statusCode !== 200) {
      environment.log.error("Status code from webhook response: " + statusCode);
      console.log("Status code from webhook response: " + statusCode);
      return false;
    }
    const data = await response.json();
    environment.log.info(
      "Webhook delivered successfully with response: " + JSON.stringify(data)
    );
    return true;
  } catch (error: any) {
    environment.log.error("Error during webhook delivery: " + error.message);
    console.log(error.message);
    return false;
  }
}
