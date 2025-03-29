import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for §78 website. Learn about how we use cookies and similar technologies on our website.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Cookie Policy | §78',
    description: 'Cookie policy for §78 website. Learn about how we use cookies and similar technologies on our website.',
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
                Last Updated: March 1st, 2025
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">What Are Cookies</h2>
              <p className="text-light-gray mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="text-light-gray mb-4">
                Cookies help us provide you with a better website experience by enabling us to monitor which pages you find useful and which you do not. A cookie does not give us access to your computer or any information about you, other than the data you choose to share with us.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">How We Use Cookies</h2>
              <p className="text-light-gray mb-4">
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to the site. It is recommended that you leave all cookies if you are not sure whether you need them or not, in case they are used to provide a service that you use.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">The Cookies We Set</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Account Related Cookies</h3>
              <p className="text-light-gray mb-4">
                If you create an account with us, we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out, however in some cases they may remain afterward to remember your site preferences when logged out.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Login Related Cookies</h3>
              <p className="text-light-gray mb-4">
                We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Forms Related Cookies</h3>
              <p className="text-light-gray mb-4">
                When you submit data through a form such as those found on contact pages or comment forms, cookies may be set to remember your user details for future correspondence.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Site Preferences Cookies</h3>
              <p className="text-light-gray mb-4">
                In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Third-Party Cookies</h2>
              <p className="text-light-gray mb-4">
                In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Analytics Cookies</h3>
              <p className="text-light-gray mb-4">
                This site uses Google Analytics, which is one of the most widespread and trusted analytics solutions on the web, to help us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
              </p>
              <p className="text-light-gray mb-4">
                For more information on Google Analytics cookies, see the official Google Analytics page.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Marketing Cookies</h3>
              <p className="text-light-gray mb-4">
                We use marketing cookies to help us improve the relevancy of advertising campaigns you receive.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">More Information</h2>
              <p className="text-light-gray mb-4">
                Hopefully, the above has clarified things for you. As was previously mentioned, if there is something that you are not sure whether you need or not, it is usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
              </p>
              <p className="text-light-gray mb-4">
                However, if you are still looking for more information, then you can contact us through one of our preferred contact methods:
              </p>
              <ul className="list-disc pl-6 text-light-gray mb-4 space-y-2">
                <li>Email: privacy@78.com</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Disabling Cookies</h2>
              <p className="text-light-gray mb-4">
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Changes to This Cookie Policy</h2>
              <p className="text-light-gray mb-4">
                We keep our cookie policy under regular review and will place any updates on this web page. This cookie policy was last updated on March 15, 2025.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
              <p className="text-light-gray mb-4">
                If you have any questions about our cookie policy, please do not hesitate to contact us at privacy@78.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}