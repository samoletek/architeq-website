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

// Компонент горизонтальных табов
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
    <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
        {solutions.map((solution, index) => (
          <motion.button
            key={solution.id}
            onClick={() => onSolutionClick(index)}
            className={`
              px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg transition-all duration-300 relative group border
              focus:outline-none focus:ring-0 text-xs sm:text-sm md:text-base
              ${activeIndex === index 
                ? 'text-white border-transparent' 
                : 'text-gray-400 hover:text-white border-gray-600/30'
              }
            `}
            whileHover={{ 
              scale: 1.05,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Активное свечение */}
            {activeIndex === index && (
              <motion.div 
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.2) 0%, rgba(178, 75, 243, 0.15) 100%)',
                  boxShadow: '0 0 20px rgba(178, 75, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                layoutId="activeSolutionTab"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(178, 75, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    '0 0 30px rgba(178, 75, 243, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    '0 0 20px rgba(178, 75, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  ]
                }}
                transition={{
                  duration: 0.3,
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            )}
            
            <motion.span 
              className={`
                relative z-10 font-medium text-sm lg:text-base
                ${activeIndex === index ? 'text-white' : ''}
              `}
              style={activeIndex === index ? {
                textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(178,75,243,0.6)'
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

// Компонент для отдельного решения с улучшенными размерами
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
    y: isHovered ? -3 : 0,
    scale: isHovered ? 1.015 : 1,
  };

  return (
    <motion.div 
      className="relative w-full z-10 max-w-6xl mx-auto" 
      style={{ minHeight: '400px' }}
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
          top: '8px',
          left: '8px', 
          right: '-8px',
          bottom: '-8px',
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
            0 8px 32px rgba(119, 71, 207, 0.2),
            0 0 64px rgba(178, 75, 243, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {/* Хаотичное анимированное свечение */}
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            background: [
              `radial-gradient(circle at 30% 70%, rgba(119, 71, 207, 0.4) 0%, transparent 40%),
               radial-gradient(circle at 70% 30%, rgba(178, 75, 243, 0.3) 0%, transparent 40%),
               radial-gradient(circle at 50% 90%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)`,
              `radial-gradient(circle at 80% 20%, rgba(119, 71, 207, 0.3) 0%, transparent 40%),
               radial-gradient(circle at 20% 80%, rgba(178, 75, 243, 0.4) 0%, transparent 40%),
               radial-gradient(circle at 60% 10%, rgba(139, 92, 246, 0.3) 0%, transparent 40%)`,
              `radial-gradient(circle at 10% 30%, rgba(119, 71, 207, 0.4) 0%, transparent 40%),
               radial-gradient(circle at 90% 70%, rgba(178, 75, 243, 0.2) 0%, transparent 40%),
               radial-gradient(circle at 40% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 40%)`,
              `radial-gradient(circle at 30% 70%, rgba(119, 71, 207, 0.4) 0%, transparent 40%),
               radial-gradient(circle at 70% 30%, rgba(178, 75, 243, 0.3) 0%, transparent 40%),
               radial-gradient(circle at 50% 90%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)`
            ]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
        
        {/* Дополнительное свечение по краям */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            boxShadow: [
              `inset 0 0 40px rgba(119, 71, 207, 0.2), inset 0 0 80px rgba(178, 75, 243, 0.1), 0 0 60px rgba(139, 92, 246, 0.3)`,
              `inset 0 0 60px rgba(178, 75, 243, 0.3), inset 0 0 100px rgba(119, 71, 207, 0.15), 0 0 80px rgba(178, 75, 243, 0.4)`,
              `inset 0 0 50px rgba(139, 92, 246, 0.25), inset 0 0 90px rgba(178, 75, 243, 0.12), 0 0 70px rgba(119, 71, 207, 0.35)`,
              `inset 0 0 40px rgba(119, 71, 207, 0.2), inset 0 0 80px rgba(178, 75, 243, 0.1), 0 0 60px rgba(139, 92, 246, 0.3)`
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

      {/* Основная карточка - стеклянная */}
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
          relative rounded-2xl p-6 sm:p-8 md:p-12 overflow-hidden group w-full
          ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
        style={{
          minHeight: '400px',
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
        {/* Контент карточки - компактный */}
        <div className="relative z-10 h-full flex flex-col justify-center md:justify-start">
          {/* Заголовок и подзаголовок - адаптивные */}
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white mb-4 sm:mb-6"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                }}>
              {solution.label}
            </h3>
            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
              {solution.description}
            </p>
          </div>
          
          {/* Возможности - адаптивная сетка */}
          <div className="flex-1 flex flex-col justify-center">
            <h4 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-white text-left max-w-4xl mx-auto"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6)'
                }}>
              Key Features:
            </h4>
            <div className="space-y-4 max-w-xl mx-auto w-full">
              {solution.features.slice(0, 4).map((feature: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -20
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isActive ? index * 0.12 + 0.3 : 0,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="flex items-start"
                >
                  {/* Буллиты с аура-эффектом */}
                  <motion.div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: isActive ? 1 : 0
                    }}
                    transition={{ 
                      scale: { duration: 0.4, delay: isActive ? index * 0.12 + 0.4 : 0, ease: "backOut" }
                    }}
                    style={{
                      boxShadow: isActive ? '0 0 8px rgba(178,75,243,0.8), 0 0 16px rgba(178,75,243,0.5)' : 'none',
                      background: 'radial-gradient(circle, rgba(178,75,243,0.3) 0%, rgba(178,75,243,0.1) 100%)'
                    }}
                  >
                    <motion.div 
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary" 
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: isActive ? [1, 1.5, 1] : 0
                      }}
                      transition={{ 
                        duration: isActive ? 2 : 0.3, 
                        delay: isActive ? index * 0.12 + 0.5 : 0,
                        ease: "easeInOut",
                        repeat: isActive ? Infinity : 0
                      }}
                      style={{
                        boxShadow: isActive ? '0 0 8px rgba(178,75,243,1), 0 0 16px rgba(178,75,243,0.8)' : 'none'
                      }}
                    />
                  </motion.div>
                  <span className="text-white text-sm sm:text-base leading-relaxed text-left opacity-95">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA кнопка - скрытая на десктопе до hover, видимая на мобилке */}
          <div className="mt-6 flex justify-center md:absolute md:bottom-4 md:right-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1,
                scale: 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="block md:hidden"
            >
              {solution.href && (
                <Link href={solution.href}>
                  <Button 
                    variant="primary" 
                    className="text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.2) 0%, rgba(178, 75, 243, 0.15) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 4px 16px rgba(119, 71, 207, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Зеркальный эффект */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    />
                    <span className="flex items-center relative z-10"
                          style={{
                            textShadow: '0 0 10px rgba(255,255,255,0.5)'
                          }}>
                      Learn More
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
            
            {/* Скрытая кнопка для десктопа */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden md:block"
            >
              {solution.href && (
                <Link href={solution.href}>
                  <Button 
                    variant="primary" 
                    className="text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.2) 0%, rgba(178, 75, 243, 0.15) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 4px 16px rgba(119, 71, 207, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Зеркальный эффект */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    />
                    <span className="flex items-center relative z-10"
                          style={{
                            textShadow: '0 0 10px rgba(255,255,255,0.5)'
                          }}>
                      Learn More
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
      className={cn("section-solutions relative overflow-hidden pt-24 pb-32", className)}
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
            <p className="text-sm sm:text-base md:text-lg text-light-gray max-w-4xl mx-auto whitespace-pre-line">
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