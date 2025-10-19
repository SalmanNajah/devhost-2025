// app/api/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment, CreateOrderRequest } from "cashfree-pg";
import { adminDb, verifySessionCookie } from "@/firebase/admin";
import { eventDetails } from "@/assets/data/eventPayment";
import { cookies } from "next/headers";
import { verifyAndUpdateOrder } from "@/lib/paymentUtils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { redirectUrl, eventId, teamId, customerId, customerEmail } =
      body as {
        redirectUrl?: string;
        eventId?: string;
        teamId?: string;
        customerId?: string;
        customerEmail?: string;
      };

    const cookieStore = await cookies();
    const session = cookieStore.get("__session")?.value;
    if (!session)
      return NextResponse.json(
        { error: "Missing session cookie" },
        { status: 401 },
      );

    const decoded = await verifySessionCookie(session);
    if (!decoded)
      return NextResponse.json(
        { error: "Invalid session cookie" },
        { status: 401 },
      );

    const uid = decoded.uid;
    const profileRef = adminDb.collection("users").doc(uid);
    const profileSnapshot = await profileRef.get();

    if (!profileSnapshot.exists)
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 },
      );

    const userProfile = profileSnapshot.data();
    const name = userProfile?.name;
    const phone = userProfile?.phone;

    if (!name || !phone)
      return NextResponse.json(
        { error: "Invalid user profile data" },
        { status: 400 },
      );

    if (!eventId || !(eventId in eventDetails))
      return NextResponse.json(
        { error: "Invalid or missing event ID" },
        { status: 400 },
      );

    const amount = eventDetails[parseInt(eventId)].amount;
    const parsedAmount =
      typeof amount === "string" ? parseFloat(amount) : Number(amount);
    if (!parsedAmount || Number.isNaN(parsedAmount))
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

    if (!redirectUrl || !/^https?:\/\/.+/i.test(redirectUrl))
      return NextResponse.json(
        { error: "Invalid redirectUrl" },
        { status: 400 },
      );

    if (teamId) {
      const regRef = adminDb.collection("registrations").doc(teamId);
      const regSnap = await regRef.get();

      if (regSnap.exists) {
        const regData = regSnap.data();
        if (regData?.pendingOrderId) {
          const prevOrderId = regData.pendingOrderId;
          const status = await verifyAndUpdateOrder(prevOrderId, {
            quickCheck: true,
          });

          if (status === "SUCCESS") {
            return NextResponse.json({
              message: "Existing order already completed",
              orderId: prevOrderId,
              status: "SUCCESS",
            });
          }
        }
      }
    }

    const chargeAmount =
      eventId === "1"
        ? Math.round(parsedAmount + 10)
        : Math.round(parsedAmount + 3);

    const orderId = `order_${Date.now()}`;

    const orderRequest: CreateOrderRequest = {
      order_amount: chargeAmount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customerId || uid,
        customer_name: name,
        customer_email: customerEmail,
        customer_phone: phone,
      },
      order_meta: {
        return_url: `${redirectUrl}?order_id={order_id}`,
      },
    };

    const clientId =
      process.env.CASHFREE_CLIENT_ID ||
      process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID;
    const clientSecret =
      process.env.CASHFREE_CLIENT_SECRET ||
      process.env.NEXT_PUBLIC_CASHFREE_CLIENT_SECRET;

    if (!clientId || !clientSecret)
      return NextResponse.json(
        { error: "Missing Cashfree credentials" },
        { status: 500 },
      );

    const env =
      process.env.NEXT_PUBLIC_CASHFREE_MODE === "production"
        ? CFEnvironment.PRODUCTION
        : CFEnvironment.SANDBOX;

    const cashfree = new Cashfree(env, clientId, clientSecret);
    const response = await cashfree.PGCreateOrder(orderRequest);

    if (teamId) {
      const ref = adminDb.collection("registrations").doc(teamId);
      const snap = await ref.get();
      if (snap.exists) {
        await ref.update({
          pendingOrderId: orderId,
          pendingOrderAmount: response?.data?.order_amount ?? chargeAmount,
          pendingOrderCreatedAt: new Date().toISOString(),
        });
      }
    }

    if (!response?.data?.payment_session_id)
      return NextResponse.json(
        { error: "Unexpected Cashfree response" },
        { status: 500 },
      );

    return NextResponse.json({
      orderId,
      paymentSessionId: response.data.payment_session_id,
      amount: response.data.order_amount,
      currency: response.data.order_currency,
    });
  } catch (err: unknown) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
