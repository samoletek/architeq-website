// src/components/sections/benefits-section.tsx
"use client";

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
    icon: 'finance',
  },
  {
    title: 'Save Time, \nAmplify Results',  // 2. Перенос на вторую строку слова Amplify
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
  // Определяем стили для разных вариантов
  const sectionClasses = cn(
    // 6. Увеличиваем отступ сверху для расстояния между Hero и Benefits в 1.5 раза
    "pt-32 pb-28 relative overflow-hidden", // изменено с pt-28 на pt-42 (28 * 1.5 = 42)
    variant === 'default' ? 'bg-dark-gray' : 
    variant === 'modern' ? 'bg-gradient-to-br from-site-bg to-site-bg-deep' : 
    "bg-site-bg",
    className
  );


  // Оригинальное отображение для вариантов default и alternate
  return (
    <section className={sectionClasses}>
      <div className="container mx-auto px-4">
        <AnimatedContainer className="text-center mb-20"> {/* 4. Увеличено расстояние с mb-16 до mb-20 */}
          <AnimatedItem>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">{title}</h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-light-gray text-base md:text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          </AnimatedItem>
        </AnimatedContainer>

        <AnimatedContainer staggerTime={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <AnimatedItem key={index}>
              {/* 1. Увеличиваем свечение границ карточек, 3. Увеличиваем размер карточки */}
              <div className="bg-dark-purple/40 backdrop-blur-sm rounded-lg p-8 h-full 
                           border border-primary/20 
                           shadow-[0_0_15px_rgba(119,71,207,0.2)] 
                           hover:shadow-[0_0_30px_rgba(119,71,207,0.5)] 
                           hover:border-primary/40 
                           transition-all duration-300">
                {/* 5. Убираем фон и форму у иконок */}
                <div className="text-white mb-4">
                  <Icon name={benefit.icon} className="h-6 w-6 transform transition-transform duration-300 group-hover:rotate-12" />
                </div>
                {/* Сохраняем размер заголовка */}
                <h3 className="text-xl md:text-2xl font-semibold mb-8 whitespace-pre-line">{benefit.title}</h3>
                {/* 3. Увеличиваем размер основного текста в карточке */}
                <p className="text-light-gray text-base md:text-lg font-sans">{benefit.description}</p>
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
            {/* 5. Убираем фон и форму у иконок */}
            <div className="text-secondary flex-shrink-0 mr-3">
              <Icon name={benefit.icon} className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">{benefit.title}</h4>
              <p className="text-light-gray text-sm font-sans">{benefit.description}</p>
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
          {/* 5. Убираем фон и форму у иконок */}
          <div className="text-secondary group-hover:text-white transition-colors duration-300 mb-4">
            <Icon name={benefit.icon} className="h-6 w-6" />
          </div>
          <h4 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors duration-300">{benefit.title}</h4>
          <p className="text-light-gray font-sans">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}