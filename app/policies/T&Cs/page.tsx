import PolicyTemplate from "../base/PolicyTemplate";

export default function TermsAndConditionsPage() {
  return (
    <PolicyTemplate title="Terms And Conditions">
      

      <p>
        Thank you for accessing/shopping at ---Website URL----.com. This site is
        owned by ---Company Name---- (hereinafter referred to as “---Website
        URL----”). By accessing, shopping on this site, you indicate your
        unconditional acceptance of these terms & conditions. We reserve this
        right, in our sole discretion, to update or revise these terms &
        conditions. Continued use of the site following the posting of any
        changes to the 'terms & conditions', constitutes your acceptance of
        those changes. At “---Website URL----”, we try our best to create a
        space where you can explore and shop for all your favorite things in a
        safe and secure environment. All products and information displayed on
        “---Website URL----” constitutes an "invitation to offer".
        “---Website URL----” reserves the right to accept or reject your offer.
        Your order for purchase, constitutes your "offer" which shall be subject
        to the terms and conditions as listed below.
      </p>

      <h2 className="text-2xl primary font-orbitron mt-6 mb-2  text-primary">1. Eligibility to use our site</h2>
      <p>
        Use of the Site is available only to persons who can legally enter into
        contracts under applicable laws. Persons who are "incompetent to
        contract", within the meaning of the Indian Contract Act, 1872 including
        un-discharged insolvents etc. are not eligible to use the Site.
        “---Website URL----” reserves the right to terminate your access to the
        Site if it discovers that you are under the age of 18 years or suffers
        from any other disability, as recognized under Indian Contract Act,
        1872.
      </p>

      <h2 className="text-2xl primary font-orbitron mt-6 mb-2  text-primary">2. Membership</h2>
      <p>
        Although it's not essential to have an account to shop with “---Website
        URL----”, you can shop as a guest. As a member, you agree to provide
        true, accurate, current, and complete information about yourself as
        prompted by the site's registration form. Registration where prohibited
        under any law shall be void. “---Website URL----” reserves the right to
        revoke or terminate your registration for any reason at any time,
        without notice.
      </p>

      <h2 className="text-2xl primary font-orbitron mt-6 mb-2  text-primary">3. Electronic Communications</h2>
      <p>
        When you use the site or send emails or other data, information or
        communicate to us, you agree and understand that you are communicating
        with us electronically and give your consent to receive communications
        electronically from us periodically, when required.
      </p>

      <h2 className="text-2xl primary font-orbitron mt-6 mb-2  text-primary">
        4. Reviews, Feedback, Submissions
      </h2>
      <p>
        All reviews, comments, feedback, postcards, suggestions, ideas, and
        other submissions disclosed, submitted or offered to “---Website
        URL----” directly or otherwise disclosed, submitted or offered in
        connection with your use of this Site (collectively referred to
        "Comments") will remain “---Website URL----” property. Such disclosure,
        submission or offer of any comments shall constitute an assignment to
        “---Website URL----” of all worldwide rights, titles and interests in
        all copyrights and other intellectual properties in the comments, thus,
        it exclusively owns all such rights, titles and interests and shall not
        be limited in any way in its use, commercial or otherwise.
        </p>
        <p> 
        “---Website URL----” will be entitled to use, reproduce, disclose, 
        modify, adapt, create derivative works from, publish, display and distribute 
        any comments you submit for any purpose whatsoever, without restriction and
        without compensating you in any way. “---Website URL----” is and shall
        be under no obligation (1) to maintain any Comments in confidence; or
        (2) to pay you any compensation for any Comments; or (3) to respond to
        any Comments.
        </p>
        <p>
         You agree that any comments submitted by you to the Site
        will not violate this policy or any right of any third party, including
        copyright, trademark, privacy or other personal or proprietary right(s),
        and will not cause injury to any person or entity. You further agree
        that no comments submitted by you to the site will be libelous or
        otherwise unlawful, threatening, abusive or obscene material, or contain
        software viruses, political campaigning, commercial solicitation, chain
        letters, mass mailings or any form of "spam".
        </p>
        <p>
         “---Website URL----” does not regularly review posted comments, but does
        reserve the right (but not the obligation) to monitor and edit or remove any 
        comment submitted to the Site. You grant “---Website URL----” the right to 
        use the name that you submit in connection with any of the posted comments. 
        You agree not to use a false email address, impersonate any person or entity, 
        or otherwise mislead as to the origin of any Comments you submit. You are
        and shall remain solely responsible for the content of any comments you
        make and you agree to indemnify “---Website URL----” and its affiliates
        for all claims resulting from any Comments you submit, we take no
        responsibility and assume no liability for any comments submitted by you
        or any third party.
      </p>

      <h2 className="text-2xl primary font-orbitron mt-6 mb-2  text-primary">
        5. Accuracy of Content/Information of Products on the Website
      </h2>
      <p>
        While “---Website URL----” strives to provide accurate product and
        pricing information, typographical errors may occur. In the event that a
        product is listed at an incorrect price or with incorrect information due
        to an error in pricing or product information, “---Website URL----” shall
        have the right, on our sole discretion, to modify the price of the
        products, or information of the products or to refuse or cancel any
        orders placed for that product, unless the product has already been
        dispatched.
      </p>

    
      <div className="mt-6 flex items-center gap-2">
        <input type="checkbox" id="accept" name="accept" className="h-4 w-4" />
        <label htmlFor="accept" className=" text-gray-400">
          I have read and accept the Terms & Conditions.
        </label>
      </div>
    
    </PolicyTemplate>
  );
}
