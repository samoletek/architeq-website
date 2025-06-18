import SiteLayout from '@/components/layout/site-layout';
import AboutContent from '@/components/pages/about-content';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'About Us | Architeq',
  description: 'Learn about Architeq, our history, team, methodology, and technology stack. We help businesses streamline operations through intelligent automation solutions.',
  keywords: ['about us', 'company history', 'automation team', 'methodology', 'technology stack', 'business automation'],
  openGraph: {
    title: 'About Us | Architeq',
    description: 'Learn about Architeq, our history, team, methodology, and technology stack. We help businesses streamline operations through intelligent automation solutions.',
    url: `${siteMetadata.siteUrl}/about`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Architeq',
    description: 'Learn about Architeq, our history, team, methodology, and technology stack.',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <AboutContent />
    </SiteLayout>
  );
}