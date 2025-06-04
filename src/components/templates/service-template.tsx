// src/components/templates/service-template.tsx - Complete Updated Version
"use client";

import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollAnimation } from '@/lib/utils/animation';

// Типы для описания секций страницы услуги
export interface ServiceBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  benefits?: string[];
  icon?: string;
  caseId?: string;
}

export interface ServiceCaseStudy {
  id: string;
  title: string;
  company: string;
  description: string;
  results: string[];
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceTemplateProps {
  // Основные данные
  serviceId: string;
  serviceTitle: string;
  serviceDescription: string;
  breadcrumbTitle: string;
  
  // Секции
  overview?: {
    title: string;
    description: ReactNode;
    features?: string[];
  };
  benefits?: ServiceBenefit[];
  features?: ServiceFeature[];
  processes?: ServiceProcess[];
  caseStudies?: ServiceCaseStudy[];
  faqs?: ServiceFAQ[];
  
  // Дополнительные блоки, если нужно
  additionalSections?: ReactNode;
}

export default function ServiceTemplate({
  serviceId,
  serviceTitle,
  serviceDescription,
  breadcrumbTitle,
  overview,
  benefits,
  features,
  processes,
  caseStudies,
  faqs,
  additionalSections,
}: ServiceTemplateProps) {
  
  // Функция для рендеринга иконок - полный набор из всех services
  const renderIcon = (icon: string) => {
    switch (icon) {
      // AI Solutions icons
      case 'voice':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'search':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'analysis':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'prediction':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'scale':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      
      // Business Process icons
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'dollar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'map':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case 'workflow':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'connect':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'dashboard':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      
      // Additional icons for other services
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        );
      
      // Default fallback icon
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <SiteLayout>
      {/* Hero section */}
      <section className="section-hero bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center text-light-gray mb-6">
              <Link href="/services" className="hover:text-white transition-colors text-sm">
                Services
              </Link>
              <span className="mx-3 text-primary">/</span>
              <span className="text-white text-sm">{breadcrumbTitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                style={{
                  textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(178,75,243,0.5)'
                }}>
              {serviceTitle}
            </h1>
            
            <p className="text-lg md:text-xl text-light-gray max-w-4xl mx-auto whitespace-pre-line mb-16 opacity-90">
              {serviceDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center button-gap-large">
              <Link href="/cases">
                <Button variant="secondary" size="lg">
                  View Related Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview section - ОБНОВЛЕННЫЙ LAYOUT */}
      {overview && (
        <OverviewSection 
          title={overview.title}
          description={overview.description}
          features={overview.features}
        />
      )}

      {/* Benefits section - НОВЫЙ СТИЛЬ БЕЗ ИКОНОК */}
      {benefits && benefits.length > 0 && (
        <BenefitsSection 
          title="Key Benefits"
          subtitle="Our solutions deliver tangible benefits that directly impact your organization's efficiency and bottom line."
          benefits={benefits}
        />
      )}

      {/* Features section - НОВЫЙ LAYOUT ПО КАРТИНКЕ */}
      {features && features.length > 0 && (
        <FeaturesSection 
          title="Our Solutions"
          subtitle="We offer a comprehensive range of solutions to address your specific business needs."
          features={features}
          renderIcon={renderIcon}
        />
      )}

      {/* Process section */}
      {processes && processes.length > 0 && (
        <ProcessSection 
          title="Our Process"
          subtitle="We follow a proven methodology to ensure successful implementation tailored to your business needs."
          processes={processes}
        />
      )}

      {/* Case Studies section */}
      {caseStudies && caseStudies.length > 0 && (
        <CaseStudiesSection 
          title="Success Stories"
          subtitle="See how our solutions have helped businesses streamline operations and improve efficiency."
          caseStudies={caseStudies}
          serviceId={serviceId}
        />
      )}

      {/* FAQ section */}
      {faqs && faqs.length > 0 && (
        <FAQSection 
          title="Frequently Asked Questions"
          subtitle="Common questions about our services and solutions."
          faqs={faqs}
        />
      )}

      {/* Дополнительные секции */}
      {additionalSections}
      
      {/* CTA section */}
      <CTASection />
    </SiteLayout>
  );
}

// ОБНОВЛЕННАЯ СЕКЦИЯ OVERVIEW с новым layout и заголовком Features
function OverviewSection({ 
  title, 
  description, 
  features 
}: { 
  title: string; 
  description: ReactNode; 
  features?: string[]; 
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true,
    visibilityThreshold: 0.3
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.15 + index * 0.08
      }
    })
  };

  return (
    <section 
      ref={ref}
      className="section-benefits bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-secondary/5 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            {/* НОВЫЙ LAYOUT: Заголовок и описание в одной строке */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
              {/* Левая колонка - заголовок */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                    style={{
                      textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                    }}>
                  {title}
                </h2>
              </div>
              
              {/* Правая колонка - описание */}
              <div>
                <div className="text-light-gray text-lg md:text-xl leading-relaxed opacity-90">
                  {description}
                </div>
              </div>
            </div>
            
            {/* Features на всю ширину ниже с заголовком */}
            {features && features.length > 0 && (
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-12 text-white"
                    style={{
                      textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.3)'
                    }}>
                  Key Features
                </h3>
                
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex flex-wrap justify-center gap-4 lg:gap-6"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={buttonVariants}
                      className={`
                        px-6 py-3 rounded-lg transition-all duration-300 relative group border cursor-default
                        text-white border-transparent
                      `}
                    >
                      {/* Активное свечение */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.2) 0%, rgba(178, 75, 243, 0.15) 100%)',
                          boxShadow: '0 0 20px rgba(178, 75, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
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
                      
                      <motion.span 
                        className="relative z-10 font-medium text-sm lg:text-base text-white"
                        style={{
                          textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(178,75,243,0.6)'
                        }}
                      >
                        {feature}
                      </motion.span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ОБНОВЛЕННАЯ СЕКЦИЯ BENEFITS БЕЗ ИКОНОК С ЭФФЕКТАМИ КАК НА ГЛАВНОЙ
function BenefitsSection({ 
  title, 
  subtitle, 
  benefits 
}: { 
  title: string; 
  subtitle: string; 
  benefits: ServiceBenefit[]; 
}) {
  const { ref, isVisible, visibilityRatio } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true,
    visibilityThreshold: 0.3
  });
  
  const [isReady, setIsReady] = useState(false);
  const titleControls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && isReady && !hasAnimated && visibilityRatio >= 0.3) {
      titleControls.start("visible").then(() => {
        setHasAnimated(true);
      });
    }
  }, [isVisible, isReady, titleControls, hasAnimated, visibilityRatio]);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.15 + index * 0.12
      }
    })
  };

  return (
    <section 
      ref={ref}
      className="section-benefits bg-dark-gray relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={titleControls}
          variants={titleVariants}
        >
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray text-lg md:text-2xl max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={cardVariants}
              className="h-full"
            >
              <div className="bg-gradient-to-br from-dark-purple/50 to-dark-purple/30 backdrop-blur-sm border border-primary/20 
                rounded-2xl p-6 transition-all duration-300 hover:border-primary/40 
                hover:shadow-[0_10px_40px_rgba(178,75,243,0.3)] group relative overflow-hidden h-full">
                
                {/* Стильный градиентный фон */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 
                  group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500 rounded-2xl"></div>
                
                {/* Анимированное свечение по краям */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    boxShadow: [
                      '0 0 20px rgba(178,75,243,0.0)',
                      '0 0 30px rgba(178,75,243,0.4)',
                      '0 0 20px rgba(178,75,243,0.0)'
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />
                
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 whitespace-pre-line text-white
                    group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-light-gray text-sm sm:text-base md:text-lg font-sans opacity-90
                    group-hover:opacity-100 transition-opacity duration-300">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Декоративные элементы */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary/20 rounded-full 
                  group-hover:bg-primary/30 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-12 h-1 bg-gradient-to-r from-primary to-secondary 
                  group-hover:from-secondary group-hover:to-primary transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ОБНОВЛЕННАЯ СЕКЦИЯ FEATURES С НОВЫМ LAYOUT ПО КАРТИНКЕ
function FeaturesSection({ 
  title, 
  subtitle, 
  features, 
  renderIcon 
}: { 
  title: string; 
  subtitle: string; 
  features: ServiceFeature[]; 
  renderIcon: (icon: string) => ReactNode; 
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '-50px 0px',
    triggerOnce: true
  });

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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.2 + index * 0.1
      }
    })
  };

  return (
    <section 
      ref={ref}
      className="section-solutions bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dark-purple/5">
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle, rgba(119,71,207,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(178,75,243,0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(119,71,207,0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(178,75,243,0.2) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(119,71,207,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(178,75,243,0.2) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray text-lg md:text-2xl max-w-3xl mx-auto opacity-90">
            {subtitle}
          </p>
        </motion.div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Левая колонка - заголовок и описание */}
                <div>
                  <div className="flex items-start mb-6">
                    {feature.icon && (
                      <div className="text-primary mr-4 flex-shrink-0 mt-1">
                        {renderIcon(feature.icon)}
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white"
                        style={{
                          textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.3)'
                        }}>
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-light-gray text-lg md:text-xl leading-relaxed mb-8 opacity-90">
                    {feature.description}
                  </p>
                  
                  {feature.caseId && (
                    <Link 
                      href={`/cases/${feature.caseId}`} 
                      className="inline-flex items-center text-primary font-medium hover:underline transition-colors group"
                    >
                      View Related Case Study
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                    </Link>
                  )}
                </div>
                
                {/* Правая колонка - подзаголовки и benefits */}
                <div className="space-y-6">
                  {feature.benefits && feature.benefits.length > 0 && (
                    <>
                      <h4 className="text-xl font-semibold text-white mb-4">Key Benefits:</h4>
                      <div className="space-y-4">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 
                              flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            </div>
                            <span className="text-light-gray text-base leading-relaxed opacity-90">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Разделительная линия для всех элементов кроме последнего */}
              {index < features.length - 1 && (
                <div className="mt-16 pt-8 border-t border-primary/20"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ 
  title, 
  subtitle, 
  processes 
}: { 
  title: string; 
  subtitle: string; 
  processes: ServiceProcess[]; 
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1 + index * 0.1
      }
    })
  };

  return (
    <section 
      ref={ref}
      className="section-benefits bg-dark-gray relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray text-lg md:text-2xl max-w-3xl mx-auto opacity-90">
            {subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative space-y-12">
            <div 
              className="absolute left-8 top-8 bottom-0 w-0.5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(178,75,243,0.8) 0%, rgba(119,71,207,1) 50%, rgba(178,75,243,0.8) 100%)',
                boxShadow: '0 0 12px rgba(178,75,243,0.8), 0 0 24px rgba(178,75,243,0.6)'
              }}
            />
            
            {processes.map((process, index) => (
              <motion.div 
                key={process.step} 
                className="relative flex items-start"
                custom={index}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={cardVariants}
              >
                <motion.div 
                  className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center z-10 font-bold text-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(178,75,243,0.9) 0%, rgba(119,71,207,1) 100%)',
                    boxShadow: '0 0 20px rgba(178,75,243,0.8), 0 0 40px rgba(178,75,243,0.6)'
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(178,75,243,0.8), 0 0 40px rgba(178,75,243,0.6)',
                      '0 0 30px rgba(178,75,243,1), 0 0 60px rgba(178,75,243,0.8)',
                      '0 0 20px rgba(178,75,243,0.8), 0 0 40px rgba(178,75,243,0.6)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  {process.step}
                </motion.div>
                
                <div className="ml-8 flex-1">
                  <div className="bg-gradient-to-br from-dark-purple/50 to-dark-purple/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                    <p className="text-light-gray section-subtitle-large opacity-90">
                      {process.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection({ 
  title, 
  subtitle, 
  caseStudies, 
  serviceId 
}: { 
  title: string; 
  subtitle: string; 
  caseStudies: ServiceCaseStudy[]; 
  serviceId: string; 
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '-50px 0px',
    triggerOnce: true
  });

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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.2 + index * 0.1
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="section-cases bg-[#121212] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray text-lg md:text-2xl max-w-3xl mx-auto opacity-90">
            {subtitle}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <div className="bg-gradient-to-br from-dark-purple/50 to-dark-purple/30 backdrop-blur-sm border border-primary/20 
                overflow-hidden h-full rounded-2xl hover:border-primary/40 
                hover:shadow-[0_10px_40px_rgba(178,75,243,0.3)] transition-all duration-300">
                
                <div 
                  className="h-48 relative"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(176,255,116,0.3) 0%, rgba(176,255,116,0.2) 100%)' 
                  }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-secondary/30">
                      {serviceId}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
                  <p className="text-secondary text-sm mb-4 font-medium">{caseStudy.company}</p>
                  <p className="text-light-gray section-subtitle-large mb-6 opacity-90">
                    {caseStudy.description}
                  </p>
                  
                  <h4 className="text-secondary font-semibold mb-3 text-sm">Key Results:</h4>
                  <ul className="text-light-gray text-sm space-y-2 mb-6">
                    {caseStudy.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start">
                        <span className="text-secondary mr-2 mt-0.5">•</span>
                        <span className="opacity-90">{result}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={`/cases/${caseStudy.id}`} 
                    className="text-secondary font-medium text-sm flex items-center hover:underline transition-colors"
                  >
                    View Case Study
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
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
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center section-content-spacing-large"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={buttonVariants}
        >
          <Link href="/cases">
            <Button variant="secondary" size="lg">
              View All Case Studies
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection({ 
  title, 
  subtitle, 
  faqs 
}: { 
  title: string; 
  subtitle: string; 
  faqs: ServiceFAQ[]; 
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1 + index * 0.1
      }
    })
  };

  return (
    <section 
      ref={ref}
      className="section-benefits bg-dark-gray relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray text-lg md:text-2xl max-w-3xl mx-auto opacity-90">
            {subtitle}
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <div className="bg-gradient-to-br from-dark-purple/50 to-dark-purple/30 backdrop-blur-sm border border-primary/20 
                rounded-xl p-6 h-full hover:border-primary/40 transition-colors duration-300">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-light-gray section-subtitle-large opacity-90">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const contentVariants = {
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

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="section-cta bg-transparent relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full opacity-5 blur-[100px]"
        style={{ 
          transform: 'translate(0, 0)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full opacity-5 blur-[100px]"
        style={{ 
          transform: 'translate(0, 0)'
        }}
      />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={contentVariants}
          >
            <h2 className="section-title-medium font-bold mb-8"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                }}>
              Ready to Get Started?
            </h2>
          
            <p className="section-subtitle-large text-light-gray mb-16">
              Book a free consultation to discuss how our solutions can help your business save time, reduce errors, and improve efficiency.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacts">
                <Button variant="secondary" size="lg">
                  Book a Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}