// src/app/(pages)/services/page.tsx
"use client";

import { useState, useEffect } from 'react';
import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Данные о услугах
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

// Интерфейс для карточки услуги
interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  isVisible: boolean;
}
// Компонент карточки услуги с улучшенным дизайном - ПОЛНАЯ ВЕРСИЯ
function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Анимационные варианты для карточек
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.1 + index * 0.1
      }
    }
  };

  // Анимация для кнопки (снизу вверх с fade-in)
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
      className={`
        relative group transition-all duration-500 ease-out
        bg-dark-gradient rounded-xl p-8 
        border-2 border-primary/50 hover:border-primary/70
        hover:transform hover:scale-[1.02] hover:-translate-y-2
        h-full
        overflow-hidden
      `}
      style={{
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 15px rgba(178, 75, 243, 0.3), 0 0 30px rgba(178, 75, 243, 0.2)'
          : '0 1px 30px rgba(0, 0, 0, 0.1), 0 0 18px rgba(178, 75, 243, 0.4)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Фиолетовый градиент внизу карточки */}
      <div 
        className={`
          absolute inset-x-0 bottom-0 h-20 
          bg-gradient-to-t from-primary/20 via-primary/10 to-transparent
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-50'}
        `} 
      />

      {/* Внутреннее свечение при hover */}
      <div 
        className={`
          absolute inset-0 rounded-xl 
          bg-gradient-to-br from-primary/5 via-transparent to-primary/5
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} 
      />
      
      {/* Контент карточки */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Icon without background */}
        <div className="mb-8 flex-shrink-0">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full text-primary transition-all duration-500">
            {renderServiceIcon(service.icon)}
          </div>
        </div>
        
        {/* Заголовок */}
        <div className="mb-6 flex-shrink-0">
          <h3 className="text-2xl font-bold leading-tight text-white">
            {service.title}
          </h3>
        </div>
        
        {/* Описание - растет по содержимому */}
        <div className="mb-auto flex-grow">
          <p className="text-light-gray leading-relaxed text-base mb-8">
            {service.description}
          </p>
          
          {/* Core Capabilities - выравниваются по нижнему краю описания */}
          <div className="mt-auto">
            <h4 className="text-base font-semibold mb-4 text-primary">
              Core Capabilities:
            </h4>
            <ul className="space-y-3">
              {service.features.slice(0, 3).map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start">
                  <span className="text-primary mr-3 mt-1 flex-shrink-0 text-lg">
                    •
                  </span>
                  <span className="text-light-gray text-base leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* CTA Button - появляется только при hover */}
        <motion.div 
          className="relative mt-8 flex-shrink-0"
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          variants={buttonVariants}
        >
          <Link href={`/services/${service.id}`}>
            <Button 
              variant="primary" 
              className="w-full transition-all duration-300 text-base py-4"
            >
              <span className="flex items-center justify-center">
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
    </motion.div>
  );
}

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Небольшая задержка для плавного появления
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Анимационные варианты для заголовков
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

  if (!isMounted) {
    return null; // Предотвращаем гидратацию до монтирования
  }

  return (
    <SiteLayout>
      {/* Hero section */}
      <motion.section 
        className="section-hero bg-dark-gray"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing">
              How We Architect
            </h1>
            <p className="hero-subtitle text-light-gray max-w-3xl mx-auto section-subtitle-medium section-button-spacing">
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
      </motion.section>

      {/* Services Overview section */}
      <section className="section-benefits bg-site-bg">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center section-content-spacing"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="section-title-large font-bold section-title-spacing">Solutions We Offer</h2>
            <p className="section-subtitle-large text-light-gray max-w-3xl mx-auto">
              From CRM integration to AI-powered automation, we provide solutions to address all aspects of your business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="section-benefits bg-dark-gray">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center section-content-spacing"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="section-title-large font-bold section-title-spacing-large">
              Our Automation Flow:<br />From Discovery to Deployment
            </h2>
            <p className="section-subtitle-large text-light-gray max-w-3xl mx-auto">
              A sharp, proven framework — designed to deliver fast<br />and integrate deep into your ops.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto section-content-spacing-large"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  delay: 0.3,
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <div className="relative space-y-12">
              {/* Vertical line */}
              <div className="absolute left-5 top-5 bottom-0 w-0.5 bg-primary" />
              
              {/* Steps */}
              {[
                {
                  title: "Align on Scope. Kick Things Off",
                  description: "We start by signing an NDA and holding a kickoff meeting to clarify your objectives and expectations. This ensures that we are fully aligned on your needs, priorities, and timelines from the very beginning."
                },
                {
                  title: "Understand Your Reality",
                  description: "We dive deep into understanding your business operations through stakeholder interviews and process discovery. We observe your current workflows, uncover inefficiencies, and identify where automation can add the most value."
                },
                {
                  title: "Map the Process. Spot the Gaps",
                  description: "We document your existing business processes in detail, mapping every step, role, and decision point. This step helps us highlight pain points, overlaps, and areas where automation can be implemented effectively."
                },
                {
                  title: "Design the Future Flow",
                  description: "Based on our analysis, we design a custom solution that will optimize your processes. We define what your future workflows should look like and ensure that the solution is tailored to meet your specific needs, with an emphasis on improving efficiency and reducing complexity."
                },
                {
                  title: "Plan the Rollout. Set the Timeline",
                  description: "We create a detailed implementation plan, including the specific steps, timelines, and resources required to get the solution up and running. Our team sets clear milestones to ensure timely delivery and success at each stage of the project."
                },
                {
                  title: "Implement, Test, Iterate",
                  description: "We deploy the solution, ensuring minimal disruption to your daily operations. During this phase, we rigorously test the system to ensure everything functions as expected. If necessary, we make adjustments and improvements before the full-scale launch."
                },
                {
                  title: "Data Migration & System Integration",
                  description: "After the solution has been tested and confirmed, we migrate your existing data and integrate the new system with your other tools. This ensures smooth data transfer, seamless workflows, and full compatibility with your existing infrastructure."
                },
                {
                  title: "Train the Team. Support the Growth",
                  description: "Once the solution is live, we provide comprehensive training to ensure your team can fully leverage the new system. We offer ongoing support to address any challenges and make adjustments as your business continues to evolve."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative flex group"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }
                    }
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 group-hover:bg-primary transition-colors duration-300">
                    <span className="font-bold text-dark-gray">{index + 1}</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-light-gray group-hover:text-gray-200 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA section */}
      <motion.section 
        className="section-cta bg-dark-gradient"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.5,
              duration: 0.7, 
              ease: [0.2, 0.65, 0.3, 0.9]
            }
          }
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title-medium font-bold section-title-spacing">Ready to Streamline the Flow?</h2>
          <p className="section-subtitle-small text-light-gray max-w-2xl mx-auto section-button-spacing">
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
      </motion.section>
    </SiteLayout>
  );
}

// Функция для рендеринга иконок
function renderServiceIcon(icon: string) {
  switch (icon) {
    case 'process':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'crm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'industry':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'ai':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'document':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'finance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
  }
}