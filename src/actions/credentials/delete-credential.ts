"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeleteCredential(name: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const result = await prisma.credentials.delete({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
  });

  if (!result) {
    throw new Error("Cannot delete the Credential");
  }

  revalidatePath("/credentials");
}
