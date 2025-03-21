import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-light-gray mb-6">
              Last updated: March 1, 2025
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="text-light-gray mb-4">
              Welcome to §78 ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at <span className="text-white">example.com</span> (the "Service") operated by §78.
            </p>
            <p className="text-light-gray mb-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Communications</h2>
            <p className="text-light-gray mb-4">
              By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Purchases</h2>
            <p className="text-light-gray mb-4">
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
            </p>
            <p className="text-light-gray mb-4">
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Content</h2>
            <p className="text-light-gray mb-4">
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
            </p>
            <p className="text-light-gray mb-4">
              By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
            <p className="text-light-gray mb-4">
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of §78 and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Country] and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of §78.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Links To Other Web Sites</h2>
            <p className="text-light-gray mb-4">
              Our Service may contain links to third party web sites or services that are not owned or controlled by §78.
            </p>
            <p className="text-light-gray mb-4">
              §78 has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p className="text-light-gray mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            <p className="text-light-gray mb-4">
              If you wish to terminate your account, you may simply discontinue using the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation Of Liability</h2>
            <p className="text-light-gray mb-4">
              In no event shall §78, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Disclaimer</h2>
            <p className="text-light-gray mb-4">
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Governing Law</h2>
            <p className="text-light-gray mb-4">
              These Terms shall be governed and construed in accordance with the laws of [Country], without regard to its conflict of law provisions.
            </p>
            <p className="text-light-gray mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">11. Changes to Terms of Service</h2>
            <p className="text-light-gray mb-4">
              We reserve the right to modify these terms of service at any time, so please review them frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h2>
            <p className="text-light-gray mb-6">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="text-light-gray mb-6 list-disc pl-6">
              <li>By email: <span className="text-white">info@example.com</span></li>
              <li>By visiting the contact page on our website: <Link href="/contacts" className="text-primary hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}