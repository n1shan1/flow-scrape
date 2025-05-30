"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetUserPurchaseHistory() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  return await prisma.userPurchase.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
}
