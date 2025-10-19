import PolicyTemplate from "../base/PolicyTemplate";

export default function ShippingDeliveryPolicy() {
  return (
    <PolicyTemplate title="Shipping & Delivery Policy">
      <p>
        The Sahyadri Open Source Community (SOSC) provides access to all paid
        events and digital resources promptly. Access details and confirmation
        emails will be shared within
        <strong> 24 hours</strong> of successful registration and payment.
      </p>

      <p>
        We operate throughout the week except Sundays and national holidays. In
        rare cases, delays may occur due to technical or logistical reasons
        beyond our control. Participants will be notified if such issues arise.
      </p>

      <p>
        SOSC reserves the right to cancel or reschedule events in unavoidable
        situations. In such cases, a full refund will be issued to the original
        payment method.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-primary">
        Contact Us
      </h2>
      <p className="mt-2 text-sm text-white">
        For any questions or concerns, please contact:
      </p>
      <ul className="mt-2 text-sm text-white space-y-1">
        <li><strong>Name:</strong> Vivek Neeralagi</li>
        <li><strong>Phone:</strong> +918169838688</li>
      </ul>
    </PolicyTemplate>
  );
}
