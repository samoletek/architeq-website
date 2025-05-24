// src/components/sections/featured-cases-section.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/ui/cards/case-card';
import { cn } from '@/lib/utils/utils';
import { getFeaturedCases, toCaseCardFormat, type CaseStudy } from '@/lib/data/case-studies';
import { motion } from 'framer-motion';

// Интерфейс для параметров секции
export interface FeaturedCasesSectionProps {
  title?: string;
  subtitle?: string;
  cases?: CaseStudy[];
  viewAllText?: string;
  viewAllUrl?: string;
  className?: string;
  compact?: boolean;
  maxCases?: number;
  variant?: 'default' | 'alternate';
  caseCardVariant?: 'default' | 'compact';
}

export default function FeaturedCasesSection({
  title = "Featured Case Studies",
  subtitle = "See how smart automation reshapes operations <br />and unlocks measurable results.",
  cases,
  viewAllText = "View All Case Studies",
  viewAllUrl = "/cases",
  className,
  compact = false,
  maxCases = 3,
  variant = 'default',
  caseCardVariant = 'default'
}: FeaturedCasesSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px'
      }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [isMounted]);

  const featuredCases = cases || getFeaturedCases(maxCases);
  const displayCases = featuredCases.slice(0, maxCases);
  
  const sectionBg = variant === 'default' ? 'bg-[#121212]' : 'bg-dark-gray';
  
  // Адаптивная сетка для мобильных устройств
  const gridCols = displayCases.length === 1 
    ? 'grid-cols-1'
    : displayCases.length === 2 
      ? 'grid-cols-1 sm:grid-cols-2' 
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  
  const sectionClasses = cn(
    "section-cases",
    sectionBg,
    className
  );

  // Упрощенная версия без анимаций
  if (!isMounted) {
    return (
      <section className={sectionClasses}>
        <div className="container mx-auto">
          {/* Заголовок и подзаголовок */}
          {!compact && (
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="font-bold mb-4 sm:mb-6 md:mb-8">{title}</h2>
              <p className="text-light-gray text-sm sm:text-base md:text-lg max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>
          )}
          
          {/* Компактный заголовок */}
          {compact && title && (
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
              {viewAllUrl && (
                <Link href={viewAllUrl} className="text-primary hover:underline text-xs sm:text-sm font-medium flex items-center">
                  {viewAllText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          )}

          {/* Сетка кейсов */}
          <div className={cn("grid gap-4 sm:gap-6 md:gap-8", gridCols)}>
            {displayCases.map((caseItem, index) => {
              const cardData = toCaseCardFormat(caseItem);
              return (
                <div key={index}>
                  <CaseCard 
                    id={cardData.id}
                    title={cardData.title}
                    description={cardData.description}
                    industry={cardData.industry}
                    company={cardData.company}
                    location={cardData.location}
                    results={cardData.results}
                    image={cardData.image}
                    tags={cardData.tags}
                    href={`/cases/${cardData.id}`}
                    isCompact={caseCardVariant === 'compact'}
                    className="case-card-enhanced"
                  />
                </div>
              );
            })}
          </div>

          {/* Кнопка "Посмотреть все" */}
          {!compact && viewAllUrl && (
            <div className="mt-12 sm:mt-16 md:mt-20 text-center">
              <Link href={viewAllUrl}>
                <Button variant="secondary" size="lg" className="text-sm sm:text-base">
                  {viewAllText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Анимационные варианты
  const titleVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.2 + index * 0.1
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  // Полная версия с анимациями
  return (
    <section 
      ref={sectionRef}
      className={sectionClasses}
    >
      <div className="container mx-auto">
        {/* Заголовок и подзаголовок */}
        {!compact && (
          <motion.div 
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="font-bold mb-4 sm:mb-6 md:mb-8">{title}</h2>
            <p className="text-light-gray text-sm sm:text-base md:text-lg max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: subtitle }} />
          </motion.div>
        )}
        
        {/* Компактный заголовок */}
        {compact && title && (
          <motion.div 
            className="flex justify-between items-center mb-6 sm:mb-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
            {viewAllUrl && (
              <Link href={viewAllUrl} className="text-primary hover:underline text-xs sm:text-sm font-medium flex items-center">
                {viewAllText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </motion.div>
        )}

        {/* Сетка кейсов */}
        <div className={cn("grid gap-4 sm:gap-6 md:gap-8", gridCols)}>
          {displayCases.map((caseItem, index) => {
            const cardData = toCaseCardFormat(caseItem);
            return (
              <motion.div 
                key={index}
                custom={index}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={cardVariants}
              >
                <CaseCard 
                  id={cardData.id}
                  title={cardData.title}
                  description={cardData.description}
                  industry={cardData.industry}
                  company={cardData.company}
                  location={cardData.location}
                  results={cardData.results}
                  image={cardData.image}
                  tags={cardData.tags}
                  href={`/cases/${cardData.id}`}
                  isCompact={caseCardVariant === 'compact'}
                  className="case-card-enhanced"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Кнопка "Посмотреть все" */}
        {!compact && viewAllUrl && (
          <motion.div 
            className="mt-12 sm:mt-16 md:mt-20 text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
          >
            <Link href={viewAllUrl}>
              <Button variant="secondary" size="lg" className="text-sm sm:text-base">
                {viewAllText}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Компактная версия с горизонтальным скроллом
export function HorizontalCasesSection({
  title = "Recent Case Studies",
  cases,
  viewAllText = "View All",
  viewAllUrl = "/cases",
  className,
}: Omit<FeaturedCasesSectionProps, 'compact' | 'variant' | 'maxCases'>) {

  const displayCases = cases || getFeaturedCases(6);
  
  return (
    <div className={cn("py-8 sm:py-10", className)}>
      <div className="container mx-auto">
        {/* Заголовок с ссылкой "Посмотреть все" */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          {viewAllUrl && (
            <Link href={viewAllUrl} className="text-primary hover:underline text-xs sm:text-sm font-medium flex items-center">
              {viewAllText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        
        {/* Горизонтальный скролл с кейсами */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex space-x-3 sm:space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
            {displayCases.map((caseItem, index) => {
              const cardData = toCaseCardFormat(caseItem);
              return (
                <div 
                  key={index} 
                  className="w-[240px] sm:w-[280px] flex-shrink-0"
                >
                  <CaseCard 
                    id={cardData.id}
                    title={cardData.title}
                    company={cardData.company}
                    tags={cardData.tags}
                    href={`/cases/${cardData.id}`}
                    isCompact={true}
                    className="case-card-enhanced"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}