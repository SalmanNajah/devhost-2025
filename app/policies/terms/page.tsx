import Link from "next/link";
import PolicyTemplate from "../base/PolicyTemplate";

export default function TermsAndConditionsPage() {
  return (
    <PolicyTemplate title="Terms and Conditions">
      <p>
        Thank you for visiting the Sahyadri Open Source Community (SOSC). By
        accessing or participating in SOSC events, activities, or using our
        online resources, you agree to the terms and conditions outlined below.
        SOSC reserves the right to update or revise these terms at any time.
        Continued participation or usage after any modifications constitutes
        acceptance of those changes.
      </p>

      <h2 className="font-orbitron text-primary mt-6 mb-2 text-2xl">
        1. Eligibility
      </h2>
      <p>
        SOSC is a student-led, non-profit community that welcomes participation
        from students, developers, and open-source enthusiasts across all
        backgrounds. You do not need to be an official member to attend our
        events or access our initiatives—anyone with a passion for technology
        and collaboration is welcome. By registering for or engaging in SOSC
        activities, you confirm that the information you provide is accurate and
        genuine.
      </p>

      <h2 className="font-orbitron text-primary mt-6 mb-2 text-2xl">
        2. Membership
      </h2>
      <p>
        Membership in SOSC is optional and offered to individuals who wish to
        contribute regularly to community initiatives. Members are expected to
        uphold community values, maintain respectful conduct, and represent SOSC
        positively. SOSC reserves the right to suspend or revoke membership if a
        participant’s behavior violates community guidelines or disrupts others’
        experience.
      </p>

      <h2 className="font-orbitron text-primary mt-6 mb-2 text-2xl">
        3. Communication
      </h2>
      <p>
        By engaging with SOSC or registering for any of our initiatives, you
        consent to receive communications electronically. This may include
        updates, event notifications, or important announcements. All official
        communication will be through SOSC’s verified channels and platforms.
      </p>

      <h2 className="font-orbitron text-primary mt-6 mb-2 text-2xl">
        4. Contributions and Submissions
      </h2>
      <p>
        SOSC values open collaboration. Any ideas, projects, feedback, or
        contributions you make as part of SOSC activities remain your
        intellectual property unless stated otherwise. However, by contributing
        to community projects, you grant SOSC a non-exclusive right to use,
        display, and distribute the content for educational and community
        purposes with appropriate credit.
      </p>

      <p>
        All participants are expected to maintain integrity and originality in
        their contributions. Plagiarism or unethical use of content will result
        in removal from community initiatives and may affect future
        participation.
      </p>

      <h2 className="font-orbitron text-primary mt-6 mb-2 text-2xl">
        5. Event Participation
      </h2>
      <p>
        Event registrations are open to all eligible participants as per the
        event’s published guidelines. SOSC reserves the right to modify or
        cancel any event due to unforeseen circumstances. In such cases, timely
        communication and refunds (if applicable) will be provided.
      </p>

      <h2 className="font-orbitron text-primary mt-6 mb-2 text-2xl">
        6. Code of Conduct
      </h2>
      <p>
        SOSC is committed to providing an inclusive, harassment-free
        environment. Participants must treat others with respect regardless of
        gender, background, or technical experience. Any form of discrimination,
        abuse, or disruption will not be tolerated and may lead to permanent
        removal from all SOSC platforms and events.
      </p>

      <h2 className="font-orbitron text-primary mt-6 mb-2 text-2xl">
        7. Limitation of Liability
      </h2>
      <p>
        SOSC and its members shall not be held responsible for any losses,
        damages, or claims arising out of participation in community activities,
        events, or collaborations. All involvement is voluntary and at the
        participant’s own discretion.
      </p>

      <p>
        By contributing to or participating in SOSC, you become part of a
        growing open-source ecosystem. When you collaborate with SOSC, you
        contribute to the enrichment of open-source learning and empower fellow
        developers to grow and innovate together.
      </p>

      {/* Links to other policies */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-gray-400">
        <p className="mb-2 text-center italic">Related Policies</p>
        <div className="font-orbitron flex flex-wrap justify-center gap-4 text-xs tracking-widest">
          <Link
            href="/policies/privacy-policy"
            className="text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/policies/refund-cancellation"
            className="text-primary hover:underline"
          >
            Refund & Cancellation
          </Link>
          <Link
            href="/policies/shipping-delivery"
            className="text-primary hover:underline"
          >
            Shipping & Delivery
          </Link>
        </div>
      </div>
    </PolicyTemplate>
  );
}
