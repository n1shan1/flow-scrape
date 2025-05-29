import { ExecutionEnvironment } from "@/types/executor/env-type";
import { ReadPropertyFromJSON } from "../task/read-property-from-json";
export async function ReadPropertyFromJSONExecutor(
  environment: ExecutionEnvironment<typeof ReadPropertyFromJSON>
): Promise<boolean> {
  try {
    const json = environment.getInput("JSON");
    if (!json) {
      environment.log.error("Input -> JSON is required but not provided.");
    }
    const propertyName = environment.getInput("Property Name");
    if (!propertyName) {
      environment.log.error(
        "Input -> Property Name is required but not provided."
      );
    }
    const data = JSON.parse(json);
    const propertyValue = data[propertyName];
    if (propertyValue === undefined) {
      environment.log.error(
        `Property "${propertyName}" not found in the provided JSON.`
      );
      return false;
    }
    environment.setOutput("Property Value", propertyValue);
    environment.log.info(
      `Successfully read property "${propertyName}" with value: ${propertyValue}`
    );
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log(error.message);
    return false;
  }
}
