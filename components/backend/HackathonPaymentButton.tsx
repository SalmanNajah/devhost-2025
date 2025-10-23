"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  returnUrl?: string;
  redirectTarget?: "_self" | "_blank" | "_parent" | "_top";
}

declare global {
  interface Window {
    Cashfree: (config: { mode: "sandbox" | "production" }) => {
      checkout: (options: CashfreeCheckoutOptions) => Promise<void>;
    };
  }
}

type PaymentButtonProps = {
  teamId?: string;
  participant_count: number;
  disabled?: boolean;
};

export default function PaymentButton({
  teamId,
  participant_count,
  disabled = false,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadCashfreeSDK = () =>
    new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && window.Cashfree) {
        resolve(window.Cashfree);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () =>
        window.Cashfree
          ? resolve(window.Cashfree)
          : reject(new Error("Cashfree SDK not loaded"));
      script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
      document.head.appendChild(script);
    });

  const startPayment = async () => {
    if (disabled || loading) return;
    setLoading(true);

    try {
      await loadCashfreeSDK();

      const currentPath = "/hackathon/payment";

      if (!user?.email || !teamId) {
        console.log(teamId);
        toast.error("Missing user or team information.");
        setLoading(false);
        return;
      }

      const customerName = user.email;
      const customerEmail = user.email;
      const customerPhone = "0000000000";

      const createRes = await fetch("/api/v1/pay-hackathon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId,
          redirectUrl: `${window.location.origin}/payment/success?from=${encodeURIComponent(currentPath)}`,
          customerId: teamId,
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json().catch(() => ({}));
        toast.error(
          "Order creation failed: " + (err.error || createRes.status),
        );
        setLoading(false);
        return;
      }

      const order: {
        paymentSessionId?: string;
        orderId?: string;
        status?: "SUCCESS" | "PENDING" | "FAIL";
        error?: string;
      } = await createRes.json();

      if (order?.status === "SUCCESS") {
        toast.success("Payment already successful!");
        window.location.reload();
        return;
      }

      if (!order?.paymentSessionId) {
        toast.error("Order creation failed: " + (order?.error || "unknown"));
        setLoading(false);
        return;
      }

      const cashfree = window.Cashfree({
        mode:
          process.env.NEXT_PUBLIC_CASHFREE_MODE === "production"
            ? "production"
            : "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId: order.paymentSessionId,
        returnUrl: `${window.location.origin}/payment/success?order_id=${order.orderId}&from=${encodeURIComponent(currentPath)}`,
      });

      setLoading(false);
    } catch (err) {
      toast.error("Could not start payment. Please try again.");
      console.error("Payment error:", err);
      setLoading(false);
    }
  };

  const amount = 250 * (participant_count || 1);

  return (
    <button
      onClick={startPayment}
      disabled={disabled || loading}
      className="bg-primary font-orbitron w-full rounded px-4 py-2 text-xs font-bold tracking-widest text-black uppercase disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Processing..." : `Pay Rs. ${amount}`}
    </button>
  );
}
