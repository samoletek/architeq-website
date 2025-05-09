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
      className="relative p-8 rounded-3xl backdrop-blur-lg overflow-hidden transition-all duration-500 group"
      style={{
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(30, 0, 60, 0.35), 0 0 35px rgba(119, 71, 207, 0.3), 0 0 15px rgba(176, 255, 116, 0.1), inset 0 2px 2px rgba(255, 255, 255, 0.15), inset 0 -2px 2px rgba(0, 0, 0, 0.15)' 
          : '0 25px 50px -12px rgba(30, 0, 60, 0.25), 0 0 25px rgba(119, 71, 207, 0.2), inset 0 2px 2px rgba(255, 255, 255, 0.1), inset 0 -2px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '22px',
        backgroundImage: isHovered 
          ? 'linear-gradient(170deg, rgba(46, 16, 84, 0.7) 0%, rgba(15, 0, 40, 0.9) 80%), radial-gradient(circle at 20% 25%, rgba(119, 71, 207, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(176, 255, 116, 0.15) 0%, transparent 30%)' 
          : 'linear-gradient(170deg, rgba(46, 16, 84, 0.5) 0%, rgba(15, 0, 40, 0.7) 80%), radial-gradient(circle at 20% 25%, rgba(119, 71, 207, 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(176, 255, 116, 0.1) 0%, transparent 30%)',
        border: isHovered 
          ? '1px solid rgba(119, 71, 207, 0.3)' 
          : '1px solid rgba(119, 71, 207, 0.15)',
        transform: 'perspective(1500px)',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
    >
      {/* Пульсирующая неоновая обводка */}
      <motion.div 
        className="absolute inset-0 -m-[1px] rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(90deg, rgba(119, 71, 207, 0.1) 0%, rgba(77, 173, 255, 0.3) 50%, rgba(119, 71, 207, 0.1) 100%)',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
        animate={breathingAnimation}
      />
      
      {/* Свечение вокруг карточки при наведении */}
      <motion.div 
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none z-[-1]"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(119, 71, 207, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.3, 0.7, 0.3] : 0,
          transition: { 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }
        }}
      />
      
      {/* 3D Тень внизу для глубины */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-black/20 rounded-full blur-xl mx-6 transform translate-y-10 scale-75"
        style={{
          opacity: 0.15,
          zIndex: -2,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Внутреннее содержимое */}
      <div className="relative z-10">
        <div className="rounded-2xl w-16 h-16 flex items-center justify-center mb-6 relative overflow-hidden shadow-2xl">
          {/* Многослойный фон для иконки */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-dark-purple/70" />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Стеклянная поверхность */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
          <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full" 
              style={{ background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 100%)', opacity: 0.5 }} />
          
          {/* Подсветка иконки */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(176, 255, 116, 0.4) 0%, rgba(119, 71, 207, 0.2) 60%, transparent 100%)',
                'radial-gradient(circle at 30% 30%, rgba(176, 255, 116, 0.5) 0%, rgba(119, 71, 207, 0.3) 60%, transparent 100%)',
                'radial-gradient(circle at 30% 30%, rgba(176, 255, 116, 0.4) 0%, rgba(119, 71, 207, 0.2) 60%, transparent 100%)'
              ],
              transition: { 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }
            }}
          />
          
          {/* Граница иконки с неоновым свечением */}
          <div className="absolute inset-0 rounded-2xl border border-primary/30 shadow-[inset_0_0_15px_rgba(119,71,207,0.3)]" />
          
          {/* Размытое свечение вокруг */}
          <motion.div 
            className="absolute inset-0 opacity-70"
            animate={breathingAnimation}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(176, 255, 116, 0.3) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
          
          {/* Сама иконка */}
          <div className="relative z-10">
            <Icon name={icon} className="h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(176,255,116,0.7)] transition-all duration-500" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-secondary transition-colors duration-300">{title}</h3>
        <p className="text-light-gray leading-relaxed">{description}</p>
      </div>
      
      {/* Декоративные детали для 3D эффекта */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
        {/* Верхняя светлая грань */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
        {/* Правая светлая грань */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/30 via-transparent to-transparent" />
        
        {/* Блики на поверхности */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30" 
             style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0) 50%)' }} />
             
        {/* Дополнительный блик в верхнем левом углу */}
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full" 
             style={{ background: 'radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)', opacity: 0.5 }} />
             
        {/* Фальшивое отражение */}
        <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10"
             style={{ background: 'linear-gradient(to top, rgba(255, 255, 255, 0.05) 0%, transparent 100%)' }} />
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
        {/* Декоративные элементы фона */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Объемные свечения на фоне */}
          <motion.div 
            className="absolute top-10 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/10 to-transparent filter blur-3xl" 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              transition: { duration: 12, ease: "easeInOut", repeat: Infinity }
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-tl from-primary/5 to-secondary/5 filter blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.25, 0.15],
              transition: { duration: 15, ease: "easeInOut", repeat: Infinity, delay: 2 }
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-secondary/5 filter blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              transition: { duration: 8, ease: "easeInOut", repeat: Infinity, delay: 1 }
            }}
          />
          
          {/* Декоративная сетка на фоне */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:30px_30px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedContainer className="text-center mb-20">
            <AnimatedItem>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight relative inline-block">
                {/* Слабое свечение под заголовком */}
                <span className="absolute inset-0 blur-md bg-primary/10 -z-10 transform scale-110" />
                {title}
              </h2>
              
              {/* Анимированная декоративная линия под заголовком */}
              <motion.div 
                className="h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto my-4 rounded-full"
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: "120px", opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                    transition: { duration: 4, repeat: Infinity }
                  }}
                />
              </motion.div>
            </AnimatedItem>
            
            <AnimatedItem>
              <p className="text-light-gray max-w-3xl mx-auto text-lg">
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