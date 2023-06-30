import PageWrapper from '@/components/PageWrapper/PageWrapper'
import React from 'react'

export default function Privacy() {
    return (
        <PageWrapper>
            <h1 className="text-4xl font-semibold py-5">Privacy Policy</h1>

            <div className="flex flex-col gap-10">
                <p>
                    This Privacy Policy describes how we collect, use, and disclose your personal information when you
                    visit our website or use our services. It also explains your rights regarding the personal
                    information we hold about you.
                </p>

                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">1. Information We Collect</h1>
                    <p>
                        a. Personal Information: We may collect personal information that you voluntarily provide to us
                        when you interact with our website or services. This may include your name, email address,
                        contact information, and any other information you choose to provide.
                    </p>
                    <p>
                        b. Cookies and Similar Technologies: We collect information through cookies and similar
                        technologies as described in our Cookies Policy. This includes information about your device, IP
                        address, browser type, and browsing behavior.
                    </p>
                </span>

                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">2. Use of Information</h1>
                    <p>We use the collected information for the following purposes:</p>
                    <p>
                        a. To provide and improve our services, including customizing content and personalizing your
                        experience.
                    </p>
                    <p>b. To communicate with you, respond to inquiries, and provide customer support.</p>
                    <p>c. To analyze website usage and trends, conduct research, and gather demographic information.</p>
                    <p>
                        d. To send you promotional materials, newsletters, and updates about our products and services
                        with your consent (where required by law).
                    </p>
                    <p>
                        e. To protect our rights, property, and safety, as well as the rights, property, and safety of
                        our users and others.
                    </p>
                </span>

                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">3. Disclosure of Information</h1>
                    <p>We may share your personal information with the following parties:</p>
                    <p>
                        a. Service Providers: We may engage third-party service providers who assist us in operating our
                        website and providing our services. These service providers have access to your personal
                        information only to perform tasks on our behalf and are obligated to keep it confidential.
                    </p>
                    <p>
                        b. Legal Requirements: We may disclose your personal information if required to do so by law or
                        in response to a valid legal request, such as a court order or government investigation.
                    </p>
                    <p>
                        c. Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our
                        assets, your personal information may be transferred as part of the transaction.
                    </p>
                    <p>
                        d. Consent: We may share your personal information with your consent or as otherwise disclosed
                        at the time of collection.
                    </p>
                </span>

                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">4. Data Security</h1>
                    <p>
                        We take reasonable measures to protect your personal information from unauthorized access,
                        disclosure, alteration, or destruction. However, no data transmission over the internet or
                        electronic storage method is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">5. Your Rights</h1>
                    <p>
                        You have certain rights regarding your personal information, subject to applicable laws. These
                        rights may include the right to access, update, or delete your personal information, as well as
                        the right to restrict or object to certain processing activities. To exercise your rights,
                        please contact us using the information provided below.
                    </p>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">6. Children&apos;s Privacy</h1>
                    <p>
                        Our website and services are not directed to individuals under the age of 13. We do not
                        knowingly collect personal information from children. If you believe we have inadvertently
                        collected personal information from a child, please contact us, and we will take steps to delete
                        the information.
                    </p>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">7. Third-Party Links</h1>
                    <p>
                        Our website may contain links to third-party websites. We are not responsible for the privacy
                        practices or content of such websites. We encourage you to review the privacy policies of those
                        websites before providing any personal information.
                    </p>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">8. Updates to this Policy</h1>
                    <p>
                        We may update this Privacy Policy periodically to reflect changes in our practices or applicable
                        laws. The updated version will be posted on our website with the revised date.
                    </p>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">9. Contact Us</h1>
                    <p>
                        If you have any questions or concerns about our Privacy Policy or the use of your personal
                        information, please contact us at blog@clewup.co.uk.
                    </p>
                </span>

                <p>
                    Please note that this Privacy Policy should be read in conjunction with our Cookies Policy, which
                    outlines how we use cookies and similar technologies on our website.
                </p>
            </div>
        </PageWrapper>
    )
}
