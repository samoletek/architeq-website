// src/components/sections/solutions-section.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icon, IconName } from '@/components/ui/icons/icon';
import { cn } from '@/lib/utils/utils';
import { motion } from 'framer-motion'; 

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

// Компонент для отдельного элемента меню
const SolutionMenuItem = ({ 
  solution, 
  isActive, 
  onClick
}: { 
  solution: Solution; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <motion.button
      className={cn(
        "w-full text-left py-5 px-6 rounded-lg mb-5 flex items-center group transition-colors duration-300 relative overflow-hidden focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none",
        isActive 
          ? "bg-dark-purple/20 shadow-neon-glow text-white opacity-100" 
          : "bg-dark-purple/20 hover:bg-dark-purple/40 text-light-gray hover:opacity-90"
      )}
      onClick={onClick}
      whileHover={{ 
        x: 4,
        transition: {
          x: {
            type: "spring",
            stiffness: 500,
            damping: 25,
            mass: 0.5,
            duration: 0.15
          }
        }
      }}
      whileFocus={{ outline: "none" }}
      whileTap={{ outline: "none" }}
    >
      {/* Добавляем свечение в виде абсолютно позиционированного элемента */}
      {isActive && (
        <div className="absolute inset-0 bg-primary/10 rounded-lg filter blur-md opacity-60 -z-10"></div>
      )}
      <div className="w-14 flex justify-center items-center mr-4 flex-shrink-0">
        <Icon name={solution.icon} className={`h-7 w-7 ${isActive ? 'text-white' : 'text-light-gray group-hover:text-white transition-colors duration-100'}`} />
      </div>
      <div className={`font-medium text-xl group-hover:text-shadow-white-soft group-hover:text-white ${isActive ? 'text-white' : 'text-light-gray'} transition-colors duration-100`}>
        {solution.label}
      </div>
    </motion.button>
  );
};


// Компонент для отдельного решения
const SolutionContent = ({ 
  solution, 
  isActive = false 
}: { 
  solution: Solution;
  isActive: boolean;
}) => {
  // Улучшенные анимационные варианты
  const contentVariants = {
    initial: { 
      opacity: 0,
      x: -20,
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: "tween", // Более предсказуемая анимация
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // Плавная кривая анимации
      }
    },
    exit: { 
      opacity: 0,
      x: -10,
      transition: { 
        type: "tween",
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  return (
    <div 
      className="w-full h-full" 
      style={{ display: isActive ? 'block' : 'none' }}
    >
      <motion.div
        key={solution.id}
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full rounded-xl border border-primary/25 shadow-[0_0_15px_rgba(119,71,207,0.15)] bg-dark-purple/20 backdrop-blur-sm p-12 h-full"
      >
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-10 px-2">
            {/* Заголовок */}
            <h3 className="text-3xl font-bold mb-10">
              {solution.label} Automation
            </h3>
            
            {/* Описание */}
            <p className="text-xl text-light-gray leading-relaxed">
              {solution.description}
            </p>
            
            <div className="mt-10">
              {/* Подзаголовок */}
              <h4 className="text-2xl font-semibold mb-10">Key Features:</h4>
              <ul className="space-y-3">
                {solution.features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start text-lg"
                  >
                    <span className="text-primary text-xl mr-3">•</span>
                    <span className="text-light-gray">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-auto pt-12 flex justify-end px-2">
            {solution.href && (
              <Link href={solution.href}>
             <Button size="lg" className="px-8 py-5 text-lg focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none">
              Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-6 ml-2"
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function SolutionsSection({
  title = "Our Solutions",
  subtitle = "We offer smart automation that adapts and scales — for faster, \nclearer, more connected workflows. Explore our services.",
  solutions = defaultSolutions,
  className,
  defaultSolutionId,
}: SolutionsSectionProps) {
  // Состояние для отслеживания активного решения
  const [activeSolutionId, setActiveSolutionId] = useState<string>(
    defaultSolutionId || solutions[0].id
  );

  // Состояние для отслеживания видимости секции
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current; // Сохраняем ссылку в локальную переменную
    
    // Функция для отслеживания видимости элемента
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Отключаем наблюдение после первого появления элемента
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px'
      }
    );
  
    // Начинаем наблюдение за секцией
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    // Очистка observer при размонтировании компонента
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Функция для переключения активного решения
  const setActiveSolution = (id: string) => {
    setActiveSolutionId(id);
  };

  // Функция определения высоты экрана для полноэкранной секции
  const [screenHeight, setScreenHeight] = useState('100vh');
  
  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(`${window.innerHeight}px`);
    };
  
    // Установить высоту при загрузке
    updateScreenHeight();
    
    // Обновлять высоту при изменении размера окна
    window.addEventListener('resize', updateScreenHeight);
    
    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);

  // Варианты анимации для заголовка
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

  // Варианты анимации для меню
  const menuVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        delay: 0.3,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  // Варианты анимации для содержимого
  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        delay: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className={cn("section-solutions relative overflow-hidden", className)}
      style={{ minHeight: screenHeight }}
    >
      <div className="absolute inset-0 bg-dark-purple/5">
        {/* Декоративные элементы фона */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-secondary/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full py-8">
        <div className="container mx-auto px-4 mb-12">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">{title}</h2>
            <p className="text-lg md:text-base text-light-gray max-w-4xl mx-auto whitespace-pre-line">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-4 mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Навигационное меню */}
            <motion.div 
              className="lg:col-span-4"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={menuVariants}
            >
              <div className="bg-dark-purple/30 p-6 rounded-xl border border-primary/25 shadow-[0_0_15px_rgba(119,71,207,0.15)] overflow-hidden relative" style={{ height: "562px" }}>
                {/* Эффект свечения для всего блока */}
                <div className="absolute -inset-5 bg-primary/5 rounded-full blur-3xl opacity-20 -z-10 animate-pulse-slow"></div>
                
                <div className="space-y-3">
                  {solutions.map((solution) => (
                    <SolutionMenuItem 
                      key={solution.id}
                      solution={solution}
                      isActive={activeSolutionId === solution.id}
                      onClick={() => setActiveSolution(solution.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Правая колонка с фиксированной высотой для предотвращения скачков */}
            <motion.div 
              className="lg:col-span-8 relative"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={contentVariants}
            >
              <div className="min-h-[650px]">
                {solutions.map((solution) => (
                  <SolutionContent
                    key={solution.id}
                    solution={solution}
                    isActive={activeSolutionId === solution.id}
                  />
                ))}
              </div>
            </motion.div>
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