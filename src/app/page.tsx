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
import { SectionAnimation } from '@/components/ui/section-animation';

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
        description="Architect your workflow. Scale with confidence"
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
        {/* Hero section - нативная анимация */}
        <HeroSection />

        {/* Benefits section с плавной анимацией */}
        <SectionAnimation direction="up" threshold={0.15} rootMargin="-50px 0px">
          <BenefitsSection />
        </SectionAnimation>

        {/* Solutions section */}
        <SectionAnimation direction="none" delay={0.2} threshold={0.15} rootMargin="-50px 0px">
          <SolutionsSection />
        </SectionAnimation>
        
        {/* Featured Case Studies */}
        <SectionAnimation direction="up" threshold={0.15} rootMargin="-50px 0px">
          <FeaturedCasesSection />
        </SectionAnimation>

        {/* Testimonials section */}
        <SectionAnimation direction="none" threshold={0.15} rootMargin="-50px 0px">
          <TestimonialsSection />
        </SectionAnimation>
        
        {/* CTA section */}
        <SectionAnimation direction="scale" threshold={0.15} rootMargin="-50px 0px">
          <CTASection />
        </SectionAnimation>
      </SiteLayout>
    </>
  )
}