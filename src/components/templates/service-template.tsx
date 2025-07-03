// src/components/templates/service-template.tsx - Complete Updated Version
"use client";

import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/ui/cards/case-card';
import Link from 'next/link';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/utils';
import { BreadcrumbSchema } from '@/lib/seo/schema';
import { generateServiceBreadcrumbs } from '@/lib/seo/breadcrumb-helper';

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
    featuresTitle?: string; // Добавляем возможность кастомизировать заголовок Features
  };
  benefits?: ServiceBenefit[];
  features?: ServiceFeature[];
  processes?: ServiceProcess[];
  caseStudies?: ServiceCaseStudy[];
  faqs?: ServiceFAQ[];
  
  // Дополнительные блоки, если нужно
  additionalSections?: ReactNode;
  // Control where additional sections appear
  additionalSectionsPosition?: 'after-features' | 'before-cta';
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
  additionalSectionsPosition = 'after-features',
}: ServiceTemplateProps) {
  
  // Device detection for mobile optimizations с защитой от гидратации
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Simple performance detection
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
      const isLowPerf = Boolean(connection && 
        (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'));
      setIsLowPerformance(isLowPerf);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  

  // Генерируем breadcrumbs для текущей страницы услуги
  const breadcrumbs = generateServiceBreadcrumbs(serviceId);

  return (
    <>
      {/* BreadcrumbSchema для SEO */}
      <BreadcrumbSchema items={breadcrumbs} />
      
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
        />
      )}

      {/* Combined Benefits and Features Section */}
      {((benefits && benefits.length > 0) || (overview && overview.features && overview.features.length > 0)) && (
        <BenefitsSection 
          title="Solution Features"
          subtitle="Our solutions deliver tangible benefits that directly impact your organization's efficiency and bottom line."
          benefits={benefits}
          features={overview?.features}
          featuresTitle={overview?.featuresTitle}
        />
      )}

      {/* Features section - ОБНОВЛЕННЫЙ LAYOUT С УВЕЛИЧЕННЫМИ ТЕКСТАМИ */}
      {features && features.length > 0 && (
        <FeaturesSection 
          title="Our Solutions"
          subtitle="We offer a comprehensive range of solutions to<br />address your specific business needs."
          features={features}
        />
      )}

      {/* Дополнительные секции - positioned after Features, before Process */}
      {additionalSectionsPosition === 'after-features' && additionalSections}

      {/* Process section */}
      {processes && processes.length > 0 && (
        <ProcessSection 
          title="Our Process"
          subtitle="We follow a proven methodology to ensure successful implementation tailored to your business needs."
          processes={processes}
          isMobile={isMobile}
          isLowPerformance={isLowPerformance}
          isClient={isClient}
        />
      )}

      {/* Case Studies section - ТОЧНО КАК FEATURED CASES НА ГЛАВНОЙ */}
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
          isMobile={isMobile}
          isLowPerformance={isLowPerformance}
          isClient={isClient}
        />
      )}

      {/* Дополнительные секции - positioned before CTA (for boxed solutions) */}
      {additionalSectionsPosition === 'before-cta' && additionalSections}
      
      {/* CTA section */}
      <CTASection />
    </SiteLayout>
    </>
  );
}

// ОБНОВЛЕННАЯ СЕКЦИЯ OVERVIEW с кастомизируемым заголовком Features
function OverviewSection({ 
  title, 
  description
}: { 
  title: string; 
  description: ReactNode;
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
      }
    }
  };


  return (
    <section 
      ref={ref}
      className="pt-20 pb-12 bg-transparent relative overflow-hidden"
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
                <h2 className="section-title-large font-bold leading-tight"
                    style={{
                      textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                    }}>
                  {title}
                </h2>
              </div>
              
              {/* Правая колонка - описание */}
              <div>
                <div className="text-white section-subtitle-small leading-relaxed">
                  {description}
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ENHANCED BENEFITS & FEATURES СЕКЦИЯ - ИНТЕРАКТИВНАЯ И ЛОГИЧНАЯ
function BenefitsSection({ 
  title, 
  subtitle, 
  benefits,
  features,
  featuresTitle
}: { 
  title: string; 
  subtitle: string; 
  benefits?: ServiceBenefit[];
  features?: string[];
  featuresTitle?: string;
}) {
  const [activeTab, setActiveTab] = useState<'benefits' | 'features'>('benefits');
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
      }
    }
  };




  return (
    <section 
      ref={ref}
      className="pt-16 pb-40 relative overflow-hidden bg-dark-gray"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          animate={{
            background: [
              "radial-gradient(circle, rgba(178,75,243,0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(119,71,207,0.6) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(178,75,243,0.4) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-10"
          animate={{
            background: [
              "radial-gradient(circle, rgba(176,255,116,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176,255,116,0.5) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176,255,116,0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>
      <div className="container mx-auto relative z-10">
        {/* Header with Tab Navigation */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={titleControls}
          variants={titleVariants}
        >
          <h2 className="section-title-large font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray section-subtitle-medium max-w-3xl mx-auto mb-12">
            {subtitle}
          </p>

          {/* Enhanced Toggle Switch */}
          {benefits && features && (
            <div className="flex justify-center mb-8">
              <div className="relative inline-flex items-center rounded-full p-1" style={{
                backgroundColor: '#200040',
                border: '1px solid rgba(119, 71, 207, 0.3)',
                width: '400px'
              }}>
                {/* Animated background slider */}
                <motion.div
                  className="absolute rounded-full transition-all duration-300"
                  style={{
                    width: '50%',
                    height: 'calc(100% - 8px)',
                    top: '4px',
                    backgroundColor: activeTab === 'benefits' ? '#7747CF' : '#B0FF74',
                    left: activeTab === 'benefits' ? '4px' : '50%'
                  }}
                  animate={{
                    left: activeTab === 'benefits' ? '4px' : '50%',
                    backgroundColor: activeTab === 'benefits' ? '#7747CF' : '#B0FF74'
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                
                {/* Toggle buttons */}
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`relative z-10 text-sm font-medium transition-all duration-300 rounded-full focus:outline-none ${
                    activeTab === 'benefits'
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  style={{
                    width: '50%',
                    padding: '12px 24px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Core Benefits
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`relative z-10 text-sm font-medium transition-all duration-300 rounded-full focus:outline-none ${
                    activeTab === 'features'
                      ? 'text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                  style={{
                    width: '50%',
                    padding: '12px 24px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {featuresTitle || 'AI Technologies'}
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {/* Benefits Section */}
          {(activeTab === 'benefits' && benefits && benefits.length > 0) && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative rounded-xl p-6 h-full transition-all duration-500 overflow-hidden
                    bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)]
                    border border-primary/20 shadow-[0_0_15px_rgba(119,71,207,0.2)]
                    hover:shadow-[0_0_30px_rgba(119,71,207,0.5)] 
                    hover:border-primary/40 cursor-default hover:scale-105"
                  >
                    {/* Interactive Glow Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 rounded-xl"
                      whileHover={{
                        background: "linear-gradient(135deg, rgba(178,75,243,0.1) 0%, rgba(119,71,207,0.05) 100%)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-white mb-4 whitespace-pre-line">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-light-gray section-subtitle-small font-sans leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Features Section */}
          {(activeTab === 'features' && features && features.length > 0) && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, rotateY: -20 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-6 rounded-xl border border-secondary/20 bg-secondary/5 
                    hover:bg-secondary/10 hover:border-secondary/40 transition-all duration-300
                    hover:scale-105 cursor-default h-full"
                  >
                    {/* Interactive Glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-secondary/0 to-secondary/0 rounded-xl"
                      whileHover={{
                        background: "linear-gradient(135deg, rgba(176,255,116,0.1) 0%, rgba(176,255,116,0.05) 100%)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10 text-center">
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-secondary transition-colors">
                        {feature}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Default Benefits Only View */}
          {(!features && benefits && benefits.length > 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative rounded-xl p-6 h-full transition-all duration-500 overflow-hidden
                    bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)]
                    border border-primary/20 shadow-[0_0_15px_rgba(119,71,207,0.2)]
                    hover:shadow-[0_0_30px_rgba(119,71,207,0.5)] 
                    hover:border-primary/40 cursor-default hover:scale-105"
                  >
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 
                          flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-primary"></div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-light-gray section-subtitle-small font-sans leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ОБНОВЛЕННАЯ СЕКЦИЯ FEATURES С ОПТИМИЗИРОВАННОЙ ВЫСОТОЙ КАРТОЧЕК
function FeaturesSection({ 
  title, 
  subtitle, 
  features, 
}: { 
  title: string; 
  subtitle: string; 
  features: ServiceFeature[]; 
}) {
  // Логика для динамического выравнивания сетки - все в одну строку
  const getGridClass = () => {
    if (features.length === 1) return "grid-cols-1 place-items-center";
    if (features.length === 2) return "grid-cols-1 md:grid-cols-2 place-items-center";
    if (features.length === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center";
    if (features.length === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center";
  };

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '-50px 0px',
    triggerOnce: true
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
      }
    }
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
          <h2 className="section-title-large font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray section-subtitle-medium max-w-3xl mx-auto opacity-90" dangerouslySetInnerHTML={{ __html: subtitle }}>
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Обычная сетка для всех случаев */}
          <div className={`grid ${getGridClass()} gap-8`}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="group cursor-pointer w-full max-w-xs mx-auto"
              >
                <div className="relative overflow-hidden rounded-2xl group cursor-pointer flex flex-col h-[320px]"
                     style={{
                       background: 'linear-gradient(135deg, rgba(23, 10, 36, 0.8) 0%, rgba(21, 9, 32, 0.9) 50%, rgba(18, 7, 26, 0.95) 100%)',
                       border: '1px solid rgba(176, 255, 116, 0.15)',
                       backdropFilter: 'blur(20px)',
                       WebkitBackdropFilter: 'blur(20px)',
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(176, 255, 116, 0.1)',
                       transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                       e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(176, 255, 116, 0.3)';
                       e.currentTarget.style.borderColor = 'rgba(176, 255, 116, 0.4)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0) scale(1)';
                       e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(176, 255, 116, 0.1)';
                       e.currentTarget.style.borderColor = 'rgba(176, 255, 116, 0.15)';
                     }}
                >
                  {/* Animated background glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-full"
                         style={{
                           background: `
                             radial-gradient(circle at 20% 20%, rgba(176, 255, 116, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(176, 255, 116, 0.1) 0%, transparent 50%),
                             linear-gradient(135deg, rgba(176, 255, 116, 0.05) 0%, transparent 100%)
                           `
                         }}
                    />
                  </div>
                  
                  <div className="relative z-10 p-4 flex flex-col h-full">
                    {/* Enhanced header with icon and number */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                             style={{
                               background: 'linear-gradient(135deg, rgba(176, 255, 116, 0.2) 0%, rgba(176, 255, 116, 0.1) 100%)',
                               border: '1px solid rgba(176, 255, 116, 0.3)',
                               boxShadow: '0 0 20px rgba(176, 255, 116, 0.2)'
                             }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#B0FF74]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-[#B0FF74]/40 text-xs font-mono">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Title with enhanced styling */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#B0FF74] transition-all duration-300"
                        style={{
                          textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(176,255,116,0.3)',
                          lineHeight: '1.3'
                        }}>
                      {feature.title}
                    </h3>
                    
                    {/* Enhanced Description - flexible height */}
                    <div className="flex-grow">
                      <p className="text-white/90 text-xs leading-tight">
                        {feature.description}
                      </p>
                    </div>

                    {/* Fixed bottom section with Benefits and Button */}
                    <div className="mt-auto">
                      {/* Enhanced Key Benefits - fixed height */}
                      <div className="mb-1 h-14">
                        <h4 className="text-xs font-semibold text-[#B0FF74] mb-1">Deliverables</h4>
                        {feature.benefits && feature.benefits.length > 0 && (
                          <div className="space-y-0.5">
                            {feature.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-start">
                                <span className="text-[#B0FF74] text-xs mr-1 mt-0.5">✓</span>
                                <span className="text-white/90 text-xs leading-tight">
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Enhanced Case Study Link - fixed position */}
                      {feature.caseId && (
                        <div>
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B0FF74]/30 to-transparent mb-1"></div>
                          <div className="relative group/button">
                            <div className="absolute inset-0 rounded-lg opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" 
                                 style={{
                                   background: 'linear-gradient(135deg, rgba(176, 255, 116, 0.1) 0%, rgba(176, 255, 116, 0.05) 100%)',
                                   boxShadow: '0 0 20px rgba(176, 255, 116, 0.3)'
                                 }}></div>
                            <Link 
                              href={`/cases/${feature.caseId}`} 
                              className="relative inline-flex items-center justify-center w-full text-[#B0FF74] text-xs font-semibold hover:text-[#B0FF74] transition-all duration-300 py-2 px-3 rounded-lg border border-[#B0FF74]/20 hover:border-[#B0FF74]/40 hover:bg-[#B0FF74]/5"
                            >
                              <span>View Case Study</span>
                              <svg 
                                className="w-4 h-4 ml-2 transition-transform group-hover/button:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
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

function ProcessSection({ 
  title, 
  subtitle, 
  processes,
  isMobile = false,
  isLowPerformance = false,
  isClient = false
}: { 
  title: string; 
  subtitle: string; 
  processes: ServiceProcess[];
  isMobile?: boolean;
  isLowPerformance?: boolean;
  isClient?: boolean;
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const [activeStep, setActiveStep] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  // Автопереключатель шагов - отключаем на мобильных для экономии батареи  
  useEffect(() => {
    if (isMobile || isLowPerformance) return; // Skip auto-switching on mobile/low-performance devices
    
    const processesLength = processes.length;
    
    if (activeStep === processesLength - 1) {
      const timer = setTimeout(() => {
        // Плавный скролл к следующей секции
        const currentRef = ref.current;
        if (currentRef) {
          const nextSection = currentRef.nextElementSibling as HTMLElement;
          if (nextSection) {
            nextSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }, 3000); // Задержка 3 секунды на последнем шаге

      return () => clearTimeout(timer);
    }
  }, [activeStep, processes, ref, isMobile, isLowPerformance]);


  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
      }
    }
  };
  
  const navVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: (index: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const,
        delay: index * 0.08
      }
    })
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
              }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
              }
    }
  };

  return (
    <section 
      ref={ref}
      className="section-benefits bg-dark-gray relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="section-title-large font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray section-subtitle-medium max-w-3xl mx-auto opacity-90" dangerouslySetInnerHTML={{ __html: subtitle }}>
          </p>
        </motion.div>

        {/* Основной контент с навигацией */}
        <div className="max-w-7xl mx-auto">
          <div className={`grid ${isClient && isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-12 lg:gap-16`}>
            
            {/* Левая колонка - Навигационное меню (скрыта на мобильных) */}
            {!isMobile && (
              <div className="lg:col-span-1 -ml-8">
              <div className="sticky top-24">
                <div className="space-y-2 mb-8">
                  {processes.map((process, index) => (
                    <motion.button
                      key={process.step}
                      custom={index}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      variants={navVariants}
                      onClick={() => setActiveStep(index)}
                      className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 relative overflow-hidden group focus:outline-none ${
                        activeStep === index 
                          ? 'text-secondary' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {/* Зеленый фон при hover - выходит за пределы текста */}
                      <div className="absolute -left-1 top-0 bottom-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-lg" 
                           style={{ width: 'calc(80% + 20px)' }}></div>
                      
                      {/* Заголовок без нумерации - выровнен с Progress */}
                      <h3 className="text-base md:text-lg font-medium transition-colors duration-300 relative z-10 group-hover:text-black font-mono">
                        {process.title}
                      </h3>
                    </motion.button>
                  ))}
                </div>
                
                {/* Прогресс-бар */}
                <div className="mt-8 ml-4">
                  <div className="text-sm font-medium text-light-gray mb-2 font-mono">Progress</div>
                  <div className="w-4/5 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-secondary"
                      animate={{ 
                        width: `${((activeStep + 1) / processes.length) * 100}%`
                      }}
                      transition={{ 
                        duration: 0.8, 
                                              }}
                    />
                  </div>
                  <div className="text-sm font-medium text-light-gray mt-2 font-mono">
                    Step {activeStep + 1} of {processes.length}
                  </div>
                </div>
              </div>
              </div>
            )}

            {/* Правая колонка - Детальное описание активного шага */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-2'} ${isMobile ? '' : '-mr-8'}`}>
              <div className="sticky top-24">
                {/* Свечение только за блоком */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#2A1A3E] via-[#1F0F2E] to-[#1A0B26] rounded-2xl -z-10"
                     style={{
                       boxShadow: '0 0 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(119, 71, 207, 0.2), 0 0 120px rgba(255, 255, 255, 0.05)'
                     }}>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="bg-gradient-to-br from-[#2A1A3E] via-[#1F0F2E] to-[#1A0B26] backdrop-blur-sm 
                      rounded-2xl p-8 md:p-12">
                      
                      {/* Заголовок шага - на одной прямой */}
                      <div className="flex items-center mb-12">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-6 font-bold text-lg text-black">
                          {processes[activeStep].step}
                        </div>
                        <h3 className="section-title-medium font-bold text-white"
                            style={{
                              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                            }}>
                          {processes[activeStep].title}
                        </h3>
                      </div>

                      {/* Контент в две колонки с правильными пропорциями */}
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Левая колонка - описание (3/5 = 60%) */}
                        <div className="lg:col-span-3">
                          <p className="text-white text-base md:text-lg leading-relaxed">
                            {processes[activeStep].description}
                          </p>
                        </div>

                        {/* Правая колонка - Key Focus (расширенный) */}
                        <div className="lg:col-span-2">
                          <div className="pl-4">
                            <div className="border border-secondary/20 rounded-xl p-6 bg-white/10">
                              <h4 className="text-white font-semibold mb-4">Key Focus:</h4>
                              <p className="text-light-gray text-sm">
                                This step ensures maximum efficiency and quality in our implementation process.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Навигационные кнопки */}
                      <div className="flex justify-between items-center pt-12">
                        <button
                          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                          disabled={activeStep === 0}
                          className={`flex items-center font-medium transition-all duration-300 focus:outline-none ${
                            activeStep === 0
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'text-secondary hover:text-secondary/80'
                          }`}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous
                        </button>

                        <button
                          onClick={() => setActiveStep(Math.min(processes.length - 1, activeStep + 1))}
                          disabled={activeStep === processes.length - 1}
                          className={`flex items-center font-medium transition-all duration-300 focus:outline-none ${
                            activeStep === processes.length - 1
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'text-secondary hover:text-secondary/80'
                          }`}
                        >
                          Next
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CASE STUDIES СЕКЦИЯ - ТОЧНО КАК FEATURED CASES НА ГЛАВНОЙ
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
        delay: 0.5,
      }
    }
  };

  // Определяем количество колонок для сетки
  const gridCols = caseStudies.length === 1 
    ? 'grid-cols-1'
    : caseStudies.length === 2 
      ? 'grid-cols-1 md:grid-cols-2' 
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section 
      ref={ref}
      className="section-cases bg-[#121212]"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">{title}</h2>
          <p className="text-light-gray text-base md:text-lg max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: subtitle }} />
        </motion.div>
        
        <div className={cn("grid gap-6 max-w-5xl mx-auto", gridCols)}>
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
            >
              <CaseCard 
                id={caseStudy.id}
                title={caseStudy.title}
                description={caseStudy.description}
                company={caseStudy.company}
                results={caseStudy.results}
                tags={[serviceId]}
                href={`/cases/${caseStudy.id}`}
                className="case-card-enhanced"
                index={index}
                isVisible={isVisible}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
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

// Clean FAQSection with no scroll interference
function FAQSection({ 
  title, 
  subtitle, 
  faqs,
  isMobile = false,
  isLowPerformance = false,
  isClient = false
}: { 
  title: string; 
  subtitle: string; 
  faqs: ServiceFAQ[];
  isMobile?: boolean;
  isLowPerformance?: boolean;
  isClient?: boolean;
}) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simple intersection observer for animations only - no scroll capture
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Auto-carousel - отключаем на мобильных для экономии батареи
  useEffect(() => {
    if (isMobile || isLowPerformance) return; // Skip auto-carousel on mobile/low-performance devices
    
    const autoInterval = setInterval(() => {
      setActiveQuestion(prev => (prev + 1) % faqs.length);
    }, 5000);

    return () => clearInterval(autoInterval);
  }, [faqs.length, isMobile, isLowPerformance]);

  // Функция для переключения активного вопроса
  const handleQuestionClick = (index: number) => {
    setActiveQuestion(index);
  };

  // Функция для вычисления позиции и трансформации карточки
  const getCardTransform = (index: number) => {
    const diff = index - activeQuestion;
    let normalizedDiff = diff;
    
    // Нормализация для циклической логики
    if (diff > faqs.length / 2) {
      normalizedDiff = diff - faqs.length;
    } else if (diff < -faqs.length / 2) {
      normalizedDiff = diff + faqs.length;
    }
    
    // Упрощенная версия для мобильных без 3D эффектов
    if (isMobile || isLowPerformance) {
      if (normalizedDiff === 0) {
        return {
          transform: 'translateY(0%) scale(1)',
          opacity: 1,
          zIndex: 10,
        };
      } else if (normalizedDiff === -1) {
        return {
          transform: 'translateY(-50%) scale(0.9)',
          opacity: 0.7,
          zIndex: 5,
        };
      } else if (normalizedDiff === 1) {
        return {
          transform: 'translateY(50%) scale(0.9)',
          opacity: 0.7,
          zIndex: 5,
        };
      } else {
        return {
          transform: normalizedDiff < 0 ? 'translateY(-100%)' : 'translateY(100%)',
          opacity: 0,
          zIndex: 1,
        };
      }
    }
    
    // Полная версия с 3D эффектами для десктопа
    if (normalizedDiff === 0) {
      return {
        transform: 'translateY(0%) scale(1) rotateX(0deg)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (normalizedDiff === -1) {
      return {
        transform: 'translateY(-65%) scale(0.85) rotateX(8deg)',
        opacity: 0.65,
        zIndex: 5,
      };
    } else if (normalizedDiff === 1) {
      return {
        transform: 'translateY(65%) scale(0.85) rotateX(-8deg)',
        opacity: 0.65,
        zIndex: 5,
      };
    } else {
      return {
        transform: normalizedDiff < 0 
          ? 'translateY(-140%) scale(0.7) rotateX(20deg)'
          : 'translateY(140%) scale(0.7) rotateX(-20deg)',
        opacity: 0,
        zIndex: 1,
      };
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
      }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: (index: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const,
        delay: index * 0.05
      }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="section-benefits bg-dark-gray relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="section-title-large font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            {title}
          </h2>
          <p className="text-light-gray text-base md:text-lg max-w-3xl mx-auto opacity-90">
            {subtitle}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto h-full">
          <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center'} h-full`}>
            
            {/* Левая колонка - список вопросов (скрыта на мобильных) */}
            {!isMobile && (
              <div className="lg:col-span-1 flex justify-center">
              <div className="w-full">
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <motion.button
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      variants={navVariants}
                      onClick={() => handleQuestionClick(index)}
                      className={`w-full text-left py-4 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group focus:outline-none ${
                        activeQuestion === index 
                          ? 'text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {activeQuestion === index && (
                        <motion.div 
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: 'linear-gradient(135deg, rgba(119, 71, 207, 0.2) 0%, rgba(178, 75, 243, 0.15) 100%)',
                            boxShadow: '0 0 20px rgba(178, 75, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            boxShadow: [
                              '0 0 20px rgba(178, 75, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                              '0 0 30px rgba(178, 75, 243, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                              '0 0 20px rgba(178, 75, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            ]
                          }}
                          transition={{
                            opacity: { duration: 0.3 },
                            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />
                      )}
                      
                      {activeQuestion !== index && (
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      )}
                      
                      <span className="relative z-10 font-medium text-sm md:text-base leading-relaxed block">
                        {faq.question}
                      </span>
                      
                      <span className={`relative z-10 text-xs font-mono mt-1 block transition-colors duration-300 ${
                        activeQuestion === index ? 'text-secondary' : 'text-white/50'
                      }`}>
                        Q{String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-center items-center gap-8 mt-8 px-6">
                  <button
                    onClick={() => handleQuestionClick((activeQuestion - 1 + faqs.length) % faqs.length)}
                    className="flex items-center font-medium transition-all duration-300 focus:outline-none text-secondary hover:text-secondary/80"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Previous
                  </button>

                  <span className="text-white/50 text-sm font-mono">
                    {activeQuestion + 1} / {faqs.length}
                  </span>

                  <button
                    onClick={() => handleQuestionClick((activeQuestion + 1) % faqs.length)}
                    className="flex items-center font-medium transition-all duration-300 focus:outline-none text-secondary hover:text-secondary/80"
                  >
                    Next
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              </div>
            )}

            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="relative w-full" style={{ height: '400px' }}>
                <div className={`relative h-full ${(isClient && (isMobile || isLowPerformance)) ? '' : 'perspective-1000'}`}>
                  {faqs.map((faq, index) => {
                    const transform = getCardTransform(index);
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute w-full"
                        style={{
                          top: '50%',
                          transform: 'translateY(-50%)',
                          height: '300px',
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden'
                        }}
                        animate={transform}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                          type: "tween"
                        }}
                      >
                        {activeQuestion === index && (
                          <motion.div
                            className="absolute -inset-6 bg-gradient-to-br from-[#2A1A3E] via-[#1F0F2E] to-[#1A0B26] rounded-2xl -z-10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1
                            }}
                            transition={{
                              opacity: { duration: 0.4 },
                              scale: { duration: 0.4 }
                            }}
                            style={{
                              boxShadow: '0 0 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(119, 71, 207, 0.25)'
                            }}
                          />
                        )}
                        
                        <div className="bg-gradient-to-br from-[#2A1A3E] via-[#1F0F2E] to-[#1A0B26] backdrop-blur-sm 
                          rounded-2xl p-8 md:p-10 h-full transition-all duration-500 flex flex-col"
                          style={{ justifyContent: 'space-between', paddingTop: '3rem', paddingBottom: '3rem' }}>
                          
                          <div className="flex-1">
                            <motion.h3 
                              className="text-xl md:text-2xl font-bold mb-6 leading-tight text-white"
                              style={{
                                textShadow: activeQuestion === index 
                                  ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)' 
                                  : 'none'
                              }}
                            >
                              {faq.question}
                            </motion.h3>

                            <p className="text-white/90 text-base md:text-lg leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>

                          {activeQuestion === index && (
                            <motion.div
                              className="mt-8 pt-6 border-t border-primary/20"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              {/* Mobile navigation inside the card */}
                              {isClient && isMobile ? (
                                <div className="flex justify-center items-center gap-8">
                                  <button
                                    onClick={() => handleQuestionClick((activeQuestion - 1 + faqs.length) % faqs.length)}
                                    className="flex items-center font-medium transition-all duration-300 focus:outline-none text-secondary hover:text-secondary/80"
                                  >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                  </button>

                                  <span className="text-white/50 text-sm font-mono">
                                    {activeQuestion + 1} / {faqs.length}
                                  </span>

                                  <button
                                    onClick={() => handleQuestionClick((activeQuestion + 1) % faqs.length)}
                                    className="flex items-center font-medium transition-all duration-300 focus:outline-none text-secondary hover:text-secondary/80"
                                  >
                                    Next
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-secondary text-sm font-medium">
                                    <div className="w-2 h-2 rounded-full bg-secondary mr-3 animate-pulse"></div>
                                    Have more questions?
                                  </div>
                                  <Link 
                                    href="/contacts" 
                                    className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
                                  >
                                    Contact our team →
                                  </Link>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Боковые точки навигации (скрыты на мобильных) */}
                {!isMobile && (
                  <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-20">
                    {faqs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          activeQuestion === index 
                            ? 'bg-secondary shadow-lg' 
                            : 'bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ОБНОВЛЕННАЯ CTA СЕКЦИЯ С НОВЫМ ТЕКСТОМ
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
            <h2 className="section-title-large font-bold section-title-spacing"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                }}>
              Ready to Get Started?
            </h2>
          
            <p className="section-subtitle-large text-light-gray mb-16">
              Trust our team to map your processes and<br />uncover automation potential.
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