"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedContainer, AnimatedItem } from '@/components/ui/section-animation';
import { Icon, IconName } from '@/components/ui/icons/icon';
import { cn } from '@/lib/utils/utils';

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
    icon: 'chart',
  },
  {
    title: 'Save Time, Amplify Results',
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

// Компонент неоновой карточки преимуществ с 3D эффектами
function NeonBenefitCard({ title, description, icon, index }: Benefit & { index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Анимация "дыхания" для неонового свечения
  const breathingAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };
  
  return (
    <motion.div
      className="relative p-8 rounded-xl backdrop-blur-lg overflow-hidden transition-all duration-500 group"
      style={{
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
        backgroundImage: 'linear-gradient(170deg, rgba(46, 16, 100, 0.9) 0%, rgba(15, 0, 40, 1) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(119, 71, 207, 0.2)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
    >
      {/* Внутреннее содержимое */}
      <div className="relative z-10">
        <div className="rounded-full w-16 h-16 flex items-center justify-center mb-6 relative overflow-hidden bg-gray-800">
          {/* Иконка с цветами как на первом скриншоте */}
          <div className="relative z-10">
            <Icon name={icon} className="h-7 w-7 text-orange-500" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-light-gray leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

// Основной компонент секции преимуществ
export default function BenefitsSection({
  title = "Why Architeq?",
  subtitle = "We automate existing processes and build new, complex workflows — helping businesses keep growing with no limits.",
  benefits = defaultBenefits,
  className,
  variant = 'default'
}: BenefitsSectionProps) {
  // Определяем стили для разных вариантов
  const sectionClasses = cn(
    "py-20 relative overflow-hidden",
    variant === 'default' ? 'bg-dark-gray' : 
    variant === 'modern' ? 'bg-gradient-to-br from-site-bg to-site-bg-deep' : 
    "bg-site-bg",
    className
  );

  // Современный вариант с анимированными свечениями и 3D эффектами
  if (variant === 'modern') {
    return (
      <section className={sectionClasses}>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedContainer className="text-center mb-16">
            <AnimatedItem>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            </AnimatedItem>
            
            <AnimatedItem>
              <p className="text-light-gray max-w-3xl mx-auto">
                {subtitle}
              </p>
            </AnimatedItem>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {benefits.map((benefit, index) => (
              <NeonBenefitCard 
                key={index}
                title={benefit.title} 
                description={benefit.description}
                icon={benefit.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Оригинальное отображение для вариантов default и alternate
  return (
    <section className={sectionClasses}>
      <div className="container mx-auto px-4">
        <AnimatedContainer className="text-center mb-12">
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-light-gray max-w-2xl mx-auto">
              {subtitle}
            </p>
          </AnimatedItem>
        </AnimatedContainer>

        <AnimatedContainer staggerTime={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <AnimatedItem key={index}>
              <div className="bg-dark-purple/40 backdrop-blur-sm rounded-lg p-6 h-full border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="rounded-full w-12 h-12 bg-primary/10 text-white flex items-center justify-center mb-4">
                  <Icon name={benefit.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-light-gray">{benefit.description}</p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
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
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <div 
            key={index}
            className="bg-dark-gray/70 backdrop-blur-sm rounded-lg p-4 flex items-start hover:bg-dark-purple/40 transition-all duration-300 border border-transparent hover:border-primary/20"
          >
            <div className="rounded-full w-10 h-10 bg-primary/10 text-secondary flex items-center justify-center flex-shrink-0 mr-3">
              <Icon name={benefit.icon} className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{benefit.title}</h4>
              <p className="text-light-gray text-sm">{benefit.description}</p>
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
          className="flex-1 bg-dark-purple/30 backdrop-blur-sm rounded-lg p-6 hover:bg-dark-purple/50 transition-all duration-300 border border-primary/10 hover:border-primary/30 group"
        >
          <div className="rounded-full w-12 h-12 bg-primary/10 text-secondary group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
            <Icon name={benefit.icon} className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors duration-300">{benefit.title}</h4>
          <p className="text-light-gray">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}