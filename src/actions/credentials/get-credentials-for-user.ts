"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetCredentialsForUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  return await prisma.credentials.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      name: "asc",
    },
  });
}
