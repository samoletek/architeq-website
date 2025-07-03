// src/components/sections/benefits-section.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { IconName } from '@/components/ui/icons/icon';
import { cn } from '@/lib/utils/utils';
import { useScrollAnimation } from '@/lib/utils/animation';
import SimpleGlowCard from '@/components/ui/effects/simple-glow-card';
import TravelingBorderGlow from '@/components/ui/effects/traveling-border-glow';
import { useDeviceDetection } from '@/lib/utils/device-detection';

// Интерфейс для преимущества
export interface Benefit {
  title: string;
  description: string;
  icon: IconName;
}

// Интерфейс для параметров секции преимуществ
export interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
  className?: string;
  variant?: 'default' | 'alternate' | 'modern';
}

// Данные о преимуществах по умолчанию
const defaultBenefits: Benefit[] = [
  {
    title: 'Optimize Costs, Maximize Impact',
    description: 'Free up resources to drive what matters most. Cut costs by automating workflows and minimizing human error.',
    icon: 'finance',
  },
  {
    title: 'Save Time, \nAmplify Results',
    description: 'Automate manual operations and improve the way your teams work. Grow your business, not your admin load.',
    icon: 'clock',
  },
  {
    title: 'Innovate Without Limits',
    description: 'Scale operations with no proportional increase in admin headcount by crafting growth-ready automation.',
    icon: 'growth',
  },
  {
    title: 'Everything Fully in Sync',
    description: 'Unify fragmented tools, teams, and platforms into one seamless automation landscape — from APIs to operations.',
    icon: 'connection',
  },
];

// Основной компонент секции преимуществ
export default function BenefitsSection({
  title = "Why Architeq?",
  subtitle = "We automate existing processes and build new, complex workflows — helping businesses keep growing with no limits.",
  benefits = defaultBenefits,
  className,
  variant = 'default'
}: BenefitsSectionProps) {
  // Используем улучшенный хук для отслеживания скролла
  const { ref, isVisible, visibilityRatio } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true,
    visibilityThreshold: 0.3
  });
  
  // Device detection для адаптивных анимаций
  const { isMobile } = useDeviceDetection();
  
  // Состояние для управления анимациями
  const [isReady, setIsReady] = useState(false);
  const titleControls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Эффект для предотвращения анимации при первоначальной загрузке
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Эффект для координированного запуска анимаций
  useEffect(() => {
    if (isVisible && isReady && !hasAnimated && visibilityRatio >= 0.3) {
      titleControls.start("visible").then(() => {
        setHasAnimated(true);
      });
    }
  }, [isVisible, isReady, titleControls, hasAnimated, visibilityRatio]);

  // Определяем стили для разных вариантов
  const sectionClasses = cn(
    "section-benefits relative overflow-hidden pt-40 pb-48", 
    variant === 'default' ? 'bg-dark-gray' : 
    variant === 'modern' ? 'bg-gradient-to-br from-site-bg to-site-bg-deep' : 
    "bg-site-bg",
    className
  );

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6
      }
    }
  };

  // Адаптивные варианты анимаций
  const cardVariants = {
    hidden: isMobile ? 
      { opacity: 0, filter: 'blur(4px)', y: -8 } : // Простая анимация как в футере
      { opacity: 0, y: 30 }, // Оригинальная анимация для десктопа
    visible: (index: number) => ({
      opacity: 1,
      filter: isMobile ? 'blur(0px)' : undefined,
      y: 0,
      transition: {
        duration: isMobile ? 0.8 : 0.6,
        delay: isMobile ? 0.1 + index * 0.1 : 0.15 + index * 0.12
      }
    })
  };
  
  // Варианты анимации для заголовков карточек (footer-style)
  const cardTitleVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: (index: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const,
        delay: 0.3 + index * 0.15
      }
    })
  };

  // Варианты анимации для описания карточек (footer-style)
  const cardDescriptionVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: (index: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const,
        delay: 0.45 + index * 0.15
      }
    })
  };

  return (
    <section 
      ref={ref}
      className={sectionClasses}
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial="hidden"
          animate={titleControls}
          variants={titleVariants}
        >
          <h2 
            className="section-title-large font-bold section-title-spacing"
            style={{
              textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
            }}
          >
            {title}
          </h2>
          <p className="section-subtitle-large text-light-gray max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <SimpleGlowCard className="h-full">
                <div className="p-6 sm:p-8 h-full">
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 whitespace-pre-line text-white"
                    custom={index}
                    initial="hidden"
                    animate={hasAnimated ? "visible" : "hidden"}
                    variants={cardTitleVariants}
                  >
                    {benefit.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-light-gray text-sm sm:text-base md:text-lg font-sans"
                    custom={index}
                    initial="hidden"
                    animate={hasAnimated ? "visible" : "hidden"}
                    variants={cardDescriptionVariants}
                  >
                    {benefit.description}
                  </motion.p>
                </div>
              </SimpleGlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Специальный вариант секции с небольшими преимуществами
export function CompactBenefitsSection({
  title = "Key Advantages",
  benefits,
  className,
}: Omit<BenefitsSectionProps, 'variant' | 'subtitle'>) {
  return (
    <div className={cn("py-10", className)}>
      <h3 className="text-xl sm:text-2xl font-bold mb-6">{title}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <SimpleGlowCard 
            key={index}
            className="flex items-start"
          >
            <div className="p-4 w-full">
              <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">{benefit.title}</h4>
              <p className="text-light-gray text-xs sm:text-sm font-sans">{benefit.description}</p>
            </div>
          </SimpleGlowCard>
        ))}
      </div>
    </div>
  );
}

// Вариант с горизонтальным расположением преимуществ
export function HorizontalBenefits({
  benefits = defaultBenefits.slice(0, 3),
  className,
}: {
  benefits?: Benefit[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-6", className)}>
      {benefits.map((benefit, index) => (
        <TravelingBorderGlow key={index} variant="primary" intensity="subtle" className="flex-1 rounded-2xl group">
          <SimpleGlowCard 
            className="flex-1"
          >
            <div className="p-5 sm:p-6">
              <h4 className="text-lg sm:text-xl font-semibold mb-4 text-white hover:text-secondary transition-colors duration-300">
                {benefit.title}
              </h4>
              <p className="text-light-gray text-sm sm:text-base font-sans">{benefit.description}</p>
            </div>
          </SimpleGlowCard>
        </TravelingBorderGlow>
      ))}
    </div>
  );
}