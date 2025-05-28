import { ExecutionEnvironment } from "@/types/executor/env-type";
import { WaitforElement } from "../task/wait-for-element";
export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitforElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Input -> Selector is required but not provided.");
    }
    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error(
        "Input -> Visibility is required but not provided."
      );
    }
    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });
    environment.log.info(
      `Element with selector "${selector}" is now ${visibility}.`
    );
    return true;
  } catch (error: any) {
    environment.log.error(`Error waiting for element: ${error.message}`);
    console.log(error.message);
    return false;
  }
}
