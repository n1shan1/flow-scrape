import { ExecutionEnvironment } from "@/types/executor/env-type";
import puppeteer, { Browser, Page } from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser";

// Keep track of the browser instance
let persistentBrowser: Browser | null = null;

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");

    // Try to reuse existing browser if available
    if (persistentBrowser && persistentBrowser.isConnected()) {
      environment.setBrowser(persistentBrowser);
      environment.log.info("Reusing existing browser instance");
    } else {
      // Launch new browser with persistence options
      const browser = await puppeteer.launch({
        headless: false,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--disable-gpu",
          "--window-size=1920x1080",
        ],
        defaultViewport: null,
      });

      persistentBrowser = browser;
      environment.setBrowser(browser);
      environment.log.info(
        `Browser launched successfully for URL: ${websiteUrl}`
      );
    }

    // Create new page with retry logic
    let page: Page | null = null;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        page = await environment.getBrowser()!.newPage();
        await page.setDefaultNavigationTimeout(30000); // 30 second timeout
        await page.goto(websiteUrl, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });
        break;
      } catch (error: any) {
        retryCount++;
        if (retryCount === maxRetries) {
          throw error;
        }
        environment.log.info(
          `Navigation attempt ${retryCount} failed, retrying...`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
      }
    }

    if (!page) {
      throw new Error("Failed to create page after multiple attempts");
    }

    environment.setPage(page);
    environment.log.info(`Navigated to URL: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log("Error launching browser:", error.message);

    // Cleanup on error
    if (persistentBrowser) {
      try {
        await persistentBrowser.close();
      } catch (closeError) {
        console.log("Error closing browser:", closeError);
      }
      persistentBrowser = null;
    }
    return false;
  }
}
