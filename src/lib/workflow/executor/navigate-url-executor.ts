import { ExecutionEnvironment } from "@/types/executor/env-type";
import { NavigateURL } from "../task/navigate-url";
export async function NavigateURLExecutor(
  environment: ExecutionEnvironment<typeof NavigateURL>
): Promise<boolean> {
  try {
    const URL = environment.getInput("URL");
    if (!URL) {
      environment.log.error("Input -> URL is required but not provided.");
    }
    await environment.getPage()!.goto(URL);
    environment.log.info(`Navigated to URL: ${URL}`);
    console.log(`Navigated to URL: ${URL}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log(error.message);
    return false;
  }
}
