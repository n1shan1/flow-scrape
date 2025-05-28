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

    // Log a sample of the HTML for debugging
    const htmlSample = html.slice(0, 500) + (html.length > 500 ? "..." : "");
    environment.log.info(`HTML sample: ${htmlSample}`);

    // Try the original selector
    let elements = $(selector);

    // If no elements found, try a simplified version of the selector
    if (elements.length === 0) {
      environment.log.info(
        `No elements found for selector: ${selector}. Trying fallback selectors...`
      );

      // Create simplified versions of the selector by breaking it into parts
      const selectorParts = selector.split(" > ");
      if (selectorParts.length > 1) {
        const simplifiedSelector = selectorParts[selectorParts.length - 1];
        environment.log.info(
          `Trying simplified selector: ${simplifiedSelector}`
        );
        elements = $(simplifiedSelector);
      }

      // If still no elements, try a more generic approach
      if (elements.length === 0 && selector.includes(".")) {
        const classSelector = "." + selector.split(".").pop()?.split(" ")[0];
        environment.log.info(`Trying class-only selector: ${classSelector}`);
        elements = $(classSelector);
      }

      // If still no elements found after fallbacks
      if (elements.length === 0) {
        environment.log.error(
          `No elements found for any version of selector: ${selector}`
        );
        console.error(`No elements found for selector: ${selector}`);

        // Output first 10 elements in the document for debugging
        const allElements = $("*");
        const elementSample = Array.from(
          { length: Math.min(10, allElements.length) },
          (_, i) => {
            const el = allElements.eq(i);
            return `${el.prop("tagName")?.toLowerCase()}${
              el.attr("class")
                ? "." + el.attr("class")!.replace(/\s+/g, ".")
                : ""
            }`;
          }
        ).join(", ");

        environment.log.info(`Document contains elements: ${elementSample}...`);
        return false;
      }
    }

    // Get text content from all matching elements
    const extractedTexts = elements
      .map((_, el) => {
        const text = $(el).text().trim();
        const html = $(el).html();
        environment.log.info(
          `Found element with text length: ${
            text.length
          }, HTML snippet: ${html?.substring(0, 100)}...`
        );
        return text;
      })
      .get()
      .filter((text) => text.length > 0);

    if (extractedTexts.length === 0) {
      environment.log.error("No text found in the matched elements.");
      console.error("No text found in the matched elements.");

      // Check if elements have inner HTML but no visible text
      const hasInnerHtml = elements
        .toArray()
        .some((el) => $(el).html()?.trim().length! > 0);
      if (hasInnerHtml) {
        environment.log.info(
          "Elements found but they don't contain visible text. They might contain only HTML or nested elements."
        );
      }
      return false;
    }

    const joinedText = extractedTexts.join("\n");

    environment.log.info(
      `Successfully extracted text: ${joinedText.slice(0, 100)}...`
    );
    environment.setOutput("Extracted Text", joinedText);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log("Error extracting text from HTML:", error.message);
    return false;
  }
}
