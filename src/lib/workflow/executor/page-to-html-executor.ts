import { ExecutionEnvironment } from "@/types/executor/env-type";
import { PageToHtmlTask } from "../task/page-to-html";
export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);
    if (!html) {
      environment.log.error("Failed to retrieve HTML content from the page.");
      console.log("Failed to retrieve HTML content from the page.");
      return false;
    }
    environment.log.info(
      `HTML content retrieved successfully, ${html.slice(0, 100)}...`
    );
    console.log("HTML content retrieved successfully.");
    return true;
  } catch (error: any) {
    environment.log.error(`Error launching browser ${error.message}`);
    console.log(`Error launching browser ${error.message}`);
    return false;
  }
}
