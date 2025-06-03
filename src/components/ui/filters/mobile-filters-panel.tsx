// src/components/ui/filters/mobile-filters-panel.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { IndustryCategory, FunctionCategory, getFilterCounts, INDUSTRY_CATEGORIES, FUNCTION_CATEGORIES } from '@/lib/data/case-studies';

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

// Простые фильтры без сворачивания для мобильных
function SimpleMobileIndustryFilters({
  selectedIndustries,
  onIndustryChange
}: {
  selectedIndustries: IndustryCategory[];
  onIndustryChange: (industry: IndustryCategory) => void;
}) {
  const { industries } = getFilterCounts();
  const filteredIndustries = industries.filter(({ id }) => id !== 'your-industry');

  return (
    <div className="w-full">
      <div className="space-y-3">
        {filteredIndustries.map(({ id: industryId, label }) => {
          const selected = selectedIndustries.includes(industryId);
          
          return (
            <div
              key={industryId}
              className="flex items-center justify-between p-3 rounded-lg bg-transparent border border-transparent hover:border-primary/20 transition-all duration-200"
            >
              <span className={cn(
                "text-sm font-medium transition-colors duration-200",
                selected ? "text-primary" : "text-white"
              )}>
                {label}
              </span>
              
              <div 
                className="relative cursor-pointer"
                onClick={() => onIndustryChange(industryId)}
              >
                <div className={cn(
                  "w-10 h-5 rounded-full transition-all duration-300 relative overflow-hidden",
                  selected
                    ? "bg-primary shadow-lg shadow-primary/25" 
                    : "bg-white/20 hover:bg-primary/30"
                )}>
                  <motion.div
                    animate={{ x: selected ? 18 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full transition-colors duration-300",
                      selected ? "bg-white shadow-md" : "bg-white/80"
                    )}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimpleMobileFunctionFilters({
  selectedFunctions,
  onFunctionChange
}: {
  selectedFunctions: FunctionCategory[];
  onFunctionChange: (functionCategory: FunctionCategory) => void;
}) {
  const { functions } = getFilterCounts();
  const filteredFunctions = functions.filter(({ id }) => id !== 'custom-solutions');

  return (
    <div className="w-full">
      <div className="space-y-3">
        {filteredFunctions.map(({ id: functionId, label }) => {
          const selected = selectedFunctions.includes(functionId);
          
          return (
            <div
              key={functionId}
              className="flex items-center justify-between p-3 rounded-lg bg-transparent border border-transparent hover:border-secondary/20 transition-all duration-200"
            >
              <span className={cn(
                "text-sm font-medium transition-colors duration-200",
                selected ? "text-secondary" : "text-white"
              )}>
                {label}
              </span>
              
              <div 
                className="relative cursor-pointer"
                onClick={() => onFunctionChange(functionId)}
              >
                <div className={cn(
                  "w-10 h-5 rounded-full transition-all duration-300 relative overflow-hidden",
                  selected
                    ? "bg-secondary shadow-lg shadow-secondary/25" 
                    : "bg-white/20 hover:bg-secondary/30"
                )}>
                  <motion.div
                    animate={{ x: selected ? 18 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full transition-colors duration-300",
                      selected ? "bg-white shadow-md" : "bg-white/80"
                    )}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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

  // Подсчитываем активные фильтры (исключаем дефолтные)
  const activeIndustries = selectedIndustries.filter(id => id !== 'your-industry').length;
  const activeFunctions = selectedFunctions.filter(id => id !== 'custom-solutions').length;
  const totalActiveFilters = activeIndustries + activeFunctions;

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
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Кнопка открытия фильтров */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
          isOpen 
            ? "bg-primary/10 border-primary/40 text-white" 
            : "bg-dark-gray/80 border-medium-gray/40 text-light-gray hover:text-white hover:border-medium-gray/60",
          className
        )}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium">Filters</span>
        </div>
        
        <div className="flex items-center space-x-3">
          {totalActiveFilters > 0 && (
            <span className="bg-secondary text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">
              {totalActiveFilters}
            </span>
          )}
          {resultCount !== undefined && (
            <span className="text-xs text-light-gray">
              {resultCount}
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

      {/* Фоновое затемнение - БЕЗ ЗАЗОРА СВЕРХУ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
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
            className="fixed bottom-0 left-0 right-0 bg-dark-gray border-t border-primary/20 rounded-t-xl z-[60] max-h-[80vh] overflow-hidden"
          >
            {/* Шапка панели */}
            <div className="p-4 border-b border-medium-gray/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  Filters
                  {totalActiveFilters > 0 && (
                    <span className="ml-2 bg-secondary text-gray-900 text-xs px-2 py-1 rounded-full font-medium">
                      {totalActiveFilters}
                    </span>
                  )}
                </h3>
                
                <div className="flex items-center space-x-3">
                  {totalActiveFilters > 0 && (
                    <button
                      onClick={onClearAll}
                      className="text-sm text-secondary hover:text-white transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={onToggle}
                    className="text-light-gray hover:text-white transition-colors p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Табы */}
              <div className="flex mt-4 bg-medium-gray/30 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('industries')}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                    activeTab === 'industries'
                      ? "bg-primary text-white shadow-sm"
                      : "text-light-gray hover:text-white"
                  )}
                >
                  Industries
                  {activeIndustries > 0 && (
                    <span className="ml-1 text-xs opacity-75">({activeIndustries})</span>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('functions')}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                    activeTab === 'functions'
                      ? "bg-secondary text-gray-900 shadow-sm"
                      : "text-light-gray hover:text-white"
                  )}
                >
                  Functions
                  {activeFunctions > 0 && (
                    <span className="ml-1 text-xs opacity-75">({activeFunctions})</span>
                  )}
                </button>
              </div>
            </div>

            {/* Контент панели - БЕЗ СВОРАЧИВАНИЯ */}
            <div className="overflow-y-auto max-h-[calc(80vh-140px)]">
              <div className="p-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'industries' ? (
                    <motion.div
                      key="industries"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SimpleMobileIndustryFilters
                        selectedIndustries={selectedIndustries}
                        onIndustryChange={onIndustryChange}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="functions"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SimpleMobileFunctionFilters
                        selectedFunctions={selectedFunctions}
                        onFunctionChange={onFunctionChange}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Нижняя панель */}
            <div className="p-4 border-t border-medium-gray/20 bg-dark-gray/95">
              <div className="flex items-center justify-between">
                <div className="text-sm text-light-gray">
                  {resultCount !== undefined && (
                    <span>
                      {resultCount} result{resultCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onToggle}
                  className="bg-secondary text-gray-900 px-6 py-2 rounded-lg font-medium text-sm hover:bg-secondary/90 transition-colors"
                >
                  Apply
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}