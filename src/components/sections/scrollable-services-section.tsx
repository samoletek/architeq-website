// src/components/sections/scrollable-services-section.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Данные о услугах (те же, что и на текущей странице)
const services = [
  {
    id: 'business-process',
    title: 'Workflow Design & Automation',
    description: 'We reengineer core business processes by removing manual steps, syncing tools, and building flexible, intelligent workflows.',
    icon: 'process',
    features: [
      'Workflow mapping and optimizing',
      'Clear roadmap for implementation', 
      'End-to-end workflow automation',
      'System integration & error-proof data flow',
      'Custom dashboards for live insights'
    ],
    caseStudies: ['monday-integration', 'notification-system']
  },
  {
    id: 'crm-integration',
    title: 'CRM Integration',
    description: 'No more scattered data — we build your first real CRM and turn your operations into a unified ecosystem with full visibility, structure, and flow across tools, teams, and touchpoints.',
    icon: 'crm',
    features: [
      'Centralized CRM built from scratch — fully tailored to your workflows',
      'Wide integration capabilities',
      'Cross-platform consistency',
      'Document management automation',
      'Customizable insight dashboards'
    ],
    caseStudies: ['monday-integration', 'dashboards-creation']
  },
  {
    id: 'boxed-solutions',
    title: 'Industry-Specific Boxed Solutions',
    description: 'Ready-to-run automation kits tailored to your industry — deployed fast, scaled smart, and of course fully customized for your edge.',
    icon: 'industry',
    features: [
      'Pre-configured workflows for key sectors',
      'Custom fields & data structure',
      'Industry-specific integrations',
      'Scalable & field-proven automations',
      'Fast deployment'
    ],
    caseStudies: ['car-hauling-solution', 'music-label-solution']
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    description: 'Use AI to surface insight and automate high-effort tasks — from client comms to operations logic. Use AI to automate what truly matters — from client comms to operations logic, only where it drives real value.',
    icon: 'ai',
    features: [
      'AI-driven voice assistants',
      'CRM-integrated assistant',
      'Real-time conversation transcription',
      'Scalable and customizable solutions',
      'Quick and efficient deployment'
    ],
    caseStudies: ['ai-voice-bot', 'ai-crm-assistant']
  },
  {
    id: 'documentation',
    title: 'Automated Document Flow',
    description: 'We automate your entire document flow — creation, approval, compliance — all in sync with your CRM, tools and teams, using our pre-built document generation tools.',
    icon: 'document',
    features: [
      'Auto-generation from CRM templates',
      'E-signature & approval flows',
      'Smart forms & structured capture',
      'Document version control',
      'Regulatory compliance built-in'
    ],
    caseStudies: ['document-generation', 'electronic-signatures']
  },
  {
    id: 'finance',
    title: 'Finance Operations Automation',
    description: 'Connect and automate your full financial stack — from invoicing to reconciliation — for faster, cleaner, and error-free money flow.',
    icon: 'finance',
    features: [
      'Smart invoice generation',
      'Real-time payment tracking & reconciliation',
      'Seamless accounting system integration',
      'Financial dashboards & custom reports',
      'Multi-currency, multi-market, and multi-payment method support'
    ],
    caseStudies: ['stripe-invoicing', 'quickbooks-integration']
  }
];

interface ServiceNavigationProps {
  services: typeof services;
  activeIndex: number;
  onServiceClick: (index: number) => void;
}

// Компонент боковой навигации
function ServiceNavigation({ services, activeIndex, onServiceClick }: ServiceNavigationProps) {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
      <div className="bg-dark-gray/80 backdrop-blur-sm rounded-2xl p-6 border border-secondary/30">
        <h3 className="text-lg font-bold text-secondary mb-6">Solutions</h3>
        <nav className="space-y-4">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => onServiceClick(index)}
              className={`
                block w-full text-left p-3 rounded-lg transition-all duration-300
                ${activeIndex === index 
                  ? 'bg-secondary/20 text-secondary border border-secondary/50' 
                  : 'text-light-gray hover:text-secondary hover:bg-secondary/10'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-2 h-2 rounded-full mr-3 transition-all duration-300
                  ${activeIndex === index ? 'bg-secondary' : 'bg-light-gray/30'}
                `} />
                <span className="text-sm font-medium leading-tight">
                  {service.title}
                </span>
              </div>
            </button>
          ))}
        </nav>
        
        {/* Прогресс-бар */}
        <div className="mt-6 pt-4 border-t border-secondary/20">
          <div className="flex items-center justify-between text-xs text-light-gray mb-2">
            <span>Progress</span>
            <span>{activeIndex + 1}/{services.length}</span>
          </div>
          <div className="w-full bg-dark-gray rounded-full h-1">
            <motion.div 
              className="bg-secondary h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface HorizontalServiceCardProps {
  service: typeof services[0];
  isActive: boolean;
}

// Горизонтальная карточка услуги
function HorizontalServiceCard({ service, isActive }: HorizontalServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        absolute inset-0 bg-dark-gradient rounded-2xl p-12
        border-2 border-primary/50 hover:border-primary/70
        ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
      style={{
        boxShadow: '0 1px 30px rgba(0, 0, 0, 0.1), 0 0 18px rgba(178, 75, 243, 0.4)',
      }}
    >
      {/* Фиолетовый градиент снизу */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent rounded-b-2xl" />
      
      {/* Контент карточки */}
      <div className="relative z-10 h-full grid grid-cols-12 gap-12 items-center">
        
        {/* Левая колонка - основная информация */}
        <div className="col-span-7">
          <div className="flex items-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-primary mr-6">
              {renderServiceIcon(service.icon)}
            </div>
            <h3 className="text-4xl font-bold text-white leading-tight">
              {service.title}
            </h3>
          </div>
          
          <p className="text-light-gray text-xl leading-relaxed mb-10">
            {service.description}
          </p>
          
          <Link href={`/services/${service.id}`}>
            <Button 
              variant="primary" 
              size="lg"
              className="transition-all duration-300"
            >
              <span className="flex items-center">
                Learn More About This Solution
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
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
              </span>
            </Button>
          </Link>
        </div>
        
        {/* Правая колонка - возможности */}
        <div className="col-span-5">
          <h4 className="text-xl font-bold mb-6 text-primary">
            Core Capabilities:
          </h4>
          <div className="space-y-4">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 20
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: isActive ? index * 0.1 + 0.3 : 0,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="flex items-start"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-light-gray text-lg leading-relaxed">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrollableServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Обработчик прокрутки
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const handleScroll = (event: WheelEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 0 && rect.bottom >= window.innerHeight;
      
      if (isInSection && !isScrolling) {
        event.preventDefault();
        
        setIsScrolling(true);
        
        // Определяем направление прокрутки
        const delta = event.deltaY;
        
        if (delta > 0 && activeIndex < services.length - 1) {
          // Прокрутка вниз
          setActiveIndex(prev => prev + 1);
        } else if (delta < 0 && activeIndex > 0) {
          // Прокрутка вверх
          setActiveIndex(prev => prev - 1);
        }
        
        // Сброс блокировки прокрутки
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      }
    };
    
    const section = sectionRef.current;
    section.addEventListener('wheel', handleScroll, { passive: false });
    
    return () => {
      if (section) {
        section.removeEventListener('wheel', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeIndex, isScrolling]);
  
  // Функция для переключения услуги из навигации
  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-site-bg overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Заголовок секции */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="section-title-large font-bold text-white mb-6"
            >
              Solutions We Architect
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-light-gray text-xl max-w-3xl mx-auto"
            >
              From CRM integration to AI-powered automation, we provide solutions to address all aspects of your business operations.
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Основная область контента */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-12 h-[600px]">
            
            {/* Область карточек - 70% */}
            <div className="col-span-8 relative">
              <AnimatePresence mode="wait">
                {services.map((service, index) => (
                  <HorizontalServiceCard
                    key={service.id}
                    service={service}
                    isActive={index === activeIndex}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Боковая навигация */}
      <ServiceNavigation 
        services={services}
        activeIndex={activeIndex}
        onServiceClick={handleServiceClick}
      />
      
      {/* Индикатор прокрутки внизу */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-2 text-light-gray">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Функция для рендеринга иконок (та же, что и в оригинале)
function renderServiceIcon(icon: string) {
  const iconProps = { className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 };
  
  switch (icon) {
    case 'process':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'crm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'industry':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'ai':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'document':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'finance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
  }
}