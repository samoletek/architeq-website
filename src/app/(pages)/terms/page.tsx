import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Architeq website. Learn about the rules and guidelines for using our website and services.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | Architeq',
    description: 'Terms of service for Architeq website. Learn about the rules and guidelines for using our website and services.',
    url: `${siteMetadata.siteUrl}/terms`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="bg-dark-gray border-b border-medium-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-light-gray">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Terms of Service</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-light-gray mb-6">
                Last Updated: March 15, 2025
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">1. Introduction</h2>
              <p className="text-light-gray mb-4">
                Welcome to Architeq (&quot;Service Provider&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our website located at architeq.io (the &quot;Service&quot;) and the business process automation services we provide.
              </p>
              <p className="text-light-gray mb-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service or use our services.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">2. Services</h2>
              <p className="text-light-gray mb-4">
                Architeq provides business process automation services including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Workflow Design & Automation</li>
                <li>CRM Integration</li>
                <li>Industry-Specific Boxed Solutions</li>
                <li>AI-Powered Solutions</li>
                <li>Automated Document Flow</li>
                <li>Finance Operations Automations</li>
              </ul>
              <p className="text-light-gray mb-4">
                Our services are billed on an hourly basis. Specific terms for each project will be outlined in separate agreements between the Service Provider and the Client.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">3. Communication</h2>
              <p className="text-light-gray mb-4">
                By using our Service, you agree to receive communications from us through the email address you provide. You may opt out of non-essential communications at any time by following the unsubscribe instructions in our emails.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">4. Payment Terms</h2>
              <p className="text-light-gray mb-4">
                For services rendered, payment is accepted through the following methods:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Direct bank transfers</li>
                <li>PayPal</li>
                <li>Cryptocurrency</li>
                <li>Upwork</li>
                <li>Bill.com</li>
                <li>OysterHR</li>
              </ul>
              <p className="text-light-gray mb-4">
                Payment terms, including rates and timelines, will be specified in individual project agreements. All payments are directed to the Service Provider as an individual or as specified in the payment agreement.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">5. Intellectual Property</h2>
              <p className="text-light-gray mb-4">
                All content on the architeq.io website, including text, graphics, logos, images, and software, is the property of Architeq and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from our website without our prior written consent obtained through hi@architeq.io.
              </p>
              <p className="text-light-gray mb-4">
                Work products created specifically for clients during the course of our services will be governed by individual project agreements.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">6. User Content</h2>
              <p className="text-light-gray mb-4">
                When you submit content through our contact forms or other communication channels, you grant us the right to use this information to provide our services and communicate with you. You represent and warrant that any content you provide is accurate and does not violate any laws or third-party rights.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">7. Confidentiality</h2>
              <p className="text-light-gray mb-4">
                Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of our business relationship. This obligation survives the termination of these Terms.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">8. Limitation of Liability</h2>
              <p className="text-light-gray mb-4">
                To the maximum extent permitted by law, Architeq shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
              </p>
              <p className="text-light-gray mb-4">
                Our total liability for any claim arising out of or relating to these Terms or our services shall not exceed the amount paid by you for the specific service that gave rise to the claim.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">9. Disclaimer</h2>
              <p className="text-light-gray mb-4">
                Our services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties, whether express or implied, regarding the suitability of our services for your particular purpose. We do not guarantee that our services will be uninterrupted, timely, secure, or error-free.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">10. Indemnification</h2>
              <p className="text-light-gray mb-4">
                You agree to indemnify and hold harmless Architeq from any claims, damages, losses, or expenses (including attorney&apos;s fees) arising from your use of our services or violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">11. Termination</h2>
              <p className="text-light-gray mb-4">
                Either party may terminate these Terms at any time with written notice. Upon termination, any outstanding obligations, including payment for services rendered, shall remain in effect.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">12. Governing Law</h2>
              <p className="text-light-gray mb-4">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or our services shall be resolved through the courts of London, England.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">13. Changes to Terms</h2>
              <p className="text-light-gray mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the &quot;Last Updated&quot; date. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">14. Entire Agreement</h2>
              <p className="text-light-gray mb-4">
                These Terms constitute the entire agreement between you and Architeq regarding the use of our website and services, superseding any prior agreements between us.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">15. Contact Information</h2>
              <p className="text-light-gray mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-6">
                <li>Email: hi@architeq.io</li>
                <li>Website: <Link href="/contacts" className="text-primary hover:underline">Contact Form</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}