// src/components/sections/unified-cta-section.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { motion } from 'framer-motion';

// Предустановленные конфигурации для разных страниц
export const CTA_PRESETS = {
  // Главная страница
  home: {
    title: "Ready to Streamline the Flow?",
    description: "Trust our team to map your processes and uncover automation potential.",
    primaryCta: {
      text: "See How It Works",
      href: "/contacts"
    }
  },
  
  // Страница услуг
  services: {
    title: "Ready to Transform Your Business?",
    description: "Let's discuss how our solutions can streamline your operations and drive growth.",
    primaryCta: {
      text: "See How It Works",
      href: "/contacts"
    }
  },
  
  // Отдельные страницы услуг (AI, CRM, etc.)
  serviceDetail: {
    title: "Ready to Implement This Solution?",
    description: "Schedule a consultation to discuss how this solution fits your business needs.",
    primaryCta: {
      text: "Request a Similar Solution",
      href: "/contacts"
    }
  },
  
  // Страница кейсов
  cases: {
    title: "Inspired by These Results?",
    description: "Let's create a similar success story for your business.",
    primaryCta: {
      text: "See How It Works",
      href: "/contacts"
    }
  },
  
  // Отдельные страницы кейсов
  caseDetail: {
    title: "Want Similar Results?",
    description: "Let's discuss how we can deliver comparable outcomes for your business.",
    primaryCta: {
      text: "Request a Similar Solution",
      href: "/contacts"
    }
  },
  
  // Страница "О нас"
  about: {
    title: "Ready to Work Together?",
    description: "Let's discuss how our team can help transform your business operations.",
    primaryCta: {
      text: "See How It Works",
      href: "/contacts"
    }
  }
};

// Тип для параметров секции CTA
export interface UnifiedCTAProps {
  preset?: keyof typeof CTA_PRESETS;
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  className?: string;
  particles?: boolean;
  extraContent?: React.ReactNode;
  compact?: boolean;
  variant?: 'default' | 'minimal' | 'highlight';
}

export default function UnifiedCTASection({
  preset,
  title,
  description,
  primaryCta,
  className,
  particles = true,
  extraContent,
  compact = false,
  variant = 'default'
}: UnifiedCTAProps) {
  const { isMobile, isLowPerformance } = useDeviceDetection();
  const [isMounted, setIsMounted] = useState(false);
  
  // Состояние для отслеживания видимости секции
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Отключаем сложные анимации на мобильных и низкопроизводительных устройствах
  const simplifiedMode = isMobile || isLowPerformance;
  
  // Получаем конфигурацию из пресета или используем переданные параметры
  const config = preset ? CTA_PRESETS[preset] : {
    title: title || "Ready to Get Started?",
    description: description || "Contact us to learn more about our solutions.",
    primaryCta: primaryCta || { text: "Contact Us", href: "/contacts" }
  };
  
  // Переопределяем конфигурацию, если переданы кастомные параметры
  const finalConfig = {
    title: title || config.title,
    description: description || config.description,
    primaryCta: primaryCta || config.primaryCta
  };
  
  // Эффект для отслеживания монтирования на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Эффект для отслеживания видимости секции
  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px'
      }
    );
  
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  // Настройки для разных вариантов
  const variantClasses = {
    default: "section-cta pt-72 pb-48",
    minimal: "py-16",
    highlight: "py-24 bg-primary/10"
  };

  // Варианты анимации
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };
  
  // Определяем классы для секции
  const sectionClasses = cn(
    variantClasses[variant], 
    "relative overflow-hidden", 
    className
  );
  
  return (
    <section 
      ref={sectionRef}
      className={sectionClasses}
    >
      {/* Декоративные элементы только для клиентского рендеринга */}
      {particles && isMounted && !simplifiedMode && variant === 'default' && (
        <>
          <div 
            className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full opacity-5 blur-[100px]"
            style={{ 
              transform: 'translate(0, 0)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-accent-blue rounded-full opacity-5 blur-[100px]"
            style={{ 
              transform: 'translate(0, 0)'
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
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={contentVariants}
          >
            <h2 
              className={cn(
                "font-bold mb-6",
                compact ? "text-2xl" : "text-4xl md:text-5xl"
              )}
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.5)'
              }}
            >
              {finalConfig.title}
            </h2>
          
            <p className={cn(
              "max-w-2xl mx-auto mb-8",
              compact ? "text-base text-light-gray" : "text-xl text-white/70"
            )} 
            dangerouslySetInnerHTML={{ __html: finalConfig.description }}
            />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Используем зеленую кнопку (secondary) вместо фиолетовой (primary) */}
              <Link href={finalConfig.primaryCta.href}>
                <Button variant="secondary" size={compact ? "default" : "lg"}>
                  {finalConfig.primaryCta.text}
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {extraContent && (
            <motion.div 
              className="mt-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={contentVariants}
            >
              {extraContent}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// Компактная версия для Hero секций
export function HeroCTA({
  showSecondary = false,
  primaryText = "See How It Works",
  secondaryText = "Request a Similar Solution",
  primaryHref = "/contacts",
  secondaryHref = "/contacts",
  className
}: {
  showSecondary?: boolean;
  primaryText?: string;
  secondaryText?: string;
  primaryHref?: string;
  secondaryHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 justify-center", className)}>
      {/* Зеленая кнопка вместо фиолетовой */}
      <Link href={primaryHref}>
        <Button variant="secondary" size="lg">
          {primaryText}
        </Button>
      </Link>
      
      {showSecondary && (
        <Link href={secondaryHref}>
          <Button variant="secondary" size="lg">
            {secondaryText}
          </Button>
        </Link>
      )}
    </div>
  );
}