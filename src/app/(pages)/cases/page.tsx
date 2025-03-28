import SiteLayout from '@/components/layout/site-layout';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our successful business automation case studies across various industries. See real results of our CRM integration, AI solutions, and document automation.',
  keywords: ['case studies', 'business automation examples', 'success stories', 'automation results', 'automation projects'],
  openGraph: {
    title: 'Case Studies | §78',
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
      <div className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-light-gray mb-6">
              Explore how we have helped companies across various industries optimize their processes and achieve significant results.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}