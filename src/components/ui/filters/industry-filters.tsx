// src/components/ui/filters/industry-filters.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { IndustryCategory, getFilterCounts } from '@/lib/data/case-studies';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface IndustryFiltersProps {
  selectedIndustries: IndustryCategory[];
  onIndustryChange: (industry: IndustryCategory) => void;
  className?: string;
  disabled?: boolean;
  showCounts?: boolean;
}

export function IndustryFilters({
  selectedIndustries,
  onIndustryChange,
  className,
  disabled = false,
  showCounts = false
}: IndustryFiltersProps) {
  const [isLoading, setIsLoading] = useState(true);
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

  // Обработчик клика по toggle (toggle логика)
  const handleToggleChange = (industryId: IndustryCategory) => {
    if (disabled) return;
    onIndustryChange(industryId);
  };

  // Проверяем, выбран ли тег
  const isSelected = (industryId: IndustryCategory) => {
    return selectedIndustries.includes(industryId);
  };


  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-3", className)}>
        <div className="flex items-center space-x-1.5 text-light-gray">
          <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs">Loading industries...</span>
        </div>
      </div>
    );
  }

  // Фильтруем "your-industry" из списка
  const filteredIndustries = industries.filter(({ id }) => id !== 'your-industry');

  return (
    <div className={cn("w-full", className)}>
      {/* ЗАГОЛОВОК */}
      <div className="mb-4">
        <div className="flex items-center px-2 py-2 border-b border-gray-600/30">
          <h3 className="text-sm font-semibold text-white">
            By Industry
          </h3>
          
          {/* Счетчик справа от заголовка */}
          {selectedIndustries.filter(id => id !== 'your-industry').length > 0 && (
            <span className="text-primary text-sm ml-1.5 font-semibold">
              {selectedIndustries.filter(id => id !== 'your-industry').length}
            </span>
          )}
        </div>
      </div>

      {/* TOGGLE для индустрий */}
      <div
        className={cn(
          "space-y-1",
          isMobile && "space-y-0.5"
        )}
      >
            {filteredIndustries.map(({ id: industryId, label, count }) => {
              const selected = isSelected(industryId);

              return (
                <div
                  key={industryId}
                  className={cn(
                    "relative w-full transition-all duration-300",
                    isMobile ? "min-h-[28px]" : "min-h-[30px]"
                  )}
                >
                  <div
                    className={cn(
                      "group flex items-center justify-between w-full px-2 py-1 rounded-md transition-all duration-300",
                      "outline-none focus:outline-none active:outline-none",
                      selected 
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-sm" 
                        : "bg-transparent hover:bg-primary/5 border border-transparent hover:border-primary/20",
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
                        selected ? "text-primary" : "text-white"
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
                            ? "bg-primary/25 text-primary" 
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
                          handleToggleChange(industryId);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        style={{ outline: 'none', boxShadow: 'none' }}
                        tabIndex={-1}
                      >
                        <div 
                          className={cn(
                            "w-7 h-3.5 rounded-full transition-all duration-300 relative overflow-hidden outline-none",
                            selected
                              ? "bg-primary shadow-md shadow-primary/20" 
                              : "bg-white/20 hover:bg-primary/30"
                          )}
                          style={{ outline: 'none', boxShadow: selected ? '0 1px 4px rgba(139, 92, 246, 0.3)' : 'none' }}
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
                                className="absolute inset-0 rounded-full bg-primary/30 blur-sm"
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}