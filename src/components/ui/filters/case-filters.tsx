// Исправленный фильтр для кейсов
// src/components/ui/filters/case-filters.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
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
  searchPlaceholder = "Choose a filter or search by name, description or company...",
  filtersTitle = "Filters",
  clearButtonText = "Clear all",
  activeFiltersTitle = "Active filters:",
  layout = 'horizontal'
}: CaseFiltersProps) {
  // Состояние для открытых групп фильтров
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { isMobile } = useDeviceDetection();
  
  // Создаем useRef для отслеживания дропдаунов
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Флаг для предотвращения закрытия дропдауна при клике на опцию
  const preventCloseRef = useRef(false);
  
  // Инициализируем состояние открытых групп
  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    groups.forEach(group => {
      // Устанавливаем все группы закрытыми по умолчанию
      initialState[group.id] = false;
    });
    setOpenGroups(initialState);
  }, [groups]);
  
  // Обработчик клика вне выпадающего меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layout !== 'vertical') {
        // Если установлен флаг, который предотвращает закрытие, то ничего не делаем
        if (preventCloseRef.current) {
          preventCloseRef.current = false;
          return;
        }
        
        const targetElement = event.target as Element;
        
        // Проверяем, был ли клик на кнопку переключения группы
        const isToggleButton = targetElement.closest('[data-filter-toggle]');
        if (isToggleButton) return; // Игнорируем клики на кнопки переключения
        
        // Проверяем, был ли клик вне фильтров
        if (!targetElement.closest('[data-filter-dropdown]')) {
          // Закрываем все открытые группы
          const updatedGroups = { ...openGroups };
          let changed = false;
          
          Object.keys(updatedGroups).forEach(groupId => {
            if (updatedGroups[groupId]) {
              updatedGroups[groupId] = false;
              changed = true;
            }
          });
          
          if (changed) {
            setOpenGroups(updatedGroups);
          }
        }
      }
    };
    
    // Добавляем обработчик клика
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Удаляем обработчик при размонтировании
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openGroups, layout]);
  
  // Подсчитываем количество активных фильтров
  const activeFiltersCount = Object.values(selectedOptions).reduce(
    (total, options) => total + options.length, 0
  );
  
  // Обработчик для переключения группы фильтров
  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => {
      const newState = { ...prev };
      // Закрываем все другие группы при открытии новой
      Object.keys(newState).forEach(key => {
        newState[key] = key === groupId ? !prev[key] : false;
      });
      return newState;
    });
  };
  
  // Обработчик для выхода мыши из области выпадающего списка
  const handleMouseLeave = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: false
    }));
  };
  
  // Обработчик изменения опции фильтра - сохраняем открытое состояние
  const handleFilterOptionChange = (groupId: string, optionId: string, event: React.MouseEvent) => {
    // Останавливаем всплытие события
    event.stopPropagation();
    event.preventDefault();
    
    // Устанавливаем флаг для предотвращения закрытия
    preventCloseRef.current = true;
    
    // Вызываем основной обработчик
    onFilterChange(groupId, optionId);
    
    // Устанавливаем таймаут, чтобы сохранить дропдаун открытым
    setTimeout(() => {
      setOpenGroups(prev => ({
        ...prev,
        [groupId]: true
      }));
    }, 0);
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
      case 'industry': return 'bg-medium-gray/20 text-light-gray';
      case 'solutionType': return 'bg-medium-gray/20 text-light-gray';
      case 'technology': return 'bg-medium-gray/20 text-light-gray';
      default: return 'bg-medium-gray/20 text-light-gray';
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
              style={{backgroundColor: '#121212'}}
              className="w-full bg-[#121212] border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-light-gray/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
              placeholder={searchPlaceholder}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray group-hover:text-white transition-all duration-300 group-hover:text-shadow-white-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Мобильная кнопка фильтров */}
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="mt-3 w-full flex items-center justify-between bg-dark-gray border border-primary/30 hover:bg-dark-gray/70 text-white py-3 px-4 rounded-lg transition-colors"
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
                      data-filter-toggle={group.id}
                    >
                      <h3 className="text-lg font-medium flex items-center">
                        {group.icon && <span className="mr-2">{group.icon}</span>}
                        {group.label}
                      </h3>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={cn(
                          "h-5 w-5 transition-transform",
                          openGroups[group.id] ? 'transform rotate-180' : ''
                        )}
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
                          data-filter-dropdown={group.id}
                        >
                          <div className="flex flex-wrap gap-2">
                            {group.options.map((option) => (
                              <button
                                key={option.id}
                                onClick={(e) => handleFilterOptionChange(group.id, option.id, e)}
                                className={cn(
                                  "px-3 py-2 rounded-lg text-sm filter-option-checkbox transition-all duration-300",
                                  selectedOptions[group.id]?.includes(option.id) 
                                    ? "bg-secondary text-gray-900 text-shadow-green-soft shadow-neon-green-glow"
                                    : "bg-medium-gray/50 backdrop-blur-md text-light-gray hover:bg-dark-gray hover:text-white"
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
            {filterCount} {filterCount === 1 ? 'result' : 'results'} found
          </div>
        )}
      </div>
    );
  }

  // Горизонтальный макет для десктопной версии
  if (!isVertical) {
    return (
      <div className={cn("bg-dark-gray rounded-lg p-4", className)}>
        <div className="flex flex-col space-y-4">
          {/* Верхняя строка с поиском и очисткой фильтров */}
          <div className="flex items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{backgroundColor: '#121212'}}
                className="w-full bg-[#121212] border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-light-gray/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                placeholder={searchPlaceholder}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray group-hover:text-white transition-all duration-300 group-hover:text-shadow-white-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Кнопка очистки фильтров */}
            <button
              onClick={onClearFilters}
              className={cn(
                "py-3 px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap",
                hasActiveFilters 
                  ? "bg-secondary text-gray-900 hover:bg-secondary/90 shadow-neon-green-glow" 
                  : "bg-dark-gray border border-primary/30 backdrop-blur-sm text-light-gray cursor-not-allowed"
              )}
              disabled={!hasActiveFilters}
            >
              {clearButtonText}
            </button>
          </div>
          
          {/* Фильтры по группам - равномерно распределенные по ширине */}
          <div className="flex gap-4">
            {groups.map((group) => (
              <div key={group.id} className="relative flex-1">
                <button
                  onClick={() => toggleGroup(group.id)}
                  data-filter-toggle={group.id}
                  className={cn(
                    "flex items-center justify-between w-full py-3 px-4 rounded-lg transition-all duration-300",
                    openGroups[group.id] 
                      ? "bg-dark-gray/95 backdrop-blur-md text-white shadow-lg border border-primary/30" 
                      : "bg-dark-gray backdrop-blur-sm border border-primary/30 text-light-gray hover:text-white hover:bg-dark-gray/70"
                  )}
                >
                  <div className="flex items-center">
                    {group.icon && <span className="mr-2">{group.icon}</span>}
                    <span>{group.label}</span>
                  </div>
                  <div className="flex items-center">
                    {selectedOptions[group.id]?.length > 0 && (
                      <span className="mr-2 bg-secondary w-5 h-5 flex items-center justify-center rounded-full text-xs text-gray-900 font-medium">
                        {selectedOptions[group.id].length}
                      </span>
                    )}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openGroups[group.id] ? 'transform rotate-180' : ''
                      )}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {/* Выпадающая панель с опциями - стиль стекла */}
                <AnimatePresence>
                  {openGroups[group.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 left-0 right-0 mt-2 w-full bg-dark-gray/95 backdrop-blur-md border border-medium-gray/50 rounded-lg shadow-xl p-3"
                      data-filter-dropdown={group.id}
                      onMouseLeave={() => handleMouseLeave(group.id)}
                      ref={(el) => { dropdownRefs.current[group.id] = el; }}
                    >
                      <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                        {group.options.map((option) => (
                          <button 
                            key={option.id} 
                            className={cn(
                              "flex items-center hover:bg-medium-gray/30 p-2 rounded-lg cursor-pointer transition-all duration-300 w-full text-left",
                              "filter-option-checkbox",
                              selectedOptions[group.id]?.includes(option.id) && "text-secondary text-shadow-green-soft"
                            )}
                            onClick={(e) => handleFilterOptionChange(group.id, option.id, e)}
                          >
                            <div className="relative flex items-center justify-center">
                              <div 
                                className={cn(
                                  "w-4 h-4 rounded border flex items-center justify-center transition-all duration-300",
                                  selectedOptions[group.id]?.includes(option.id)
                                    ? "bg-secondary border-secondary shadow-neon-green-glow"
                                    : "bg-medium-gray/50 backdrop-blur-sm border-medium-gray/70"
                                )}
                              >
                                {selectedOptions[group.id]?.includes(option.id) && (
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-3 w-3 text-gray-900" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                  >
                                    <path 
                                      fillRule="evenodd" 
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                      clipRule="evenodd" 
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span className={cn(
                              "ml-2 transition-colors duration-300",
                              selectedOptions[group.id]?.includes(option.id) 
                                ? "text-secondary" 
                                : "text-light-gray"
                            )}>
                              {option.label}
                            </span>
                            {option.count !== undefined && (
                              <span className="ml-auto text-light-gray/60 text-sm">{option.count}</span>
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
          
          {/* Активные фильтры */}
          {hasActiveFilters && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-light-gray mr-2">{activeFiltersTitle}</span>
                
                {searchQuery.trim() && (
                  <span className="bg-secondary/20 text-secondary rounded-full px-3 py-1 text-xs flex items-center shadow-neon-green-glow">
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
                    className={cn(getGroupColor(filter.groupId), "rounded-full px-3 py-1 text-xs flex items-center shadow-sm")}
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
            <div className="text-sm text-light-gray mt-2">
              {filterCount} {filterCount === 1 ? 'result' : 'results'} found
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Вертикальный макет (оставляем для обратной совместимости)
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Левая колонка с фильтрами */}
      <div className="bg-dark-gray rounded-xl w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">{filtersTitle}</h2>
          
          {/* Поисковая строка */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{backgroundColor: '#121212'}}
                className="w-full bg-[#121212] border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-light-gray/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                placeholder={searchPlaceholder}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray group-hover:text-white transition-all duration-300 group-hover:text-shadow-white-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  data-filter-toggle={group.id}
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
                      data-filter-dropdown={group.id}
                    >
                      {group.options.map((option) => (
                        <button 
                          key={option.id} 
                          className="flex items-center w-full hover:bg-medium-gray/30 p-2 rounded-lg cursor-pointer transition-all duration-300 filter-option-checkbox text-left"
                          onClick={(e) => handleFilterOptionChange(group.id, option.id, e)}
                        >
                          <div className="relative flex items-center justify-center">
                            <div 
                              className={cn(
                                "w-4 h-4 rounded border flex items-center justify-center transition-all duration-300",
                                selectedOptions[group.id]?.includes(option.id)
                                  ? "bg-secondary border-secondary shadow-neon-green-glow"
                                  : "bg-medium-gray/50 backdrop-blur-sm border-medium-gray/70"
                              )}
                            >
                              {selectedOptions[group.id]?.includes(option.id) && (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-3 w-3 text-gray-900" 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path 
                                    fillRule="evenodd" 
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                    clipRule="evenodd" 
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className={cn(
                            "ml-2 transition-colors duration-300",
                            selectedOptions[group.id]?.includes(option.id) 
                              ? "text-secondary text-shadow-green-soft" 
                              : "text-light-gray"
                          )}>
                            {option.label}
                          </span>
                          {option.count !== undefined && (
                            <span className="ml-auto text-light-gray/60 text-sm">{option.count}</span>
                          )}
                        </button>
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
              "w-full mt-6 py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium",
              hasActiveFilters 
                ? "bg-secondary text-gray-900 hover:bg-secondary/90 shadow-neon-green-glow" 
                : "bg-dark-gray border border-primary/30 backdrop-blur-sm text-light-gray cursor-not-allowed"
            )}
            disabled={!hasActiveFilters}
          >
            {clearButtonText}
          </button>
        </div>
        
        {/* Счетчик результатов (только для вертикального макета) */}
        {filterCount > 0 && (
          <div className="px-6 pb-4 text-sm text-light-gray">
            {filterCount} {filterCount === 1 ? 'result' : 'results'} found
          </div>
        )}
      </div>
      
      {/* Активные фильтры и счетчик результатов */}
      {hasActiveFilters && (
        <div className="bg-dark-gray/95 backdrop-blur-md rounded-xl p-4 mt-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-light-gray mr-2">{activeFiltersTitle}</span>
            
            {searchQuery.trim() && (
              <span className="bg-secondary/20 text-secondary rounded-full px-3 py-1 text-xs flex items-center shadow-neon-green-glow">
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
    </div>
  );
}