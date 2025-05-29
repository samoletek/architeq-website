// src/components/ui/filters/function-filters.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { FUNCTION_CATEGORIES, FunctionCategory } from '@/lib/data/case-studies';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface FunctionFiltersProps {
  selectedFunctions: FunctionCategory[];
  onFunctionChange: (functionCategory: FunctionCategory) => void;
  className?: string;
  disabled?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function FunctionFilters({
  selectedFunctions,
  onFunctionChange,
  className,
  disabled = false,
  isCollapsed = false,
  onToggleCollapse
}: FunctionFiltersProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useDeviceDetection();

  // Загружаем данные (имитация загрузки)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Обработчик клика по тегу
  const handleTagClick = (functionId: FunctionCategory) => {
    if (disabled) return;
    onFunctionChange(functionId);
  };

  // Проверяем, выбран ли тег
  const isSelected = (functionId: FunctionCategory) => {
    return selectedFunctions.includes(functionId);
  };

  // Анимационные варианты для тегов
  const tagVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      x: 5,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-4", className)}>
        <div className="flex items-center space-x-2 text-light-gray">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Loading functions...</span>
        </div>
      </div>
    );
  }

  // Фильтруем "custom-solutions" из списка
  const filteredFunctions = Object.entries(FUNCTION_CATEGORIES).filter(([functionId]) => functionId !== 'custom-solutions');

  return (
    <div className={cn("w-full", className)}>
      {/* Заголовок секции с возможностью сворачивания */}
      <div className="mb-6">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-between text-left group focus:outline-none"
          disabled={!onToggleCollapse}
        >
          <h3 className="text-lg font-semibold text-white flex items-center">
            By Function
            {selectedFunctions.length > 0 && (
              <span className="ml-2 bg-secondary text-gray-900 text-xs px-2 py-1 rounded-full font-medium shadow-neon-green-glow">
                {selectedFunctions.length}
              </span>
            )}
          </h3>
          
          {onToggleCollapse && (
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.2 }}
              className="text-light-gray group-hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          )}
        </button>
        
        {/* Удаляем подсказку */}
      </div>

      {/* Вертикальные теги - СТАНДАРТИЗИРОВАННЫЕ РАЗМЕРЫ */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "space-y-2",
              isMobile && "space-y-1"
            )}
          >
            {filteredFunctions.map(([functionId, label], index) => {
              const typedFunctionId = functionId as FunctionCategory;
              const selected = isSelected(typedFunctionId);

              return (
                <motion.button
                  key={functionId}
                  variants={tagVariants}
                  whileHover={disabled ? undefined : "hover"}
                  whileTap={disabled ? undefined : "tap"}
                  onClick={() => handleTagClick(typedFunctionId)}
                  disabled={disabled}
                  className={cn(
                    // Базовые стили - СТАНДАРТИЗИРОВАННЫЕ РАЗМЕРЫ И ВЫРАВНИВАНИЕ
                    "relative w-full flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 h-[40px]",
                    "focus:outline-none text-left",
                    
                    // Состояние по умолчанию (цвета как у Industry - зеленые)
                    !selected && [
                      "bg-secondary/20 text-secondary",
                      "hover:text-secondary hover:bg-secondary/30"
                    ],
                    
                    // Выбранное состояние (зеленые со свечением)
                    selected && [
                      "text-secondary shadow-neon-green-glow"
                    ],
                    
                    // Состояние отключения
                    disabled && "opacity-50 cursor-not-allowed",
                    
                    // Мобильные стили - СТАНДАРТИЗИРОВАННЫЕ
                    isMobile && "px-3 py-1.5 text-xs h-[36px]"
                  )}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Левая часть - название с правильным выравниванием */}
                  <div className="relative z-10 flex items-center">
                    <span className="text-left leading-tight">{label}</span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Компактный вид при сворачивании */}
      {isCollapsed && selectedFunctions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-1"
        >
          {selectedFunctions.slice(0, 3).map(functionId => (
            <span 
              key={functionId}
              className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-md"
            >
              {FUNCTION_CATEGORIES[functionId]}
            </span>
          ))}
          {selectedFunctions.length > 3 && (
            <span className="text-xs text-light-gray">
              +{selectedFunctions.length - 3} more
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}