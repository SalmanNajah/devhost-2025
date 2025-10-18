import PolicyTemplate from "../base/PolicyTemplate";

export default function RefundCancellationPolicy() {
  return (
    <PolicyTemplate title="Refund & Cancellation">
      <h2 className="text-primary font-orbitron text-2xl mt-4 mb-2">Refund</h2>
      <p>
        If you have registered and paid for an SOSC event by mistake, please notify us within <strong>7 days </strong> 
        of registration. Refunds will be initiated to your original payment method once the request is verified.
      </p>

      <h2 className="text-primary font-orbitron text-2xl mt-4 mb-2">Notice for Events</h2>
      <p>
        Due to the nature of event registrations, <strong>NO REFUND</strong> or <strong>NO CANCELLATION </strong> 
        will be entertained once the event has started or materials/access have been provided.
      </p>

      <h2 className="text-primary font-orbitron text-2xl mt-4 mb-2">Cancellation Policy</h2>
      <p>
        You can cancel your registration within <strong>24 hours</strong> of completing the sign-up. 
        After 24 hours, no cancellation request will be entertained. However, refunds may still be possible if 
        the event has not started.
      </p>

      <p>
        Alternatively, cancellations are only allowed before the event access is granted. Once the event has started 
        or materials are distributed, cancellations cannot be made, although refunds may still be possible in 
        certain cases before the event begins.
      </p>
    </PolicyTemplate>
  );
}
