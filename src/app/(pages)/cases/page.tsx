import SiteLayout from '@/components/layout/site-layout';
import CasesContent from '@/components/pages/cases-content';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our successful business automation case studies across various industries. See real results of our CRM integration, AI solutions, and document automation.',
  keywords: ['case studies', 'business automation examples', 'success stories', 'automation results', 'automation projects'],
  openGraph: {
    title: 'Case Studies | Architeq',
    description: 'Explore our successful business automation case studies across various industries. See real results of our CRM integration, AI solutions, and document automation.',
    url: `${siteMetadata.siteUrl}/cases`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/cases`,
  },
};

export default function CasesPage() {
  return (
    <SiteLayout>
      <CasesContent />
    </SiteLayout>
  );
}