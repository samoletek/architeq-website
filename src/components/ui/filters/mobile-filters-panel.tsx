// src/components/ui/filters/mobile-filters-panel.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { IndustryCategory, FunctionCategory } from '@/lib/data/case-studies';
import { IndustryFilters } from './industry-filters';
import { FunctionFilters } from './function-filters';
import { ActiveFiltersDisplay } from './active-filters-display';

export interface MobileFiltersPanelProps {
  selectedIndustries: IndustryCategory[];
  selectedFunctions: FunctionCategory[];
  searchQuery: string;
  onIndustryChange: (industry: IndustryCategory) => void;
  onFunctionChange: (functionCategory: FunctionCategory) => void;
  onSearchChange: (query: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggle: () => void;
  resultCount?: number;
  className?: string;
}

export function MobileFiltersPanel({
  selectedIndustries,
  selectedFunctions,
  searchQuery,
  onIndustryChange,
  onFunctionChange,
  onSearchChange,
  onClearAll,
  isOpen,
  onToggle,
  resultCount,
  className
}: MobileFiltersPanelProps) {
  const [activeTab, setActiveTab] = useState<'industries' | 'functions'>('industries');

  // Подсчитываем активные фильтры
  const totalActiveFilters = selectedIndustries.length + selectedFunctions.length + (searchQuery.trim() ? 1 : 0);

  // Закрываем панель при клике вне её
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('[data-mobile-filters]')) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Предотвращаем скролл страницы когда панель открыта
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onToggle]);

  // Варианты анимации для панели
  const panelVariants = {
    closed: {
      y: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const tabVariants = {
    inactive: { 
      backgroundColor: 'rgba(51, 51, 51, 0.5)',
      color: 'rgba(170, 170, 170, 1)',
      scale: 0.98
    },
    active: { 
      backgroundColor: 'rgba(119, 71, 207, 0.2)',
      color: 'rgba(119, 71, 207, 1)',
      scale: 1,
      boxShadow: '0 0 15px rgba(119, 71, 207, 0.3)'
    }
  };

  return (
    <>
      {/* Кнопка открытия фильтров */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300",
          isOpen 
            ? "bg-primary/20 border-primary/50 text-white" 
            : "bg-dark-gray/70 border-medium-gray/50 text-light-gray hover:text-white hover:border-medium-gray/70",
          className
        )}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium">
            {isOpen ? 'Close Filters' : 'Show Filters'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {totalActiveFilters > 0 && (
            <span className="bg-secondary text-gray-900 text-xs px-2 py-1 rounded-full font-medium">
              {totalActiveFilters}
            </span>
          )}
          {resultCount !== undefined && (
            <span className="text-xs text-light-gray">
              {resultCount} results
            </span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.button>

      {/* Фоновое затемнение */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Панель фильтров */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            data-mobile-filters
            className="fixed bottom-0 left-0 right-0 bg-dark-gray border-t-2 border-primary/30 rounded-t-2xl z-[60] max-h-[85vh] overflow-hidden"
          >
            {/* Шапка панели */}
            <div className="p-4 border-b border-medium-gray/30 bg-dark-gray/95 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">🔍</span>
                  Filter Cases
                  {totalActiveFilters > 0 && (
                    <span className="ml-2 bg-secondary text-gray-900 text-xs px-2 py-1 rounded-full font-medium">
                      {totalActiveFilters}
                    </span>
                  )}
                </h3>
                
                <div className="flex items-center space-x-2">
                  {totalActiveFilters > 0 && (
                    <button
                      onClick={onClearAll}
                      className="text-sm text-light-gray hover:text-white transition-colors underline"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={onToggle}
                    className="text-light-gray hover:text-white transition-colors p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Табы */}
              <div className="flex space-x-2">
                <motion.button
                  variants={tabVariants}
                  animate={activeTab === 'industries' ? 'active' : 'inactive'}
                  onClick={() => setActiveTab('industries')}
                  className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-2">🏭</span>
                    Industries
                    {selectedIndustries.length > 0 && (
                      <span className="ml-2 bg-current/20 text-current text-xs px-1.5 py-0.5 rounded-full">
                        {selectedIndustries.length}
                      </span>
                    )}
                  </span>
                </motion.button>
                
                <motion.button
                  variants={tabVariants}
                  animate={activeTab === 'functions' ? 'active' : 'inactive'}
                  onClick={() => setActiveTab('functions')}
                  className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-2">⚙️</span>
                    Functions
                    {selectedFunctions.length > 0 && (
                      <span className="ml-2 bg-current/20 text-current text-xs px-1.5 py-0.5 rounded-full">
                        {selectedFunctions.length}
                      </span>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Контент панели */}
            <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="p-4 space-y-6">
                
                {/* Активные фильтры */}
                {totalActiveFilters > 0 && (
                  <ActiveFiltersDisplay
                    selectedIndustries={selectedIndustries}
                    selectedFunctions={selectedFunctions}
                    searchQuery={searchQuery}
                    onRemoveIndustry={onIndustryChange}
                    onRemoveFunction={onFunctionChange}
                    onClearSearch={() => onSearchChange('')}
                    onClearAll={onClearAll}
                    resultCount={resultCount}
                    isCompact={true}
                  />
                )}

                {/* Контент табов */}
                <AnimatePresence mode="wait">
                  {activeTab === 'industries' ? (
                    <motion.div
                      key="industries"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IndustryFilters
                        selectedIndustries={selectedIndustries}
                        onIndustryChange={onIndustryChange}
                        showCounts={true}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="functions"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FunctionFilters
                        selectedFunctions={selectedFunctions}
                        onFunctionChange={onFunctionChange}
                        showCounts={true}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Нижняя панель с действиями */}
            <div className="p-4 border-t border-medium-gray/30 bg-dark-gray/95 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="text-sm text-light-gray">
                  {resultCount !== undefined && (
                    <span>
                      {resultCount} {resultCount === 1 ? 'case' : 'cases'} found
                    </span>
                  )}
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggle}
                  className="bg-secondary text-gray-900 px-6 py-2 rounded-lg font-medium text-sm hover:bg-secondary/90 transition-colors shadow-neon-green-glow"
                >
                  Apply Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}