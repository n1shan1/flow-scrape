import { ExecutionEnvironment } from "@/types/executor/env-type";
import { LaunchBrowserTask } from "../task/launch-browser";
import { PageToHtmlTask } from "../task/page-to-html";
export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);
    if (!html) {
      console.log("Failed to retrieve HTML content from the page.");
      return false;
    }
    console.log("HTML content retrieved successfully.", html);
  } catch (error) {
    console.log("Error launching browser:", error);
    return false;
  }
  return true;
}
