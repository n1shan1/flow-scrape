import { symmetricDecrypt } from "@/lib/encryption/symmetric-encryption";
import { prisma } from "@/lib/prisma";
import { ExecutionEnvironment } from "@/types/executor/env-type";
import { GoogleGenAI } from "@google/genai";
import { ExtractDataWithAI } from "../task/extract-data-with-ai";
export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAI>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error(
        "Input -> Credentials is required but not provided."
      );
    }
    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("Input -> Prompt is required but not provided.");
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("Input -> Content is required but not provided.");
    }

    const result = await prisma.credentials.findUnique({
      where: {
        id: credentials,
      },
    });

    if (!result) {
      environment.log.error("Credentials not found.");
      return false;
    }

    const plainCredential = symmetricDecrypt(result.value);

    if (!plainCredential) {
      environment.log.error("Failed to decrypt credentials.");
      return false;
    }

    const ai = new GoogleGenAI({ apiKey: plainCredential });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text.`,
            },
            { text: content }, // HTML or plain text content
            { text: prompt }, // Prompt describing what to extract
          ],
        },
      ],
      config: {
        temperature: 1,
      },
    });
    environment.log.info(
      "Tokens used: " + response.usageMetadata?.totalTokenCount
    );
    environment.log.info(
      "Completion Tokens: " + response.usageMetadata?.promptTokenCount
    );

    const outputResult = response.text;

    if (!outputResult) {
      environment.log.error("No output received from AI model.");
      return false;
    }

    environment.setOutput(
      "Extracted Data",
      outputResult.split("```json")[1]?.split("```")[0]?.trim() || ""
    );

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log(error.message);
    return false;
  }
}
/*
extract in a JSON object the selector for the username field, password field, and login button.
Use properties like userNameSelector, passwordSelector, and loginSelector as properties in the resulting JSON object.
*/
