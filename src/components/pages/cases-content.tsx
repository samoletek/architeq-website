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
import { cn } from '@/lib/utils/utils';

import { 
  allCaseStudies, 
  filterCasesByMatrix,
  toCaseCardFormat,
  IndustryCategory,
  FunctionCategory
} from '@/lib/data/case-studies';

// Основной компонент страницы кейсов
export default function CasesContent() {
  // Состояние для новой системы фильтров - ИСПРАВЛЯЕМ ДЕФОЛТНЫЕ ЗНАЧЕНИЯ
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryCategory[]>(['your-industry']);
  const [selectedFunctions, setSelectedFunctions] = useState<FunctionCategory[]>(['custom-solutions']);
  const [hasUserInteraction, setHasUserInteraction] = useState(false);
  
  // Состояние для мобильной версии
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [functionsCollapsed, setFunctionsCollapsed] = useState(false);
  
  // Состояние для hover эффектов
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  const { isMobile } = useDeviceDetection();
  
  // Обработчики для изменения фильтров - ИСПРАВЛЯЕМ ЛОГИКУ ФИЛЬТРАЦИИ
  const handleIndustryChange = useCallback((industry: IndustryCategory) => {
    setHasUserInteraction(true);
    setSelectedIndustries(prev => {
      // Если это дефолтное значение, убираем его и добавляем новое
      if (industry === 'your-industry') {
        return ['your-industry'];
      }
      
      // Убираем дефолтное значение при выборе любого другого
      const withoutDefaults = prev.filter(id => id !== 'your-industry');
      
      // Toggle логика для не-дефолтных значений
      return withoutDefaults.includes(industry) 
        ? withoutDefaults.filter(i => i !== industry)
        : [...withoutDefaults, industry];
    });
  }, []);
  
  const handleFunctionChange = useCallback((functionCategory: FunctionCategory) => {
    setHasUserInteraction(true);
    setSelectedFunctions(prev => {
      // Если это дефолтное значение, убираем его и добавляем новое
      if (functionCategory === 'custom-solutions') {
        return ['custom-solutions'];
      }
      
      // Убираем дефолтное значение при выборе любого другого
      const withoutDefaults = prev.filter(id => id !== 'custom-solutions');
      
      // Toggle логика для не-дефолтных значений
      return withoutDefaults.includes(functionCategory) 
        ? withoutDefaults.filter(f => f !== functionCategory)
        : [...withoutDefaults, functionCategory];
    });
  }, []);
  
  // Обработчик для поискового запроса - ИСПРАВЛЕН
  const handleSearchChange = useCallback((query: string) => {
    // Убираем лишние пробелы, но не требуем пробел в конце
    const trimmedQuery = query.trim();
    if (trimmedQuery || query === '') {
      setHasUserInteraction(true);
    }
    setSearchQuery(query); // Сохраняем оригинальное значение для инпута
  }, []);
  
  // Сброс всех фильтров
  const clearAllFilters = useCallback(() => {
    setHasUserInteraction(false);
    setSelectedIndustries(['your-industry']);
    setSelectedFunctions(['custom-solutions']);
    setSearchQuery('');
  }, []);
  
  // Фильтрация кейсов с учетом дефолтных значений - ИСПРАВЛЕНА ЛОГИКА ПОИСКА
  const filteredCases = useMemo(() => {
    // Определяем активные индустрии
    const activeIndustries = hasUserInteraction || searchQuery.trim() 
      ? selectedIndustries.filter(id => id !== 'your-industry')
      : [];
      
    // Определяем активные функции  
    const activeFunctions = hasUserInteraction || searchQuery.trim() 
      ? selectedFunctions.filter(id => id !== 'custom-solutions')
      : [];
    
    // Если нет поискового запроса (включая пустую строку) и пользователь не взаимодействовал с фильтрами, показываем все кейсы
    if (!searchQuery.trim() && !hasUserInteraction) {
      return allCaseStudies;
    }
    
    // Используем trimmed query для поиска
    return filterCasesByMatrix({
      searchQuery: searchQuery.trim(),
      industries: activeIndustries.length > 0 ? activeIndustries : [],
      functions: activeFunctions.length > 0 ? activeFunctions : []
    });
  }, [searchQuery, selectedIndustries, selectedFunctions, hasUserInteraction]);
  
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
      <section className="py-12 bg-site-bg">
        <div className="container mx-auto px-8">
          
          {/* Desktop Layout */}
          {!isMobile ? (
            <div className="space-y-12">
              
              {/* Integrated Search and Filters */}
              <div className="max-w-full mx-auto">
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
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 max-w-7xl mx-auto">
                
                {/* Left Sidebar - ПРАВИЛЬНОЕ ВЫРАВНИВАНИЕ И STICKY */}
                <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8 z-20">
                    
                    {/* Function Filters */}
                    <FunctionFilters
                      selectedFunctions={selectedFunctions}
                      onFunctionChange={handleFunctionChange}
                      isCollapsed={functionsCollapsed}
                      onToggleCollapse={() => setFunctionsCollapsed(!functionsCollapsed)}
                    />
                    
                    {/* Industry Filters */}
                    <IndustryFilters
                      selectedIndustries={selectedIndustries}
                      onIndustryChange={handleIndustryChange}
                    />
                  </div>
                </div>
                
                {/* Right Content - Cases Grid */}
                <div className="lg:col-span-3">
                  
                  {/* Recently Viewed Cases */}
                  <div className="mb-8">
                    <RecentlyViewedCases 
                      allCases={allCaseStudies} 
                      className="mb-8"
                    />
                  </div>
                  
                  {/* Cases Grid */}
                  {filteredCases.length > 0 ? (
                    <motion.div
                      variants={gridVariants}
                      initial="hidden"
                      animate="visible"
                      className={cn(
                        "grid gap-6",
                        hasContactCard 
                          ? "grid-cols-1 xl:grid-cols-2"
                          : "grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
                      )}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      <AnimatePresence>
                        {/* Специальная карточка Contact Us (если есть) */}
                        {hasContactCard && (
                          <motion.div
                            key="contact-card"
                            variants={cardVariants}
                            className={cn(
                              "transition-all duration-500",
                              hoveredCardId && hoveredCardId !== 'contact-us-card' && "opacity-50 blur-sm scale-95"
                            )}
                            onMouseEnter={() => setHoveredCardId('contact-us-card')}
                          >
                            <ContactCaseCard index={0} />
                          </motion.div>
                        )}
                        
                        {/* Обычные карточки кейсов */}
                        {regularCases.map((caseItem, index) => {
                          const cardData = toCaseCardFormat(caseItem);
                          const adjustedIndex = hasContactCard ? index + 1 : index;
                          
                          return (
                            <motion.div
                              key={caseItem.id}
                              variants={cardVariants}
                              className={cn(
                                "transition-all duration-500",
                                hoveredCardId && hoveredCardId !== caseItem.id && "opacity-50 blur-sm scale-95"
                              )}
                              onMouseEnter={() => setHoveredCardId(caseItem.id)}
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