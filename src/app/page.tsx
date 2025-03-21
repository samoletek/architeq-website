import SiteLayout from '@/components/layout/site-layout'
import HeroSection from '@/components/sections/hero-section'
import BenefitsSection from '@/components/sections/benefits-section'
import FeaturedCasesSection from '@/components/sections/featured-cases-section'
import SolutionsSection from '@/components/sections/solutions-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import CTASection from '@/components/sections/cta-section'
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export default function Home() {
  return (
    <SiteLayout>
      {/* Hero section */}
      <HeroSection />
      
      {/* Benefits section */}
      <BenefitsSection />
      
      {/* Featured Case Studies */}
      <FeaturedCasesSection />
      
      {/* Solutions section */}
      <SolutionsSection />
      
      {/* Testimonials section */}
      <TestimonialsSection />
      
      {/* CTA section */}
      <CTASection />
    </SiteLayout>
  )
}

export const metadata: Metadata = {
  title: siteMetadata.defaultTitle,
  description: siteMetadata.defaultDescription,
  keywords: siteMetadata.defaultKeywords,
  openGraph: {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
    images: [
      {
        url: siteMetadata.defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    images: [siteMetadata.defaultOgImage],
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
};