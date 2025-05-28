import { Workflow } from "lucide-react";
import { CreateWorkflowSchema } from "./create-workflow-schema";
import z from "zod";

export const DuplicateWorkflowSchema = CreateWorkflowSchema.extend({
  workflowId: z.string(),
});

export type DuplicateWorkflowSchemaType = z.infer<
  typeof DuplicateWorkflowSchema
>;
