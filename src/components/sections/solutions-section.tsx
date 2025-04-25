"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { SolutionSwitcher } from '@/components/ui/solution-switcher';
import Link from 'next/link';
import { Icon, IconName } from '@/components/ui/icons/icon';
import { cn } from '@/lib/utils/utils';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

// Тип для таба решения
export interface SolutionTab {
  id: string;
  label: string;
  description: string;
  icon: IconName;
}

// Тип для полного решения
export interface Solution {
  id: string;
  label: string;
  icon: IconName;
  description: string;
  features: string[];
  imageUrl?: string;
  caseStudies?: Array<{
    id: string;
    title: string;
  }>;
  href?: string;
}

// Интерфейс для параметров секции
export interface SolutionsSectionProps {
  title?: string;
  subtitle?: string;
  solutions?: Solution[];
  className?: string;
  defaultSolutionId?: string;
  buttonText?: string;
  variant?: 'default' | 'alternate';
  withAnimation?: boolean;
}

// Данные о решениях по умолчанию
const defaultSolutions: Solution[] = [
  {
    id: 'business-process',
    label: 'Workflow Design & Automation',
    icon: 'process',
    description: 'Build smarter workflows, not workarounds. We automate core operations by syncing your tools, mapping logic, and removing manual effort — for faster, cleaner results.',
    features: [
      'Clear roadmap for implementation',
      'End-to-end workflow automation',
      'System integration & error-proof data flow',
      'Custom dashboards for live insights',
      'Smart validation & fail-safes'
    ],
    imageUrl: '/images/solutions/business-process.jpg',
    href: '/services/business-process'
  },
  {
    id: 'crm-integration',
    label: 'CRM Integration',
    icon: 'crm',
    description: 'No more scattered data — we build your first real CRM and turn your operations into a unified ecosystem with full visibility, structure, and flow across tools, teams, and touchpoints.',
    features: [
      'Centralized CRM built from scratch — fully tailored to your workflows',
      'Calendars & Emails integrations',
      'Document management automation',
      'Wide integration capabilities',
      'Customizable insight dashboards'
    ],
    imageUrl: '/images/solutions/crm-integration.jpg',
    href: '/services/crm-integration'
  },
  {
    id: 'boxed-solutions',
    label: 'Industry-Specific Boxed Solutions',
    icon: 'industry',
    description: 'Prebuilt for your industry. Tailored to your edge. Accelerate with ready-to-run automation kits designed for your field — and customized for your operations.',
    features: [
      'Pre-configured workflows for key sectors',
      'Custom fields & data structure',
      'Industry-specific integrations',
      'Scalable & field-proven automations',
      'Fast deployment'
    ],
    imageUrl: '/images/solutions/boxed-solutions.jpg',
    href: '/services/boxed-solutions'
  },
  {
    id: 'ai-solutions',
    label: 'AI-Powered Solutions',
    icon: 'ai',
    description: 'Automate with intelligence. Operate with insight. Use AI to automate high-effort tasks, reveal patterns, and support decision-making with real-time insights.',
    features: [
      'AI-driven voice assistant',
      'CRM-integrated assistant',
      'Real-time conversation transcription',
      'Scalable and customizable solutions',
      'Quick and efficient deployment'
    ],
    imageUrl: '/images/solutions/ai-solutions.jpg',
    href: '/services/ai-solutions'
  },
  {
    id: 'documentation',
    label: 'Automated Document Flow',
    icon: 'document',
    description: 'Documents that write themselves. Processes that follow through. We automate the full lifecycle of business documentation — from creation to compliance — with regulatory requirements.',
    features: [
      'Auto-generation from CRM templates',
      'E-signature & approval flows',
      'Smart forms & structured capture',
      'Document version control',
      'Regulatory compliance built-in'
    ],
    imageUrl: '/images/solutions/documentation.jpg',
    href: '/services/documentation'
  },
  {
    id: 'finance',
    label: 'Finance Operations Automations',
    icon: 'finance',
    description: 'Streamline the flow of money. Stay in control, always. From invoicing to reconciliation — we connect and automate every part of your financial stack for speed, accuracy, and visibility.',
    features: [
      'Smart invoice generation',
      'Real-time payment tracking & reconciliation',
      'Financial dashboards & custom reports',
      'Seamless accounting system integration',
      'Multi-currency, multi-market, and multi-payment method support'
    ],
    imageUrl: '/images/solutions/finance.jpg',
    href: '/services/finance'
  }
];

export function SolutionsSection({
  title = "Our Solutions",
  subtitle = "We offer smart automation that adapts and scales — for faster, clearer, more connected workflows. Explore our services.",
  solutions = defaultSolutions,
  className,
  defaultSolutionId,
  buttonText = "Learn More About",
  variant = 'default'
}: SolutionsSectionProps) {
  const [activeSolution, setActiveSolution] = useState<Solution>(
    defaultSolutionId ? 
      solutions.find(s => s.id === defaultSolutionId) || solutions[0] : 
      solutions[0]
  );
  
  const [isMounted, setIsMounted] = useState(false);
  
  // Устанавливаем состояние после монтирования
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Обработчик смены таба
  const handleSolutionChange = useCallback((tab: SolutionTab) => {
    const solution = solutions.find(s => s.id === tab.id);
    if (solution) {
      setActiveSolution(solution);
    }
  }, [solutions]);
  
  // Преобразуем данные решений в формат, ожидаемый компонентом SolutionSwitcher
  const solutionTabs: SolutionTab[] = solutions.map(solution => ({
    id: solution.id,
    label: solution.label,
    description: solution.description,
    icon: solution.icon
  }));
  
  // Определяем фон секции в зависимости от варианта
  const sectionBg = variant === 'default' ? 'bg-dark-gradient': 'bg-site-bg';

  // Статическая версия без анимаций при серверном рендеринге
  if (!isMounted) {
    return (
      <section className={cn("py-20", sectionBg, className)}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <SolutionSwitcher
            tabs={solutionTabs}
            defaultTab={activeSolution.id}
            onTabChange={handleSolutionChange}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Левая колонка - информация о решении */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{activeSolution.label} Automation</h3>
              <p className="text-light-gray mb-6">{activeSolution.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {activeSolution.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-light-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {activeSolution.href && (
                <Link href={activeSolution.href}>
                  <Button>
                    {buttonText} {activeSolution.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </Link>
              )}
              
              {/* Ссылки на кейсы, если есть */}
              {activeSolution.caseStudies && activeSolution.caseStudies.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-light-gray mb-2">Related Case Studies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeSolution.caseStudies.map((caseStudy) => (
                      <Link 
                        key={caseStudy.id}
                        href={`/cases/${caseStudy.id}`}
                        className="text-primary text-sm hover:underline"
                      >
                        {caseStudy.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Правая колонка - изображение или визуализация */}
            <div className="rounded-lg overflow-hidden h-80 relative">
              {activeSolution.imageUrl ? (
                <ImageWithFallback
                  src={activeSolution.imageUrl}
                  alt={`${activeSolution.label} solution visualization`}
                  fill
                  className="object-cover"
                  category="solution"
                />
              ) : (
                <div className="absolute inset-0 p-8 flex items-center justify-center bg-medium-gray">
                  <div className="text-center">
                    <div className={`text-primary mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-dark-gray`}>
                      <Icon name={activeSolution.icon} className="h-8 w-8" />
                    </div>
                    <div className="text-light-gray text-sm">
                      Visualization for {activeSolution.label} will be placed here
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Клиентская версия с анимациями
  return (
    <section className={cn("py-20", sectionBg, className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-light-gray max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <SolutionSwitcher
          tabs={solutionTabs}
          defaultTab={activeSolution.id}
          onTabChange={handleSolutionChange}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Левая колонка - информация о решении */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold mb-4">{activeSolution.label} Automation</h3>
            <p className="text-light-gray mb-6">{activeSolution.description}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {activeSolution.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-light-gray">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {activeSolution.href && (
              <Link href={activeSolution.href}>
                <Button>
                  {buttonText} {activeSolution.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </Link>
            )}
            
            {/* Ссылки на кейсы, если есть */}
            {activeSolution.caseStudies && activeSolution.caseStudies.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-light-gray mb-2">Related Case Studies:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeSolution.caseStudies.map((caseStudy) => (
                    <Link 
                      key={caseStudy.id}
                      href={`/cases/${caseStudy.id}`}
                      className="text-primary text-sm hover:underline"
                    >
                      {caseStudy.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Правая колонка - изображение или визуализация */}
          <div className="animate-fadeIn rounded-lg overflow-hidden h-80 relative" style={{ animationDelay: '0.2s' }}>
            {activeSolution.imageUrl ? (
              <ImageWithFallback
                src={activeSolution.imageUrl}
                alt={`${activeSolution.label} solution visualization`}
                fill
                className="object-cover"
                category="solution"
              />
            ) : (
              <div className="absolute inset-0 p-8 flex items-center justify-center bg-medium-gray">
                <div className="text-center">
                  <div className={`text-primary mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-dark-gray`}>
                    <Icon name={activeSolution.icon} className="h-8 w-8" />
                  </div>
                  <div className="text-light-gray text-sm">
                    Visualization for {activeSolution.label} will be placed here
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Компактная версия с отображением только карточек решений
export function CompactSolutionsSection({
  solutions = defaultSolutions.slice(0, 4),
  className,
  title = "Our Solutions",
  viewAllHref = "/services"
}: {
  solutions?: Solution[];
  className?: string;
  title?: string;
  viewAllHref?: string;
}) {
  return (
    <div className={cn("py-10", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-primary hover:underline text-sm font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {solutions.map((solution) => (
          <Link 
            key={solution.id}
            href={solution.href || `/services/${solution.id}`}
            className="bg-dark-gray hover:bg-dark-gray/80 rounded-lg p-5 transition-colors border border-transparent hover:border-primary/20"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-medium-gray flex items-center justify-center text-primary mr-3">
                <Icon name={solution.icon} className="h-5 w-5" />
              </div>
              <h3 className="font-medium">{solution.label}</h3>
            </div>
            <p className="text-light-gray text-sm line-clamp-3">
              {solution.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}