// src/components/ui/filters/industry-filters.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { INDUSTRY_CATEGORIES, IndustryCategory, getFilterCounts } from '@/lib/data/case-studies';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface IndustryFiltersProps {
  selectedIndustries: IndustryCategory[];
  onIndustryChange: (industry: IndustryCategory) => void;
  className?: string;
  disabled?: boolean;
  showCounts?: boolean; // Добавляем свойство showCounts
}

export function IndustryFilters({
  selectedIndustries,
  onIndustryChange,
  className,
  disabled = false,
  showCounts = false // Значение по умолчанию
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

  // Получаем данные с подсчетом
  const { industries } = getFilterCounts();

  // Обработчик клика по тегу (toggle логика)
  const handleTagClick = (industryId: IndustryCategory) => {
    if (disabled) return;
    onIndustryChange(industryId);
  };

  // Проверяем, выбран ли тег
  const isSelected = (industryId: IndustryCategory) => {
    return selectedIndustries.includes(industryId);
  };

  // Анимационные варианты для тегов - БЕЗ ВЫДВИЖЕНИЯ
  const tagVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: { 
      // Убираем сдвиг по x и scale
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
  const filteredIndustries = industries.filter(({ id }) => id !== 'your-industry');

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
            {/* Исключаем дефолтные теги из счетчика */}
            {selectedIndustries.filter(id => id !== 'your-industry').length > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                {selectedIndustries.filter(id => id !== 'your-industry').length}
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

      {/* Вертикальные теги как у Functions - ИСПРАВЛЕНО */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "space-y-2", // Вертикальное расположение как у Functions
              isMobile && "space-y-1"
            )}
          >
            {filteredIndustries.map(({ id: industryId, label, count }, index) => {
              const selected = isSelected(industryId);

              return (
                <motion.button
                  key={industryId}
                  variants={tagVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={disabled ? undefined : "hover"}
                  whileTap={disabled ? undefined : "tap"}
                  onClick={() => handleTagClick(industryId)}
                  disabled={disabled}
                  className={cn(
                    // Базовые стили - ФИКСИРОВАННАЯ ШИРИНА КАК У FUNCTION FILTERS
                    "relative w-full px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 h-[40px]",
                    "focus:outline-none flex items-center text-left",
                    showCounts ? "justify-between" : "justify-start",
                    
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
                    
                    // Мобильные стили - СТАНДАРТИЗИРОВАННЫЕ
                    isMobile && "text-xs px-3 py-1.5 h-[36px]"
                  )}
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {/* Контент тега - ВЫРАВНИВАНИЕ ПО ЛЕВОМУ КРАЮ */}
                  <span className="relative z-10 text-left leading-none">
                    {label}
                  </span>

                  {/* Счетчик случаев (если showCounts=true) */}
                  {showCounts && (
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full ml-2",
                      selected 
                        ? "bg-primary/30 text-primary" 
                        : "bg-medium-gray/30 text-light-gray"
                    )}>
                      {count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Компактный вид при сворачивании - БЕЗ ДЕФОЛТНЫХ ТЕГОВ */}
      {isCollapsed && selectedIndustries.filter(id => id !== 'your-industry').length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-1"
        >
          {selectedIndustries.filter(id => id !== 'your-industry').slice(0, 3).map(industryId => (
            <span 
              key={industryId}
              className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md"
            >
              {INDUSTRY_CATEGORIES[industryId]}
            </span>
          ))}
          {selectedIndustries.filter(id => id !== 'your-industry').length > 3 && (
            <span className="text-xs text-light-gray">
              +{selectedIndustries.filter(id => id !== 'your-industry').length - 3} more
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}