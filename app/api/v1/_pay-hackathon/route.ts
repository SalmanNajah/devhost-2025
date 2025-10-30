// app/api/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CreateOrderRequest } from "cashfree-pg";
import { adminDb, verifySessionCookie } from "@/firebase/admin";
import { cookies } from "next/headers";
import { cashfree, verifyAndUpdateOrder } from "@/lib/paymentUtils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { redirectUrl, teamId, customerId, customerEmail } = body as {
      redirectUrl?: string;
      teamId?: string;
      customerId?: string;
      customerEmail?: string;
    };

    // 🔒 Verify session cookie
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

    // 🔍 Get user profile
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

    if (!redirectUrl || !/^https?:\/\/.+/i.test(redirectUrl))
      return NextResponse.json(
        { error: "Invalid redirectUrl" },
        { status: 400 },
      );

    if (!teamId)
      return NextResponse.json({ error: "Missing team ID" }, { status: 400 });

    // 🔹 Fetch participant count from team document
    const teamRef = adminDb.collection("teams").doc(teamId);
    const teamSnap = await teamRef.get();

    if (!teamSnap.exists)
      return NextResponse.json({ error: "Team not found" }, { status: 404 });

    const teamData = teamSnap.data();
    const members = Array.isArray(teamData?.members) ? teamData.members : [];

    // ✅ Use actual participant count
    const participant_count = members.length;

    if (participant_count < 3 || participant_count > 4)
      return NextResponse.json(
        {
          error:
            "Team must have 3-4 members (including leader) before payment.",
        },
        { status: 400 },
      );

    const chargeAmount = Math.ceil(250 * participant_count * 1.025);

    // 🔄 Handle previous order if exists
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

    const response = await cashfree.PGCreateOrder(orderRequest);

    if (teamId) {
      await regRef.set(
        {
          teamId,
          eventId: "hackathon",
          paymentDone: false,
          leaderEmail: customerEmail,
          pendingOrderId: orderId,
          pendingOrderAmount: response?.data?.order_amount ?? chargeAmount,
          pendingOrderCreatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
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
      participant_count,
    });
  } catch (err: unknown) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
