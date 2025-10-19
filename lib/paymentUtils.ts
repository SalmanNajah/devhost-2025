// lib/paymentUtils.ts
import admin, { adminDb } from "@/firebase/admin";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const POLL_DELAY_MS = 5000;
const MAX_POLL_ATTEMPTS = 5;

const clientId =
  process.env.CASHFREE_CLIENT_ID || process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID;
const clientSecret =
  process.env.CASHFREE_CLIENT_SECRET ||
  process.env.NEXT_PUBLIC_CASHFREE_CLIENT_SECRET;

const env =
  process.env.NEXT_PUBLIC_CASHFREE_MODE === "production"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

export const cashfree = new Cashfree(env, clientId!, clientSecret!);

async function pollPaymentStatus(
  cashfree: Cashfree,
  orderId: string,
  cfPaymentId: string | undefined,
) {
  if (!cfPaymentId) return "FAIL";

  let attempt = 0;
  let status: string | undefined = "PENDING";

  while (attempt < MAX_POLL_ATTEMPTS && status === "PENDING") {
    const res = await cashfree.PGOrderFetchPayment(orderId, cfPaymentId);
    status = res.data?.payment_status;
    if (["SUCCESS", "FAILED", "CANCELLED"].includes(status || "")) {
      return status;
    }
    attempt++;
    await new Promise((res) => setTimeout(res, POLL_DELAY_MS));
  }

  return status || "FAIL";
}

/**
 * Verifies a Cashfree order and updates Firestore if payment succeeded.
 *
 * @param orderId - The order ID to verify.
 * @param options - { quickCheck?: boolean } -> If true, skips polling.
 * @returns "SUCCESS" | "FAIL" | "PENDING"
 */
export async function verifyAndUpdateOrder(
  orderId: string,
  options: { quickCheck?: boolean } = {},
) {
  const { quickCheck = false } = options;

  try {
    const orderRes = await cashfree.PGFetchOrder(orderId);
    const orderStatus = orderRes.data?.order_status;
    let finalStatus: "SUCCESS" | "FAIL" | "PENDING" = "PENDING";

    if (orderStatus === "PAID") {
      finalStatus = "SUCCESS";
    } else if (orderStatus === "ACTIVE" && !quickCheck) {
      // Only poll if not in quick mode
      const paymentsRes = await cashfree.PGOrderFetchPayments(orderId);
      const payments = paymentsRes.data || [];
      if (payments.length) {
        const polled = await pollPaymentStatus(
          cashfree,
          orderId,
          payments[0].cf_payment_id,
        );
        finalStatus = polled === "SUCCESS" ? "SUCCESS" : "FAIL";
      }
    } else if (
      !orderStatus ||
      ["EXPIRED", "FAILED", "CANCELLED"].includes(orderStatus)
    ) {
      finalStatus = "FAIL";
    }

    // Update Firebase if successful
    if (finalStatus === "SUCCESS") {
      const regsQuery = await adminDb
        .collection("registrations")
        .where("pendingOrderId", "==", orderId)
        .get();

      if (!regsQuery.empty) {
        await Promise.all(
          regsQuery.docs.map(async (doc) => {
            const reg = doc.data();
            if (!reg?.paymentDone) {
              await doc.ref.update({
                paymentDone: true,
                registered: true,
                paymentInfo: admin.firestore.FieldValue.delete(),
                pendingOrderId: admin.firestore.FieldValue.delete(),
                pendingOrderAmount: admin.firestore.FieldValue.delete(),
                pendingOrderCreatedAt: admin.firestore.FieldValue.delete(),
              });

              await adminDb.collection("payments").add({
                orderId,
                registrationId: doc.id,
                amount: orderRes.data?.order_amount ?? null,
                currency: orderRes.data?.order_currency ?? null,
                paymentTime: new Date().toISOString(),
                status: finalStatus,
                customer_details: orderRes.data?.customer_details ?? null,
                cf_order_id: orderRes.data?.cf_order_id ?? null,
              });
            }
          }),
        );
      }
    }

    return finalStatus;
  } catch (e) {
    console.error("verifyAndUpdateOrder error:", e);
    return "FAIL";
  }
}
