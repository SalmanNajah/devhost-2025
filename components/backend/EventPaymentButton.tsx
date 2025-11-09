"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { eventDetails } from "@/assets/data/eventPayment";
import { toast } from "sonner";
import { registerAndInsert } from "@/app/_actions/pay";

type PaymentButtonProps = {
  teamId: string;
  eventId: string;
  disabled?: boolean;
};

export default function EventPaymentButton({
  teamId,
  eventId,
  disabled = false,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [utr, setUtr] = useState("");
  const { user } = useAuth();

  const amount = eventDetails[parseInt(eventId)]?.amount ?? 0;

  const startPayment = async () => {
    if (!upiId || !utr) {
      toast.error("Please enter both UPI ID and UTR number.");
      return;
    }

    if (!user?.email) {
      toast.error("You must be logged in to make a payment.");
      return;
    }

    try {
      setLoading(true);

      const result = await registerAndInsert({
        team_id: teamId,
        leaderEmail: user.email,
        eventId,
        upi_id: upiId,
        utr,
      });

      if (result.status === "already_verified") {
        toast.info("This payment is already verified.");
      } else if (result.status === "inserted") {
        toast.success("Order placed successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <input
        type="text"
        placeholder="Enter UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className="w-full rounded border border-gray-300 p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Enter Transaction Number"
        value={utr}
        onChange={(e) => setUtr(e.target.value)}
        className="w-full rounded border border-gray-300 p-2 text-sm"
      />

      <button
        onClick={startPayment}
        disabled={disabled || loading}
        className="bg-primary font-orbitron mt-2 w-full rounded px-4 py-2 text-xs font-bold tracking-widest text-black uppercase disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </div>
  );
}
