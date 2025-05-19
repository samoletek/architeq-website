// src/app/page.tsx
import StickyScrollContainer from '@/components/ui/sticky-scroll-container';
import StickySection from '@/components/ui/sticky-section';
import SectionBackground from '@/components/ui/section-background';
import HeroSection from '@/components/sections/hero-section';
import BenefitsSection from '@/components/sections/benefits-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import FeaturedCasesSection from '@/components/sections/featured-cases-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import CTASection from '@/components/sections/cta-section';
import { generateMetadata } from '@/lib/seo/metadata';
import { OrganizationSchema } from '@/lib/seo/schema';
import SiteLayout from '@/components/layout/site-layout';

// Массив градиентов для фонов секций
const sectionBackgrounds = [
  'linear-gradient(135deg, #121212 0%, #180033 100%)', // Hero
  'linear-gradient(135deg, #0F0F1E 0%, #1A0033 100%)', // Benefits
  'linear-gradient(135deg, #120D21 0%, #221133 100%)', // Solutions
  'linear-gradient(135deg, #0E0E1A 0%, #1C0029 100%)', // Cases
  'linear-gradient(135deg, #100F22 0%, #1A0C2E 100%)', // Testimonials
  'linear-gradient(135deg, #0F0F1A 0%, #130D23 100%)'  // CTA
];

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
        {/* Фоновый компонент для плавных переходов */}
        <SectionBackground colors={sectionBackgrounds} activeSection={0} />
        
        {/* Контейнер с эффектом sticky для всех секций */}
        <StickyScrollContainer>
          {/* Hero section */}
          <StickySection sectionHeight="120vh">
            <div className="container mx-auto px-4">
              <HeroSection />
            </div>
          </StickySection>

          {/* Benefits section */}
          <StickySection sectionHeight="120vh">
            <div className="container mx-auto px-4">
              <BenefitsSection />
            </div>
          </StickySection>

          {/* Solutions section */}
          <StickySection sectionHeight="140vh">
            <div className="container mx-auto px-4">
              <SolutionsSection />
            </div>
          </StickySection>
          
          {/* Featured Case Studies */}
          <StickySection sectionHeight="120vh">
            <div className="container mx-auto px-4">
              <FeaturedCasesSection />
            </div>
          </StickySection>

          {/* Testimonials section */}
          <StickySection sectionHeight="110vh">
            <div className="container mx-auto px-4">
              <TestimonialsSection />
            </div>
          </StickySection>
          
          {/* CTA section */}
          <StickySection sectionHeight="100vh">
            <div className="container mx-auto px-4">
              <CTASection />
            </div>
          </StickySection>
        </StickyScrollContainer>
      </SiteLayout>
    </>
  )
}