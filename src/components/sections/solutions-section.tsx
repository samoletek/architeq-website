// src/components/sections/solutions-section.tsx - Исправленная версия с улучшенными размерами и без ошибок
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icon, IconName } from '@/components/ui/icons/icon';
import { cn } from '@/lib/utils/utils';
import { motion, AnimatePresence } from 'framer-motion'; 

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
}

// Данные о решениях для каждого сервиса
const serviceSolutions = {
  'business-process': [
    { title: "Process Mapping & Analysis", description: "Analyze workflows to identify bottlenecks and automation opportunities." },
    { title: "Workflow Optimization", description: "Design efficient processes that eliminate manual steps and reduce cycle times." },
    { title: "System Integration", description: "Connect disparate tools to create seamless data flow across operations." },
    { title: "Custom Automation Scripts", description: "Build intelligent automation that adapts to your specific business logic." }
  ],
  'crm-integration': [
    { title: "Custom CRM Development", description: "Build tailored CRM systems designed specifically for your workflows." },
    { title: "Data Migration & Cleanup", description: "Transfer and organize existing data into your new centralized system." },
    { title: "Multi-Platform Sync", description: "Keep all your tools connected with real-time bidirectional data flow." },
    { title: "Analytics & Reporting", description: "Create custom dashboards that provide actionable business insights." }
  ],
  'boxed-solutions': [
    { title: "Industry Templates", description: "Pre-configured workflows designed for your specific industry sector." },
    { title: "Rapid Deployment", description: "Fast implementation with minimal disruption to current operations." },
    { title: "Custom Configuration", description: "Tailored setup that matches your unique business requirements." },
    { title: "Scalable Architecture", description: "Solutions that grow with your business and adapt to changes." }
  ],
  'ai-solutions': [
    { title: "AI Voice Assistants", description: "Intelligent voice interaction for improved customer communication." },
    { title: "Conversation Analytics", description: "Real-time transcription and analysis of customer interactions." },
    { title: "Smart Data Processing", description: "Automated extraction and organization of information from conversations." },
    { title: "Predictive Insights", description: "AI-driven recommendations based on conversation patterns and data." }
  ],
  'documentation': [
    { title: "Template-Based Generation", description: "Automatic document creation using predefined templates and CRM data." },
    { title: "E-Signature Integration", description: "Streamlined signing processes with real-time status tracking." },
    { title: "Compliance Management", description: "Ensure all documents meet regulatory requirements automatically." },
    { title: "Version Control", description: "Automated tracking and management of document revisions." }
  ],
  'finance': [
    { title: "Invoice Automation", description: "Generate and send invoices automatically based on CRM triggers." },
    { title: "Payment Tracking", description: "Real-time monitoring of payment status and automated follow-ups." },
    { title: "Financial Reporting", description: "Custom dashboards and reports for comprehensive financial visibility." },
    { title: "System Reconciliation", description: "Automatic matching and synchronization across financial platforms." }
  ]
};

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
      'Cross-platform consistency',
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

// Компонент элегантных горизонтальных табов
function SolutionNavigation({ 
  solutions, 
  activeIndex, 
  onSolutionClick 
}: { 
  solutions: Solution[];
  activeIndex: number;
  onSolutionClick: (index: number) => void;
}) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex flex-wrap justify-center gap-6 sm:gap-8 relative">
        {solutions.map((solution, index) => (
          <motion.button
            key={solution.id}
            onClick={() => onSolutionClick(index)}
            className={`
              relative px-4 py-3 font-medium transition-all duration-300
              focus:outline-none focus:ring-0 text-sm sm:text-base
              ${activeIndex === index 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
              }
            `}
            style={{
              background: activeIndex === index ? 
                'linear-gradient(135deg, rgba(119, 71, 207, 0.3) 0%, rgba(178, 75, 243, 0.2) 100%)' :
                'transparent',
              border: activeIndex === index ? 
                '1px solid rgba(119, 71, 207, 0.4)' :
                '1px solid transparent',
              borderRadius: '12px',
              backdropFilter: activeIndex === index ? 'blur(10px)' : 'none'
            }}
            whileHover={{ 
              scale: 1.05,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            
            <motion.span 
              className="relative z-10 font-semibold whitespace-nowrap"
              style={activeIndex === index ? {
                textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 25px rgba(178,75,243,0.6)'
              } : {}}
            >
              {solution.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Компонент для отдельного решения в стиле Services page с оптимизированной высотой
const SolutionContent = ({ 
  solution, 
  isActive = false,
  direction,
  isHovered,
  onHover 
}: { 
  solution: Solution;
  isActive: boolean;
  direction: 'up' | 'down' | 'none';
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}) => {
  const [isExploreButtonHovered, setIsExploreButtonHovered] = useState(false);
  const cardVariants = {
    enter: () => ({
      opacity: 0,
      scale: 0.98,
      y: 8
    }),
    center: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: () => ({
      opacity: 0,
      scale: 0.98,
      y: -8
    }),
  };

  const hoverAnimation = {
    y: isHovered ? -2 : 0,
    scale: isHovered ? 1.01 : 1,
  };

  // Получаем данные для текущего решения
  const currentSolutions = serviceSolutions[solution.id as keyof typeof serviceSolutions] || [];

  return (
    <motion.div 
      className="relative w-full z-10 max-w-7xl mx-auto" 
      style={{ height: 'auto', maxHeight: '70vh' }}
      animate={hoverAnimation}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Фоновый слой с анимированными сферами */}
      <motion.div
        key={`${solution.id}-bg`}
        custom={direction}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ 
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.4 },
          y: { duration: 0.5 }
        }}
        className="absolute inset-0 rounded-2xl overflow-hidden -z-10"
        style={{
          top: '6px',
          left: '6px', 
          right: '-6px',
          bottom: '-6px',
          background: `
            radial-gradient(circle at 20% 80%, rgba(119, 71, 207, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(178, 75, 243, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(23, 10, 36, 0.6) 0%, rgba(21, 9, 32, 0.7) 50%, rgba(18, 7, 26, 0.8) 100%)
          `,
          border: '1px solid rgba(119, 71, 207, 0.15)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: `
            0 6px 24px rgba(119, 71, 207, 0.2),
            0 0 40px rgba(178, 75, 243, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {/* Хаотичное анимированное свечение */}
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            background: [
              `radial-gradient(circle at 30% 70%, rgba(119, 71, 207, 0.3) 0%, transparent 40%),
               radial-gradient(circle at 70% 30%, rgba(178, 75, 243, 0.25) 0%, transparent 40%),
               radial-gradient(circle at 50% 90%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)`,
              `radial-gradient(circle at 80% 20%, rgba(119, 71, 207, 0.25) 0%, transparent 40%),
               radial-gradient(circle at 20% 80%, rgba(178, 75, 243, 0.3) 0%, transparent 40%),
               radial-gradient(circle at 60% 10%, rgba(139, 92, 246, 0.25) 0%, transparent 40%)`,
              `radial-gradient(circle at 30% 70%, rgba(119, 71, 207, 0.3) 0%, transparent 40%),
               radial-gradient(circle at 70% 30%, rgba(178, 75, 243, 0.25) 0%, transparent 40%),
               radial-gradient(circle at 50% 90%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)`
            ]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      </motion.div>

      {/* Основная карточка с двухколоночным макетом */}
      <motion.div
        key={solution.id}
        custom={direction}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ 
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.4 },
          y: { duration: 0.5 }
        }}
        className={`
          relative rounded-2xl p-10 sm:p-12 lg:p-16 overflow-hidden group w-full
          ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
        style={{
          width: '100%',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        {/* Заголовок решения */}
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white mb-3"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {solution.label}
          </h3>
          <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto opacity-90">
            {solution.description}
          </p>
        </div>

        {/* Двухколоночный контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Левая колонка - Our Solutions */}
          <div className="space-y-4">
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6)'
                }}>
              Our Solutions
            </h4>
            <div className="space-y-3">
              {currentSolutions.slice(0, 3).map((sol: {title: string, description: string}, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -20
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isActive ? index * 0.1 + 0.2 : 0,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="bg-white/5 rounded-lg p-2.5 backdrop-blur-sm border border-white/10"
                >
                  <h5 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-secondary mr-2 flex-shrink-0"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    />
                    {sol.title}
                  </h5>
                  <p className="text-gray-400 text-xs sm:text-sm leading-snug">
                    {sol.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Правая колонка - Key Features */}
          <div className="space-y-4">
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6)'
                }}>
              Key Features
            </h4>
            <div className="space-y-3">
              {solution.features.slice(0, 4).map((feature: string, index: number) => (
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
                  className="flex items-start group cursor-pointer"
                  whileHover={{ x: -4 }}
                >
                  {/* Галочки без кругов */}
                  <motion.div 
                    className="mr-3 mt-0.5 flex-shrink-0"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: isActive ? 1 : 0,
                      rotate: isActive ? 0 : -180
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: isActive ? index * 0.1 + 0.4 : 0,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className="text-secondary text-2xl font-bold"
                      animate={{
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      style={{
                        textShadow: '0 0 10px rgba(176, 255, 116, 0.6)',
                        fontSize: '1.5rem'
                      }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                  <span className="text-base sm:text-lg font-medium leading-relaxed transition-colors duration-300 text-white font-inter">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* View Cases Button под Key Features */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.9
              }}
              transition={{ duration: 0.3, delay: 0.7, ease: "easeOut" }}
            >
              <Link href="/cases">
                <div className={`flex items-center font-medium text-sm py-2 px-3 transition-all duration-300 hover:opacity-80 ${
                  isExploreButtonHovered ? 'text-secondary' : 'text-gray-400'
                }`}>
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-secondary mr-2"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span>View Cases</span>
                </div>
              </Link>
            </motion.div>
            
            {/* Explore Solution Button под View Cases */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.9
              }}
              transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
            >
              {solution.href && (
                <Link href={solution.href}>
                  <Button 
                    variant="primary" 
                    className="text-sm py-2.5 px-5 transition-all duration-300 relative overflow-hidden group w-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.3) 0%, rgba(178, 75, 243, 0.2) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 16px rgba(119, 71, 207, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={() => setIsExploreButtonHovered(true)}
                    onMouseLeave={() => setIsExploreButtonHovered(false)}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    />
                    <span className="flex items-center justify-center relative z-10"
                          style={{
                            textShadow: '0 0 10px rgba(255,255,255,0.5)'
                          }}>
                      Explore Solution
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
              )}
            </motion.div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export function SolutionsSection({
  title = "Our Solutions",
  subtitle = "We offer smart automation that adapts and scales — for faster, \nclearer, more connected workflows. Explore our services.",
  solutions = defaultSolutions,
  className,
  defaultSolutionId,
}: SolutionsSectionProps) {
  // Состояние для отслеживания активного решения по индексу
  const [activeIndex, setActiveIndex] = useState<number>(
    defaultSolutionId ? solutions.findIndex(s => s.id === defaultSolutionId) || 0 : 0
  );
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');
  const [isHovered, setIsHovered] = useState(false);

  // Состояние для отслеживания видимости секции
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Функция для переключения активного решения
  const handleSolutionClick = (index: number) => {
    if (index === activeIndex) return;
    
    setDirection(index > activeIndex ? 'down' : 'up');
    setActiveIndex(index);
  };

  // Варианты анимации
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

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.0,
        delay: 0.3,
        ease: [0.1, 0.3, 0.2, 1]
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className={cn("section-solutions relative overflow-hidden py-16 sm:py-20", className)}
    >
      <div className="absolute inset-0 bg-dark-purple/5">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-secondary/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full py-6">
        <div className="container mx-auto px-4 mb-12">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 md:mb-12">{title}</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-4xl mx-auto whitespace-pre-line">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Контент с горизонтальными табами */}
        <motion.div 
          className="container mx-auto px-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={contentVariants}
        >
          {/* Горизонтальная навигация */}
          <SolutionNavigation 
            solutions={solutions}
            activeIndex={activeIndex}
            onSolutionClick={handleSolutionClick}
          />

          {/* Центрированная карточка с адаптивным отступом */}
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-14">
            <AnimatePresence mode="wait" custom={direction}>
              <SolutionContent
                key={activeIndex}
                solution={solutions[activeIndex]}
                isActive={true}
                direction={direction}
                isHovered={isHovered}
                onHover={setIsHovered}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Компактная версия остается без изменений
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
    <div className={cn("py-8", className)}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-primary hover:underline text-sm font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {solutions.map((solution) => (
          <Link 
            key={solution.id}
            href={solution.href || `/services/${solution.id}`}
            className="bg-dark-gray hover:bg-dark-gray/80 rounded-lg p-4 transition-colors border border-transparent hover:border-primary/20"
          >
            <div className="flex items-center mb-2">
              <div className="mr-2 text-primary">
                <Icon name={solution.icon} className="h-4 w-4" />
              </div>
              <h3 className="font-medium text-base">{solution.label}</h3>
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