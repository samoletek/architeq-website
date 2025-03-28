// src/components/ui/filters/case-filters.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  group?: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  icon?: React.ReactNode;
  initialOpen?: boolean;
}

export interface CaseFiltersProps {
  groups: FilterGroup[];
  selectedOptions: Record<string, string[]>;
  searchQuery: string;
  onFilterChange: (groupId: string, optionId: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  className?: string;
  filterCount?: number;
  isCompact?: boolean;
  searchPlaceholder?: string;
  filtersTitle?: string;
  clearButtonText?: string;
  activeFiltersTitle?: string;
  layout?: 'vertical' | 'horizontal';
}

export function CaseFilters({
  groups,
  selectedOptions,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onClearFilters,
  className,
  filterCount = 0,
  isCompact = false,
  searchPlaceholder = "Поиск по названию, описанию или компании...",
  filtersTitle = "Фильтры",
  clearButtonText = "Очистить всё",
  activeFiltersTitle = "Активные фильтры:",
  layout = 'vertical'
}: CaseFiltersProps) {
  // Состояние для открытых групп фильтров
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { isMobile } = useDeviceDetection();
  
  // Инициализируем состояние открытых групп
  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    groups.forEach(group => {
      initialState[group.id] = group.initialOpen !== undefined ? group.initialOpen : true;
    });
    setOpenGroups(initialState);
  }, [groups]);
  
  // Подсчитываем количество активных фильтров
  const activeFiltersCount = Object.values(selectedOptions).reduce(
    (total, options) => total + options.length, 0
  );
  
  // Обработчик для переключения группы фильтров
  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  
  // Получаем массив всех активных фильтров для отображения
  const getActiveFilters = () => {
    const result: Array<{ id: string; label: string; group: string; groupId: string }> = [];
    
    Object.entries(selectedOptions).forEach(([groupId, optionIds]) => {
      const group = groups.find(g => g.id === groupId);
      if (!group) return;
      
      optionIds.forEach(optionId => {
        const option = group.options.find(o => o.id === optionId);
        if (option) {
          result.push({
            id: optionId,
            label: option.label,
            group: group.label,
            groupId
          });
        }
      });
    });
    
    return result;
  };
  
  // Определяем, есть ли активные фильтры
  const hasActiveFilters = activeFiltersCount > 0 || searchQuery.trim().length > 0;
  
  // Обработчик для удаления активного фильтра
  const handleRemoveFilter = (groupId: string, optionId: string) => {
    onFilterChange(groupId, optionId);
  };
  
  // Определяем цвет для группы фильтров
  const getGroupColor = (groupId: string) => {
    switch (groupId) {
      case 'industry': return 'bg-primary/20 text-primary';
      case 'solutionType': return 'bg-neon-blue/20 text-neon-blue';
      case 'technology': return 'bg-neon-purple/20 text-neon-purple';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };
  
  // Определяем макет - вертикальный или горизонтальный
  const isVertical = layout === 'vertical';
  
  // Рендер для компактного режима (мобильные устройства)
  if (isCompact || isMobile) {
    return (
      <div className={cn("bg-dark-gray rounded-lg", className)}>
        {/* Поиск и переключатель фильтров */}
        <div className="p-4 border-b border-medium-gray">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-medium-gray border border-medium-gray rounded-lg py-2 pl-3 pr-10 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder={searchPlaceholder}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Мобильная кнопка фильтров */}
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="mt-3 w-full flex items-center justify-between bg-medium-gray hover:bg-medium-gray/80 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {filtersTitle}
            </span>
            <span className={cn(
              "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
              activeFiltersCount > 0 ? "bg-primary text-white" : "bg-medium-gray/70 text-light-gray"
            )}>
              {activeFiltersCount}
            </span>
          </button>
        </div>
        
        {/* Активные фильтры */}
        {hasActiveFilters && (
          <div className="p-4 border-b border-medium-gray">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-light-gray">{activeFiltersTitle}</span>
              
              {searchQuery.trim() && (
                <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-xs flex items-center">
                  Search: {searchQuery.trim()}
                  <button 
                    onClick={() => onSearchChange('')}
                    className="ml-1 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {getActiveFilters().map(filter => (
                <span 
                  key={`${filter.groupId}-${filter.id}`}
                  className={cn(getGroupColor(filter.groupId), "rounded-full px-3 py-1 text-xs flex items-center")}
                >
                  {filter.label}
                  <button 
                    onClick={() => handleRemoveFilter(filter.groupId, filter.id)}
                    className="ml-1 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="text-primary hover:text-white transition-colors text-sm underline"
                >
                  {clearButtonText}
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Выпадающие фильтры */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-6">
                {groups.map((group) => (
                  <div key={group.id} className="border-b border-medium-gray pb-4 last:border-0 last:pb-0">
                    <button
                      className="flex items-center justify-between w-full text-left mb-3"
                      onClick={() => toggleGroup(group.id)}
                    >
                      <h3 className="text-lg font-medium flex items-center">
                        {group.icon && <span className="mr-2">{group.icon}</span>}
                        {group.label}
                      </h3>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform ${openGroups[group.id] ? 'transform rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {openGroups[group.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2">
                            {group.options.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => onFilterChange(group.id, option.id)}
                                className={cn(
                                  "px-3 py-2 rounded-lg text-sm",
                                  selectedOptions[group.id]?.includes(option.id) 
                                    ? cn(getGroupColor(group.id))
                                    : "bg-medium-gray text-light-gray hover:bg-dark-gray hover:text-white"
                                )}
                              >
                                {option.label}
                                {option.count !== undefined && (
                                  <span className="ml-1 text-xs opacity-70">({option.count})</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Счетчик результатов */}
        {filterCount > 0 && (
          <div className="p-4 text-sm text-light-gray border-t border-medium-gray">
            {filterCount} {filterCount === 1 ? 'результат' : 'результатов'} найдено
          </div>
        )}
      </div>
    );
  }
  
  // Рендер для десктопной версии
  return (
    <div className={cn(
      isVertical ? "flex flex-col" : "flex flex-col md:flex-row md:items-start md:gap-8",
      className
    )}>
      {/* Левая колонка с фильтрами */}
      <div className={cn(
        "bg-dark-gray rounded-xl",
        isVertical ? "w-full" : "w-full md:w-64 flex-shrink-0"
      )}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">{filtersTitle}</h2>
          
          {/* Поисковая строка */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-medium-gray border border-medium-gray rounded-lg py-3 pl-4 pr-10 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder={searchPlaceholder}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Группы фильтров */}
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.id} className="border-b border-medium-gray pb-6 last:border-0 last:pb-0">
                <button
                  className="flex items-center justify-between w-full text-left mb-3"
                  onClick={() => toggleGroup(group.id)}
                >
                  <h3 className="text-lg font-medium flex items-center">
                    {group.icon && <span className="mr-2">{group.icon}</span>}
                    {group.label}
                  </h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${openGroups[group.id] ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {openGroups[group.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {group.options.map((option) => (
                        <label key={option.id} className="flex items-center hover:bg-medium-gray/30 p-2 rounded-lg cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedOptions[group.id]?.includes(option.id) || false}
                            onChange={() => onFilterChange(group.id, option.id)}
                            className="form-checkbox h-4 w-4 text-primary rounded border-medium-gray bg-medium-gray focus:ring-primary"
                          />
                          <span className="ml-2 text-light-gray">{option.label}</span>
                          {option.count !== undefined && (
                            <span className="ml-auto text-light-gray/60 text-sm">{option.count}</span>
                          )}
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          {/* Кнопка очистки фильтров */}
          <button
            onClick={onClearFilters}
            className={cn(
              "w-full mt-6 py-2 px-4 rounded-lg transition-colors text-sm font-medium",
              hasActiveFilters 
                ? "bg-primary hover:bg-primary/90 text-white" 
                : "bg-medium-gray text-light-gray cursor-not-allowed"
            )}
            disabled={!hasActiveFilters}
          >
            {clearButtonText}
          </button>
        </div>
        
        {/* Счетчик результатов (только для вертикального макета) */}
        {isVertical && filterCount > 0 && (
          <div className="px-6 pb-4 text-sm text-light-gray">
            {filterCount} {filterCount === 1 ? 'результат' : 'результатов'} найдено
          </div>
        )}
      </div>
      
      {/* Правая колонка с активными фильтрами (только для горизонтального макета) */}
      {!isVertical && (
        <div className="flex-grow w-full">
          {/* Активные фильтры */}
          {hasActiveFilters && (
            <div className="bg-dark-gray rounded-xl p-4 mb-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-light-gray mr-2">{activeFiltersTitle}</span>
                
                {searchQuery.trim() && (
                  <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-xs flex items-center">
                    Search: {searchQuery.trim()}
                    <button 
                      onClick={() => onSearchChange('')}
                      className="ml-1 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {getActiveFilters().map(filter => (
                  <span 
                    key={`${filter.groupId}-${filter.id}`}
                    className={cn(getGroupColor(filter.groupId), "rounded-full px-3 py-1 text-xs flex items-center")}
                  >
                    {filter.label}
                    <button 
                      onClick={() => handleRemoveFilter(filter.groupId, filter.id)}
                      className="ml-1 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Счетчик результатов */}
          {filterCount > 0 && (
            <div className="mb-4 text-sm text-light-gray">
              {filterCount} {filterCount === 1 ? 'результат' : 'результатов'} найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
}