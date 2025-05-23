"use client";

import { useState, useMemo } from 'react';
import { CaseCard } from '@/components/ui/cards/case-card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseFilters, FilterGroup } from '@/components/ui/filters/case-filters';
import { RecentlyViewedCases } from '@/components/ui/recently-viewed-cases';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { Icon } from '@/components/ui/icons/icon';
import { 
  allCaseStudies, 
  getUniqueValues, 
  filterCases,
  toCaseCardFormat
} from '@/lib/data/case-studies';

// Основной компонент страницы кейсов
export default function CasesContent() {
  // Состояние для фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSolutionTypes, setSelectedSolutionTypes] = useState<string[]>([]);
  
  // Состояние для мобильного представления
  const [showFilterSection, setShowFilterSection] = useState<boolean>(false);
  const { isMobile } = useDeviceDetection();
  
  // Данные для фильтрации
  const allIndustries = useMemo(() => getUniqueValues('industry'), []);
  const allSolutionTypes = useMemo(() => getUniqueValues('solutionType'), []);
  
  // Формируем группы для фильтров
  const filterGroups: FilterGroup[] = [
    {
      id: 'industry',
      label: 'By Industry',
      options: allIndustries.map(industry => ({ 
        id: industry, 
        label: industry,
        count: allCaseStudies.filter(c => c.industry === industry).length
      })),
      icon: <Icon name="industry" className="w-5 h-5" />,
      initialOpen: true
    },
    {
      id: 'solutionType',
      label: 'By Solution Type',
      options: allSolutionTypes.map(type => ({ 
        id: type, 
        label: type,
        count: allCaseStudies.filter(c => c.solutionType === type).length
      })),
      icon: <Icon name="process" className="w-5 h-5" />,
      initialOpen: isMobile ? false : true
    }
  ];
  
  // Состояние для выбранных фильтров
  const selectedOptions = {
    industry: selectedIndustries,
    solutionType: selectedSolutionTypes
  };
  
  // Фильтрация кейсов
  const filteredCases = useMemo(() => {
    return filterCases({
      searchQuery,
      industries: selectedIndustries,
      solutionTypes: selectedSolutionTypes
    });
  }, [
    searchQuery, 
    selectedIndustries, 
    selectedSolutionTypes
  ]);
  
  // Обработчик для выбора фильтра
  const handleFilterChange = (groupId: string, optionId: string) => {
    switch (groupId) {
      case 'industry':
        setSelectedIndustries(prev => 
          prev.includes(optionId) ? prev.filter(i => i !== optionId) : [...prev, optionId]
        );
        break;
      case 'solutionType':
        setSelectedSolutionTypes(prev => 
          prev.includes(optionId) ? prev.filter(t => t !== optionId) : [...prev, optionId]
        );
        break;
    }
  };
  
  // Обработчик для поискового запроса
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Сброс всех фильтров
  const clearAllFilters = () => {
    setSelectedIndustries([]);
    setSelectedSolutionTypes([]);
    setSearchQuery('');
  };

  return (
    <>
      {/* Hero section */}
      <section className="section-hero bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Отключаем анимацию при первом рендеринге и включаем ее через useEffect */}
            <div data-animate="fade-up">
              <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing">Case Studies</h1>
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

      {/* Filters and case studies */}
      <section className="py-12 bg-site-bg">
        <div className="container mx-auto px-4">
          
          {/* Мобильная кнопка фильтров */}
          {isMobile && (
            <div className="mb-6">
              <Button 
                variant={showFilterSection ? "primary" : "secondary"}
                className="w-full flex items-center justify-center gap-2 mb-4"
                onClick={() => setShowFilterSection(!showFilterSection)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
                  />
                </svg>
                {showFilterSection ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          )}
          
          {/* Фильтры (горизонтальные) */}
          <div className={`${isMobile && !showFilterSection ? 'hidden' : 'mb-8'}`}>
            <CaseFilters 
              groups={filterGroups}
              selectedOptions={selectedOptions}
              searchQuery={searchQuery}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              onClearFilters={clearAllFilters}
              filterCount={filteredCases.length}
              isCompact={isMobile}
              layout="horizontal"
            />
          </div>
          
          {/* Основной контент с кейсами */}
          <div>
            {/* Недавно просмотренные кейсы */}
            <RecentlyViewedCases 
              allCases={allCaseStudies} 
              className="mb-8" 
            />
            
            {/* Сетка с кейсами */}
            {filteredCases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <AnimatePresence>
                  {filteredCases.map((caseItem, index) => {
                    const cardData = toCaseCardFormat(caseItem);
                    return (
                      <motion.div
                        key={caseItem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
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
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-dark-gray rounded-lg p-8 text-center max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No Cases Found</h3>
                <p className="text-light-gray mb-4">
                  We could not find any cases that match your current filters.
                </p>
                <Button variant="secondary" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA section - используем новые стандартные классы */}
      <section className="section-cta bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title-medium font-bold section-title-spacing">Ready to Get Similar Results?</h2>
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
        </div>
      </section>
    </>
  );
}