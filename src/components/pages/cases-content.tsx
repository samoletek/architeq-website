// src/components/pages/cases-content.tsx
"use client";

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseCard } from '@/components/ui/cards/case-card';
import { ContactCaseCard } from '@/components/ui/cards/contact-case-card';
import { Button } from '@/components/ui/button';
import { IndustryFilters } from '@/components/ui/filters/industry-filters';
import { FunctionFilters } from '@/components/ui/filters/function-filters';
import { IntegratedSearchFilters } from '@/components/ui/filters/integrated-search-filters';
import { MobileFiltersPanel } from '@/components/ui/filters/mobile-filters-panel';
import { RecentlyViewedCases } from '@/components/ui/recently-viewed-cases';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import UnifiedCTASection from '@/components/sections/unified-cta-section';
import { cn } from '@/lib/utils/utils';

import { 
  allCaseStudies, 
  filterCasesByMatrix,
  IndustryCategory,
  FunctionCategory,
  CaseStudy
} from '@/lib/data/case-studies';

// Создание тегов для карточек
function createCaseCardTags(caseStudy: CaseStudy): string[] {
  const tags: string[] = [];
  
  // Маппинг для коротких названий
  const tagNames: Record<string, string> = {
    // Solution Types
    'Custom Solutions': 'Custom',
    'CRM Integrations': 'CRM', 
    'Documents & Web Forms': 'Documents',
    'System & Infrastructure Integrations': 'Systems',
    'AI-Powered Solutions': 'AI',
    'Industry-Specific Products': 'Industry',
    'Finance & Accounting': 'Finance',
    
    // Technologies
    'Monday CRM': 'Monday',
    'Monday': 'Monday',
    'API integrations': 'API',
    'QuickBooks': 'QB',
    'Make': 'Make',
    'Zapier': 'Zapier',
    'OpenAI': 'OpenAI',
    'Twilio': 'Twilio',
    'Stripe': 'Stripe',
    'Next.js': 'Next.js',
    'TypeScript': 'TypeScript',
    'DocuSign': 'DocuSign',
    'JotForm': 'JotForm',
    'Slack': 'Slack',
    'Google Sheets': 'Sheets',
    'GoogleSheets': 'Sheets',
    'Google Workspace API': 'Google API',
    'ElevenLabs': 'Voice AI',
    'CabinetVision': 'CAD'
  };

  const formatTag = (tag: string): string => tagNames[tag] || tag;
  
  // Первый тег - тип решения + технологии
  if (caseStudy.solutionType) {
    tags.push(formatTag(caseStudy.solutionType));
  }
  
  if (caseStudy.technologies && Array.isArray(caseStudy.technologies) && caseStudy.technologies.length > 0) {
    const techs = caseStudy.technologies.slice(0, 2);
    techs.forEach((tech: string) => {
      tags.push(formatTag(tech));
    });
  }
  
  return tags.slice(0, 3);
}

// Формат карточки кейса
function formatCaseCard(caseStudy: CaseStudy) {
  return {
    id: caseStudy.id,
    title: caseStudy.title,
    description: caseStudy.description,
    industry: caseStudy.industry,
    company: caseStudy.company,
    location: caseStudy.location,
    results: caseStudy.results,
    image: caseStudy.image,
    tags: createCaseCardTags(caseStudy),
    isSpecialCard: caseStudy.isSpecialCard
  };
}

// Основной компонент страницы кейсов
export default function CasesContent() {
  // Состояние для системы фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryCategory[]>(['your-industry']);
  const [selectedFunctions, setSelectedFunctions] = useState<FunctionCategory[]>(['custom-solutions']);
  
  // Состояние для мобильной версии
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const { isMobile, isTablet } = useDeviceDetection();
  
  // Обработчики для изменения фильтров
  const handleIndustryChange = useCallback((industry: IndustryCategory) => {
    setSelectedIndustries(prev => {
      if (industry === 'your-industry') {
        return ['your-industry'];
      }
      
      const withoutDefaults = prev.filter(id => id !== 'your-industry');
      
      if (withoutDefaults.includes(industry)) {
        const filtered = withoutDefaults.filter(i => i !== industry);
        return filtered.length === 0 ? ['your-industry'] : filtered;
      } else {
        return [...withoutDefaults, industry];
      }
    });
  }, []);
  
  const handleFunctionChange = useCallback((functionCategory: FunctionCategory) => {
    setSelectedFunctions(prev => {
      if (functionCategory === 'custom-solutions') {
        return ['custom-solutions'];
      }
      
      const withoutDefaults = prev.filter(id => id !== 'custom-solutions');
      
      if (withoutDefaults.includes(functionCategory)) {
        const filtered = withoutDefaults.filter(f => f !== functionCategory);
        return filtered.length === 0 ? ['custom-solutions'] : filtered;
      } else {
        return [...withoutDefaults, functionCategory];
      }
    });
  }, []);
  
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  const clearAllFilters = useCallback(() => {
    setSelectedIndustries(['your-industry']);
    setSelectedFunctions(['custom-solutions']);
    setSearchQuery('');
  }, []);
  
  // Логика фильтрации кейсов
  const filteredCases = useMemo(() => {
    const activeIndustries = selectedIndustries.filter(id => id !== 'your-industry');
    const activeFunctions = selectedFunctions.filter(id => id !== 'custom-solutions');
    const hasSearch = searchQuery.trim().length > 0;
    const hasFilters = activeIndustries.length > 0 || activeFunctions.length > 0;
    
    if (!hasSearch && !hasFilters) {
      return allCaseStudies;
    }
    
    const filtered = filterCasesByMatrix({
      searchQuery: searchQuery.trim(),
      industries: activeIndustries,
      functions: activeFunctions
    });
    
    if (hasSearch) {
      return filtered.filter(caseItem => !caseItem.isSpecialCard);
    }
    
    return filtered;
  }, [searchQuery, selectedIndustries, selectedFunctions]);
  
  // Разделяем обычные кейсы и рекламную карточку
  const { regularCases, hasContactCard } = useMemo(() => {
    const regular = filteredCases.filter(c => !c.isSpecialCard);
    const hasContact = filteredCases.some(c => c.isSpecialCard);
    return { regularCases: regular, hasContactCard: hasContact };
  }, [filteredCases]);

  // Анимационные варианты для сетки
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: isMobile ? { duration: 0.2 } : {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20, scale: isMobile ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: isMobile ? {
        duration: 0.2,
        ease: "easeOut"
      } : {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <>
      {/* Hero section */}
      <section className="section-hero bg-dark-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div data-animate="fade-up">
              <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing">
                Case Studies
              </h1>
              <p className="hero-subtitle text-light-gray max-w-3xl mx-auto section-subtitle-medium section-button-spacing">
                Explore how we have helped companies across various industries optimize their processes and achieve significant results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center button-gap-large">
                <Button variant="secondary" size="lg" href="/contacts">
                  Request a Similar Solution
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-site-bg">
        
        {/* Mobile */}
        {isMobile ? (
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              
              {/* Интегрированный поиск и фильтры */}
              <IntegratedSearchFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedIndustries={selectedIndustries}
                selectedFunctions={selectedFunctions}
                onRemoveIndustry={handleIndustryChange}
                onRemoveFunction={handleFunctionChange}
                onClearAll={clearAllFilters}
                resultCount={filteredCases.length}
              />
              
              {/* Мобильная панель фильтров */}
              <MobileFiltersPanel
                selectedIndustries={selectedIndustries}
                selectedFunctions={selectedFunctions}
                searchQuery={searchQuery}
                onIndustryChange={handleIndustryChange}
                onFunctionChange={handleFunctionChange}
                onSearchChange={handleSearchChange}
                onClearAll={clearAllFilters}
                isOpen={showMobileFilters}
                onToggle={() => setShowMobileFilters(!showMobileFilters)}
                resultCount={filteredCases.length}
              />
              
              {/* Недавно просмотренные кейсы */}
              <RecentlyViewedCases 
                allCases={allCaseStudies}
              />
              
              {/* Сетка кейсов для мобильных */}
              {regularCases.length > 0 ? (
                isMobile ? (
                  /* ПРОСТАЯ СЕТКА ДЛЯ МОБИЛЬНЫХ */
                  <div className="grid grid-cols-1 gap-4">
                    {regularCases.map((caseItem, index) => (
                      <div key={caseItem.id}>
                        <CaseCard 
                          {...formatCaseCard(caseItem)}
                          href={`/cases/${caseItem.id}`}
                          index={index}
                          isCompact={true}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  /* АНИМИРОВАННАЯ СЕТКА ДЛЯ ДЕСКТОПА */
                  <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-4"
                  >
                    <AnimatePresence>
                      {regularCases.map((caseItem, index) => {
                        return (
                          <motion.div key={caseItem.id} variants={cardVariants}>
                            <CaseCard 
                              {...formatCaseCard(caseItem)}
                              href={`/cases/${caseItem.id}`}
                              index={index}
                              isCompact={true}
                            />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )
              ) : (
                /* Empty State для мобильных */
                <div className="bg-dark-gray rounded-lg p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 515.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">No Cases Found</h3>
                    <p className="text-light-gray mb-4 text-sm">
                      No cases match your filters. Try different criteria.
                    </p>
                    <Button variant="secondary" onClick={clearAllFilters} size="sm">
                      Clear Filters
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Desktop + tablet */
          <div className="max-w-[1500px] mx-auto px-8 lg:px-12">
            
            {/* Поисковая строка */}
            <div className="mb-8 max-w-6xl mx-auto">
              <IntegratedSearchFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedIndustries={selectedIndustries}
                selectedFunctions={selectedFunctions}
                onRemoveIndustry={handleIndustryChange}
                onRemoveFunction={handleFunctionChange}
                onClearAll={clearAllFilters}
                resultCount={filteredCases.length}
              />
            </div>

            {/* Недавно просмотренные кейсы */}
            <div className="mb-8">
              <RecentlyViewedCases 
                allCases={allCaseStudies} 
              />
            </div>
            
            {/* СЕТКА: фиксированная ширина фильтров + flex для карточек */}
            <div className="flex gap-8">
              
              {/* ЛЕВАЯ КОЛОНКА - Фильтры */}
              <div className="w-[260px] flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Function Filters */}
                  <FunctionFilters
                    selectedFunctions={selectedFunctions}
                    onFunctionChange={handleFunctionChange}
                  />
                  
                  {/* Industry Filters */}
                  <IndustryFilters
                    selectedIndustries={selectedIndustries}
                    onIndustryChange={handleIndustryChange}
                  />
                  
                </div>
              </div>
              
              {/* ПРАВАЯ ОБЛАСТЬ - Контент */}
              <div className="flex-1 min-w-0">
                
                {filteredCases.length > 0 ? (
                  <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                      "grid gap-5",
                      isTablet 
                        ? "grid-cols-2" 
                        : "grid-cols-1 lg:grid-cols-3 desktop-case-cards"
                    )}
                  >
                    <AnimatePresence>
                      {/* Первые 9 кейсов */}
                      {regularCases.slice(0, 9).map((caseItem, index) => (
                        <motion.div
                          key={caseItem.id}
                          variants={cardVariants}
                        >
                          <CaseCard 
                            {...formatCaseCard(caseItem)}
                            href={`/cases/${caseItem.id}`}
                            index={index}
                          />
                        </motion.div>
                      ))}
                      
                      {/* Contact карточка на 10-й позиции */}
                      {hasContactCard && regularCases.length >= 9 && (
                        <motion.div
                          key="contact-card"
                          variants={cardVariants}
                        >
                          <ContactCaseCard index={9} />
                        </motion.div>
                      )}
                      
                      {/* Остальные кейсы */}
                      {regularCases.slice(9).map((caseItem, index) => (
                        <motion.div
                          key={caseItem.id}
                          variants={cardVariants}
                        >
                          <CaseCard 
                            {...formatCaseCard(caseItem)}
                            href={`/cases/${caseItem.id}`}
                            index={index + 10}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  /* Empty State для десктопа */
                  <div className="bg-dark-gray rounded-lg p-12 text-center max-w-2xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 515.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-semibold mb-4">No Cases Found</h3>
                      <p className="text-light-gray mb-6 leading-relaxed">
                        We could not find any cases that match your current filters. Try adjusting your search criteria or explore different categories.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button variant="secondary" onClick={clearAllFilters}>
                          Clear All Filters
                        </Button>
                        <Button variant="primary" href="/contacts">
                          Discuss Your Project
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      
      {/* CTA section */}
      <UnifiedCTASection preset="cases" />
    </>
  );
}