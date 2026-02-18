import { HashLink as Link } from 'react-router-hash-link';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto text-xm px-8 shadow-custom">
            <h1 className="text-3xl font-bold mb-6 border-b text-black-main ">PRIVACY POLICY</h1>
            <p className="mb-6">Last updated December 14, 2023</p>
            <div
                style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#333',
                }}
            >
                <p>
                    This privacy notice for Eleli ("we," "us," or "our") describes how and why we
                    might collect, store, use, and/or share ("process") your information when you
                    use our services ("Services"). This includes instances when you:
                </p>

                <ul>
                    <li>
                        Visit our website at{' '}
                        <a
                            href="https://eleli.co.ke/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            https://eleli.co.ke/
                        </a>
                        , or any website of ours that links to this privacy notice
                    </li>
                    <li>
                        Download and use our mobile application (
                        <a href="https://eleli.co.ke/" target="_blank" rel="noopener noreferrer">
                            https://eleli.co.ke/
                        </a>
                        ), or any other application of ours that links to this privacy notice
                    </li>
                    <li>
                        Engage with us in other related ways, including any sales, marketing, or
                        events
                    </li>
                </ul>

                <p>
                    Questions or concerns? Reading this privacy notice will help you understand your
                    privacy rights and choices. If you do not agree with our policies and practices,
                    please do not use our Services. If you still have any questions or concerns,
                    please contact us at{' '}
                    <a href="mailto:info@eleli.co.ke" className="text-blue-500">
                        info@eleli.co.ke
                    </a>
                    .
                </p>
            </div>

            <div
                className="mb-8"
                style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#333',
                }}
            >
                <h2 className="text-2xl font-bold mb-4">SUMMARY OF KEY POINTS</h2>
                {/* Add summary content */}
                <p>
                    This summary provides key points from our privacy notice, but you can find out
                    more details about any of these topics by clicking the link following each key
                    point or by using our table of contents below to find the section you are
                    looking for.
                </p>
                <ul>
                    <li className="list-disc ">
                        <strong>What personal information do we process?</strong> When you visit,
                        use, or navigate our Services, we may process personal information depending
                        on how you interact with us and the Services, the choices you make, and the
                        products and features you use.
                    </li>
                    <li className="list-disc ">
                        <strong>Do we process any sensitive personal information?</strong> We do not
                        process sensitive personal information.
                    </li>
                    <li className="list-disc ">
                        <strong>Do we receive any information from third parties?</strong> We do not
                        receive any information from third parties.
                    </li>
                    <li className="list-disc ">
                        <strong>How do we process your information?</strong> We process your
                        information to provide, improve, and administer our Services, communicate
                        with you, for security and fraud prevention, and to comply with law.{' '}
                    </li>
                    <li className="list-disc ">
                        <strong>
                            In what situations and with which parties do we share personal
                            information?
                        </strong>{' '}
                        We may share information in specific situations and with specific third
                        parties.
                    </li>
                    <li className="list-disc ">
                        <strong>How do we keep your information safe?</strong> We have
                        organizational and technical processes and procedures in place to protect
                        your personal information. However, no electronic transmission over the
                        internet or information storage technology can be guaranteed to be 100%
                        secure.
                    </li>
                    <li className="list-disc ">
                        <strong>What are your rights?</strong> Depending on where you are located
                        geographically, the applicable privacy law may mean you have certain rights
                        regarding your personal information.
                    </li>
                    <li className="list-disc ">
                        <strong>How do you exercise your rights?</strong> The easiest way to
                        exercise your rights is by submitting a data subject access request, or by
                        contacting us. We will consider and act upon any request in accordance with
                        applicable data protection laws.
                    </li>
                    <li className="list-disc ">
                        <strong>
                            Want to learn more about what we do with any information we collect?
                        </strong>{' '}
                        Review the privacy notice in full.
                    </li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">TABLE OF CONTENTS</h2>
                <ul>
                    <li className="mb-2">
                        <Link
                            to="#section1"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            1. WHAT INFORMATION DO WE COLLECT?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section2"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            2. HOW DO WE PROCESS YOUR INFORMATION?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section3"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section4"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section5"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section6"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            6. HOW LONG DO WE KEEP YOUR INFORMATION?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section7"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            7. HOW DO WE KEEP YOUR INFORMATION SAFE?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section8"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            8. DO WE COLLECT INFORMATION FROM MINORS?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="section9" smooth={true} className="text-blue-500 hover:underline">
                            9. WHAT ARE YOUR PRIVACY RIGHTS?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section10"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            10. CONTROLS FOR DO-NOT-TRACK FEATURES
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section11"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            11. DO WE MAKE UPDATES TO THIS NOTICE?
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="#section12"
                            smooth={true}
                            className="text-blue-500 hover:underline"
                        >
                            12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                        </Link>
                    </li>
                </ul>
            </div>

            {/* #section 1 */}
            <div id="section1" className="mb-6">
                <h2 className="text-xl font-bold mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>

                <div className="mb-4">
                    <p>
                        <strong>Personal information you disclose to us</strong>
                    </p>
                    <p>
                        We collect personal information that you voluntarily provide to us when you
                        register on the Services, express an interest in obtaining information about
                        us or our products and Services, when you participate in activities on the
                        Services, or otherwise when you contact us.
                    </p>
                    <p>
                        <strong>Personal Information Provided by You:</strong> The personal
                        information that we collect depends on the context of your interactions with
                        us and the Services, the choices you make, and the products and features you
                        use. The personal information we collect may include the following:
                    </p>
                    <ul className="list-disc pl-8">
                        <li className="list-disc ">Names</li>
                        <li className="list-disc ">Phone numbers</li>
                        <li className="list-disc ">Email addresses</li>
                        <li className="list-disc ">Location</li>
                        {/* ... (other items) */}
                    </ul>
                </div>

                <div className="mb-4">
                    <p>
                        <strong>Sensitive Information:</strong> We do not process sensitive
                        information.
                    </p>
                </div>

                <div className="mb-4">
                    <p>
                        <strong>Social Media Login Data:</strong> We may provide you with the option
                        to register with us using your existing social media account details, like
                        your Facebook, Twitter, or other social media account. If you choose to
                        register in this way, we will collect the information described in the
                        section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
                    </p>
                </div>
            </div>

            {/* #section 2 */}
            <div id="section2" className="mb-6">
                <h2 className="text-xl font-bold mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                {/* Add content for #section 2 */}
                <p>
                    We process your information to provide, improve, and administer our Services,
                    communicate with you, for security and fraud prevention, and to comply with law.
                    We may also process your information for other purposes with your consent.
                </p>
                <p>
                    We process your personal information for a variety of reasons, depending on how
                    you interact with our Services, including:
                </p>
                <ul className="list-disc ml-4">
                    <li className="list-disc ">
                        Facilitate account creation and authentication and otherwise manage user
                        accounts.
                    </li>
                    <li className="list-disc ">
                        Deliver and facilitate delivery of services to the user.
                    </li>
                    <li className="list-disc ">
                        Respond to user inquiries/offer support to users.
                    </li>
                    <li className="list-disc ">Send administrative information to you.</li>
                    <li className="list-disc ">Fulfill and manage your orders.</li>
                    <li className="list-disc ">Enable user-to-user communications.</li>
                    <li className="list-disc ">Request feedback.</li>
                    <li className="list-disc ">Send marketing and promotional communications.</li>
                    <li className="list-disc ">Deliver targeted advertising to you.</li>
                    <li className="list-disc ">Post testimonials.</li>
                    <li className="list-disc ">
                        Determine the effectiveness of our marketing and promotional campaigns.
                    </li>
                    <li className="list-disc ">Comply with our legal obligations.</li>
                </ul>
                <p>For more information, see "WHAT ARE YOUR PRIVACY RIGHTS?" below.</p>
                <p>
                    You can opt out of our marketing emails at any time. To comply with our legal
                    obligations, we may process your information to respond to legal requests and
                    exercise, establish, or defend our legal rights.
                </p>
            </div>

            {/* #section 3 */}
            <div id="section3" className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                    3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </h2>
                {/* Add content for #section 3 */}
                <p>
                    We may share information in specific situations described in this section and/or
                    with the following third parties. We may need to share your personal information
                    in the following situations:
                </p>
                <ul className="list-disc ml-4">
                    <li>
                        <strong>Business Transfers:</strong> We may share or transfer your
                        information in connection with, or during negotiations of, any merger, sale
                        of company assets, financing, or acquisition of all or a portion of our
                        business to another company.
                    </li>
                    <li>
                        <strong>Google Maps Platform APIs:</strong> We may share your information
                        with certain Google Maps Platform APIs (e.g., Google Maps API, Places API).
                    </li>
                    <li>
                        <strong>Other Users:</strong> When you share personal information (for
                        example, by posting comments, contributions, or other content to the
                        Services) or otherwise interact with public areas of the Services, such
                        personal information may be viewed by all users and may be publicly made
                        available outside the Services in perpetuity. If you interact with other
                        users of our Services and register for our Services through a social network
                        (such as Facebook), your contacts on the social network will see your name,
                        profile photo, and descriptions of your activity. Similarly, other users
                        will be able to view descriptions of your activity, communicate with you
                        within our Services, and view your profile.
                    </li>
                </ul>
            </div>

            {/* #section 4 */}
            <div id="section4" className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                    4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </h2>
                {/* Add content for #section 4 */}
                <p>
                    We may use cookies and other tracking technologies to collect and store your
                    information. We may use cookies and similar tracking technologies (like web
                    beacons and pixels) to access or store information. Specific information about
                    how we use such technologies and how you can refuse certain cookies is set out
                    in our Cookie Notice.
                </p>
            </div>

            {/* #section 5 */}
            <div id="section5" className="mb-6">
                <h2 className="text-xl font-bold mb-4">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
                {/* Add content for #section 5 */}
                <p>
                    If you choose to register or log in to our Services using a social media
                    account, we may have access to certain information about you.
                </p>
                <p>
                    Our Services offer you the ability to register and log in using your third-party
                    social media account details (like your Facebook or Twitter logins). Where you
                    choose to do this, we will receive certain profile information about you from
                    your social media provider. The profile information we receive may vary
                    depending on the social media provider concerned, but will often include your
                    name, email address, friends list, and profile picture, as well as other
                    information you choose to make public on such a social media platform.
                </p>
                <p>
                    We will use the information we receive only for the purposes that are described
                    in this privacy notice or that are otherwise made clear to you on the relevant
                    Services. Please note that we do not control, and are not responsible for, other
                    uses of your personal information by your third-party social media provider. We
                    recommend that you review their privacy notice to understand how they collect,
                    use, and share your personal information, and how you can set your privacy
                    preferences on their sites and apps.
                </p>
            </div>

            {/* #section 6 */}
            <div id="section6" className="mb-6">
                <h2 className="text-xl font-bold mb-4">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                {/* Add content for #section 6 */}
                <p>
                    We keep your information for as long as necessary to fulfill the purposes
                    outlined in this privacy notice unless otherwise required by law.
                </p>
                <p>
                    We will only keep your personal information for as long as it is necessary for
                    the purposes set out in this privacy notice, unless a longer retention period is
                    required or permitted by law (such as tax, accounting, or other legal
                    requirements). No purpose in this notice will require us to keep your personal
                    information for longer than the period of time in which users have an account
                    with us.
                </p>
                <p>
                    When we have no ongoing legitimate business need to process your personal
                    information, we will either delete or anonymize such information. If deletion is
                    not possible (for example, because your personal information has been stored in
                    backup archives), then we will securely store your personal information and
                    isolate it from any further processing until deletion is possible.
                </p>
            </div>

            {/* #section 7 */}
            <div id="section7" className="mb-6">
                <h2 className="text-xl font-bold mb-4">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                {/* Add content for #section 7 */}
                <p>
                    We aim to protect your personal information through a system of organizational
                    and technical security measures.
                </p>
                <p>
                    We have implemented appropriate and reasonable technical and organizational
                    security measures designed to protect the security of any personal information
                    we process. However, despite our safeguards and efforts to secure your
                    information, no electronic transmission over the Internet or information storage
                    technology can be guaranteed to be 100% secure, so we cannot promise or
                    guarantee that hackers, cybercriminals, or other unauthorized third parties will
                    not be able to defeat our security and improperly collect, access, steal, or
                    modify your information.
                </p>
                <p>
                    Although we will do our best to protect your personal information, the
                    transmission of personal information to and from our Services is at your own
                    risk. You should only access the Services within a secure environment.
                </p>
            </div>

            {/* #section 8 */}
            <div id="section8" className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                    8. DO WE COLLECT INFORMATION FROM MINORS?
                </h2>
                {/* Add content for #section 8 */}
                <p>
                    We do not knowingly collect data from or market to children under 18 years of
                    age.
                </p>
                <p>
                    We do not knowingly solicit data from or market to children under 18 years of
                    age. By using the Services, you represent that you are at least 18 or that you
                    are the parent or guardian of such a minor and consent to such minor dependent’s
                    use of the Services. If we learn that personal information from users less than
                    18 years of age has been collected, we will deactivate the account and take
                    reasonable measures to promptly delete such data from our records. If you become
                    aware of any data we may have collected from children under age 18, please
                    contact us at info@eleli.co.ke.
                </p>
            </div>

            {/* #section 9 */}
            <div id="section9" className="mb-6">
                <h2 className="text-xl font-bold mb-4">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                {/* Add content for #section 9 */}
                <p> You may review, change, or terminate your account at any time.</p>
                <p>
                    <strong>Withdrawing your consent:</strong> If we are relying on your consent to
                    process your personal information, which may be express and/or implied consent
                    depending on the applicable law, you have the right to withdraw your consent at
                    any time. You can withdraw your consent by contacting us using the contact
                    details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
                    below. However, please note that this will not affect the lawfulness of the
                    processing before its withdrawal nor, when applicable law allows, will it affect
                    the processing of your personal information conducted in reliance on lawful
                    processing grounds other than consent.
                </p>
                <p>
                    <strong>Account Information:</strong> If you would at any time like to review or
                    change the information in your account or terminate your account, you can:
                </p>
                <ul className="list-disc ml-4">
                    <li className="list-disc ">
                        Log in to your account settings and update your user account.
                    </li>
                    <li className="list-disc ">
                        Contact us using the contact information provided.
                    </li>
                </ul>
                <p>
                    Upon your request to terminate your account, we will deactivate or delete your
                    account and information from our active databases. However, we may retain some
                    information in our files to prevent fraud, troubleshoot problems, assist with
                    any investigations, enforce our legal terms, and/or comply with applicable legal
                    requirements.
                </p>
                <p>
                    <strong>Cookies and similar technologies:</strong> Most Web browsers are set to
                    accept cookies by default. If you prefer, you can usually choose to set your
                    browser to remove cookies and to reject cookies. If you choose to remove cookies
                    or reject cookies, this could affect certain features or services of our
                    Services. If you have questions or comments about your privacy rights, you may
                    email us at info@eleli.co.ke.
                </p>
            </div>

            {/* #section 10 */}
            <div id="section10" className="mb-6">
                <h2 className="text-xl font-bold mb-4">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                {/* Add content for #section 10 */}
                <p>
                    Most web browsers and some mobile operating systems and mobile applications
                    include a Do-Not-Track ("DNT") feature or setting you can activate to signal
                    your privacy preference not to have data about your online browsing activities
                    monitored and collected.
                </p>
                <p>
                    At this stage, no uniform technology standard for recognizing and implementing
                    DNT signals has been finalized. As such, we do not currently respond to DNT
                    browser signals or any other mechanism that automatically communicates your
                    choice not to be tracked online. If a standard for online tracking is adopted
                    that we must follow in the future, we will inform you about that practice in a
                    revised version of this privacy notice.
                </p>
            </div>

            {/* #section 11 */}
            <div id="section11" className="mb-6">
                <h2 className="text-xl font-bold mb-4">11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                {/* Add content for #section 11 */}
                <p>
                    Yes, we will update this notice as necessary to stay compliant with relevant
                    laws.
                </p>
                <p>
                    We may update this privacy notice from time to time. The updated version will be
                    indicated by an updated "Revised" date, and the updated version will be
                    effective as soon as it is accessible. If we make material changes to this
                    privacy notice, we may notify you either by prominently posting a notice of such
                    changes or by directly sending you a notification. We encourage you to review
                    this privacy notice frequently to be informed of how we are protecting your
                    information.
                </p>
            </div>

            {/* #section 12 */}
            <div id="section12" className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                    12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </h2>
                <p>
                    If you have questions or comments about this notice, you may email us at
                    info@eleli.co.ke
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
