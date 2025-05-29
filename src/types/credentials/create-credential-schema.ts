import { z } from "zod";

export const CreateCredentialSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be less than 30 characters."),
  value: z.string().max(500).min(1, "Value is required"),
});

export type CreateCredentialSchemaType = z.infer<typeof CreateCredentialSchema>;
