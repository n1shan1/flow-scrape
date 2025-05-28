import { ExecutionEnvironment } from "@/types/executor/env-type";
import { ExtractTextFromElement } from "../task/extract-text-from-element";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector input is required.");
      console.log("Selector input is required.");
      return false;
    }
    const html = environment.getInput("HTML");
    if (!html) {
      environment.log.error("HTML input is required.");
      console.log("HTML input is required.");
      return false;
    }

    const $ = cheerio.load(html);
    const elements = $(selector);

    if (elements.length === 0) {
      environment.log.error(`No elements found for selector: ${selector}`);
      console.error(`No elements found for selector: ${selector}`);
      return false;
    }

    // Get text content from all matching elements
    const extractedTexts = elements
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((text) => text.length > 0)
      .join("\n");

    if (!extractedTexts) {
      environment.log.error("No text found for the specified selector.");
      console.error("No text found for the specified selector.");
      return false;
    }

    environment.log.info(
      `Successfully extracted text: ${extractedTexts.slice(0, 100)}...`
    );
    environment.setOutput("Extracted Text", extractedTexts);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log("Error extracting text from HTML:", error.message);
    return false;
  }
}
