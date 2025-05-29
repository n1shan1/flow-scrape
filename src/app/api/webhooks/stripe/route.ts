import { handleCompletedCheckout } from "@/lib/stripe/handle-checkout-session-completed";
import { stripe } from "@/lib/stripe/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Important: Disable Next.js body parsing to get raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to get raw request body as buffer
const getRawBody = async (req: NextRequest): Promise<Buffer> => {
  const chunks: Buffer[] = [];

  // Use the Node.js Web Streams API to get the raw body
  const reader = req.body?.getReader();
  if (!reader) {
    return Buffer.from("");
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(Buffer.from(value));
  }

  return Buffer.concat(chunks);
};

export async function POST(req: NextRequest) {
  try {
    const headersList = headers();
    const signature = headersList.get("stripe-signature") as string;

    if (!signature) {
      return new NextResponse("Webhook signature missing", { status: 400 });
    }

    // Get the webhook secret from environment variables
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return new NextResponse("Webhook secret not configured", { status: 500 });
    }

    // Get the raw body as buffer
    const rawBody = await getRawBody(req);

    // Construct the event with raw body and signature
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        await handleCompletedCheckout(session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`Error processing webhook: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
