// src/components/ui/search-bar.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { usePathname } from 'next/navigation';

// Типы результатов поиска
export interface SearchResult {
  id: string;
  title: string;
  type: 'case' | 'service' | 'page';
  url: string;
  description?: string;
  tags?: string[];
  iconName?: string;
}

// Интерфейс для параметров
interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  results?: SearchResult[];
  isLoading?: boolean; 
  isExpanded?: boolean;
  onToggle?: () => void;
  variant?: 'default' | 'minimal' | 'overlay';
  maxResults?: number;
}

export function SearchBar({
  className,
  placeholder = 'Поиск...',
  onSearch,
  results = [],
  isLoading = false,
  isExpanded = false,
  onToggle,
  variant = 'default',
  maxResults = 5
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useDeviceDetection();
  const pathname = usePathname();
  
  // Фильтрация и ограничение результатов
  const displayResults = results.slice(0, maxResults);
  const hasResults = displayResults.length > 0;
  const hasMoreResults = results.length > maxResults;
  
  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Сброс поиска при изменении маршрута
  useEffect(() => {
    setSearchQuery('');
    setShowResults(false);
  }, [pathname]);
  
  // Обработчик ввода
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (onSearch) {
      onSearch(value);
    }
    
    setShowResults(value.length > 0);
  }, [onSearch]);
  
  // Обработчик фокуса
  const handleFocus = () => {
    setInputFocused(true);
    if (searchQuery.length > 0) {
      setShowResults(true);
    }
  };
  
  // Обработчик потери фокуса
  const handleBlur = () => {
    setInputFocused(false);
    // Не скрываем результаты сразу, так как пользователь может кликнуть по результату
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setShowResults(false);
      }
    }, 200);
  };
  
  // Функция для очистки поиска
  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    if (onSearch) {
      onSearch('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Отображение результатов поиска
  const renderResults = () => {
    if (!showResults) return null;
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute top-full mt-2 left-0 right-0 bg-dark-gray border border-medium-gray rounded-lg shadow-lg z-50 overflow-hidden",
            variant === 'overlay' ? "max-h-[70vh] overflow-y-auto" : "max-h-80 overflow-y-auto"
          )}
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-light-gray">Поиск...</p>
            </div>
          ) : hasResults ? (
            <div>
              <div className="py-2">
                {displayResults.map((result) => (
                  <Link 
                    key={`${result.type}-${result.id}`} 
                    href={result.url}
                    className="block px-4 py-2 hover:bg-medium-gray/50 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-start">
                      {result.iconName && (
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-medium-gray flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </span>
                      )}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        {result.description && (
                          <p className="text-light-gray text-sm line-clamp-1">{result.description}</p>
                        )}
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {result.tags.slice(0, 3).map((tag, index) => (
                              <span 
                                key={index}
                                className="inline-flex text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {hasMoreResults && (
                <div className="border-t border-medium-gray p-3 text-center">
                  <Link 
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="text-primary text-sm hover:underline"
                    onClick={() => setShowResults(false)}
                  >
                    Показать все результаты
                  </Link>
                </div>
              )}
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="p-4 text-center">
              <p className="text-light-gray">Ничего не найдено по запросу &quot;{searchQuery}&quot;</p>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Разные варианты отображения
  if (variant === 'minimal') {
    return (
      <div className={cn("relative", className)} ref={searchRef}>
        <button
          onClick={onToggle}
          className="text-light-gray hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    );
  }
  
  if (variant === 'overlay' && !isExpanded) {
    return (
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center text-light-gray hover:text-white px-3 py-2 rounded-lg border border-medium-gray focus:outline-none focus:ring-2 focus:ring-primary",
          className
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>{placeholder}</span>
      </button>
    );
  }
  
  if (variant === 'overlay' && isExpanded) {
    return (
      <motion.div 
        className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onToggle}
      >
        <motion.div
          className="w-full max-w-2xl mt-20 mx-4 bg-dark-gray rounded-lg shadow-xl overflow-hidden"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
          ref={searchRef}
        >
          <div className="p-4 flex items-center border-b border-medium-gray">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="flex-grow bg-transparent border-none outline-none text-white placeholder-light-gray/50"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-light-gray hover:text-white p-1 rounded-full focus:outline-none"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={onToggle}
              className="ml-2 text-light-gray hover:text-white p-1 rounded-full focus:outline-none"
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Результаты отображаются прямо здесь, без выпадающего меню */}
          {(searchQuery.length > 0 || isLoading) && (
            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-light-gray">Поиск...</p>
                </div>
              ) : hasResults ? (
                <div>
                  <div className="py-2">
                    {displayResults.map((result) => (
                      <Link 
                        key={`${result.type}-${result.id}`} 
                        href={result.url}
                        className="block px-4 py-3 hover:bg-medium-gray/50 transition-colors"
                        onClick={onToggle}
                      >
                        <div className="flex items-start">
                          {result.iconName && (
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-medium-gray flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </span>
                          )}
                          <div>
                            <div className="font-medium">{result.title}</div>
                            {result.description && (
                              <p className="text-light-gray text-sm line-clamp-2 mt-1">{result.description}</p>
                            )}
                            {result.tags && result.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {result.tags.slice(0, 3).map((tag, index) => (
                                  <span 
                                    key={index}
                                    className="inline-flex text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {hasMoreResults && (
                    <div className="border-t border-medium-gray p-4 text-center">
                      <Link 
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        className="text-primary hover:underline"
                        onClick={onToggle}
                      >
                        Показать все результаты ({results.length})
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-light-gray mb-4">Ничего не найдено по запросу &quot;{searchQuery}&quot;</p>
                  <p className="text-sm text-light-gray/70">
                    Попробуйте использовать другие ключевые слова или проверьте правильность написания.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {!searchQuery && !isLoading && (
            <div className="p-6">
              <p className="text-light-gray text-center mb-4">Начните вводить запрос для поиска</p>
              {/* Можно добавить популярные поисковые запросы или категории */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="secondary" size="sm" onClick={() => handleInputChange({ target: { value: 'CRM' } } as React.ChangeEvent<HTMLInputElement>)}>
                  CRM Integration
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleInputChange({ target: { value: 'Document' } } as React.ChangeEvent<HTMLInputElement>)}>
                  Document Automation
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleInputChange({ target: { value: 'AI' } } as React.ChangeEvent<HTMLInputElement>)}>
                  AI Solutions
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  }
  
  // Вариант по умолчанию - обычная строка поиска с выпадающими результатами
  return (
    <div className={cn("relative", className)} ref={searchRef}>
      <div className={cn(
        "relative flex items-center",
        inputFocused ? "ring-2 ring-primary" : ""
      )}>
        <input
          ref={inputRef}
          type="text"
          className="w-full bg-dark-gray border border-medium-gray rounded-lg py-2 pl-10 pr-4 text-white placeholder-light-gray/50 focus:outline-none"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-light-gray hover:text-white"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {renderResults()}
    </div>
  );
}