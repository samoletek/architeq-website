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
  title: '§78 | Business Process Automation',
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
        name="§78"
        description="Business process automation solutions for small and medium businesses."
        url="https://78.com"
        foundingDate="2020"
        founders={["Andrii Serhiienko"]}
        address={{
          addressCountry: "United States"
        }}
        contactPoint={{
          email: "info@78.com",
          contactType: "customer service"
        }}
      />
      
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
    </>
  )
}