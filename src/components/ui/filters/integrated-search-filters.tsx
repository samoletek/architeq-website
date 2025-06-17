// src/components/ui/filters/integrated-search-filters.tsx
"use client";

import { cn } from '@/lib/utils/utils';
import { 
  INDUSTRY_CATEGORIES, 
  FUNCTION_CATEGORIES, 
  IndustryCategory, 
  FunctionCategory 
} from '@/lib/data/case-studies';

interface IntegratedSearchFiltersProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  
  // Filters
  selectedIndustries: IndustryCategory[];
  selectedFunctions: FunctionCategory[];
  onRemoveIndustry: (industry: IndustryCategory) => void;
  onRemoveFunction: (functionCategory: FunctionCategory) => void;
  onClearAll: () => void;
  
  // Results
  resultCount: number;
  
  className?: string;
}

export function IntegratedSearchFilters({
  searchQuery,
  onSearchChange,
  selectedIndustries,
  selectedFunctions,
  onRemoveIndustry,
  onRemoveFunction,
  onClearAll,
  resultCount,
  className
}: IntegratedSearchFiltersProps) {
  
  // Подсчитываем активные фильтры (без дефолтных)
  const activeIndustries = selectedIndustries.filter(id => id !== 'your-industry');
  const activeFunctions = selectedFunctions.filter(id => id !== 'custom-solutions');
  const hasSearch = searchQuery.trim().length > 0;
  const hasActiveFilters = activeIndustries.length > 0 || activeFunctions.length > 0 || hasSearch;

  // Получаем все активные фильтры для отображения
  const getActiveFilters = () => {
    const result: Array<{ 
      id: string; 
      label: string; 
      type: 'search' | 'industry' | 'function';
      onRemove: () => void;
      color: string;
    }> = [];
    
    // Поисковый запрос
    if (searchQuery.trim()) {
      result.push({
        id: 'search',
        label: `Search: ${searchQuery.trim()}`,
        type: 'search',
        onRemove: () => onSearchChange(''),
        color: 'bg-secondary/20 text-secondary'
      });
    }
    
    // Индустрии
    activeIndustries.forEach(industryId => {
      result.push({
        id: industryId,
        label: INDUSTRY_CATEGORIES[industryId],
        type: 'industry',
        onRemove: () => onRemoveIndustry(industryId),
        color: 'bg-primary/20 text-primary'
      });
    });
    
    // Функции
    activeFunctions.forEach(functionId => {
      result.push({
        id: functionId,
        label: FUNCTION_CATEGORIES[functionId],
        type: 'function',
        onRemove: () => onRemoveFunction(functionId),
        color: 'bg-secondary/20 text-secondary'
      });
    });
    
    return result;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className={cn("", className)}>
      
      {/* Поисковая строка */}
      <div className="p-0 pt-4">
        <div className="flex items-center gap-4 max-w-full">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{backgroundColor: '#121212'}}
              className="w-full bg-[#121212] border border-medium-gray/50 rounded-lg py-3 pl-10 pr-4 text-xs md:text-sm text-white placeholder-light-gray/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
              placeholder="Search cases..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray group-hover:text-white transition-all duration-300 group-hover:text-shadow-white-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Кнопка очистки фильтров */}
          <button
            onClick={onClearAll}
            className={cn(
              "py-3 px-4 rounded-lg transition-colors text-xs md:text-sm font-medium whitespace-nowrap focus:outline-none",
              hasActiveFilters 
                ? "bg-secondary text-gray-900 hover:bg-secondary/90 shadow-neon-green-glow" 
                : "bg-dark-gray border border-primary/30 backdrop-blur-sm text-light-gray cursor-not-allowed"
            )}
            disabled={!hasActiveFilters}
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Активные фильтры */}
      {hasActiveFilters && (
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-wrap">
              <span className="text-xs md:text-sm text-light-gray mr-2 whitespace-nowrap">Active filters:</span>
              <div className="flex flex-wrap gap-1">
                {activeFilters.map(filter => (
                  <span 
                    key={`${filter.type}-${filter.id}`}
                    className={cn(filter.color, "text-xs px-2 py-1 rounded-md flex items-center")}
                  >
                    {filter.label}
                    <button 
                      onClick={filter.onRemove}
                      className="ml-1 focus:outline-none hover:opacity-80 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Счетчик результатов */}
      <div className={cn(
        "pb-6 text-xs md:text-sm text-light-gray",
        hasActiveFilters ? "pt-0" : "pt-4"
      )}>
        {resultCount} {resultCount === 1 ? 'result' : 'results'} found
      </div>
    </div>
  );
}