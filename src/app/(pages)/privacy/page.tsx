import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for §78 website. Learn how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | §78',
    description: 'Privacy policy for §78 website. Learn how we collect, use, and protect your personal information.',
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
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Introduction</h2>
              <p className="text-light-gray mb-4">
                §78 ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="text-light-gray mb-4">
                This privacy policy applies to all personal data we collect through our website at §78.com, as well as any associated services, sales, marketing, or events.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">The Data We Collect</h2>
              <p className="text-light-gray mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>
                  <strong className="text-white">Identity Data</strong> includes first name, last name, username or similar identifier, title.
                </li>
                <li>
                  <strong className="text-white">Contact Data</strong> includes email address, telephone numbers, and address.
                </li>
                <li>
                  <strong className="text-white">Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.
                </li>
                <li>
                  <strong className="text-white">Usage Data</strong> includes information about how you use our website and services.
                </li>
                <li>
                  <strong className="text-white">Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">How We Collect Your Data</h2>
              <p className="text-light-gray mb-4">
                We use different methods to collect data from and about you including through:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>
                  <strong className="text-white">Direct interactions.</strong> You may give us your Identity and Contact Data by filling in forms or by corresponding with us by post, phone, email or otherwise.
                </li>
                <li>
                  <strong className="text-white">Automated technologies or interactions.</strong> As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions and patterns.
                </li>
                <li>
                  <strong className="text-white">Third parties or publicly available sources.</strong> We may receive personal data about you from various third parties as set out below:
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Technical Data from analytics providers such as Google Analytics;</li>
                    <li>Contact, Financial and Transaction Data from providers of technical, payment and delivery services.</li>
                  </ul>
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">How We Use Your Data</h2>
              <p className="text-light-gray mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
              <p className="text-light-gray mb-4">
                Generally, we do not rely on consent as a legal basis for processing your personal data although we will get your consent before sending third party direct marketing communications to you via email or text message. You have the right to withdraw consent to marketing at any time by contacting us.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Data Security</h2>
              <p className="text-light-gray mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
              </p>
              <p className="text-light-gray mb-4">
                We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Your Legal Rights</h2>
              <p className="text-light-gray mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
              <p className="text-light-gray mb-4">
                If you wish to exercise any of the rights set out above, please contact us.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Third-Party Links</h2>
              <p className="text-light-gray mb-4">
                This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Cookies</h2>
              <p className="text-light-gray mb-4">
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. For more information about the cookies we use, please see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Changes to the Privacy Policy</h2>
              <p className="text-light-gray mb-4">
                We keep our privacy policy under regular review and will place any updates on this web page. This privacy policy was last updated on March 15, 2025.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
              <p className="text-light-gray mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="text-light-gray mb-4">
                Email: privacy@78.com
              </p>
              <p className="text-light-gray">
                You have the right to make a complaint at any time to the supervisory authority for data protection issues in your country. We would, however, appreciate the chance to deal with your concerns before you approach the supervisory authority so please contact us in the first instance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}