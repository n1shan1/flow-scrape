import z from "zod";
import { CreateWorkflowSchema } from "./create-workflow-schema";

export const DuplicateWorkflowSchema = CreateWorkflowSchema.extend({
  workflowId: z.string(),
});

export type DuplicateWorkflowSchemaType = z.infer<
  typeof DuplicateWorkflowSchema
>;
