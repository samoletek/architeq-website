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
  variant?: 'default' | 'alternate' | 'homepage';
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

// Sales metrics and value propositions data (копия из Services page)
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

// Мобильная карточка как на Services page
function MobileServiceCard({ service, index }: { 
  service: {
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
    href?: string;
  }; 
  index: number;
}) {
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
                  <Link href={service.href || `/services/${service.id}`} className="flex-1">
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
      {/* Dark purple container matching card width */}
      <div 
        className="max-w-5xl mx-auto p-4 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(23, 10, 36, 0.8) 0%, rgba(21, 9, 32, 0.9) 50%, rgba(18, 7, 26, 0.95) 100%)',
          border: '1px solid rgba(119, 71, 207, 0.2)',
          backdropFilter: 'blur(20px)',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 relative">
          {solutions.map((solution, index) => (
            <motion.span
              key={solution.id}
              onClick={() => onSolutionClick(index)}
              className={`
                relative cursor-pointer font-medium transition-all duration-300
                text-sm sm:text-base px-2 py-1
                ${activeIndex === index 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
                }
              `}
              style={activeIndex === index ? {
                textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 25px rgba(178,75,243,0.6)'
              } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 font-semibold whitespace-nowrap">
                {solution.label}
              </span>
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Компонент для отдельного решения с адаптивными размерами
export const SolutionContent = ({ 
  solution, 
  isActive = false,
  direction,
  variant = 'default'
}: { 
  solution: Solution;
  isActive: boolean;
  direction: 'up' | 'down' | 'none';
  variant?: 'default' | 'services';
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
    y: 0,
    scale: 1,
  };

  // Получаем данные для текущего решения
  const currentSolutions = serviceSolutions[solution.id as keyof typeof serviceSolutions] || [];

  // Адаптивные размеры в зависимости от варианта
  const isServicesVariant = variant === 'services';
  const containerHeight = isServicesVariant ? 'auto' : 'auto';
  const maxHeight = isServicesVariant ? '85vh' : '70vh';
  const maxWidth = isServicesVariant ? '5xl' : '5xl';

  return (
    <motion.div 
      className={`relative w-full z-10 max-w-${maxWidth} mx-auto`}
      style={{ height: containerHeight, maxHeight }}
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
          relative rounded-2xl overflow-hidden group w-full
          ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}
          ${isServicesVariant ? 'p-8 sm:p-10 lg:p-12' : 'p-12 sm:p-14 lg:p-18'}
        `}
        style={{
          width: '100%',
          height: isServicesVariant ? 'auto' : 'auto',
          minHeight: isServicesVariant ? '500px' : '600px',
          maxHeight: isServicesVariant ? '85vh' : 'none',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* View Cases button */}
        <div className="text-center mb-8">
          <Link href={`/cases?filter=${solution.id}`}>
            <div className="inline-flex items-center text-sm text-secondary transition-colors duration-300 cursor-pointer">
              <motion.div 
                className="w-2 h-2 rounded-full bg-secondary mr-2"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              View Cases
            </div>
          </Link>
        </div>

        {/* Заголовок решения */}
        <div className="text-center mb-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight text-white mb-3"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {solution.label}
          </h3>
          <p className="text-white text-xs sm:text-sm lg:text-base leading-relaxed max-w-4xl mx-auto opacity-90">
            {solution.description}
          </p>
        </div>

        {/* Двухколоночный контент */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${isServicesVariant ? 'gap-6 lg:gap-8' : 'gap-12 lg:gap-16'} mb-8`}>
          {/* Левая колонка - Our Solutions */}
          <div className="space-y-4">
            <h4 className={`${isServicesVariant ? 'text-base sm:text-lg lg:text-xl' : 'text-lg sm:text-xl lg:text-2xl'} font-bold text-white mb-4`}
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
                  className="bg-white/5 rounded-lg p-2.5 backdrop-blur-sm border border-white/10 transition-colors duration-300 hover:border-secondary/40"
                >
                  <h5 className="text-white font-semibold text-base sm:text-lg mb-1 flex items-center">
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
                  <p className="text-gray-400 text-xs leading-snug">
                    {sol.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Правая колонка - Key Features */}
          <div className="space-y-4">
            <h4 className={`${isServicesVariant ? 'text-base sm:text-lg lg:text-xl' : 'text-lg sm:text-xl lg:text-2xl'} font-bold text-white mb-4`}
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
                  className="flex items-center group cursor-pointer"
                >
                  {/* Галочки без кругов */}
                  <motion.div 
                    className="mr-3 flex-shrink-0"
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
                  <span className="text-sm sm:text-base font-medium leading-relaxed text-white font-inter">
                    {feature}
                  </span>
                </motion.div>
              ))}

            </div>
          </div>
        </div>

        {/* Кнопка для обеих вариантов - центрированная под колонками */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.9
          }}
          transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
        >
          {solution.href && (
            <Link href={solution.href} className="w-full max-w-md">
              <Button 
                variant="primary" 
                className={`text-sm px-6 transition-all duration-300 relative overflow-hidden group w-full shadow-neon-glow hover:shadow-neon-glow-intense ${
                  isServicesVariant ? 'py-3' : 'py-3.5'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.3) 0%, rgba(178, 75, 243, 0.2) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(119, 71, 207, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
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
  const isHomepageMobile = false; // Убираем условный рендеринг для предотвращения гидратации
  
  // Состояние для отслеживания активного решения по индексу
  const [activeIndex, setActiveIndex] = useState<number>(
    defaultSolutionId ? solutions.findIndex(s => s.id === defaultSolutionId) || 0 : 0
  );
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');

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
      y: 0
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  // Для homepage мобильной версии используем тот же компонент, что и на Services page
  if (isHomepageMobile) {
    // Преобразуем Solution в Service для совместимости
    const servicesData = solutions.map(solution => ({
      id: solution.id,
      title: solution.label,
      description: solution.description,
      features: solution.features,
      icon: solution.icon,
      href: solution.href
    }));

    return (
      <section className={cn("py-16 bg-transparent relative z-10", className)}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{
                  textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
                }}>
              {title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive automation solutions designed to transform your business operations
            </p>
          </div>

          <div className="space-y-4">
            {servicesData.map((service, index) => (
              <MobileServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      ref={sectionRef}
      className={cn("section-solutions relative overflow-hidden", className)}
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
            transition={{ 
              duration: 0.7, 
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <h2 
              className="section-title-large font-bold section-title-spacing"
              style={{
                textShadow: '0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(178,75,243,0.6)'
              }}
            >
              {title}
            </h2>
            <p className="section-subtitle-large text-light-gray max-w-4xl mx-auto whitespace-pre-line">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Контент с горизонтальными табами */}
        <motion.div 
          className="max-w-5xl mx-auto px-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={contentVariants}
          transition={{ 
            duration: 1.0,
            delay: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
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