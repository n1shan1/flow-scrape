import { z } from "zod";

export const CreateWorkflowSchema = z.object({
  name: z.string().min(1, "Workflow name is required"),
  description: z.string().optional(),
});

export type CreateWorkflowSchemaType = z.infer<typeof CreateWorkflowSchema>;
