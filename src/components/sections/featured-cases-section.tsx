"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/ui/cards/case-card';
import { cn } from '@/lib/utils/utils';
import { getFeaturedCases, toCaseCardFormat, type CaseStudy } from '@/lib/data/case-studies';

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
  subtitle = "We offer smart automation that adapts and scales — for faster, clearer, more connected workflows. Explore our services.",
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
  
  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Если кейсы не переданы явно, получаем избранные кейсы
  const featuredCases = cases || getFeaturedCases(maxCases);
  
  // Ограничиваем количество отображаемых кейсов
  const displayCases = featuredCases.slice(0, maxCases);
  
  // Определяем фон секции в зависимости от варианта
  const sectionBg = variant === 'default' ? 'bg-[#121212]' : 'bg-dark-gray';
  
  // Адаптируем количество колонок для разных размеров экрана
  const gridCols = displayCases.length === 1 
    ? 'grid-cols-1'
    : displayCases.length === 2 
      ? 'grid-cols-1 md:grid-cols-2' 
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  
  // Адаптируем размер для компактного режима
  const sectionPadding = compact ? 'py-10' : 'py-20';

  // Если компонент не смонтирован на клиенте, возвращаем упрощенную версию
  if (!isMounted) {
    return (
      <section className={cn(sectionPadding, sectionBg, className)}>
        <div className="container mx-auto px-4">
          {/* Заголовок и подзаголовок, если не компактный режим */}
          {!compact && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              <p className="text-light-gray max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
          )}
          
          {/* Компактный заголовок для компактного режима */}
          {compact && title && (
            <div className="flex justify-between items-center mb-8">
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
          )}

          {/* Сетка кейсов */}
          <div className={cn("grid gap-8", gridCols)}>
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
                  />
                </div>
              );
            })}
          </div>

          {/* Кнопка "Посмотреть все" только если не компактный режим */}
          {!compact && viewAllUrl && (
            <div className="mt-12 text-center">
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

  // Полная версия с анимациями для клиентского рендеринга
  return (
    <section className={cn(sectionPadding, sectionBg, className)}>
      <div className="container mx-auto px-4">
        {/* Заголовок и подзаголовок, если не компактный режим */}
        {!compact && (
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}
        
        {/* Компактный заголовок для компактного режима */}
        {compact && title && (
          <div className="flex justify-between items-center mb-8">
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
        )}

        {/* Сетка кейсов */}
        <div className={cn("grid gap-8", gridCols)}>
          {displayCases.map((caseItem, index) => {
            const cardData = toCaseCardFormat(caseItem);
            return (
              <div 
                key={index} 
                className="animate-fadeIn" 
                style={{ animationDelay: `${index * 0.1}s` }}
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
                />
              </div>
            );
          })}
        </div>

        {/* Кнопка "Посмотреть все" только если не компактный режим */}
        {!compact && viewAllUrl && (
          <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: "0.3s" }}>
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

// Компактная версия с горизонтальным скроллом для мобильных устройств
export function HorizontalCasesSection({
  title = "Recent Case Studies",
  cases,
  viewAllText = "View All",
  viewAllUrl = "/cases",
  className,
}: Omit<FeaturedCasesSectionProps, 'compact' | 'variant' | 'maxCases'>) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayCases = cases || getFeaturedCases(6);
  
  if (!isMounted) {
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
          
          {/* Плейсхолдер для горизонтального скролла */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {displayCases.map((_, index) => (
                <div 
                  key={index} 
                  className="w-[280px] h-[180px] bg-dark-gray rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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