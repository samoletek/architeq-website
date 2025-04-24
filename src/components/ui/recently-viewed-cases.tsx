// src/components/ui/recently-viewed-cases.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompactCaseCard } from '@/components/ui/cards/case-card';
import { storage } from '@/lib/utils/common';
import { getCaseStudyById, toCaseCardFormat, type CaseStudy } from '@/lib/data/case-studies';

interface RecentlyViewedCasesProps {
  allCases: CaseStudy[];
  maxItems?: number;
  title?: string;
  onCaseClick?: (caseId: string) => void;
  className?: string;
}

export function RecentlyViewedCases({
  allCases,
  maxItems = 3,
  title = "Recently Viewed",
  onCaseClick,
  className
}: RecentlyViewedCasesProps) {
  const [recentCases, setRecentCases] = useState<CaseStudy[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Получаем ID недавно просмотренных кейсов
    const recentlyViewedIds = storage.get<string[]>('recentlyViewedCases', []);
    
    if (recentlyViewedIds.length > 0) {
      // Находим кейсы по ID
      const recentItems = recentlyViewedIds
        .map(id => getCaseStudyById(id))
        .filter(Boolean) as CaseStudy[]; // Фильтруем undefined
      
      // Ограничиваем количество
      const limitedItems = recentItems.slice(0, maxItems);
      
      if (limitedItems.length > 0) {
        setRecentCases(limitedItems);
        setIsVisible(true);
      }
    }
  }, [allCases, maxItems]);
  
  // Если нет недавних кейсов, не отображаем компонент
  if (!isVisible || recentCases.length === 0) {
    return null;
  }
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentCases.map((caseItem) => {
            const cardData = toCaseCardFormat(caseItem);
            return (
              <CompactCaseCard
                key={caseItem.id}
                id={cardData.id}
                title={cardData.title}
                company={cardData.company}
                image={cardData.image}
                tags={cardData.tags}
                href={`/cases/${cardData.id}`}
                onClick={onCaseClick ? () => onCaseClick(caseItem.id) : undefined}
              />
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => {
              storage.remove('recentlyViewedCases');
              setIsVisible(false);
            }}
            className="text-primary text-sm hover:underline"
          >
            Clear viewing history
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}