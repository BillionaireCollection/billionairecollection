/**
 * Stripe integration for Billionaire Collection Merch Store
 * - createMerchCheckoutSession: creates a Stripe Checkout session for cart items
 * - stripeWebhookHandler: handles checkout.session.completed to mark orders paid
 */
import Stripe from "stripe";
import { Request, Response } from "express";
import { ENV } from "./_core/env.js";
import { createMerchOrder, updateMerchOrderStatus } from "./db.js";
import { notifyOwner } from "./_core/notification.js";

// Lazy-initialise so the server still boots if key is missing (dev without Stripe)
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    if (!ENV.stripeSecretKey) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(ENV.stripeSecretKey, { apiVersion: "2026-06-24.dahlia" });
  }
  return _stripe;
}

// ---------------------------------------------------------------------------
// Create a Stripe Checkout Session for a merch cart
// ---------------------------------------------------------------------------
export async function createMerchCheckoutSession(input: {
  email: string;
  items: Array<{
    productId: string;
    name: string;
    color: string;
    size?: string;
    qty: number;
    unitPrice: number; // in cents
  }>;
  shippingAddress: {
    name: string;
    address1: string;
    city: string;
    zip: string;
    country_code: string;
  };
  origin: string; // e.g. https://billionairecollection.com
}): Promise<{ checkoutUrl: string; orderId: number }> {
  const stripe = getStripe();

  const totalAmount = input.items.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0
  );

  // Persist the order in pending state first so we have an orderId for metadata
  const order = await createMerchOrder({
    email: input.email,
    items: JSON.stringify(input.items),
    shippingAddress: JSON.stringify(input.shippingAddress),
    totalAmount,
    status: "pending",
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    input.items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.unitPrice, // already in cents
        product_data: {
          name: `${item.name}${item.color ? ` — ${item.color}` : ""}${item.size ? ` / ${item.size}` : ""}`,
          description: "Billionaire Collection Official Merchandise",
        },
      },
      quantity: item.qty,
    }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: input.email,
    line_items: lineItems,
    allow_promotion_codes: true,
    shipping_address_collection: {
      allowed_countries: [
        "US", "GB", "CA", "AU", "DE", "FR", "IT", "ES", "NL", "AE",
        "SG", "HK", "JP", "CH", "SE", "NO", "DK", "BE", "AT", "NZ",
      ],
    },
    metadata: {
      order_id: String(order.id),
      customer_email: input.email,
    },
    client_reference_id: String(order.id),
    success_url: `${input.origin}/marketplace?order=success&id=${order.id}`,
    cancel_url: `${input.origin}/marketplace?order=cancelled`,
  });

  return { checkoutUrl: session.url!, orderId: order.id };
}

// ---------------------------------------------------------------------------
// Stripe Webhook handler — must be registered with express.raw() body parser
// ---------------------------------------------------------------------------
export async function stripeWebhookHandler(
  req: Request,
  res: Response
): Promise<void> {
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    res.status(400).send("Missing stripe-signature header");
    return;
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      req.body as Buffer,
      sig,
      ENV.stripeWebhookSecret
    );
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    res.status(400).send("Webhook signature verification failed");
    return;
  }

  // Test events — return immediately so Stripe dashboard shows success
  if (event.id.startsWith("evt_test_")) {
    console.log("[Stripe Webhook] Test event detected, returning verification response");
    res.json({ verified: true });
    return;
  }

  console.log(`[Stripe Webhook] Event: ${event.type} (${event.id})`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id
      ? parseInt(session.metadata.order_id, 10)
      : null;

    if (orderId) {
      try {
        await updateMerchOrderStatus(orderId, "processing");
        console.log(`[Stripe Webhook] Order ${orderId} marked as processing`);

        // Notify owner
        const email = session.metadata?.customer_email ?? "unknown";
        const amount = session.amount_total
          ? `$${(session.amount_total / 100).toFixed(2)}`
          : "unknown";
        notifyOwner({
          title: `💳 Payment Received — Order #${orderId}`,
          content: `**Customer:** ${email}\n**Amount:** ${amount}\n**Stripe Session:** ${session.id}`,
        }).catch(() => {/* non-blocking */});
      } catch (err) {
        console.error(`[Stripe Webhook] Failed to update order ${orderId}:`, err);
      }
    }
  }

  res.json({ received: true });
}
