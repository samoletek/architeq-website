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
      <div className=&quot;$3