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
        {/* Hero section - нативная анимация без задержки */}
        <HeroSection />

        {/* 
          Benefits section - первая секция после Hero
          Используем улучшенный threshold и visibilityThreshold для запуска только
          когда секция достаточно видна на экране (30%)
        */}
        <SectionAnimation 
          direction="up" 
          threshold={0.3} 
          visibilityThreshold={0.3} 
          rootMargin="-10% 0px"
          delay={0.1} // Небольшая задержка для мягкого начала
          once={true}
        >
          <BenefitsSection />
        </SectionAnimation>

        {/* 
          Solutions section - секция с переключением решений
          Используем waitForPrevious для ожидания активации предыдущей секции
          и предотвращения одновременного срабатывания всех анимаций
        */}
        <SectionAnimation 
          direction="none" 
          delay={0.2} 
          threshold={0.3} 
          visibilityThreshold={0.3} 
          rootMargin="-10% 0px"
          waitForPrevious={true} // Ждем завершения анимации предыдущей секции
        >
          <SolutionsSection variant="homepage" />
        </SectionAnimation>
        
        {/* 
          Featured Case Studies - координируем с предыдущими секциями
          Увеличиваем задержку, чтобы избежать одновременного срабатывания с Solutions
        */}
        <SectionAnimation 
          direction="up" 
          threshold={0.3} 
          visibilityThreshold={0.3} 
          rootMargin="-10% 0px"
          delay={0.3} // Увеличенная задержка
          waitForPrevious={true} // Ждем завершения анимации предыдущей секции
        >
          <FeaturedCasesSection />
        </SectionAnimation>

        {/* 
          Testimonials section - отзывы клиентов
          Применяем стаггер-анимацию для плавного появления отзывов
        */}
        <SectionAnimation 
          direction="none" 
          threshold={0.3} 
          visibilityThreshold={0.3} 
          rootMargin="-10% 0px"
          delay={0.2}
          waitForPrevious={true} // Координация с предыдущими секциями
        >
          <TestimonialsSection variant="default" autoplay={true} autoplaySpeed={5000} />
        </SectionAnimation>
        
        {/* 
          CTA section - призыв к действию
          Используем scale-анимацию для привлечения внимания
          с более высоким threshold для гарантированной видимости
        */}
        <SectionAnimation 
          direction="scale" 
          threshold={0.4} // Повышенный порог для запуска только при хорошей видимости
          visibilityThreshold={0.4} 
          rootMargin="-10% 0px"
          delay={0.2}
          waitForPrevious={true} // Координация с предыдущими секциями
        >
          <CTASection />
        </SectionAnimation>
      </SiteLayout>
    </>
  )
}