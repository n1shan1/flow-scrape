import { ExecutionEnvironment } from "@/types/executor/env-type";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser";
export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
    const browser = await puppeteer.launch({
      headless: false,
    });
    environment.setBrowser(browser);
    environment.log.info(
      `Browser launched successfully for URL: ${websiteUrl}`
    );
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Navigated to URL: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log("Error launching browser:", error.message);
    return false;
  }
}
