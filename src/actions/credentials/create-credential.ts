"use server";

import { symmetricEncrypt } from "@/lib/encryption/symmetric-encryption";
import { prisma } from "@/lib/prisma";
import {
  CreateCredentialSchema,
  CreateCredentialSchemaType,
} from "@/types/credentials/create-credential-schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function CreateCredential(data: CreateCredentialSchemaType) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { success, error } = CreateCredentialSchema.safeParse(data);
  if (!success) {
    throw new Error("The form data is not correct.");
  }

  const encryptedValue = symmetricEncrypt(data.value);
  console.log("@TEST", {
    plain: data.value,
    encrypted: encryptedValue,
  });

  const result = await prisma.credentials.create({
    data: {
      userId,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("Cannot Create the Credential");
  }
  revalidatePath("/credentials");
}
