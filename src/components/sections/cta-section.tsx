// src/components/sections/cta-section.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { motion } from 'framer-motion';

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
  title = "Ready to Streamline the Flow?",
  description = "Trust our team to map your processes and<br />uncover automation potential.",
  primaryCta = {
    text: "See How It Works",
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
  const [isMounted, setIsMounted] = useState(false);
  
  // Состояние для отслеживания видимости секции
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Отключаем сложные анимации на мобильных и низкопроизводительных устройствах
  const simplifiedMode = isMobile || isLowPerformance;
  
  // Эффект для отслеживания монтирования на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Эффект для отслеживания видимости секции
  useEffect(() => {
    const currentRef = sectionRef.current; // Сохраняем ссылку в локальную переменную
    
    // Функция для отслеживания видимости элемента
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Отключаем наблюдение после первого появления элемента
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px'
      }
    );
  
    // Начинаем наблюдение за секцией
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    // Очистка observer при размонтировании компонента
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  // Настройки для разных вариантов - уменьшенные отступы
  const variantClasses = {
    default: "section-cta bg-dark-gradient pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24",
    minimal: "py-12 sm:py-16 bg-dark-gray",
    highlight: "py-16 sm:py-20 md:py-24 bg-primary/10 dark:bg-primary/5"
  };

  // Варианты анимации для контента
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  // Варианты анимации для кнопок с задержкой
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
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
      {/* Градиентный фон, если включен - в обоих режимах */}
      {gradient && variant === 'default' && (
        <div className="absolute inset-0 bg-dark-gradient z-0"></div>
      )}
      
      {/* Декоративные элементы только для клиентского рендеринга */}
      {particles && isMounted && !simplifiedMode && (
        <>
          <div 
            className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full opacity-5 blur-[100px]"
            style={{ 
              transform: 'translate(0, 0)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-neon-blue rounded-full opacity-5 blur-[100px]"
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
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 
              className={cn(
                "font-bold mb-8",
                compact ? "text-2xl" : "text-3xl md:text-4xl lg:text-5xl"
              )}
              style={{
                textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
              }}
            >
              {title}
            </h2>
          
            <p className={cn(
              "text-light-gray mb-8 sm:mb-12 md:mb-16",
              compact ? "text-base" : "text-lg"
            )}>
              {description}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={primaryCta.href}>
              <Button variant="secondary" size={compact ? "default" : "lg"}>
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
          
          {/* Дополнительный маленький текст, если это не компактный режим */}
          {!compact && variant === 'default' && (
            <motion.div 
              className="mt-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={contentVariants}
            >
            </motion.div>
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
      <Button variant="secondary">{buttonText}</Button>
      </Link>
    </div>
  );
}

// Плавающий CTA для мобильных устройств
export function FloatingCTA({
  text = "See How It Works",
  href = "/contacts",
  show = true
}: {
  text?: string;
  href?: string;
  show?: boolean;
}) {
  const { isMobile } = useDeviceDetection();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Показываем только на мобильных устройствах и после монтирования
  if (!isMounted || !isMobile || !show) return null;
  
  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 p-4 bg-dark-gray/80 backdrop-blur-md border-t border-medium-gray"
      style={{ 
        transform: 'translateY(0)' 
      }}
    >
      <Link href={href} className="block">
      <Button variant="secondary" className="w-full">
          {text}
        </Button>
      </Link>
    </div>
  );
}