import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let slug: unknown;

  try {
    ({ slug } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof slug !== "string") {
    return NextResponse.json({ error: "A product is required." }, { status: 400 });
  }

  const product = getProduct(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const dodoProductId = process.env[product.dodoProductIdEnv];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode";

  const missingConfig = [
    !apiKey && "DODO_PAYMENTS_API_KEY",
    !dodoProductId && product.dodoProductIdEnv,
    !appUrl && "NEXT_PUBLIC_APP_URL",
  ].filter((value): value is string => Boolean(value));

  if (missingConfig.length > 0) {
    console.error("Dodo checkout is not configured. Missing:", missingConfig);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? `Checkout configuration is missing: ${missingConfig.join(", ")}.`
            : "Checkout is temporarily unavailable.",
      },
      { status: 503 },
    );
  }

  try {
    const client = new DodoPayments({ bearerToken: apiKey!, environment });
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: dodoProductId!, quantity: 1 }],
      billing_currency: "USD",
      return_url: `${appUrl!}/products/success`,
      cancel_url: `${appUrl!}/products`,
      feature_flags: { allow_currency_selection: false },
      metadata: { product_slug: product.slug },
    });

    return NextResponse.json({ checkout_url: session.checkout_url });
  } catch (error) {
    console.error("Dodo checkout session creation failed:", error);
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 502 });
  }
}
