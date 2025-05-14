import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Architeq website. Learn how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Architeq',
    description: 'Privacy policy for Architeq website. Learn how we collect, use, and protect your personal information.',
    url: `${siteMetadata.siteUrl}/privacy`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="bg-dark-gray border-b border-medium-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-light-gray">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Privacy Policy</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-light-gray">
                Last Updated: March 15, 2025
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">1. Introduction</h2>
              <p className="text-light-gray mb-4">
                Architeq (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website at architeq.io and use our business process automation services.
              </p>
              <p className="text-light-gray mb-4">
                This privacy policy applies to all information collected through our website, email communications, and other interactions with our services.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">2. Information We Collect</h2>
              <p className="text-light-gray mb-4">
                We collect information you provide directly to us through our contact form and other communications:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li><strong className="text-white">Contact Information:</strong> Name, email address, and any other information you choose to provide in your messages</li>
                <li><strong className="text-white">Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform</li>
                <li><strong className="text-white">Usage Data:</strong> Information about how you use our website, including pages visited and links clicked</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">3. How We Use Your Information</h2>
              <p className="text-light-gray mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To communicate with you about our services and projects</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-light-gray mb-4">
                We process your personal data under the following legal bases:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li><strong className="text-white">Consent:</strong> When you submit information through our contact form</li>
                <li><strong className="text-white">Contract:</strong> To perform services you have requested</li>
                <li><strong className="text-white">Legitimate Interests:</strong> To improve our services and communicate with potential clients</li>
                <li><strong className="text-white">Legal Obligations:</strong> To comply with applicable laws and regulations</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">5. Data Sharing</h2>
              <p className="text-light-gray mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>With service providers who assist us in operating our website and conducting our business</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a business transaction, such as a merger or acquisition</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">6. Data Security</h2>
              <p className="text-light-gray mb-4">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">7. Data Retention</h2>
              <p className="text-light-gray mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Contact form submissions are typically retained for the duration of our business relationship and a reasonable period thereafter.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">8. Your Rights</h2>
              <p className="text-light-gray mb-4">
                Under data protection laws, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-white">Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Erasure:</strong> Request deletion of your data</li>
                <li><strong className="text-white">Restriction:</strong> Request limitation of processing</li>
                <li><strong className="text-white">Portability:</strong> Request transfer of your data</li>
                <li><strong className="text-white">Object:</strong> Object to certain processing activities</li>
                <li><strong className="text-white">Withdraw consent:</strong> Where processing is based on consent</li>
              </ul>
              <p className="text-light-gray mb-4">
                To exercise any of these rights, please contact us at hi@architeq.io.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">9. International Data Transfers</h2>
              <p className="text-light-gray mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">10. Cookies</h2>
              <p className="text-light-gray mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. For detailed information about our use of cookies, please see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">11. Third-Party Links</h2>
              <p className="text-light-gray mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">12. Updates to This Policy</h2>
              <p className="text-light-gray mb-4">
                We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page and updating the &quot;Last Updated&quot; date.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">13. Contact Us</h2>
              <p className="text-light-gray mb-4">
                If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us at:
              </p>
              <p className="text-light-gray mb-4">
                Email: hi@architeq.io
              </p>
              <p className="text-light-gray mb-4">
                You have the right to lodge a complaint with a supervisory authority if you believe we have not handled your personal data in accordance with applicable data protection laws.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}