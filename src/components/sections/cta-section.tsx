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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const simplifiedMode = isMobile || isLowPerformance;
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const [screenHeight, setScreenHeight] = useState('100vh');
  
  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(`${window.innerHeight}px`);
    };
  
    updateScreenHeight();
    window.addEventListener('resize', updateScreenHeight);
    
    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);

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
  
  const variantClasses = {
    default: "section-cta bg-dark-gradient",
    minimal: "py-12 sm:py-16 bg-dark-gray",
    highlight: "py-16 sm:py-20 md:py-24 bg-primary/10 dark:bg-primary/5"
  };
  
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
      {/* Градиентный фон */}
      {gradient && variant === 'default' && (
        <div className="absolute inset-0 bg-dark-gradient z-0"></div>
      )}
      
      {/* Декоративные элементы только для клиентского рендеринга */}
      {particles && isMounted && !simplifiedMode && (
        <>
          <div 
            className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary rounded-full opacity-5 blur-[100px]"
            style={{ 
              transform: 'translate(0, 0)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-neon-blue rounded-full opacity-5 blur-[100px]"
            style={{ 
              transform: 'translate(0, 0)'
            }}
          />
        </>
      )}
      
      {/* Контент */}
      <div className="container mx-auto relative z-10">
        <div className={cn(
          "max-w-3xl mx-auto text-center", 
          compact ? "p-4 sm:p-6" : "", 
          variant === 'highlight' ? "bg-dark-gray rounded-xl shadow-lg p-6 sm:p-8" : ""
        )}>
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={contentVariants}
          >
            <h2 className={cn(
              "font-bold mb-4 sm:mb-6 md:mb-8",
              compact ? "text-xl sm:text-2xl" : ""
            )}>
              {title}
            </h2>
          
            <p className={cn(
              "text-light-gray mb-8 sm:mb-12 md:mb-16",
              compact ? "text-sm sm:text-base" : "text-sm sm:text-base md:text-lg"
            )}>
              {description}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href={primaryCta.href}>
                <Button 
                  variant="primary" 
                  size={compact ? "default" : "lg"}
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  {primaryCta.text}
                </Button>
              </Link>
              
              {secondaryCta?.href && secondaryCta.text && (
                <Link href={secondaryCta.href}>
                  <Button 
                    variant="secondary" 
                    size={compact ? "default" : "lg"}
                    className="w-full sm:w-auto text-sm sm:text-base"
                  >
                    {secondaryCta.text}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
          
          {extraContent && (
            <motion.div 
              className="mt-4 sm:mt-6"
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
    <div className={cn(
      "bg-dark-gray rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", 
      className
    )}>
      <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
      <Link href={buttonHref}>
        <Button variant="primary" className="text-sm sm:text-base w-full sm:w-auto">
          {buttonText}
        </Button>
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
      className="fixed bottom-0 left-0 w-full z-50 p-3 sm:p-4 bg-dark-gray/80 backdrop-blur-md border-t border-medium-gray"
      style={{ 
        transform: 'translateY(0)' 
      }}
    >
      <Link href={href} className="block">
        <Button variant="primary" className="w-full text-sm">
          {text}
        </Button>
      </Link>
    </div>
  );
}