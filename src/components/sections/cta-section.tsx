"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

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
  description = "Trust our team to map your processes and uncover automation potential.",
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
  
  // Отключаем сложные анимации на мобильных и низкопроизводительных устройствах
  const simplifiedMode = isMobile || isLowPerformance;
  
  // Эффект для отслеживания монтирования на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
  
  return (
    <section className={sectionClasses}>
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
          <div className="animate-fadeIn">
            <h2 className={cn(
              "font-bold mb-6",
              compact ? "text-2xl" : "text-3xl md:text-4xl"
            )}>
              {title}
            </h2>
          </div>
          
          <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <p className={cn(
              "text-light-gray mb-8",
              compact ? "text-base" : "text-lg"
            )}>
              {description}
            </p>
          </div>
          
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
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
          </div>
          
          {extraContent && (
            <div className="animate-fadeIn mt-6" style={{ animationDelay: '0.3s' }}>
              {extraContent}
            </div>
          )}
          
          {/* Дополнительный маленький текст, если это не компактный режим */}
          {!compact && variant === 'default' && (
            <div className="animate-fadeIn mt-6" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-light-gray">
              Just clear insights into what automation can do for your business.
              </p>
            </div>
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
        <Button variant="primary" className="w-full">
          {text}
        </Button>
      </Link>
    </div>
  );
}