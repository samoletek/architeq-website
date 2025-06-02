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

import { 
  allCaseStudies, 
  filterCasesByMatrix,
  toCaseCardFormat,
  IndustryCategory,
  FunctionCategory
} from '@/lib/data/case-studies';

// Основной компонент страницы кейсов
export default function CasesContent() {
  // Состояние для системы фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryCategory[]>(['your-industry']);
  const [selectedFunctions, setSelectedFunctions] = useState<FunctionCategory[]>(['custom-solutions']);
  
  // Состояние для мобильной версии
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const { isMobile } = useDeviceDetection();
  
  // УПРОЩЕННЫЕ обработчики для изменения фильтров
  const handleIndustryChange = useCallback((industry: IndustryCategory) => {
    setSelectedIndustries(prev => {
      // Если выбираем "your-industry", сбрасываем все остальные
      if (industry === 'your-industry') {
        return ['your-industry'];
      }
      
      // Убираем "your-industry" при выборе любого другого
      const withoutDefaults = prev.filter(id => id !== 'your-industry');
      
      // Toggle логика
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
      // Если выбираем "custom-solutions", сбрасываем все остальные
      if (functionCategory === 'custom-solutions') {
        return ['custom-solutions'];
      }
      
      // Убираем "custom-solutions" при выборе любого другого
      const withoutDefaults = prev.filter(id => id !== 'custom-solutions');
      
      // Toggle логика
      if (withoutDefaults.includes(functionCategory)) {
        const filtered = withoutDefaults.filter(f => f !== functionCategory);
        return filtered.length === 0 ? ['custom-solutions'] : filtered;
      } else {
        return [...withoutDefaults, functionCategory];
      }
    });
  }, []);
  
  // Обработчик для поискового запроса
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  // Сброс всех фильтров
  const clearAllFilters = useCallback(() => {
    setSelectedIndustries(['your-industry']);
    setSelectedFunctions(['custom-solutions']);
    setSearchQuery('');
  }, []);
  
  // УПРОЩЕННАЯ логика фильтрации кейсов
  const filteredCases = useMemo(() => {
    // Получаем активные фильтры (исключаем дефолтные значения)
    const activeIndustries = selectedIndustries.filter(id => id !== 'your-industry');
    const activeFunctions = selectedFunctions.filter(id => id !== 'custom-solutions');
    const hasSearch = searchQuery.trim().length > 0;
    const hasFilters = activeIndustries.length > 0 || activeFunctions.length > 0;
    
    // Если нет поиска и нет активных фильтров - показываем все
    if (!hasSearch && !hasFilters) {
      return allCaseStudies;
    }
    
    // Применяем фильтрацию
    const filtered = filterCasesByMatrix({
      searchQuery: searchQuery.trim(),
      industries: activeIndustries,
      functions: activeFunctions
    });
    
    // ИСКЛЮЧАЕМ специальную карточку при активном поиске
    if (hasSearch) {
      return filtered.filter(caseItem => !caseItem.isSpecialCard);
    }
    
    return filtered;
  }, [searchQuery, selectedIndustries, selectedFunctions]);
  
  // Разделяем обычные кейсы и специальную карточку
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
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <>
      {/* Hero section */}
      <section className="section-hero bg-dark-gray">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div data-animate="fade-up">
              <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing">
                Case Studies
              </h1>
              <p className="hero-subtitle text-light-gray max-w-3xl mx-auto section-subtitle-medium section-button-spacing">
                Explore how we have helped companies across various industries optimize their processes and achieve significant results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center button-gap-large">
                <Button variant="primary" size="lg" href="/contacts">
                  Request a Similar Solution
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main filters and cases section */}
      <section className="py-28 bg-site-bg">
        <div className="container mx-auto px-8">
          
          {/* Desktop Layout */}
          {!isMobile ? (
            <div className="space-y-12">
              
              {/* ПОЛНОШИРИННАЯ поисковая строка */}
              <div className="max-w-7xl mx-auto">
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
              
              {/* Контейнер с фильтрами слева ОТ основного контента */}
              <div className="relative max-w-7xl mx-auto">
                
                {/* Фильтры ВЫНЕСЕНЫ ЛЕВЕЕ основного контейнера */}
                <div className="absolute left-[-240px] top-0 w-64">
                  <div className="sticky top-32 space-y-8 z-20">
                    
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
                
                {/* ПОЛНОШИРИННЫЙ контент */}
                <div className="w-full">
                  
                  {/* Recently Viewed Cases */}
                  <div className="mb-8">
                    <RecentlyViewedCases 
                      allCases={allCaseStudies} 
                      className="mb-8"
                    />
                  </div>
                  
                  {/* ПОЛНОШИРИННАЯ Cases Grid - ВСЕГДА 3 КОЛОНКИ */}
                  {filteredCases.length > 0 ? (
                      <motion.div
                        variants={gridVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-3 gap-6"
                      >
                        <AnimatePresence>
                          {/* Первый обычный кейс */}
                          {regularCases.length > 0 && (
                            <motion.div
                              key={regularCases[0].id}
                              variants={cardVariants}
                            >
                              <CaseCard 
                                id={toCaseCardFormat(regularCases[0]).id}
                                title={toCaseCardFormat(regularCases[0]).title}
                                description={toCaseCardFormat(regularCases[0]).description}
                                industry={toCaseCardFormat(regularCases[0]).industry}
                                company={toCaseCardFormat(regularCases[0]).company}
                                location={toCaseCardFormat(regularCases[0]).location}
                                results={toCaseCardFormat(regularCases[0]).results}
                                image={toCaseCardFormat(regularCases[0]).image}
                                tags={toCaseCardFormat(regularCases[0]).tags}
                                href={`/cases/${toCaseCardFormat(regularCases[0]).id}`}
                                index={0}
                              />
                            </motion.div>
                          )}
                          
                          {/* Специальная карточка Contact Us на ВТОРОЙ позиции */}
                          {hasContactCard && (
                            <motion.div
                              key="contact-card"
                              variants={cardVariants}
                            >
                              <ContactCaseCard index={1} />
                            </motion.div>
                          )}
                          
                          {/* Остальные обычные карточки кейсов начиная со второго */}
                          {regularCases.slice(1).map((caseItem, index) => {
                            const cardData = toCaseCardFormat(caseItem);
                            const adjustedIndex = hasContactCard ? index + 2 : index + 1;
                            
                            return (
                              <motion.div
                                key={caseItem.id}
                                variants={cardVariants}
                              >
                                <CaseCard 
                                  id={cardData.id}
                                  title={cardData.title}
                                  description={cardData.description}
                                  industry={cardData.industry}
                                  company={cardData.company}
                                  location={cardData.location}
                                  results={cardData.results}
                                  image={cardData.image}
                                  tags={cardData.tags}
                                  href={`/cases/${cardData.id}`}
                                  index={adjustedIndex}
                                />
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      /* Empty State */
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
          ) : (
            /* Mobile Layout */
            <div className="space-y-6">
              
              {/* Mobile Integrated Search and Filters */}
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
              
              {/* Mobile Filters Panel */}
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
              
              {/* Recently Viewed (Mobile) */}
              <RecentlyViewedCases 
                allCases={allCaseStudies}
              />
              
              {/* Mobile Cases Grid */}
              {filteredCases.length > 0 ? (
                <motion.div
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-6"
                >
                  <AnimatePresence>
                    {/* Специальная карточка для мобильных */}
                    {hasContactCard && (
                      <motion.div key="contact-card-mobile" variants={cardVariants}>
                        <ContactCaseCard index={0} />
                      </motion.div>
                    )}
                    
                    {regularCases.map((caseItem, index) => {
                      const cardData = toCaseCardFormat(caseItem);
                      const adjustedIndex = hasContactCard ? index + 1 : index;
                      
                      return (
                        <motion.div key={caseItem.id} variants={cardVariants}>
                          <CaseCard 
                            {...cardData}
                            href={`/cases/${cardData.id}`}
                            index={adjustedIndex}
                            isCompact={true}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              ) : (
                /* Mobile Empty State */
                <div className="bg-dark-gray rounded-lg p-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 515.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">No Cases Found</h3>
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
          )}
        </div>
      </section>
      
      {/* CTA section */}
      <section className="section-cta bg-dark-gradient">
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-medium font-bold section-title-spacing">
              Ready to Get Similar Results?
            </h2>
            <p className="section-subtitle-small text-light-gray max-w-2xl mx-auto section-button-spacing">
              Let our team analyze your processes and design a custom automation solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center button-gap-default">
              <Button variant="primary" size="lg" href="/contacts">
                Start Your Project
              </Button>
              <Button variant="secondary" size="lg" href="/services">
                Explore Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}