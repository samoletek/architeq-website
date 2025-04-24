// src/app/page.tsx
import SiteLayout from '@/components/layout/site-layout'
import HeroSection from '@/components/sections/hero-section'
import BenefitsSection from '@/components/sections/benefits-section'
import FeaturedCasesSection from '@/components/sections/featured-cases-section'
import { SolutionsSection } from '@/components/sections/solutions-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import CTASection from '@/components/sections/cta-section'
import { generateMetadata } from '@/lib/seo/metadata';
import { OrganizationSchema } from '@/lib/seo/schema';

// Генерируем метаданные для главной страницы
export const metadata = generateMetadata({
  title: 'Architeq | Business Process Automation',
  description: 'Business process automation solutions for small and medium businesses. We specialize in CRM integration, document automation, and AI solutions to streamline your operations.',
  keywords: [
    'business automation', 
    'process automation', 
    'CRM integration', 
    'document automation', 
    'AI solutions', 
    'workflow optimization'
  ],
  path: '/',
});

export default function Home() {
  return (
    <>
      {/* Schema.org разметка для организации */}
      <OrganizationSchema
        name="Architeq"
        description="Business process automation solutions for small and medium businesses."
        url="https://architeq.io"
        foundingDate="2023"
        founders={["Andrii Serhiienko"]}
        address={{
          addressCountry: "United States"
        }}
        contactPoint={{
          email: "hi@architeq.io",
          contactType: "customer service"
        }}
      />
      
      <SiteLayout>
        {/* Hero section */}
        <HeroSection />
        
        {/* Benefits section */}
        <BenefitsSection />

        {/* Solutions section */}
        <SolutionsSection />
        
        {/* Featured Case Studies */}
        <FeaturedCasesSection />

        {/* Testimonials section */}
        <TestimonialsSection />
        
        {/* CTA section */}
        <CTASection />
      </SiteLayout>
    </>
  )
}