// src/components/ui/filters/industry-filters.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { INDUSTRY_CATEGORIES, IndustryCategory } from '@/lib/data/case-studies';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface IndustryFiltersProps {
  selectedIndustries: IndustryCategory[];
  onIndustryChange: (industry: IndustryCategory) => void;
  className?: string;
  disabled?: boolean;
}

export function IndustryFilters({
  selectedIndustries,
  onIndustryChange,
  className,
  disabled = false
}: IndustryFiltersProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isMobile } = useDeviceDetection();

  // Загружаем данные (имитация загрузки)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Обработчик клика по тегу (toggle логика)
  const handleTagClick = (industryId: IndustryCategory) => {
    if (disabled) return;
    onIndustryChange(industryId);
  };

  // Проверяем, выбран ли тег
  const isSelected = (industryId: IndustryCategory) => {
    return selectedIndustries.includes(industryId);
  };

  // Анимационные варианты для тегов
  const tagVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.15, ease: "easeInOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-4", className)}>
        <div className="flex items-center space-x-2 text-light-gray">
          <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Loading industries...</span>
        </div>
      </div>
    );
  }

  // Фильтруем "your-industry" из списка
  const filteredIndustries = Object.entries(INDUSTRY_CATEGORIES).filter(([industryId]) => industryId !== 'your-industry');

  return (
    <div className={cn("w-full", className)}>
      {/* Заголовок секции с toggle */}
      <div className="mb-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between text-left group focus:outline-none"
        >
          <h3 className="text-lg font-semibold text-white flex items-center">
            By Industry
            {selectedIndustries.length > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                {selectedIndustries.length}
              </span>
            )}
          </h3>
          
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.2 }}
            className="text-light-gray group-hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
        
        {/* Удаляем подсказку */}
      </div>

      {/* Горизонтальные теги - ИСПРАВЛЕНО */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex flex-wrap gap-3",
              isMobile ? "gap-2" : "gap-3"
            )}
          >
            {filteredIndustries.map(([industryId, label], index) => {
              const typedIndustryId = industryId as IndustryCategory;
              const selected = isSelected(typedIndustryId);

              return (
                <motion.button
                  key={industryId}
                  variants={tagVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={disabled ? undefined : "hover"}
                  whileTap={disabled ? undefined : "tap"}
                  onClick={() => handleTagClick(typedIndustryId)}
                  disabled={disabled}
                  className={cn(
                    // Базовые стили - СТАНДАРТИЗИРОВАННЫЕ РАЗМЕРЫ И ВЫРАВНИВАНИЕ ПО ЛЕВОМУ КРАЮ
                    "relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 min-w-[120px] h-[40px]",
                    "focus:outline-none flex items-center justify-start text-left",
                    
                    // Состояние по умолчанию (ФИОЛЕТОВЫЕ цвета)
                    !selected && [
                      "bg-primary/20 text-primary",
                      "hover:text-primary hover:bg-primary/30"
                    ],
                    
                    // Выбранное состояние (ФИОЛЕТОВЫЕ со свечением)
                    selected && [
                      "text-primary shadow-neon-glow"
                    ],
                    
                    // Состояние отключения
                    disabled && "opacity-50 cursor-not-allowed",
                    
                    // Мобильные стили - СТАНДАРТИЗИРОВАННЫЕ С ВЫРАВНИВАНИЕМ ПО ЛЕВОМУ КРАЮ
                    isMobile && "text-xs px-3 py-1.5 min-w-[100px] h-[36px] justify-start"
                  )}
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {/* Контент тега - ВЫРАВНИВАНИЕ ПО ЛЕВОМУ КРАЮ */}
                  <span className="relative z-10 text-left leading-none">
                    {label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Компактный вид при сворачивании - добавляем отображение активных тегов */}
      {isCollapsed && selectedIndustries.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-1"
        >
          {selectedIndustries.slice(0, 3).map(industryId => (
            <span 
              key={industryId}
              className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md"
            >
              {INDUSTRY_CATEGORIES[industryId]}
            </span>
          ))}
          {selectedIndustries.length > 3 && (
            <span className="text-xs text-light-gray">
              +{selectedIndustries.length - 3} more
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}