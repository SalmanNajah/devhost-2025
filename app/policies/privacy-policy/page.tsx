import PolicyTemplate from "../base/PolicyTemplate";

export default function PrivacyPolicy() {
  return (
    <PolicyTemplate title="Privacy Policy">
      <p>
        We respect and are committed to protecting your privacy. Publishing,
        selling, or renting any personal data or information to any third party,
        without your consent, is against our ethics. SOSC values the trust of
        its members.
      </p>

      <p>
        The privacy practices of this statement apply to our services available
        under the domain and subdomains of the Site. By visiting this Site you
        agree to be bound by the terms and conditions of this privacy policy. If
        you do not agree, please do not use or access our site.
      </p>

      <p>
        This privacy policy does not apply to sites maintained by other
        organizations to which we link, and we are not responsible for any
        personal information you submit to third parties via our website. Please
        read the privacy policy of such sites before submitting your details.
      </p>

      <p>
        This policy describes the information we collect from you and how it may
        be used. By using the site, you consent to our use and disclosure of
        your personal information in accordance with this policy.
      </p>

      <h2 className="text-primary font-orbitron mt-6 mb-2 text-2xl">
        Privacy Guarantee
      </h2>
      <p>
        We will not sell or rent your personal information to third parties for
        marketing purposes without your explicit consent. Only those of our
        members who need access to information to perform their duties are
        allowed such access. Any violation of our privacy policies may result in
        disciplinary action.
      </p>

      <h2 className="text-primary font-orbitron mt-6 mb-2 text-2xl">
        Information We Collect
      </h2>
      <p>
        Personal information is collected to provide services effectively and
        manage community activities. We use appropriate physical, electronic,
        and managerial procedures to safeguard and secure the information we
        collect online.
      </p>

      <p>
        We use cookies on certain pages to analyze web page flow, measure
        engagement, and promote trust and safety. Cookies help us remember
        preferences, enhance functionality, and provide content relevant to the
        community. You may decline cookies if your browser permits.
      </p>

      <h2 className="text-primary font-orbitron mt-6 mb-2 text-2xl">
        Cookie Policy
      </h2>
      <p>
        SOSC operates a strict privacy policy and is transparent about how we
        use cookies. Cookies may be:
      </p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Essential:</strong> Required for the regular operation of our
          site.
        </li>
        <li>
          <strong>Functional:</strong> Remember your preferences for a better
          experience.
        </li>
        <li>
          <strong>Analytics:</strong> Measure engagement, page visits, and
          content popularity to improve the site.
        </li>
        <li>
          <strong>Advertising:</strong> Used responsibly with trusted partners
          to show relevant information.
        </li>
      </ul>

      <p>
        Third-party cookies are limited to trusted partners, and you can manage
        your privacy settings through your browser. By participating in SOSC
        activities and sharing information, you contribute to building resources
        and knowledge that benefit other students and the wider open source
        community.
      </p>
    </PolicyTemplate>
  );
}
