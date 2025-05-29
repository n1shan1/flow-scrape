import { waitFor } from "@/lib/waitFor";
import { ExecutionEnvironment } from "@/types/executor/env-type";
import { ScrollElement } from "../task/scroll-element";
export async function ScrollElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Input -> Selector is required but not provided.");
    }
    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error("Element not Found.");
      }
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scroll({ top });
    }, selector);
    waitFor(10000);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log(error.message);
    return false;
  }
}
