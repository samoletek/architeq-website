// src/components/ui/recently-viewed-cases.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { storage } from '@/lib/utils/common';
import { CaseStudy, getCaseStudyById } from '@/lib/data/case-studies';

export interface RecentlyViewedCasesProps {
  allCases: CaseStudy[];
  className?: string;
  maxItems?: number;
}

export function RecentlyViewedCases({
  allCases,
  className,
  maxItems = 5
}: RecentlyViewedCasesProps) {
  const [recentCases, setRecentCases] = useState<CaseStudy[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Загружаем недавно просмотренные кейсы из localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recentlyViewedIds = storage.get<string[]>('recentlyViewedCases', []);
      const cases = recentlyViewedIds
        .map(id => getCaseStudyById(id))
        .filter(Boolean)
        .filter(caseStudy => !caseStudy?.isSpecialCard) // Исключаем специальные карточки
        .slice(0, maxItems) as CaseStudy[];
      
      setRecentCases(cases);
    }
  }, [allCases, maxItems]);

  // Функция для очистки истории
  const clearHistory = () => {
    if (typeof window !== 'undefined') {
      storage.remove('recentlyViewedCases');
      setRecentCases([]);
    }
  };

  // Если нет недавно просмотренных кейсов, не показываем компонент
  if (recentCases.length === 0) {
    return null;
  }

  // Показываем только первые 3 элемента, если не развернуто
  const displayedCases = isExpanded ? recentCases : recentCases.slice(0, 3);
  const hasMoreItems = recentCases.length > 3;

  return (
    <div className={cn("bg-dark-gray/50 backdrop-blur-sm rounded-lg p-4 border border-medium-gray/30", className)}>
      
      {/* Заголовок - ПОЛНОСТЬЮ БЕЗ СЧЕТЧИКА */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Recently Viewed
        </h3>
        
        <button
          onClick={clearHistory}
          className="text-xs text-light-gray hover:text-white transition-colors focus:outline-none"
        >
          Clear viewing history
        </button>
      </div>

      {/* Список недавно просмотренных кейсов */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayedCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
            >
              <Link
                href={`/cases/${caseItem.id}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-medium-gray/20 hover:backdrop-blur-md">
                  
                  {/* Индекс */}
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  
                  {/* Контент */}
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-medium text-white group-hover:text-secondary transition-colors line-clamp-1">
                      {caseItem.title}
                    </h4>
                    <p className="text-xs text-light-gray mt-1 line-clamp-1">
                      {caseItem.company} • {caseItem.location}
                    </p>
                    
                    {/* Теги */}
                    <div className="flex items-center space-x-1 mt-2">
                      <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">
                        {caseItem.solutionType}
                      </span>
                      {caseItem.technologies.slice(0, 1).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Стрелка */}
                  <div className="flex-shrink-0 text-light-gray group-hover:text-secondary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Кнопка развертывания */}
      {hasMoreItems && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 py-2 px-4 text-sm text-light-gray hover:text-white transition-colors rounded-lg hover:bg-medium-gray/20 focus:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">
              {isExpanded ? 'Show Less' : `Show ${recentCases.length - 3} More`}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.button>
      )}
    </div>
  );
}