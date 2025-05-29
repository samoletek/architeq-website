// src/components/ui/filters/active-filters-display.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { 
  INDUSTRY_CATEGORIES, 
  FUNCTION_CATEGORIES, 
  IndustryCategory, 
  FunctionCategory 
} from '@/lib/data/case-studies';

export interface ActiveFiltersDisplayProps {
  selectedIndustries: IndustryCategory[];
  selectedFunctions: FunctionCategory[];
  searchQuery: string;
  onRemoveIndustry: (industry: IndustryCategory) => void;
  onRemoveFunction: (functionCategory: FunctionCategory) => void;
  onClearSearch: () => void;
  onClearAll: () => void;
  className?: string;
  isCompact?: boolean;
  resultCount?: number;
}

export function ActiveFiltersDisplay({
  selectedIndustries,
  selectedFunctions,
  searchQuery,
  onRemoveIndustry,
  onRemoveFunction,
  onClearSearch,
  onClearAll,
  className,
  isCompact = false,
  resultCount
}: ActiveFiltersDisplayProps) {
  // Подсчитываем общее количество активных фильтров
  const totalActiveFilters = selectedIndustries.length + selectedFunctions.length + (searchQuery.trim() ? 1 : 0);
  
  // Если нет активных фильтров, не отображаем компонент
  if (totalActiveFilters === 0) {
    return null;
  }

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: 10,
      transition: { duration: 0.15 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "bg-dark-gray/95 backdrop-blur-md rounded-lg border border-medium-gray/50 overflow-hidden",
        isCompact ? "p-3" : "p-4",
        className
      )}
    >
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <h4 className="text-sm font-medium text-white flex items-center">
            <span className="mr-2">🔍</span>
            Active Filters
            <span className="ml-2 bg-secondary text-gray-900 text-xs px-2 py-1 rounded-full font-medium">
              {totalActiveFilters}
            </span>
          </h4>
          
          {/* Счетчик результатов */}
          {resultCount !== undefined && (
            <span className="ml-4 text-xs text-light-gray">
              {resultCount} {resultCount === 1 ? 'result' : 'results'} found
            </span>
          )}
        </div>
        
        {/* Кнопка очистки всех фильтров */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearAll}
          className="text-xs text-light-gray hover:text-white transition-colors underline focus:outline-none focus:ring-2 focus:ring-secondary rounded"
        >
          Clear All
        </motion.button>
      </div>

      {/* Фильтры */}
      <div className="space-y-3">
        
        {/* Поисковый запрос */}
        <AnimatePresence>
          {searchQuery.trim() && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center"
            >
              <span className="text-xs text-light-gray mr-2 min-w-0 flex-shrink-0">Search:</span>
              <motion.div
                className="flex items-center bg-primary/10 border border-primary/30 rounded-md px-2 py-1 text-xs"
                whileHover={{ backgroundColor: 'rgba(119, 71, 207, 0.2)' }}
              >
                <span className="text-primary mr-1">🔎</span>
                <span className="text-primary font-medium truncate max-w-[150px]">
                  {searchQuery.trim()}
                </span>
                <button
                  onClick={onClearSearch}
                  className="ml-2 text-primary/70 hover:text-primary transition-colors focus:outline-none"
                  aria-label="Remove search query"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Industries */}
        <AnimatePresence>
          {selectedIndustries.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-start"
            >
              <span className="text-xs text-light-gray mr-2 mt-1 min-w-0 flex-shrink-0">Industries:</span>
              <div className="flex flex-wrap gap-1">
                <AnimatePresence>
                  {selectedIndustries.map(industryId => (
                    <motion.div
                      key={industryId}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={cn(
                        "flex items-center text-xs rounded-md px-2 py-1 border transition-all duration-200",
                        industryId === 'your-industry'
                          ? "bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30"
                          : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                      )}
                    >
                      <span className="mr-1">
                        {industryId === 'your-industry' ? '✨' : '🏭'}
                      </span>
                      <span className="font-medium">
                        {INDUSTRY_CATEGORIES[industryId]}
                      </span>
                      <button
                        onClick={() => onRemoveIndustry(industryId)}
                        className={cn(
                          "ml-2 transition-colors focus:outline-none",
                          industryId === 'your-industry'
                            ? "text-secondary/70 hover:text-secondary"
                            : "text-white/70 hover:text-white"
                        )}
                        aria-label={`Remove ${INDUSTRY_CATEGORIES[industryId]} filter`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Functions */}
        <AnimatePresence>
          {selectedFunctions.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-start"
            >
              <span className="text-xs text-light-gray mr-2 mt-1 min-w-0 flex-shrink-0">Functions:</span>
              <div className="flex flex-wrap gap-1">
                <AnimatePresence>
                  {selectedFunctions.map(functionId => (
                    <motion.div
                      key={functionId}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={cn(
                        "flex items-center text-xs rounded-md px-2 py-1 border transition-all duration-200",
                        functionId === 'custom-solutions'
                          ? "bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30"
                          : "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
                      )}
                    >
                      <span className="mr-1">
                        {functionId === 'custom-solutions' ? '🎯' : 
                         functionId === 'crm-integrations' ? '📊' :
                         functionId === 'documents-forms' ? '📄' :
                         functionId === 'system-infrastructure' ? '⚙️' :
                         functionId === 'ai-powered' ? '🤖' :
                         functionId === 'industry-specific' ? '🏭' :
                         functionId === 'finance-accounting' ? '💰' : '⚡'}
                      </span>
                      <span className="font-medium">
                        {FUNCTION_CATEGORIES[functionId]}
                      </span>
                      <button
                        onClick={() => onRemoveFunction(functionId)}
                        className={cn(
                          "ml-2 transition-colors focus:outline-none",
                          functionId === 'custom-solutions'
                            ? "text-secondary/70 hover:text-secondary"
                            : "text-primary/70 hover:text-primary"
                        )}
                        aria-label={`Remove ${FUNCTION_CATEGORIES[functionId]} filter`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Компактный режим - все фильтры в одну строку */}
      {isCompact && totalActiveFilters > 0 && (
        <motion.div
          variants={itemVariants}
          className="mt-3 pt-3 border-t border-medium-gray/30"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-light-gray">
              Showing filtered results
            </span>
            {resultCount !== undefined && (
              <span className="text-secondary font-medium">
                {resultCount} cases found
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}