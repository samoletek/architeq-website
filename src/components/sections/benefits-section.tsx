// src/components/sections/benefits-section.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Icon, IconName } from '@/components/ui/icons/icon';
import { cn } from '@/lib/utils/utils';
import { useScrollAnimation } from '@/lib/utils/animation';

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
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.15 + index * 0.12
      }
    })
  };

  // Варианты анимации для заголовков карточек (слева направо)
  const cardTitleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.3 + index * 0.15
      }
    })
  };

  // Варианты анимации для описания карточек (слева направо)
  const cardDescriptionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
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
          <h2 className="font-bold mb-4 sm:mb-6 md:mb-8">{title}</h2>
          <p className="text-light-gray text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
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
              <div className="relative rounded-lg p-6 sm:p-8 h-full transition-all duration-500 overflow-hidden
                bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)]
                before:absolute before:content-[''] before:inset-0 
                before:bg-[radial-gradient(circle_at_50%_50%,_rgba(119,71,207,0.05)_0%,_transparent_70%)] 
                backdrop-blur-sm group
                border border-primary/20 shadow-[0_0_15px_rgba(119,71,207,0.2)]
                hover:shadow-[0_0_30px_rgba(119,71,207,0.5)] 
                hover:border-primary/40">
                
                {/* Эффект свечения для активного элемента */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg -z-10"
                  animate={{ 
                    opacity: [0.5, 0.7, 0.5], 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Анимированное свечение */}
                <motion.div 
                  className="absolute -inset-6 bg-gradient-to-br from-[#1F0A2E]/30 via-[#180033]/25 to-[#121212]/40 rounded-lg blur-lg -z-10"
                  animate={{ 
                    opacity: [0.6, 0.9, 0.6] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />

                {/* Свечение при наведении */}
                <motion.div 
                  className="absolute -inset-6 bg-gradient-to-br from-[#1F0A2E]/0 via-[#180033]/0 to-[#121212]/0 rounded-lg blur-3xl -z-10 opacity-0 group-hover:opacity-100"
                  whileHover={{
                    opacity: 1,
                    background: "radial-gradient(circle, rgba(31,10,46,0.6) 0%, rgba(24,0,51,0.4) 50%, rgba(18,7,26,0.3) 100%)",
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10">
                  <div className="text-white mb-4">
                    <Icon name={benefit.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 whitespace-pre-line"
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
              </div>
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
          <div 
            key={index}
            className="relative rounded-lg p-4 flex items-start transition-all duration-300 overflow-hidden group
                      bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)]
                      border border-transparent hover:border-primary/20"
          >
            {/* Компактное свечение для маленьких карточек */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#1F0A2E]/25 via-[#180033]/20 to-[#121212]/30 rounded-lg blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 flex items-start w-full">
              <div className="text-secondary flex-shrink-0 mr-3">
                <Icon name={benefit.icon} className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-1">{benefit.title}</h4>
                <p className="text-light-gray text-xs sm:text-sm font-sans">{benefit.description}</p>
              </div>
            </div>
          </div>
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
        <div 
          key={index}
          className="relative flex-1 rounded-lg p-5 sm:p-6 transition-all duration-300 overflow-hidden group
                    bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)]
                    border border-primary/10 hover:border-primary/30"
        >
          {/* Горизонтальное свечение */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#1F0A2E]/30 via-[#180033]/25 to-[#121212]/35 rounded-lg blur-md -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <div className="text-secondary group-hover:text-white transition-colors duration-300 mb-4">
              <Icon name={benefit.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-secondary transition-colors duration-300">
              {benefit.title}
            </h4>
            <p className="text-light-gray text-sm sm:text-base font-sans">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}