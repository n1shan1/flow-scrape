import { ExecutionEnvironment } from "@/types/executor/env-type";
import { AddPropertyToJSON } from "../task/add-property-to-json";

export async function AddPropertyToJSONExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJSON>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("Input -> JSON is required but not provided.");
    }
    const propertyName = environment.getInput("Property Name");
    if (!propertyName) {
      environment.log.error(
        "Input -> Property name is required but not provided."
      );
    }
    const propertyValue = environment.getInput("Property Value");
    if (!propertyValue) {
      environment.log.error(
        "Input -> Property Value is required but not provided."
      );
    }

    const data = JSON.parse(jsonData);
    data[propertyName] = propertyValue;

    environment.setOutput("Updated JSON", JSON.stringify(data));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    console.log(error.message);
    return false;
  }
}
