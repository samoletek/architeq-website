// src/components/sections/featured-cases-section.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/ui/cards/case-card';
import { cn } from '@/lib/utils/utils';
import { getFeaturedCases, toCaseCardFormat, type CaseStudy } from '@/lib/data/case-studies';
import { motion } from 'framer-motion';
import { useDeviceDetection } from '@/lib/utils/device-detection';

// Мобильная карточка точно как на странице кейсов
function SimpleFeaturedCard({ caseItem }: { caseItem: any }) {
  return (
    <Link href={`/cases/${caseItem.id}`} className="block">
      <div className="bg-dark-gray rounded-xl border border-gray-600 p-2.5 flex flex-col transition-colors duration-200 hover:border-secondary/30">
        {/* Теги */}
        {caseItem.tags && caseItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {caseItem.tags.map((tag: string, tagIndex: number) => (
              <span
                key={tagIndex}
                className="bg-black/60 text-white text-[9px] px-1 py-0.5 rounded border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Заголовок */}
        <h3 className="text-base font-semibold text-white leading-tight mb-3">
          {caseItem.title}
        </h3>
        
        {/* Описание */}
        {caseItem.description && (
          <p className="text-[10px] text-light-gray leading-relaxed mb-3 line-clamp-2">
            {caseItem.description}
          </p>
        )}
        
        {/* Результаты */}
        {caseItem.results && caseItem.results.length > 0 && (
          <div className="mb-3">
            <h4 className="text-[10px] font-semibold text-secondary mb-1">Key Results:</h4>
            <ul className="space-y-0.5">
              {caseItem.results.slice(0, 3).map((result: string, resultIndex: number) => (
                <li key={resultIndex} className="flex items-start">
                  <span className="text-secondary mr-1 text-[10px] flex-shrink-0 mt-0.5">•</span>
                  <span 
                    className="text-[10px] text-light-gray leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: result.replace(/(\d+(?:-\d+)?%|\d+x|\d+\.\d+x|\d+ times)/g, '<span class="text-secondary">$1</span>')
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Footer */}
        <div className="border-t border-gray-600 mt-auto pt-2">
          <p className="text-[10px] text-white flex items-center mb-1">
            <span className="text-light-gray mr-1.5 flex-shrink-0">Company:</span>
            <span className="font-medium truncate">{caseItem.company}</span>
          </p>
          {(caseItem.location || caseItem.industry) && (
            <p className="text-[10px] text-white/80 flex items-center">
              <svg className="h-2.5 w-2.5 mr-1 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="truncate">{caseItem.location || caseItem.industry}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

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
  // Состояние для отслеживания клиентского рендеринга
  const [isMounted, setIsMounted] = useState(false);
  
  // Device detection
  const { isMobile } = useDeviceDetection();
  
  // Состояние для отслеживания видимости секции
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Эффект для отслеживания видимости секции
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Используем disconnect вместо unobserve
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px'
      }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect(); // Просто отключаем наблюдатель при размонтировании
    };
  }, [isMounted]);

  // Если кейсы не переданы явно, получаем избранные кейсы
  const featuredCases = cases || getFeaturedCases(maxCases);
  
  // Ограничиваем количество отображаемых кейсов
  const displayCases = featuredCases.slice(0, maxCases);
  
  // Мобильная версия - простая и компактная
  if (isMobile && isMounted) {
    const mobileCases = displayCases.slice(0, 3);
    
    return (
      <section className={cn("section-cases bg-[#121212] py-12", className)}>
        <div className="container mx-auto px-4">
          {/* Заголовок и подзаголовок */}
          {!compact && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{
                textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
              }}>
                {title}
              </h2>
              <p className="text-light-gray text-sm" dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>
          )}
          
          {/* Простая сетка карточек */}
          <div className="grid grid-cols-1 gap-3">
            {mobileCases.map((caseItem, index) => {
              const cardData = toCaseCardFormat(caseItem);
              return (
                <SimpleFeaturedCard key={index} caseItem={cardData} />
              );
            })}
          </div>
          
          {/* Кнопка */}
          {!compact && viewAllUrl && (
            <div className="mt-8 text-center">
              <Link href={viewAllUrl}>
                <Button variant="secondary" size="lg">
                  {viewAllText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
  
  // Определяем фон секции в зависимости от варианта
  const sectionBg = variant === 'default' ? 'bg-[#121212]' : 'bg-dark-gray';
  
  // Адаптируем количество колонок для разных размеров экрана
  const gridCols = displayCases.length === 1 
    ? 'grid-cols-1'
    : displayCases.length === 2 
      ? 'grid-cols-1 md:grid-cols-2' 
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  
  // Определяем класс секции - уменьшенные отступы
  const sectionClasses = cn(
    "section-cases",
    sectionBg,
    "pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 md:pb-32",
    className
  );

  // Анимационные варианты для заголовка
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  // Анимационные варианты для карточек
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  // Анимационные варианты для кнопки
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  // Полная версия с анимациями
  return (
    <section 
      ref={sectionRef}
      className={sectionClasses}
    >
      <div className="container mx-auto px-4">
        {/* Заголовок и подзаголовок - более компактные */}
        {!compact && (
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8"
              style={{
                textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
              }}
            >{title}</h2>
            <p className="text-light-gray text-sm sm:text-base md:text-lg max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: subtitle }} />
          </motion.div>
        )}
        
        {/* Компактный заголовок */}
        {compact && title && (
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold">{title}</h2>
            {viewAllUrl && (
              <Link href={viewAllUrl} className="text-primary hover:underline text-sm font-medium flex items-center">
                {viewAllText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </motion.div>
        )}

        {/* Сетка кейсов - компактные отступы на мобильных */}
        <div className={cn("grid gap-3 md:gap-6", "max-w-none sm:max-w-5xl mx-auto", gridCols)}>
          {displayCases.map((caseItem, index) => {
            const cardData = toCaseCardFormat(caseItem);
            return (
              <motion.div 
                key={index}
                custom={index}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={cardVariants}
                className="min-h-[450px]"
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

        {/* Кнопка "Посмотреть все" - уменьшенный отступ */}
        {!compact && viewAllUrl && (
          <motion.div 
            className="mt-12 sm:mt-16 md:mt-20 text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            <Link href={viewAllUrl}>
              <Button variant="secondary" size="lg">
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
    <div className={cn("py-10", className)}>
      <div className="container mx-auto px-4">
        {/* Заголовок с ссылкой "Посмотреть все" */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllUrl && (
            <Link href={viewAllUrl} className="text-primary hover:underline text-sm font-medium flex items-center">
              {viewAllText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        
        {/* Горизонтальный скролл с кейсами */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
            {displayCases.map((caseItem, index) => {
              const cardData = toCaseCardFormat(caseItem);
              return (
                <div 
                  key={index} 
                  className="w-[280px] flex-shrink-0"
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