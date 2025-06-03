// src/components/sections/solutions-section.tsx
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

// Компонент для отдельного элемента меню - адаптирован для мобильных
const SolutionMenuItem = ({ 
  solution, 
  isActive, 
  onClick,
  isMobile
}: { 
  solution: Solution; 
  isActive: boolean; 
  onClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "w-full text-left rounded-lg flex items-center group transition-all duration-300 relative overflow-hidden cursor-pointer",
        isMobile 
          ? "py-3 px-4 mb-2" 
          : "py-4 px-6 mb-3",
        isActive 
          ? "text-white" 
          : "text-light-gray hover:text-white"
      )}
      onClick={onClick}
      whileHover={!isMobile ? { 
        x: 8,
        transition: {
          type: "spring",
          stiffness: 800,
          damping: 15,
          mass: 0.2,
          velocity: 10,
          restDelta: 0.001,
          duration: 0
        }
      } : undefined}
    >
      {/* Эффект свечения для активного элемента */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg -z-10"
          animate={{ 
            opacity: [0.5, 0.7, 0.5], 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      )}
      
      <div className={cn(
        "flex justify-center items-center flex-shrink-0",
        isMobile ? "w-8 mr-3" : "w-12 mr-4"
      )}>
        <motion.div
          animate={isActive ? {
            scale: [1, 1.05, 1],
            filter: ["drop-shadow(0 0 8px rgba(178, 75, 243, 0.4))", "drop-shadow(0 0 12px rgba(178, 75, 243, 0.6))", "drop-shadow(0 0 8px rgba(178, 75, 243, 0.4))"],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon 
            name={solution.icon} 
            className={cn(
              isMobile ? "h-5 w-5" : "h-6 w-6",
              isActive 
                ? 'text-primary neon-glow' 
                : 'text-light-gray group-hover:text-white transition-colors duration-300'
            )} 
          />
        </motion.div>
      </div>
      
      <div className="flex-grow">
        <motion.div 
          className={cn(
            "font-medium transition-all duration-300",
            isMobile ? "text-base" : "text-lg",
            isActive 
              ? "text-white primary-text" 
              : "text-light-gray group-hover:text-white"
          )}
          animate={isActive ? {
            textShadow: ["0 0 4px rgba(178, 75, 243, 0.3)", "0 0 8px rgba(178, 75, 243, 0.5)", "0 0 4px rgba(178, 75, 243, 0.3)"]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {solution.label}
        </motion.div>
      </div>
      
      {isActive && !isMobile && (
        <motion.div 
          className="w-1.5 h-10 rounded-full bg-primary ml-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            boxShadow: ["0 0 5px rgba(178, 75, 243, 0.5)", "0 0 15px rgba(178, 75, 243, 0.7)", "0 0 5px rgba(178, 75, 243, 0.5)"]
          }}
          transition={{
            duration: 0.3,
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      )}
    </motion.div>
  );
};

// Компонент для стилизованного bullet point
const GlowingBulletPoint = ({ text, index = 0, isMobile }: { text: string; index: number; isMobile: boolean }) => {
  const keyWords = [
    `Clear roadmap for implementation`,`End-to-end workflow automation`,`System integration & error-proof data flow`, `Custom dashboards for live insights`, `Smart validation & fail-safes`
  ];
  
  const highlightKeywords = (text: string) => {
    let highlightedText = text;
    
    keyWords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex, 
        `<span class="text-white font-medium">${keyword}</span>`
      );
    });
    
    return highlightedText;
  };
  
  return (
    <motion.li 
      className={cn(
        "flex items-start mb-4 last:mb-0",
        isMobile ? "text-sm" : "text-lg"
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 0.3 + (index * 0.15),
        ease: [0.1, 0.6, 0.3, 1]
      }}
    >
      <motion.div 
        className="relative flex-shrink-0 mr-3 sm:mr-4 mt-1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
        }}
        transition={{ 
          duration: 0.3,
          delay: 0.3 + (index * 0.15) + 0.1,
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.3 + (index * 0.15) + 0.3
          }}
        >
          <div className="w-2 h-2 rounded-full bg-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-2 h-2 rounded-full bg-secondary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[2px]"></div>
          <div className="w-6 h-6 rounded-full bg-secondary/30 blur-[3px]"></div>
        </motion.div>
      </motion.div>
      
      <motion.span 
        className="text-white/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3,
          delay: 0.3 + (index * 0.15) + 0.1
        }}
        dangerouslySetInnerHTML={{ __html: highlightKeywords(text) }}
      />
    </motion.li>
  );
}

// Компонент для отдельного решения - адаптирован для мобильных
const SolutionContent = ({ 
  solution,
  isMobile = false
}: { 
  solution: Solution;
  isMobile: boolean;
}) => {
  const contentVariants = {
    initial: { 
      opacity: 0,
      x: 40,
      y: 0
    },
    animate: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: { 
        type: "tween", 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: () => ({
      opacity: 0,
      x: -40,
      y: 0,
      transition: { 
        type: "tween",
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={contentVariants}
      className={cn(
        "w-full rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(119,71,207,0.2)] bg-gradient-to-bl from-[#12071A] to-[#170A24] backdrop-blur-sm h-full relative overflow-hidden",
        isMobile ? "p-6" : "p-14"
      )}
    >
      {/* Насыщенное темное свечение */}
      <div className="absolute -inset-2 bg-gradient-to-br from-[#1F0A2E]/40 via-[#180033]/35 to-[#121212]/50 rounded-xl blur-xl -z-10"></div>
      <motion.div 
        className="absolute -inset-2 bg-gradient-to-br from-[#1F0A2E]/30 via-[#180033]/25 to-[#121212]/40 rounded-xl blur-xl -z-10"
        animate={{ 
          opacity: [0.6, 0.9, 0.6] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <div className="flex flex-col h-full relative z-10">
        <div className={cn(
          "space-y-6 sm:space-y-8",
          isMobile ? "" : "px-2"
        )}>
          {/* Заголовок */}
          <h3 className={cn(
            "font-bold text-white",
            isMobile ? "text-xl sm:text-2xl mb-4" : "text-3xl mb-8"
          )}>
            {solution.label}
          </h3>
          
          {/* Описание */}
          <p className={cn(
            "text-white/90 leading-relaxed",
            isMobile ? "text-sm sm:text-base" : "text-xl"
          )}>
            {solution.description}
          </p>
          
          <div className={isMobile ? "mt-6" : "mt-8"}>
            {/* Подзаголовок */}
            <motion.h4 
              className={cn(
                "font-semibold text-white",
                isMobile ? "text-lg mb-4" : "text-2xl mb-8"
              )}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4,
                delay: 0.2,
                ease: [0.25, 0.4, 0.3, 1]
              }}
            >
              Key Features:
            </motion.h4>
            
            {/* Список возможностей */}
            <motion.ul 
              className="space-y-3"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {solution.features.map((feature, index) => (
                <GlowingBulletPoint 
                  key={index} 
                  text={feature} 
                  index={index} 
                  isMobile={isMobile}
                />
              ))}
            </motion.ul>
          </div>
        </div>
        
        <div className={cn(
          "mt-auto flex",
          isMobile ? "justify-center pt-6" : "justify-end pt-10 px-2"
        )}>
          {solution.href && (
            <Link href={solution.href}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={!isMobile ? { 
                  scale: 1.05,
                  filter: "brightness(1.1)"
                } : undefined}
                whileTap={!isMobile ? { 
                  scale: 0.98 
                } : undefined}
                transition={{ 
                  initial: {
                    duration: 1,
                    delay: 0.3 + (solution.features.length * 0.15) + 0.2,
                    ease: [0.1, 0.6, 0.3, 1]
                  },
                  whileHover: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.5
                  }
                }}
                className="relative"
              >
                {/* Эффект свечения для кнопки */}
                <motion.div 
                  className="absolute inset-0 bg-secondary/30 rounded-full blur-lg z-0"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    boxShadow: [
                      "0 0 15px 3px rgba(176, 255, 116, 0.4)",
                      "0 0 30px 6px rgba(176, 255, 116, 0.6)",
                      "0 0 15px 3px rgba(176, 255, 116, 0.4)"
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3 + (solution.features.length * 0.15) + 0.2
                  }}
                />
                
                <Button 
                  size={isMobile ? "default" : "lg"} 
                  className={cn(
                    "bg-secondary text-gray-900 hover:bg-opacity-100 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none relative z-10",
                    isMobile ? "px-6 py-3 text-sm" : "px-8 py-5 text-lg"
                  )}
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(
                      "ml-2",
                      isMobile ? "h-3 w-5" : "h-3 w-6"
                    )}
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
              </motion.div>
            </Link>
          )}
        </div>
      </div>
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
  const [activeSolutionId, setActiveSolutionId] = useState<string>(
    defaultSolutionId || solutions[0].id
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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

  const setActiveSolution = (id: string) => {
    setActiveSolutionId(id);
  };

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

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2,
        delay: 0.5,
        ease: [0.1, 0.3, 0.2, 1]
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className={cn("section-solutions relative overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-dark-purple/5">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-secondary/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto mb-8 sm:mb-12">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="font-bold mb-6 sm:mb-8 md:mb-12">{title}</h2>
            <p className="text-sm sm:text-base md:text-lg text-light-gray max-w-4xl mx-auto whitespace-pre-line">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Мобильная версия - вертикальный список */}
        {isMobile ? (
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={menuVariants}
              className="mb-6"
            >
              <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl border border-primary/20 p-4">
                {solutions.map((solution) => (
                  <SolutionMenuItem 
                    key={solution.id}
                    solution={solution}
                    isActive={activeSolutionId === solution.id}
                    onClick={() => setActiveSolution(solution.id)}
                    isMobile={true}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={contentVariants}
            >
              <AnimatePresence mode="wait" initial={false}> 
                {solutions.map((solution) => (
                  activeSolutionId === solution.id && (
                    <SolutionContent
                      key={solution.id}
                      solution={solution}
                      isMobile={true}
                    />
                  )
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          /* Десктопная версия - оригинальный макет */
          <div className="container mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10">
              {/* Навигационное меню */}
              <motion.div 
                className="lg:col-span-3"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={menuVariants}
              >
                <div 
                  className="relative p-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(119,71,207,0.2)] overflow-hidden flex flex-col justify-center bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] before:absolute before:content-[''] before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,_rgba(119,71,207,0.05)_0%,_transparent_70%)] backdrop-blur-sm"
                  style={{ minHeight: "550px", maxHeight: "650px" }}
                >
                  {/* Эффект свечения */}
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-br from-[#1F0A2E]/40 via-[#180033]/35 to-[#121212]/50 rounded-xl blur-lg -z-10"
                    animate={{ 
                      opacity: [0.5, 0.8, 0.5], 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                  
                  <div className="space-y-4">
                    {solutions.map((solution) => (
                      <SolutionMenuItem 
                        key={solution.id}
                        solution={solution}
                        isActive={activeSolutionId === solution.id}
                        onClick={() => setActiveSolution(solution.id)}
                        isMobile={false}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Правая колонка */}
              <motion.div 
                className="lg:col-span-7 relative"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={contentVariants}
              >
                <div style={{ minHeight: "550px", maxHeight: "650px" }}>
                  <AnimatePresence mode="wait" initial={false}> 
                    {solutions.map((solution) => (
                      activeSolutionId === solution.id && (
                        <SolutionContent
                          key={solution.id}
                          solution={solution}
                          isMobile={false}
                        />
                      )
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Компактная версия
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
