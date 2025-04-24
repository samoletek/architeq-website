"use client";

import { AnimatedContainer, AnimatedItem } from '@/components/ui/section-animation';
import BenefitCard from '@/components/ui/benefit-card';
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
  variant?: 'default' | 'alternate';
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
    description: 'Scale operations with no proportional increase in admin headcount. Crafting growth-ready automation that drives continuous growth and transformation.',
    icon: 'growth',
  },
  {
    title: 'Everything Fully in Sync',
    description: 'Unify fragmented tools, teams, and platforms into one seamless automation landscape — from APIs to operations.',
    icon: 'connection',
  },
];

export default function BenefitsSection({
  title = "Why Architeq?",
  subtitle = "We automate existing processes and build new, complex workflows — helping businesses keep growing with no limits.",
  benefits = defaultBenefits,
  className,
  variant = 'default'
}: BenefitsSectionProps) {
  // Определяем классы для секции в зависимости от варианта
  const sectionClasses = cn(
    "py-20",
    variant === 'default' ? "bg-dark-gray" : "bg-site-bg",
    className
  );

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
              <BenefitCard 
                title={benefit.title} 
                description={benefit.description} 
                icon={benefit.icon} 
              />
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
            className="bg-dark-gray rounded-lg p-4 flex items-start hover:shadow-sm transition-shadow duration-300"
          >
            <div className="rounded-full w-10 h-10 bg-medium-gray text-primary flex items-center justify-center flex-shrink-0 mr-3">
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
          className="flex-1 bg-dark-gray/50 rounded-lg p-6 hover:shadow-sm hover:bg-dark-gray transition-all duration-300"
        >
          <div className="rounded-full w-12 h-12 bg-medium-gray text-primary flex items-center justify-center mb-4">
            <Icon name={benefit.icon} className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
          <p className="text-light-gray">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}