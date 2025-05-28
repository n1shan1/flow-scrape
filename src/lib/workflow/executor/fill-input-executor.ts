import { ExecutionEnvironment } from "@/types/executor/env-type";
import { FillInputTask } from "../task/fill-input";
import { waitFor } from "@/lib/waitFor";
export async function FillInputExecutorExecutor(
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Input -> Selector is required but not provided.");
    }
    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("Input -> Value is required but not provided.");
    }
    await environment.getPage()!.type(selector, value);

    return true;
  } catch (error: any) {
    environment.log.error(`Error launching browser ${error.message}`);
    console.log(`Error launching browser ${error.message}`);
    return false;
  }
}
