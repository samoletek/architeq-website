"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { SectionAnimation } from '@/components/ui/section-animation';

// Тип для параметров секции CTA
export interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text?: string;
    href?: string;
  };
  className?: string;
  gradient?: boolean;
  particles?: boolean;
  extraContent?: React.ReactNode;
  compact?: boolean;
  variant?: 'default' | 'minimal' | 'highlight';
}

export default function CTASection({
  title = "Ready to Transform Your Business Operations?",
  description = "Book a free consultation to discover how we can help automate and streamline your business processes. Our experts will analyze your current workflow and suggest personalized solutions.",
  primaryCta = {
    text: "Book a Free Consultation",
    href: "/contacts"
  },
  secondaryCta,
  className,
  gradient = true,
  particles = true,
  extraContent,
  compact = false,
  variant = 'default'
}: CTASectionProps) {
  const { isMobile, isLowPerformance } = useDeviceDetection();
  
  // Отключаем сложные анимации на мобильных и низкопроизводительных устройствах
  const simplifiedMode = isMobile || isLowPerformance;
  
  // Настройки для разных вариантов
  const variantClasses = {
    default: "py-20 bg-dark-gradient",
    minimal: "py-12 bg-dark-gray",
    highlight: "py-20 bg-primary/10 dark:bg-primary/5"
  };
  
  // Определяем классы для секции
  const sectionClasses = cn(
    variantClasses[variant], 
    "relative overflow-hidden", 
    className
  );
  
  // Отступ для компактного режима
  const contentPadding = compact ? "px-4" : "px-8";
  
  return (
    <section className={sectionClasses}>
      {/* Градиентный фон, если включен */}
      {gradient && variant === 'default' && (
        <div className="absolute inset-0 bg-dark-gradient z-0"></div>
      )}
      
      {/* Декоративные элементы, если включены */}
      {particles && !simplifiedMode && (
        <>
          <motion.div 
            className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full opacity-5 blur-[100px]"
            animate={{ 
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-neon-blue rounded-full opacity-5 blur-[100px]"
            animate={{ 
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        </>
      )}
      
      {/* Контент */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "max-w-3xl mx-auto text-center", 
          compact ? "p-6" : "", 
          variant === 'highlight' ? "bg-dark-gray rounded-xl shadow-lg" : ""
        )}>
          <SectionAnimation delay={0.1}>
            <h2 className={cn(
              "font-bold mb-6",
              compact ? "text-2xl" : "text-3xl md:text-4xl"
            )}>
              {title}
            </h2>
          </SectionAnimation>
          
          <SectionAnimation delay={0.2}>
            <p className={cn(
              "text-light-gray mb-8",
              compact ? "text-base" : "text-lg"
            )}>
              {description}
            </p>
          </SectionAnimation>
          
          <SectionAnimation delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={primaryCta.href}>
                <Button variant="primary" size={compact ? "default" : "lg"}>
                  {primaryCta.text}
                </Button>
              </Link>
              
              {secondaryCta?.href && secondaryCta.text && (
                <Link href={secondaryCta.href}>
                  <Button variant="secondary" size={compact ? "default" : "lg"}>
                    {secondaryCta.text}
                  </Button>
                </Link>
              )}
            </div>
          </SectionAnimation>
          
          {extraContent && (
            <SectionAnimation delay={0.4} className="mt-6">
              {extraContent}
            </SectionAnimation>
          )}
          
          {/* Дополнительный маленький текст, если это не компактный режим */}
          {!compact && variant === 'default' && (
            <SectionAnimation delay={0.5}>
              <p className="mt-6 text-sm text-light-gray">
                No obligations. We&apos;ll show you how automation can work for your specific business.
              </p>
            </SectionAnimation>
          )}
        </div>
      </div>
    </section>
  );
}

// Компактная версия CTA для использования внутри других компонентов
export function InlineCTA({
  title = "Want to learn more?",
  buttonText = "Contact Us",
  buttonHref = "/contacts",
  className
}: {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-dark-gray rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between", className)}>
      <h3 className="font-semibold text-lg mb-4 sm:mb-0">{title}</h3>
      <Link href={buttonHref}>
        <Button variant="primary">{buttonText}</Button>
      </Link>
    </div>
  );
}

// Плавающий CTA для мобильных устройств
export function FloatingCTA({
  text = "Book a Free Consultation",
  href = "/contacts",
  show = true
}: {
  text?: string;
  href?: string;
  show?: boolean;
}) {
  const { isMobile } = useDeviceDetection();
  
  // Показываем только на мобильных устройствах
  if (!isMobile || !show) return null;
  
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 p-4 bg-dark-gray/80 backdrop-blur-md border-t border-medium-gray"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href} className="block">
        <Button variant="primary" className="w-full">
          {text}
        </Button>
      </Link>
    </motion.div>
  );
}