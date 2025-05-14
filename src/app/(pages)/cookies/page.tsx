import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for Architeq website. Learn about how we use cookies and similar technologies on our website.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Cookie Policy | Architeq',
    description: 'Cookie policy for Architeq website. Learn about how we use cookies and similar technologies on our website.',
    url: `${siteMetadata.siteUrl}/cookies`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/cookies`,
  },
};

export default function CookiesPage() {
  return (
    <SiteLayout>
      <div className="bg-dark-gray border-b border-medium-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-light-gray">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cookie Policy</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-light-gray">
                Last Updated: March 15, 2025
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">1. Introduction</h2>
              <p className="text-light-gray mb-4">
                This Cookie Policy explains how Architeq (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar tracking technologies on our website architeq.io. By using our website, you consent to our use of cookies in accordance with this policy.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">2. What Are Cookies</h2>
              <p className="text-light-gray mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They help websites function properly, improve user experience, and provide information to website owners about how their site is being used.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">3. How We Use Cookies</h2>
              <p className="text-light-gray mb-4">
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Improve website performance and user experience</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Remember your preferences and settings</li>
                <li>Provide relevant content and features</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">4. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Essential Cookies</h3>
              <p className="text-light-gray mb-4">
                These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas of the website. The website cannot function without these cookies.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Functionality Cookies</h3>
              <p className="text-light-gray mb-4">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Analytical/Performance Cookies</h3>
              <p className="text-light-gray mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. Currently, we use Google Analytics for this purpose. These cookies help us understand which pages are the most and least popular and see how visitors move around the site.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Marketing Cookies (Future Implementation)</h3>
              <p className="text-light-gray mb-4">
                While we do not currently use marketing cookies, we may implement them in the future to deliver more relevant advertising and track the effectiveness of our marketing campaigns. We will update this policy and obtain appropriate consent before implementing such cookies.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">5. Third-Party Cookies</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Google Analytics</h3>
              <p className="text-light-gray mb-4">
                We use Google Analytics to help us understand how visitors use our website. Google Analytics uses cookies to collect information about:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Number of visitors to our website</li>
                <li>Pages visited and time spent on each page</li>
                <li>How visitors arrived at our website</li>
                <li>General geographic location of visitors</li>
              </ul>
              <p className="text-light-gray mb-4">
                This information is aggregated and anonymous. For more information about Google Analytics cookies, please visit the <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">official Google Analytics page</a>.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">6. Future Cookie Implementation</h2>
              <p className="text-light-gray mb-4">
                We plan to implement additional cookies and tracking technologies in the future, which may include:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Marketing and advertising cookies</li>
                <li>Social media tracking pixels</li>
                <li>Additional analytics tools</li>
              </ul>
              <p className="text-light-gray mb-4">
                When we implement these technologies, we will update this Cookie Policy and ensure we obtain appropriate consent where required by law.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">7. Managing Cookies</h2>
              <p className="text-light-gray mb-4">
                You can control and manage cookies in various ways:
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Browser Settings</h3>
              <p className="text-light-gray mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically find these controls in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. You can set your browser to:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Block all cookies</li>
                <li>Block only third-party cookies</li>
                <li>Clear cookies when you close your browser</li>
                <li>Accept cookies from specific websites only</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Google Analytics Opt-out</h3>
              <p className="text-light-gray mb-4">
                You can prevent Google Analytics from recognizing you on return visits by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">8. Impact of Disabling Cookies</h2>
              <p className="text-light-gray mb-4">
                Please note that disabling cookies may impact your experience on our website. Some features may not function properly, and you may not be able to access certain areas or features of the site.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">9. Changes to This Cookie Policy</h2>
              <p className="text-light-gray mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post any changes on this page and update the &quot;Last Updated&quot; date at the top of this policy.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">10. Contact Us</h2>
              <p className="text-light-gray mb-4">
                If you have any questions about our Cookie Policy or how we use cookies, please contact us at:
              </p>
              <p className="text-light-gray mb-4">
                Email: hi@architeq.io
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">11. More Information About Cookies</h2>
              <p className="text-light-gray mb-4">
                For more general information about cookies, including how to manage and delete them, visit:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.allaboutcookies.org</a></li>
                <li><a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.youronlinechoices.eu</a> (EU)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}