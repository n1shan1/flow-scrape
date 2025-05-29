"use server";

import { getAppUrl } from "@/lib/helper/app-url";
import { stripe } from "@/lib/stripe/stripe";
import { getCreditsPack, PACK } from "@/types/billing/pack";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function PurchaseCredits(packId: PACK) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const selectedPack = getCreditsPack(packId);
  if (!selectedPack) {
    throw new Error("Invalid credits pack selected");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },

    success_url: getAppUrl("billing") + "?session_id={CHECKOUT_SESSION_ID}", // Add session ID to track completion
    cancel_url: getAppUrl("billing"),
    metadata: {
      userId: userId,
      packId: packId,
    },
    line_items: [
      {
        quantity: 1,
        price: selectedPack.price_Id,
      },
    ],
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe checkout session");
  }

  redirect(session.url);
}
