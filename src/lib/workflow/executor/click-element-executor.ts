import { ExecutionEnvironment } from "@/types/executor/env-type";
import { ClickElement } from "../task/click-element";
export async function ClickElementExecutor(
  environment: ExecutionEnvironment<typeof ClickElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Input -> Selector is required but not provided.");
    }
    await environment.getPage()!.click(selector);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log(error.message);
    return false;
  }
}
