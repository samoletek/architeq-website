// src/components/ui/filters/function-filters.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { FUNCTION_CATEGORIES, FunctionCategory, getFilterCounts } from '@/lib/data/case-studies';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface FunctionFiltersProps {
  selectedFunctions: FunctionCategory[];
  onFunctionChange: (functionCategory: FunctionCategory) => void;
  className?: string;
  disabled?: boolean;
  showCounts?: boolean;
}

export function FunctionFilters({
  selectedFunctions,
  onFunctionChange,
  className,
  disabled = false,
  showCounts = false
}: FunctionFiltersProps) {
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
  const { functions } = getFilterCounts();

  // Обработчик клика по toggle (toggle логика)
  const handleToggleChange = (functionId: FunctionCategory) => {
    if (disabled) return;
    onFunctionChange(functionId);
  };

  // Проверяем, выбран ли тег
  const isSelected = (functionId: FunctionCategory) => {
    return selectedFunctions.includes(functionId);
  };

  // Анимационные варианты для toggle
  const toggleVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.15, ease: "easeInOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-3", className)}>
        <div className="flex items-center space-x-1.5 text-light-gray">
          <div className="w-3 h-3 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs">Loading functions...</span>
        </div>
      </div>
    );
  }

  // Фильтруем "custom-solutions" из списка
  const filteredFunctions = functions.filter(({ id }) => id !== 'custom-solutions');

  return (
    <div className={cn("w-full", className)}>
      {/* КОМПАКТНЫЙ ЗАГОЛОВОК */}
      <div className="mb-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between text-left group focus:outline-none px-2 py-1 rounded-md hover:bg-white/5 transition-colors duration-200"
        >
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-white">
              By Function
            </h3>
            
            {/* Компактный счетчик справа от заголовка */}
            {selectedFunctions.filter(id => id !== 'custom-solutions').length > 0 && (
              <span className="bg-secondary/20 text-secondary text-xs px-1 py-0.5 rounded-full font-medium border border-secondary/30 text-[9px] ml-1.5 min-w-[16px] text-center">
                {selectedFunctions.filter(id => id !== 'custom-solutions').length}
              </span>
            )}
          </div>
          
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-light-gray group-hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* КОМПАКТНЫЕ TOGGLE для функций */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn(
              "space-y-1",
              isMobile && "space-y-0.5"
            )}
          >
            {filteredFunctions.map(({ id: functionId, label, count }, index) => {
              const selected = isSelected(functionId);

              return (
                <motion.div
                  key={functionId}
                  variants={toggleVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={disabled ? undefined : "hover"}
                  whileTap={disabled ? undefined : "tap"}
                  className={cn(
                    "relative w-full transition-all duration-300",
                    isMobile ? "min-h-[28px]" : "min-h-[30px]"
                  )}
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div
                    className={cn(
                      "group flex items-center justify-between w-full px-2 py-1 rounded-md transition-all duration-300",
                      "outline-none focus:outline-none active:outline-none",
                      selected 
                        ? "bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 shadow-sm" 
                        : "bg-transparent hover:bg-secondary/5 border border-transparent hover:border-secondary/20",
                      disabled && "opacity-50",
                      isMobile && "px-1.5 py-0.5"
                    )}
                    style={{ outline: 'none', boxShadow: 'none' }}
                    tabIndex={-1}
                    onFocus={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {/* Левая часть - название */}
                    <div 
                      className="flex items-center flex-grow pointer-events-none"
                      style={{ outline: 'none', userSelect: 'none' }}
                    >
                      <span className={cn(
                        "text-left leading-none font-medium transition-colors duration-200 select-none pointer-events-none",
                        isMobile ? "text-xs" : "text-xs",
                        selected ? "text-secondary" : "text-white"
                      )}
                      style={{ outline: 'none', userSelect: 'none' }}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Правая часть - toggle switch + счетчик */}
                    <div 
                      className="flex items-center space-x-1.5 flex-shrink-0"
                      style={{ outline: 'none' }}
                    >
                      {/* Компактный счетчик случаев (если showCounts=true) */}
                      {showCounts && (
                        <span className={cn(
                          "text-xs px-1 py-0.5 rounded-full transition-colors duration-200 pointer-events-none select-none text-[9px] min-w-[14px] text-center",
                          selected 
                            ? "bg-secondary/25 text-secondary" 
                            : "bg-white/10 text-light-gray"
                        )}
                        style={{ outline: 'none', userSelect: 'none' }}
                        >
                          {count}
                        </span>
                      )}

                      {/* Компактный Toggle Switch */}
                      <div 
                        className="relative cursor-pointer outline-none focus:outline-none active:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleToggleChange(functionId);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        style={{ outline: 'none', boxShadow: 'none' }}
                        tabIndex={-1}
                      >
                        <div 
                          className={cn(
                            "w-7 h-3.5 rounded-full transition-all duration-300 relative overflow-hidden outline-none",
                            selected
                              ? "bg-secondary shadow-md shadow-secondary/20" 
                              : "bg-white/20 hover:bg-secondary/30"
                          )}
                          style={{ outline: 'none', boxShadow: selected ? '0 1px 4px rgba(176, 255, 116, 0.3)' : 'none' }}
                        >
                          {/* Компактный Toggle Circle */}
                          <motion.div
                            animate={{
                              x: selected ? 12 : 1.5
                            }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 30 
                            }}
                            className={cn(
                              "absolute top-0.5 w-2.5 h-2.5 rounded-full transition-colors duration-300",
                              selected 
                                ? "bg-white shadow-sm" 
                                : "bg-white/80 group-hover:bg-white"
                            )}
                          />
                          
                          {/* Внутреннее свечение при активном состоянии */}
                          <AnimatePresence>
                            {selected && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 rounded-full bg-secondary/30 blur-sm"
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Компактный вид при сворачивании */}
      {isCollapsed && selectedFunctions.filter(id => id !== 'custom-solutions').length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-1"
        >
          {selectedFunctions.filter(id => id !== 'custom-solutions').slice(0, 3).map(functionId => (
            <span 
              key={functionId}
              className="text-xs bg-secondary/15 text-secondary px-1.5 py-0.5 rounded-md border border-secondary/25 text-[9px]"
            >
              {FUNCTION_CATEGORIES[functionId]}
            </span>
          ))}
          {selectedFunctions.filter(id => id !== 'custom-solutions').length > 3 && (
            <span className="text-xs text-light-gray px-1.5 py-0.5 text-[9px]">
              +{selectedFunctions.filter(id => id !== 'custom-solutions').length - 3} more
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}