import { getCreditsPack, PACK } from "@/types/billing/pack";
import Stripe from "stripe";
import { prisma } from "../prisma";

export async function handleCompletedCheckout(
  session: Stripe.Checkout.Session
) {
  if (!session.metadata) {
    console.error("Checkout session metadata is missing");
    return;
  }
  const userId = session.metadata?.userId;
  const packId = session.metadata?.packId;

  if (!userId || !packId) {
    console.error("Missing metadata in checkout session");
    return;
  }

  const purchasedPack = getCreditsPack(packId as PACK);
  if (!purchasedPack) {
    throw new Error("Invalid credits pack purchased");
  }

  await prisma.userBalance.upsert({
    where: { userId: userId },
    update: {
      credits: {
        increment: purchasedPack.credits,
      },
    },
    create: {
      userId: userId,
      credits: purchasedPack.credits,
    },
  });

  await prisma.userPurchase.create({
    data: {
      userId,
      stripeId: session.id,
      description: `Purchased ${purchasedPack.credits} credits of pack ${purchasedPack.name}`,
      amount: purchasedPack.credits!,
      currency: session.currency || "usd",
    },
  });
}
