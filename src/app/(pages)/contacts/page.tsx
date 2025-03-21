import SiteLayout from '@/components/layout/site-layout';
import ContactsContent from '@/components/pages/contacts-content';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our business automation experts. Contact §78 for a free consultation about CRM integration, AI solutions, document automation, and more.',
  keywords: ['contact us', 'business automation consultation', 'free consultation', 'automation services', 'book a call'],
  openGraph: {
    title: 'Contact Us | §78',
    description: 'Get in touch with our business automation experts. Contact §78 for a free consultation about CRM integration, AI solutions, document automation, and more.',
    url: `${siteMetadata.siteUrl}/contacts`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/contacts`,
  },
};

export default function ContactsPage() {
  return (
    <SiteLayout>
      <ContactsContent />
    </SiteLayout>
  );
}