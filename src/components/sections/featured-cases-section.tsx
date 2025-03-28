"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/ui/cards/case-card';
import { SectionAnimation, AnimatedContainer, AnimatedItem } from '@/components/ui/section-animation';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

// Тип для представления кейса
export interface FeaturedCase {
  id: string;
  title: string;
  description: string;
  industry: string;
  company: string;
  results: string[];
  image?: string;
  tags: string[];
}

// Интерфейс для параметров секции
export interface FeaturedCasesSectionProps {
  title?: string;
  subtitle?: string;
  cases?: FeaturedCase[];
  viewAllText?: string;
  viewAllUrl?: string;
  className?: string;
  compact?: boolean;
  maxCases?: number;
  variant?: 'default' | 'alternate';
  caseCardVariant?: 'default' | 'compact';
}

// Примеры кейсов по умолчанию
const defaultCases: FeaturedCase[] = [
  {
    id: 'stripe-invoicing',
    title: 'Stripe Invoicing Automation',
    description: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
    industry: 'Financial Management',
    company: 'EclipseGroup',
    results: [
      '85% reduction in time spent on invoicing',
      '30% acceleration in receiving payments',
      'Elimination of errors in data transfer'
    ],
    image: '/images/cases/stripe-invoicing.jpg',
    tags: ['Finance', 'CRM', 'Automation']
  },
  {
    id: 'document-generation',
    title: 'Document Generation from CRM',
    description: 'Automatic document generation system that creates documents based on CRM data.',
    industry: 'Document Management',
    company: 'Affiliated Medical Supplies',
    results: [
      'Document creation time reduced from 35 minutes to 2-3 minutes',
      'Complete elimination of data errors',
      'Standardization of all company documents'
    ],
    image: '/images/cases/document-generation.jpg',
    tags: ['Documents', 'CRM', 'Automation']
  },
  {
    id: 'ai-voice-bot',
    title: 'AI-Voice Bot for Client Requests',
    description: 'Multi-level interactive voice assistant for processing client requests without operator participation.',
    industry: 'Customer Service',
    company: 'Up-Struct LLC',
    results: [
      'Automation of 60-70% of incoming requests',
      'Reduction of waiting time to minimum',
      '24/7 operation mode without increasing staff'
    ],
    image: '/images/cases/ai-voice-bot.jpg',
    tags: ['AI', 'Voice', 'Customer Service']
  }
];

export default function FeaturedCasesSection({
  title = "Featured Case Studies",
  subtitle = "Explore how we've helped companies across various industries optimize their processes and achieve significant results.",
  cases = defaultCases,
  viewAllText = "View All Case Studies",
  viewAllUrl = "/cases",
  className,
  compact = false,
  maxCases = 3,
  variant = 'default',
  caseCardVariant = 'default'
}: FeaturedCasesSectionProps) {
  const { isMobile } = useDeviceDetection();
  
  // Ограничиваем количество отображаемых кейсов
  const displayCases = cases.slice(0, maxCases);
  
  // Определяем фон секции в зависимости от варианта
  const sectionBg = variant === 'default' ? 'bg-[#121212]' : 'bg-dark-gray';
  
  // Адаптируем количество колонок для разных размеров экрана
  const gridCols = cases.length === 1 
    ? 'grid-cols-1'
    : cases.length === 2 
      ? 'grid-cols-1 md:grid-cols-2' 
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  
  // Адаптируем размер для компактного режима
  const sectionPadding = compact ? 'py-10' : 'py-20';
  
  return (
    <section className={cn(sectionPadding, sectionBg, className)}>
      <div className="container mx-auto px-4">
        {/* Заголовок и подзаголовок, если не компактный режим */}
        {!compact && (
          <SectionAnimation className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              {subtitle}
            </p>
          </SectionAnimation>
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
        <AnimatedContainer staggerTime={0.15} className={cn("grid gap-8", gridCols)}>
          {displayCases.map((caseItem, index) => (
            <AnimatedItem key={index}>
              <CaseCard 
                id={caseItem.id}
                title={caseItem.title}
                description={caseItem.description}
                industry={caseItem.industry}
                company={caseItem.company}
                results={caseItem.results}
                image={caseItem.image}
                tags={caseItem.tags}
                href={`/cases/${caseItem.id}`}
                isCompact={caseCardVariant === 'compact'}
              />
            </AnimatedItem>
          ))}
        </AnimatedContainer>

        {/* Кнопка "Посмотреть все" только если не компактный режим */}
        {!compact && viewAllUrl && (
          <SectionAnimation delay={0.3} className="mt-12 text-center">
            <Link href={viewAllUrl}>
              <Button variant="secondary" size="lg">
                {viewAllText}
              </Button>
            </Link>
          </SectionAnimation>
        )}
      </div>
    </section>
  );
}

// Компактная версия с горизонтальным скроллом для мобильных устройств
export function HorizontalCasesSection({
  title = "Recent Case Studies",
  cases = defaultCases.slice(0, 6),
  viewAllText = "View All",
  viewAllUrl = "/cases",
  className,
}: Omit<FeaturedCasesSectionProps, 'compact' | 'variant' | 'maxCases'>) {
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
            {cases.map((caseItem, index) => (
              <div 
                key={index} 
                className="w-[280px] flex-shrink-0"
              >
                <CaseCard 
                  id={caseItem.id}
                  title={caseItem.title}
                  company={caseItem.company}
                  tags={caseItem.tags}
                  href={`/cases/${caseItem.id}`}
                  isCompact={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}