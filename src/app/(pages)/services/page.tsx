"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SiteLayout from '@/components/layout/site-layout';
import { AutomationFlowTimeline } from '@/components/sections/automation-flow-timeline';
import { SolutionContent } from '@/components/sections/solutions-section';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { IconName } from '@/components/ui/icons/icon';

// Типы для данных о услугах
interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  href?: string;
}

// Данные о услугах
const services: Service[] = [
  {
    id: 'business-process',
    title: 'Workflow Design & Automation',
    description: 'We reengineer core business processes by removing manual steps, syncing tools, and building flexible, intelligent workflows.',
    icon: 'process',
    href: '/services/business-process',
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
    icon: 'crm',
    href: '/services/crm-integration',
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
    icon: 'industry',
    href: '/services/boxed-solutions',
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
    icon: 'ai',
    href: '/services/ai-solutions',
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
    icon: 'document',
    href: '/services/documentation',
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
    icon: 'finance',
    href: '/services/finance',
    features: [
      'Smart invoice generation',
      'Real-time payment tracking & reconciliation',
      'Seamless accounting system integration',
      'Financial dashboards & custom reports',
      'Multi-currency, multi-market, and multi-payment method support'
    ]
  }
];


// Sales metrics and value propositions data  
const salesData = {
  'business-process': {
    timeToROI: '2-4 weeks',
    avgEfficiencyGain: '40-60%',
    avgTimeSaved: '25-30 hours/week',
    clientsSaved: '200+',
    valueProps: [
      'Eliminate 80% of manual processes',
      'Reduce processing time by 60%',
      'Zero human errors in core workflows',
      'Real-time visibility across operations'
    ],
    metrics: [
      { label: 'Time Saved', value: '30hrs', unit: '/week' },
      { label: 'Error Rate', value: '0%', unit: '' },
      { label: 'ROI Timeline', value: '2-4', unit: 'weeks' }
    ]
  },
  'crm-integration': {
    timeToROI: '3-6 weeks',
    avgEfficiencyGain: '50-70%',
    avgTimeSaved: '20-25 hours/week',
    clientsSaved: '150+',
    valueProps: [
      'Unified customer data across all platforms',
      'Automated lead scoring and nurturing',
      '360° customer view for better decisions',
      'Seamless sales pipeline management'
    ],
    metrics: [
      { label: 'Lead Conversion', value: '+45%', unit: '' },
      { label: 'Data Accuracy', value: '99%', unit: '' },
      { label: 'Sales Velocity', value: '+60%', unit: '' }
    ]
  },
  'boxed-solutions': {
    timeToROI: '1-2 weeks',
    avgEfficiencyGain: '30-50%',
    avgTimeSaved: '15-20 hours/week',
    clientsSaved: '100+',
    valueProps: [
      'Industry-proven workflows ready to deploy',
      'Fastest time to value in the market',
      'Pre-built integrations for common tools',
      'Scalable foundation for custom needs'
    ],
    metrics: [
      { label: 'Deploy Time', value: '1-2', unit: 'weeks' },
      { label: 'Setup Cost', value: '-70%', unit: '' },
      { label: 'Efficiency Gain', value: '40%', unit: '' }
    ]
  },
  'ai-solutions': {
    timeToROI: '4-8 weeks',
    avgEfficiencyGain: '60-80%',
    avgTimeSaved: '35-40 hours/week',
    clientsSaved: '80+',
    valueProps: [
      'AI-powered decision automation',
      'Natural language processing for communication',
      'Predictive analytics for business insights',
      'Smart routing and task assignment'
    ],
    metrics: [
      { label: 'Response Time', value: '90%', unit: 'faster' },
      { label: 'Decision Accuracy', value: '95%', unit: '' },
      { label: 'Processing Volume', value: '10x', unit: '' }
    ]
  },
  'documentation': {
    timeToROI: '2-3 weeks',
    avgEfficiencyGain: '70-85%',
    avgTimeSaved: '20-30 hours/week',
    clientsSaved: '120+',
    valueProps: [
      'Zero manual document creation',
      'Automated approval workflows',
      'Real-time collaboration and versioning',
      'Built-in compliance and audit trails'
    ],
    metrics: [
      { label: 'Doc Processing', value: '85%', unit: 'faster' },
      { label: 'Approval Time', value: '-90%', unit: '' },
      { label: 'Compliance Rate', value: '100%', unit: '' }
    ]
  },
  'finance': {
    timeToROI: '3-5 weeks',
    avgEfficiencyGain: '55-75%',
    avgTimeSaved: '25-35 hours/week',
    clientsSaved: '90+',
    valueProps: [
      'Real-time financial visibility',
      'Automated reconciliation and reporting',
      'Multi-currency and payment method support',
      'Seamless accounting system integration'
    ],
    metrics: [
      { label: 'Reconciliation', value: '95%', unit: 'automated' },
      { label: 'Report Generation', value: '80%', unit: 'faster' },
      { label: 'Payment Processing', value: '24/7', unit: '' }
    ]
  }
};

// Enhanced mobile card component with sales focus
function MobileServiceCard({ service, index }: { service: Service; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentSalesData = salesData[service.id as keyof typeof salesData];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl border"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(119, 71, 207, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(178, 75, 243, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, rgba(23, 10, 36, 0.6) 0%, rgba(21, 9, 32, 0.7) 50%, rgba(18, 7, 26, 0.8) 100%)
        `,
        border: '1px solid rgba(119, 71, 207, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {/* Sales metrics strip */}
      <div className="flex justify-between items-center p-3 bg-primary/5 border-b border-primary/10">
        <div className="flex space-x-4">
          {currentSalesData?.metrics.slice(0, 2).map((metric, metricIndex) => (
            <div key={metricIndex} className="text-center">
              <div className="text-sm font-bold text-secondary">
                {metric.value}
                <span className="text-xs text-white/60 ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-white/50">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center text-xs text-white/60">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-secondary mr-1"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          ROI: {currentSalesData?.timeToROI}
        </div>
      </div>

      <div className="p-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-lg font-semibold text-white"
              style={{
                textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.3)'
              }}>
            {service.title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-light-gray"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>

        <p className="text-light-gray mt-3 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Cases link */}
        <div className="mt-3 flex items-center justify-between">
          <Link href={`/cases?filter=${service.id}`}>
            <div className="flex items-center text-xs text-white/60 hover:text-secondary transition-colors duration-300">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              View Cases
            </div>
          </Link>
          <div className="text-xs text-secondary font-semibold">
            +{currentSalesData?.avgEfficiencyGain.split('-')[0]} efficiency
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-primary/10">
                {/* Simple Key Features */}
                <h4 className="text-sm font-semibold text-white mb-3">Key Features:</h4>
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 4).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        style={{
                          background: 'radial-gradient(circle, rgba(178,75,243,0.3) 0%, rgba(178,75,243,0.1) 100%)'
                        }}
                      >
                        <div className="w-1 h-1 rounded-full bg-primary" />
                      </motion.div>
                      <span className="text-white/80 text-xs leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Link href={`/services/${service.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full shadow-neon-glow hover:shadow-neon-glow-intense">
                      Explore Solution
                    </Button>
                  </Link>
                  <Link href="/contacts" className="flex-1">
                    <div className="flex items-center justify-center text-secondary font-medium text-sm py-2 transition-all duration-300 hover:opacity-80">
                      <span>Talk to the Team</span>
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-secondary ml-2"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface ServiceNavigationProps {
  services: Service[];
  activeIndex: number;
  onServiceClick: (index: number) => void;
  scrollProgress: number;
}

// Восстановленная навигация с анимациями
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

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef(0);

  const togglePrinciple = (index: number) => {
    setExpandedPrinciple(prev => prev === index ? null : index);
  };
  
  const { isMobile } = useDeviceDetection();
  
  // Улучшенный обработчик прокрутки (ТОЛЬКО ДЛЯ ДЕСКТОПА)
  useEffect(() => {
    if (isMobile) return;
    
    if (!sectionRef.current) return;
    
    let ticking = false;
    let lastScrollTime = 0;
    
    const handleScroll = () => {
      const now = Date.now();
      
      if (!ticking && now - lastScrollTime > 16) { // Throttle to ~60fps
        lastScrollTime = now;
        ticking = true;
        
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }
          
          // Проверяем, прошло ли достаточно времени с последнего клика
          const timeSinceClick = now - lastClickTimeRef.current;
          const shouldIgnoreScroll = isScrollingRef.current && timeSinceClick < 500; // Уменьшили время блокировки
          
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;
          
          const inSection = rect.top <= 0 && rect.bottom >= windowHeight;
          
          if (inSection && !shouldIgnoreScroll) {
            const scrolled = Math.abs(rect.top);
            const totalScrollable = sectionHeight - windowHeight;
            const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
            
            if (progress <= 0.15) {
              setScrollProgress(0);
              if (activeIndex !== 0) {
                setDirection('up');
                setActiveIndex(0);
              }
            } else {
              const adjustedProgress = (progress - 0.15) / 0.85;
              setScrollProgress(adjustedProgress);
              
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
          
          // Если мы находимся в секции и прошло достаточно времени, сбрасываем флаг
          if (inSection && timeSinceClick > 500) {
            isScrollingRef.current = false;
          }
          
          ticking = false;
        });
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeIndex, isMobile, isScrollingRef]);
  
  // Улучшенный обработчик клика по навигации
  const handleServiceClick = (index: number) => {
    if (isMobile || index === activeIndex) return;
    
    // Записываем время клика
    lastClickTimeRef.current = Date.now();
    
    // Устанавливаем флаг программной прокрутки
    isScrollingRef.current = true;
    
    // Немедленно обновляем состояние
    setDirection(index > activeIndex ? 'down' : 'up');
    setActiveIndex(index);
    
    const targetProgress = index / (services.length - 1);
    setScrollProgress(targetProgress);
    
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionHeight - windowHeight;
      
      // Вычисляем целевую позицию скролла
      const heroProgress = 0.15;
      const cardProgress = (1 - heroProgress) * targetProgress;
      const finalProgress = heroProgress + cardProgress;
      
      const currentScrollTop = window.pageYOffset;
      const sectionTop = currentScrollTop + rect.top;
      const targetScrollTop = sectionTop + (totalScrollable * finalProgress);
      
      // Плавная прокрутка
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
    
    // Очищаем предыдущий таймер
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Сбрасываем флаг через более короткое время
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  
  return (
    <SiteLayout>

      {/* Hero section */}
      <section className="section-hero bg-transparent relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing"
                style={{
                  textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(178,75,243,0.5)'
                }}>
              How We Architect
            </h1>
            <p className="hero-subtitle text-light-gray max-w-3xl mx-auto section-subtitle-medium section-button-spacing opacity-90">
              We design and build automation systems that connect, optimize, and scale your operations — from tools to teams to outcomes.
            </p>
            

            {/* Enhanced CTA */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button variant="secondary" size="lg" href="/contacts">
                See How It Works 
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* МОБИЛЬНАЯ ВЕРСИЯ - простые карточки */}
      {isMobile && (
        <section className="py-16 bg-transparent relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"
                  style={{
                    textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
                  }}>
                Our Solutions
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Comprehensive automation solutions designed to transform your business operations
              </p>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <MobileServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ДЕСКТОПНАЯ ВЕРСИЯ - с полными анимациями и улучшенной карточкой */}
      {!isMobile && (
        <section 
          ref={sectionRef}
          className="relative bg-transparent"
          style={{ 
            height: `${100 + services.length * 90}vh`,
            minHeight: '600vh'
          }}
        >
          {/* Заголовки */}
          <div className="relative z-10 text-center px-4 pt-20 pb-2">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6"
                style={{
                  textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
                }}>
              Solutions
            </h3>
            <p className="text-lg md:text-xl text-white/70 opacity-80">
              Scroll to explore our services
            </p>
          </div>

          {/* Sticky контейнер */}
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 pb-16">
              <div className="container mx-auto px-4 h-full flex items-center justify-center">
                <div className="w-full max-w-6xl grid grid-cols-12 gap-8">
                  
                  {/* Левая навигация - центрированная */}
                  <div className="col-span-4 col-start-1 flex justify-end">
                    <div className="w-full max-w-xs">
                      <ServiceNavigation 
                        services={services}
                        activeIndex={activeIndex}
                        onServiceClick={handleServiceClick}
                        scrollProgress={scrollProgress}
                      />
                    </div>
                  </div>
                  
                  {/* Правая область карточек - центрированная */}
                  <div className="col-span-8 col-start-5 flex items-center justify-start">
                    <div className="relative w-full max-w-4xl">
                      <AnimatePresence mode="wait" custom={direction}>
                        <SolutionContent
                          key={activeIndex}
                          solution={{
                            id: services[activeIndex].id,
                            label: services[activeIndex].title,
                            icon: services[activeIndex].icon as IconName,
                            description: services[activeIndex].description,
                            features: services[activeIndex].features,
                            href: services[activeIndex].href
                          }}
                          isActive={true}
                          direction={direction}
                          variant="services"
                        />
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Architecture Methodology section */}
      <section className="pt-16 pb-16 bg-dark-gray relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="section-title-medium font-bold mb-6"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                }}>
              Our Architecture Methodology
            </h2>
            <p className="text-light-gray text-base md:text-lg max-w-2xl mx-auto opacity-90">
              We don&apos;t just build automation — we architect complete business ecosystems. Our methodology ensures every solution is scalable, maintainable, and drives real business value.
            </p>
          </div>

          {/* Main Content Layout - 2x2 grid for steps with right-center principles */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto">
            
            {/* Top Left - Step 1 */}
            <div className="lg:col-start-1 lg:col-span-2 lg:row-start-1">
              <div className="relative bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center relative mr-3">
                      <span className="text-white font-bold text-xs">01</span>
                    </div>
                    <h3 className="text-lg font-bold text-white"
                        style={{
                          textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                        }}>
                      Discovery & Mapping
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-xs mb-3 leading-relaxed">
                    We start by understanding your complete business ecosystem — not just individual processes, but how everything connects and flows together.
                  </p>
                  
                  <div className="space-y-1.5">
                    {["Business process mapping", "System inventory & analysis", "Stakeholder interviews", "Data flow documentation"].map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 flex-shrink-0" />
                        <span className="text-white text-xs">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right - Step 2 */}
            <div className="lg:col-start-3 lg:col-span-2 lg:row-start-1">
              <div className="relative bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center relative mr-3">
                      <span className="text-white font-bold text-xs">02</span>
                    </div>
                    <h3 className="text-lg font-bold text-white"
                        style={{
                          textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                        }}>
                      Architecture Design
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-xs mb-3 leading-relaxed">
                    Using our findings, we design a comprehensive automation architecture that addresses current needs while building for future growth.
                  </p>
                  
                  <div className="space-y-1.5">
                    {["Scalable system design", "Integration planning", "Security & compliance framework", "Performance optimization"].map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 flex-shrink-0" />
                        <span className="text-white text-xs">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left - Step 3 */}
            <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2">
              <div className="relative bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center relative mr-3">
                      <span className="text-white font-bold text-xs">03</span>
                    </div>
                    <h3 className="text-lg font-bold text-white"
                        style={{
                          textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                        }}>
                      Iterative Implementation
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-xs mb-3 leading-relaxed">
                    We build in phases, delivering immediate value while progressing toward the complete vision — ensuring you see ROI at every stage.
                  </p>
                  
                  <div className="space-y-1.5">
                    {["Phased deployment", "Continuous testing", "Real-time monitoring", "Performance analytics"].map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 flex-shrink-0" />
                        <span className="text-white text-xs">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right - Step 4 */}
            <div className="lg:col-start-3 lg:col-span-2 lg:row-start-2">
              <div className="relative bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center relative mr-3">
                      <span className="text-white font-bold text-xs">04</span>
                    </div>
                    <h3 className="text-lg font-bold text-white"
                        style={{
                          textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                        }}>
                      Evolution & Optimization
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-xs mb-3 leading-relaxed">
                    Your business grows and changes — so should your automation. We continuously optimize and evolve your systems to stay ahead.
                  </p>
                  
                  <div className="space-y-1.5">
                    {["Performance monitoring", "Regular optimization", "Feature enhancements", "Future-proofing"].map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 flex-shrink-0" />
                        <span className="text-white text-xs">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Center - Architecture Principles */}
            <div className="lg:col-start-5 lg:col-span-1 lg:row-start-1 lg:row-span-2 flex items-center justify-center">
              <div className="w-full">
                <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-lg p-3 border border-primary/20 relative overflow-hidden">

                <div className="relative z-10">
                  <h3 className="text-base font-bold text-white mb-3 text-center"
                      style={{
                        textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                      }}>
                    Architecture Principles
                  </h3>

                  <div className="space-y-1.5">
                    {[
                      {
                        title: "Scalable by Design",
                        description: "Every system we build is designed to grow with your business, handling increased complexity without breaking.",
                        details: ["Modular architecture", "Load balancing", "Resource optimization", "Growth capacity planning"]
                      },
                      {
                        title: "Integration-First",
                        description: "We think in ecosystems, not silos. Every component connects seamlessly with your existing tools.",
                        details: ["API-first design", "Third-party integrations", "Data synchronization", "Legacy system connectivity"]
                      },
                      {
                        title: "User-Centric",
                        description: "Beautiful automation is useless if people don't use it. We prioritize intuitive design and user adoption.",
                        details: ["Intuitive interfaces", "User experience optimization", "Training & support", "Adoption metrics"]
                      },
                      {
                        title: "Data-Driven",
                        description: "Every decision is backed by data. We build comprehensive analytics to prove ROI and guide optimization.",
                        details: ["Analytics dashboards", "Performance metrics", "ROI tracking", "Optimization insights"]
                      },
                      {
                        title: "Security-First",
                        description: "Security and compliance aren't afterthoughts — they're built into the foundation of every solution.",
                        details: ["Access control", "Data encryption", "Audit trails", "Compliance standards"]
                      },
                      {
                        title: "Future-Ready",
                        description: "We design with tomorrow in mind, ensuring your automation stays relevant as technology evolves.",
                        details: ["Technology roadmap", "Scalability planning", "Industry trends", "Innovation integration"]
                      }
                    ].map((principle, index) => {
                      const isExpanded = expandedPrinciple === index;
                      
                      return (
                        <div
                          key={index}
                          className="border border-primary/20 rounded-md overflow-hidden bg-primary/5 hover:bg-primary/10 transition-all duration-300"
                        >
                          <motion.div
                            className="p-2 cursor-pointer flex items-center justify-between group"
                            onClick={() => togglePrinciple(index)}
                          >
                            <div className="flex items-center flex-1">
                              <div 
                                className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 flex-shrink-0 transition-transform duration-300"
                                style={{
                                  transform: isExpanded ? 'scale(1.3)' : 'scale(1)'
                                }}
                              />
                              <h4 className="text-white font-semibold text-xs group-hover:text-secondary transition-colors duration-300">
                                {principle.title}
                              </h4>
                            </div>
                            <div
                              className="text-white text-xs font-bold ml-1 transition-transform duration-300"
                              style={{
                                transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
                              }}
                            >
                              +
                            </div>
                          </motion.div>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="px-2 pb-2 border-t border-primary/10">
                                  <p className="text-white text-xs leading-relaxed mb-2 mt-1">
                                    {principle.description}
                                  </p>
                                  <div className="space-y-0.5">
                                    {principle.details.map((detail, detailIndex) => (
                                      <div
                                        key={detailIndex}
                                        className="flex items-center"
                                      >
                                        <div className="w-1 h-1 rounded-full bg-secondary/60 mr-1.5 flex-shrink-0"></div>
                                        <span className="text-white text-xs">
                                          {detail}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Flow Timeline */}
      <AutomationFlowTimeline />
      
      {/* CTA section */}
      <section className="section-cta bg-transparent relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.5)'
              }}>
            Ready to Streamline the Flow?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Trust our team to map your processes and<br />uncover automation potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center button-gap-default">
            <Button variant="secondary" size="lg" href="/contacts">
              See How It Works
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}