"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SiteLayout from '@/components/layout/site-layout';
import EnhancedProcessSection from '@/components/sections/enhanced-process-section';
import ParallaxAuraBackground from '@/components/ui/effects/parallax-aura-background';

// Типы для данных о услугах
interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

// Данные о услугах
const services: Service[] = [
  {
    id: 'business-process',
    title: 'Workflow Design & Automation',
    description: 'We reengineer core business processes by removing manual steps, syncing tools, and building flexible, intelligent workflows.',
    features: [
      'Workflow mapping and optimizing',
      'Clear roadmap for implementation', 
      'End-to-end workflow automation',
      'System integration & error-proof data flow',
      'Custom dashboards for live insights'
    ]
  },
  {
    id: 'crm-integration',
    title: 'CRM Integration',
    description: 'No more scattered data — we build your first real CRM and turn your operations into a unified ecosystem with full visibility, structure, and flow across tools, teams, and touchpoints.',
    features: [
      'Centralized CRM built from scratch — fully tailored to your workflows',
      'Wide integration capabilities',
      'Cross-platform consistency',
      'Document management automation',
      'Customizable insight dashboards'
    ]
  },
  {
    id: 'boxed-solutions',
    title: 'Industry-Specific Boxed Solutions',
    description: 'Ready-to-run automation kits tailored to your industry — deployed fast, scaled smart, and of course fully customized for your edge.',
    features: [
      'Pre-configured workflows for key sectors',
      'Custom fields & data structure',
      'Industry-specific integrations',
      'Scalable & field-proven automations',
      'Fast deployment'
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    description: 'Use AI to surface insight and automate high-effort tasks — from client comms to operations logic. Use AI to automate what truly matters — from client comms to operations logic, only where it drives real value.',
    features: [
      'AI-driven voice assistants',
      'CRM-integrated assistant',
      'Real-time conversation transcription',
      'Scalable and customizable solutions',
      'Quick and efficient deployment'
    ]
  },
  {
    id: 'documentation',
    title: 'Automated Document Flow',
    description: 'We automate your entire document flow — creation, approval, compliance — all in sync with your CRM, tools and teams, using our pre-built document generation tools.',
    features: [
      'Auto-generation from CRM templates',
      'E-signature & approval flows',
      'Smart forms & structured capture',
      'Document version control',
      'Regulatory compliance built-in'
    ]
  },
  {
    id: 'finance',
    title: 'Finance Operations Automation',
    description: 'Connect and automate your full financial stack — from invoicing to reconciliation — for faster, cleaner, and error-free money flow.',
    features: [
      'Smart invoice generation',
      'Real-time payment tracking & reconciliation',
      'Seamless accounting system integration',
      'Financial dashboards & custom reports',
      'Multi-currency, multi-market, and multi-payment method support'
    ]
  }
];

interface ServiceNavigationProps {
  services: Service[];
  activeIndex: number;
  onServiceClick: (index: number) => void;
  scrollProgress: number;
}

// Улучшенная навигация с дополнительными эффектами
function ServiceNavigation({ services, activeIndex, onServiceClick, scrollProgress }: ServiceNavigationProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const navItemHeight = 48;
  const navItemSpacing = 24;
  const totalHeight = (navItemHeight + navItemSpacing) * (services.length - 1);
  
  return (
    <div className="h-full flex flex-col p-8 relative z-10">
      <div className="relative flex-1 flex items-center">
        {/* Проценты с усиленным свечением */}
        <div 
          className="absolute left-[-60px] text-center z-20 w-12"
          style={{
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <motion.div 
            className="text-4xl text-white font-bold whitespace-nowrap"
            key={Math.round(scrollProgress * 100)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 100px rgba(255, 255, 255, 0.6)',
              filter: 'drop-shadow(0 0 20px rgba(178, 75, 243, 0.8))'
            }}
          >
            {Math.round(scrollProgress * 100)}%
          </motion.div>
        </div>

        {/* Навигационные элементы с улучшенными эффектами */}
        <nav className="relative ml-12 flex-1 flex flex-col justify-center">
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                onClick={() => onServiceClick(index)}
                className="flex items-center w-full text-left cursor-pointer transition-all duration-300 relative group"
                style={{ height: `${navItemHeight}px` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                whileHover={{ 
                  x: 12,
                  transition: {
                    type: "spring",
                    stiffness: 1000,
                    damping: 20,
                    mass: 0.3,
                    velocity: 15,
                    duration: 0
                  }
                }}
              >
                <div className="flex-1 flex items-center">
                  <motion.h4 
                    className={`
                      font-sans font-medium text-base leading-relaxed transition-all duration-300
                      ${activeIndex === index 
                        ? 'text-white' 
                        : hoveredIndex === index
                          ? 'text-gray-300'
                          : 'text-gray-500'
                      }
                    `}
                    style={activeIndex === index ? {
                      textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7), 0 0 60px rgba(178,75,243,0.5)',
                      filter: 'drop-shadow(0 0 10px rgba(178, 75, 243, 0.6))'
                    } : hoveredIndex === index ? {
                      textShadow: '0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(178,75,243,0.4)'
                    } : {}}
                  >
                    {service.title}
                  </motion.h4>
                </div>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Улучшенная навигационная линия с дополнительными эффектами */}
        <div 
          className="absolute left-4 w-0.5 rounded-full"
          style={{ 
            height: `${totalHeight}px`,
            top: `calc(50% - ${totalHeight/2}px)`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.3) 100%)',
            boxShadow: '0 0 12px rgba(255,255,255,0.8), 0 0 24px rgba(178,75,243,0.6), inset 0 0 6px rgba(255,255,255,0.4)',
            filter: 'drop-shadow(0 0 8px rgba(178, 75, 243, 0.8))'
          }}
        />
        
        {/* Усиленный светящийся индикатор */}
        <motion.div 
          className="absolute w-5 h-5 rounded-full z-10"
          style={{
            left: `${16 - 10}px`,
            top: `calc(50% - ${totalHeight/2}px)`,
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 40%, rgba(178,75,243,0.8) 100%)'
          }}
          animate={{ 
            y: `${scrollProgress * totalHeight}px`,
            boxShadow: [
              '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(178,75,243,1), 0 0 60px rgba(178,75,243,0.8), 0 0 80px rgba(178,75,243,0.6)',
              '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(178,75,243,1), 0 0 90px rgba(178,75,243,0.9), 0 0 120px rgba(178,75,243,0.7)',
              '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(178,75,243,1), 0 0 60px rgba(178,75,243,0.8), 0 0 80px rgba(178,75,243,0.6)'
            ],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="absolute inset-1 rounded-full bg-white opacity-90" />
          <div className="absolute inset-2 rounded-full bg-white" />
        </motion.div>
      </div>
    </div>
  );
}

interface HorizontalServiceCardProps {
  service: Service;
  isActive: boolean;
  direction: 'up' | 'down' | 'none';
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

// Улучшенная карточка с совместимостью с аура-эффектом
function HorizontalServiceCard({ service, isActive, direction, isHovered, onHover }: HorizontalServiceCardProps) {
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
      className="relative w-full z-10" 
      style={{ height: '560px' }}
      animate={hoverAnimation}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Фоновый слой - с анимированными сферами из исходного файла */}
      <motion.div
        key={`${service.id}-bg`}
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
        {/* Хаотичное анимированное свечение - сохранено из исходного файла */}
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
        
        {/* Дополнительное свечение по краям с хаотичной анимацией - сохранено */}
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

      {/* Основная карточка - еще более стеклянная */}
      <motion.div
        key={service.id}
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
          relative rounded-2xl p-12 overflow-hidden group w-full
          ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
        style={{
          height: '560px',
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
        {/* Контент карточки */}
        <div className="relative z-10 h-full flex flex-col justify-center py-8">
          {/* Заголовок и подзаголовок */}
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold leading-tight text-white mb-6"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                }}>
              {service.title}
            </h3>
            <p className="text-white text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
              {service.description}
            </p>
          </div>
          
          {/* Возможности */}
          <div className="flex-1 flex flex-col justify-center">
            <h4 className="text-xl font-bold mb-6 text-white text-left"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6)'
                }}>
              Core Capabilities:
            </h4>
            <div className="space-y-4 max-w-xl w-full">
              {service.features.slice(0, 4).map((feature: string, index: number) => (
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
                  {/* Улучшенные буллиты с аура-эффектом */}
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: isActive ? 1 : 0
                    }}
                    transition={{ 
                      scale: { duration: 0.4, delay: isActive ? index * 0.12 + 0.4 : 0, ease: "backOut" }
                    }}
                    style={{
                      boxShadow: isActive ? '0 0 12px rgba(178,75,243,0.8), 0 0 24px rgba(178,75,243,0.5)' : 'none',
                      background: 'radial-gradient(circle, rgba(178,75,243,0.3) 0%, rgba(178,75,243,0.1) 100%)'
                    }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-primary" 
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
                  <span className="text-white text-base leading-relaxed text-left opacity-95">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA кнопка с улучшенными эффектами - сохранено из исходного файла */}
          <div className="mt-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href={`/services/${service.id}`}>
                <Button 
                  variant="primary" 
                  className="text-base py-3 px-6 transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.2) 0%, rgba(178, 75, 243, 0.15) 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(119, 71, 207, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
                      className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Обработчик прокрутки с полным скрытием Hero
  useEffect(() => {
    if (!sectionRef.current) return;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current || isScrollingRef.current) return;
          
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;
          
          // Определяем, находимся ли мы в секции
          const inSection = rect.top <= 0 && rect.bottom >= windowHeight;
          
          if (inSection) {
            // Вычисляем прогресс на основе позиции в секции
            const scrolled = Math.abs(rect.top);
            const totalScrollable = sectionHeight - windowHeight;
            const progress = Math.min(scrolled / totalScrollable, 1);
            
            // Корректировка: первые 15% скролла скрывают hero, остальные 85% - переключение карточек
            if (progress <= 0.15) {
              // В первых 15% скролла остаемся на первой карточке
              setScrollProgress(0);
              if (activeIndex !== 0) {
                setDirection('up');
                setActiveIndex(0);
              }
            } else {
              // В остальных 85% переключаем карточки
              const adjustedProgress = (progress - 0.15) / 0.85; // Нормализуем к 0-1
              setScrollProgress(adjustedProgress);
              
              // Исправленная формула: показываем все решения
              const newIndex = Math.min(
                Math.floor(adjustedProgress * services.length),
                services.length - 1
              );
              
              if (newIndex !== activeIndex) {
                setDirection(newIndex > activeIndex ? 'down' : 'up');
                setActiveIndex(newIndex);
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Добавляем немедленный вызов и более частое обновление
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Дополнительно отслеживаем изменения размера окна
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeIndex]); // Убрали services.length - это константа
  
  // ИСПРАВЛЕННЫЙ обработчик клика по навигации с синхронизацией скролла
  const handleServiceClick = (index: number) => {
    if (index === activeIndex) return;
    
    // Блокируем обработчик скролла
    isScrollingRef.current = true;
    
    // Устанавливаем новое состояние
    setDirection(index > activeIndex ? 'down' : 'up');
    setActiveIndex(index);
    
    // Вычисляем нужную позицию скролла и синхронизируем
    const newProgress = index / (services.length - 1);
    setScrollProgress(newProgress);
    
    // Программно прокручиваем страницу до соответствующей позиции
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionHeight - windowHeight;
      
      // Вычисляем целевую позицию скролла
      // Учитываем что первые 15% - это hero, остальные 85% - карточки
      const heroProgress = 0.15;
      const cardProgress = (1 - heroProgress) * newProgress;
      const targetProgress = heroProgress + cardProgress;
      
      // Вычисляем абсолютную позицию скролла
      const currentScrollTop = window.pageYOffset;
      const sectionTop = currentScrollTop + rect.top;
      const targetScrollTop = sectionTop + (totalScrollable * targetProgress);
      
      // Плавно прокручиваем к целевой позиции
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
    
    // Сбрасываем блокировку с увеличенной задержкой для завершения анимации
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000); // Увеличили до 1 секунды для надежности
  };
  
  return (
    <SiteLayout>
      {/* Parallax Aura Background - глобальный фоновый эффект для всей страницы */}
      <ParallaxAuraBackground 
        scrollProgress={scrollProgress}
        activeIndex={activeIndex}
        className="opacity-80"
      />

      {/* Hero section */}
      <section className="section-hero bg-transparent relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing"
                style={{
                  textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(178,75,243,0.5)'
                }}>
              How We Architect
            </h1>
            <p className="hero-subtitle text-light-gray max-w-3xl mx-auto section-subtitle-medium section-button-spacing opacity-90">
              We design and build automation systems that connect, optimize, and scale your operations — from tools to teams to outcomes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center button-gap-large">
              <Button variant="primary" size="lg" href="/contacts">
                See How It Works 
              </Button>
              <Button variant="secondary" size="lg" href="/cases">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={sectionRef}
        className="relative bg-transparent"
        style={{ 
          height: `${150 + services.length * 130}vh`,
          minHeight: '900vh'
        }}
      >
        {/* Заголовки */}
        <div className="absolute top-16 left-0 right-0 z-10 text-center">
          <h3 className="section-title-large font-bold text-white mb-4"
              style={{
                textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
              }}>
            Solutions
          </h3>
          <p className="section-subtitle-large text-light-gray opacity-80">
            Scroll to explore our services
          </p>
        </div>

        {/* Sticky контейнер */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 pt-32 pb-16">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="w-full grid grid-cols-12 gap-12">
                
                {/* Левая навигация */}
                <div className="col-span-5">
                  <ServiceNavigation 
                    services={services}
                    activeIndex={activeIndex}
                    onServiceClick={handleServiceClick}
                    scrollProgress={scrollProgress}
                  />
                </div>
                
                {/* Правая область карточек */}
                <div className="col-span-7 flex items-center">
                  <div className="relative w-full max-w-4xl">
                    <AnimatePresence mode="wait" custom={direction}>
                      <HorizontalServiceCard
                        key={activeIndex}
                        service={services[activeIndex]}
                        isActive={true}
                        direction={direction}
                        isHovered={isHovered}
                        onHover={setIsHovered}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Process section */}
      <EnhancedProcessSection />
      
      {/* CTA section */}
      <section className="section-cta bg-transparent relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.5)'
              }}>
            Ready to Streamline the Flow?
          </h2>
          <p className="section-subtitle-small text-light-gray max-w-2xl mx-auto section-button-spacing opacity-90">
            Trust our team to map your processes and<br />uncover automation potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center button-gap-default">
            <Button variant="primary" size="lg" href="/contacts">
              See How It Works
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              View Our Case Studies
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}