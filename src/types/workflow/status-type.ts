import { LucideProps } from "lucide-react";
import { TaskParam, TaskType } from "../node/task";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}
export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  Type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};
