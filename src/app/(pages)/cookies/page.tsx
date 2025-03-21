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
      <div className=&quot;$3