import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for §78 website. Learn about the rules and guidelines for using our website and services.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | §78',
    description: 'Terms of service for §78 website. Learn about the rules and guidelines for using our website and services.',
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
      <div className=&quot;$3