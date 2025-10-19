// app/api/verify-order/route.ts
import { NextResponse } from "next/server";
import { verifyAndUpdateOrder, cashfree } from "@/lib/paymentUtils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");
  if (!orderId)
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });

  try {
    const status = await verifyAndUpdateOrder(orderId);
    const orderRes = await cashfree.PGFetchOrder(orderId);

    const paymentInfo = {
      orderId,
      amount: orderRes.data?.order_amount,
      currency: orderRes.data?.order_currency,
      created_at: new Date().toISOString(),
      status,
    };

    return NextResponse.json(paymentInfo);
  } catch (err) {
    console.error("Error verifying order:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
