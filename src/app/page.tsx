import SiteLayout from '@/components/layout/site-layout'
import HeroSection from '@/components/sections/hero-section'
import BenefitsSection from '@/components/sections/benefits-section'
import FeaturedCasesSection from '@/components/sections/featured-cases-section'
import SolutionsSection from '@/components/sections/solutions-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import CTASection from '@/components/sections/cta-section'

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