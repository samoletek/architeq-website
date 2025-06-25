"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SiteLayout from '@/components/layout/site-layout';
import { AutomationFlowTimeline } from '@/components/sections/automation-flow-timeline';
import { useDeviceDetection } from '@/lib/utils/device-detection';

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

// Enhanced card component with sales focus and micro-animations
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
      style={{ height: '550px' }}
      animate={hoverAnimation}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Фоновый слой с анимированными сферами */}
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
          height: '550px',
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
        <div className="relative z-10 h-full flex flex-col py-6">

          {/* Заголовок и подзаголовок */}
          <div className="mb-6 text-center">
            <h3 className="text-3xl font-bold leading-tight text-white mb-4"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                }}>
              {service.title}
            </h3>
            <p className="text-white text-base leading-relaxed max-w-2xl mx-auto opacity-90 mb-4">
              {service.description}
            </p>
            
          </div>
          
          {/* Simple Key Features list - like original Solutions section */}
          <div className="flex-1 flex flex-col">
            <h4 className="text-xl font-bold mb-6 text-white text-center"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6)'
                }}>
              Key Features:
            </h4>
            <div className="space-y-4 max-w-xl mx-auto w-full">
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
                      boxShadow: isActive ? '0 0 8px rgba(178,75,243,0.8), 0 0 16px rgba(178,75,243,0.5)' : 'none',
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
          
          {/* CTA кнопка в правом нижнем углу */}
          <div className="absolute bottom-2 right-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
                    <Button variant="primary" size="sm" className="w-full">
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

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef(0);
  
  const { isMobile, isDesktop } = useDeviceDetection();
  
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

  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(null);

  const toggleFeatureDropdown = (stepIndex: number, featureIndex: number) => {
    const key = `${stepIndex}-${featureIndex}`;
    setExpandedFeature(prev => prev === key ? null : key);
  };

  const togglePrinciple = (index: number) => {
    setExpandedPrinciple(prev => prev === index ? null : index);
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
              <h2 className="section-title-large font-bold text-white mb-6"
                  style={{
                    textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
                  }}>
                Our Solutions
              </h2>
              <p className="section-subtitle-large text-light-gray max-w-3xl mx-auto">
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

      {/* ДЕСКТОПНАЯ ВЕРСИЯ - с полными анимациями */}
      {!isMobile && (
        <section 
          ref={sectionRef}
          className="relative bg-transparent"
          style={{ 
            height: `${120 + services.length * 104}vh`,
            minHeight: '720vh'
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
      )}

      {/* Architecture Methodology section */}
      <section className="pt-32 pb-32 bg-dark-gray relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center section-content-spacing">
            <h2 className="section-title-medium font-bold section-title-spacing"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                }}>
              Our Architecture Methodology
            </h2>
            <p className="text-light-gray text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              We don&apos;t just build automation — we architect complete business ecosystems. Our methodology ensures every solution is scalable, maintainable, and drives real business value.
            </p>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Methodology Steps - Left Side (3 columns) */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* All 4 Steps in Grid Layout */}
                {[
                {
                  step: "01",
                  title: "Discovery & Mapping",
                  description: "We start by understanding your complete business ecosystem — not just individual processes, but how everything connects and flows together.",
                  features: [
                    {
                      title: "Business process mapping",
                      details: ["Current state documentation", "Process flow analysis", "Bottleneck identification", "Stakeholder impact assessment"]
                    },
                    {
                      title: "System inventory & analysis", 
                      details: ["Technology stack audit", "Integration points mapping", "Data flow documentation", "Performance metrics review"]
                    },
                    {
                      title: "Stakeholder interviews",
                      details: ["User requirement gathering", "Pain point identification", "Success criteria definition", "Change management planning"]
                    },
                    {
                      title: "Data flow documentation",
                      details: ["Information architecture", "Data source mapping", "Quality assessment", "Governance requirements"]
                    }
                  ]
                },
                {
                  step: "02", 
                  title: "Architecture Design",
                  description: "Using our findings, we design a comprehensive automation architecture that addresses current needs while building for future growth.",
                  features: [
                    {
                      title: "Scalable system design",
                      details: ["Modular architecture planning", "Load balancing strategy", "Resource optimization", "Growth capacity planning"]
                    },
                    {
                      title: "Integration planning",
                      details: ["API design and documentation", "Data synchronization strategy", "Third-party service integration", "Legacy system connectivity"]
                    },
                    {
                      title: "Security & compliance framework",
                      details: ["Access control implementation", "Data encryption standards", "Audit trail requirements", "Regulatory compliance mapping"]
                    },
                    {
                      title: "Performance optimization",
                      details: ["Response time optimization", "Resource utilization planning", "Caching strategy", "Monitoring and alerting setup"]
                    }
                  ]
                },
                {
                  step: "03",
                  title: "Iterative Implementation",
                  description: "We build in phases, delivering immediate value while progressing toward the complete vision — ensuring you see ROI at every stage.",
                  features: [
                    {
                      title: "Phased deployment",
                      details: ["MVP development", "Feature prioritization", "Risk mitigation strategy", "User feedback integration"]
                    },
                    {
                      title: "Continuous testing",
                      details: ["Automated test suites", "Performance testing", "User acceptance testing", "Security vulnerability scanning"]
                    },
                    {
                      title: "Real-time monitoring",
                      details: ["System health dashboards", "Performance metrics tracking", "Error logging and alerting", "User activity monitoring"]
                    },
                    {
                      title: "Performance analytics",
                      details: ["Usage pattern analysis", "Efficiency measurements", "ROI tracking", "Optimization recommendations"]
                    }
                  ]
                },
                {
                  step: "04",
                  title: "Evolution & Optimization",
                  description: "Your business grows and changes — so should your automation. We continuously optimize and evolve your systems to stay ahead.",
                  features: [
                    {
                      title: "Performance monitoring",
                      details: ["Continuous health checks", "Performance trend analysis", "Capacity planning", "Proactive issue detection"]
                    },
                    {
                      title: "Regular optimization",
                      details: ["Code optimization", "Database tuning", "Infrastructure scaling", "Process refinement"]
                    },
                    {
                      title: "Feature enhancements",
                      details: ["User-driven improvements", "Technology upgrades", "New functionality development", "UX/UI enhancements"]
                    },
                    {
                      title: "Future-proofing",
                      details: ["Technology roadmap planning", "Scalability assessments", "Industry trend integration", "Innovation opportunities"]
                    }
                  ]
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center relative mr-4">
                        <span className="text-white font-bold text-sm">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white"
                          style={{
                            textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                          }}>
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2">
                      {item.features.map((feature, featureIndex) => {
                        const dropdownKey = `${index}-${featureIndex}`;
                        const isExpanded = expandedFeature === dropdownKey;
                        
                        return (
                          <div key={featureIndex} className="relative">
                            <motion.div 
                              className="flex items-center cursor-pointer group"
                              onClick={() => toggleFeatureDropdown(index, featureIndex)}
                            >
                              <div 
                                className="w-3 h-3 rounded-full bg-secondary mr-3 relative flex items-center justify-center hover:scale-110 transition-transform duration-200"
                              >
                                <div
                                  className="text-white text-xs font-bold transition-transform duration-300"
                                  style={{
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                  }}
                                >
                                  {isExpanded ? '−' : '+'}
                                </div>
                              </div>
                              <span className="text-white text-sm group-hover:text-secondary transition-colors duration-300">
                                {feature.title}
                              </span>
                            </motion.div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-6 pl-4 border-l border-secondary/30">
                                    <div className="space-y-2">
                                      {feature.details.map((detail, detailIndex) => (
                                        <div
                                          key={detailIndex}
                                          className="flex items-center"
                                        >
                                          <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 mr-2"></div>
                                          <span className="text-light-gray text-xs leading-relaxed">
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
              ))}
              </div>
            </div>

            {/* Architecture Principles - Right Side */}
            <div className="lg:col-span-1 flex items-center">
              <div className="w-full">
                <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-4 border border-primary/20 relative overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-secondary"></div>
                  <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-primary"></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-secondary"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-4 text-center"
                      style={{
                        textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                      }}>
                    Architeq Architecture Principles
                  </h3>

                  <div className="space-y-2">
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
                          className="border border-primary/20 rounded-lg overflow-hidden bg-primary/5 hover:bg-primary/10 transition-all duration-300"
                        >
                          <motion.div
                            className="p-3 cursor-pointer flex items-center justify-between group"
                            onClick={() => togglePrinciple(index)}
                          >
                            <div className="flex items-center flex-1">
                              <div 
                                className="w-2 h-2 rounded-full bg-secondary mr-3 flex-shrink-0 transition-transform duration-300"
                                style={{
                                  transform: isExpanded ? 'scale(1.3)' : 'scale(1)'
                                }}
                              />
                              <h4 className="text-white font-semibold text-sm group-hover:text-secondary transition-colors duration-300">
                                {principle.title}
                              </h4>
                            </div>
                            <div
                              className="text-white text-sm font-bold ml-2 transition-transform duration-300"
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
                                <div className="px-3 pb-3 border-t border-primary/10">
                                  <p className="text-white text-xs leading-relaxed mb-3 mt-2">
                                    {principle.description}
                                  </p>
                                  <div className="space-y-1">
                                    {principle.details.map((detail, detailIndex) => (
                                      <div
                                        key={detailIndex}
                                        className="flex items-center"
                                      >
                                        <div className="w-1 h-1 rounded-full bg-secondary/60 mr-2 flex-shrink-0"></div>
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
            <Button variant="secondary" size="lg" href="/contacts">
              See How It Works
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}