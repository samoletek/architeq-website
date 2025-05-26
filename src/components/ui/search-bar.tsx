// src/components/ui/search-bar.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { usePathname } from 'next/navigation';
import { allCaseStudies } from '@/lib/data/case-studies';

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

// Предопределенные результаты поиска
const SERVICES = [
  { id: 'business-process', title: 'Business Process Automation', type: 'service' as const, url: '/services/business-process', description: 'Automate complex business processes by connecting different systems, eliminating manual data entry, and creating workflows.' },
  { id: 'crm-integration', title: 'CRM Integration', type: 'service' as const, url: '/services/crm-integration', description: 'Connect your CRM system with other business tools to create a unified information environment.' },
  { id: 'boxed-solutions', title: 'Boxed Solutions', type: 'service' as const, url: '/services/boxed-solutions', description: 'Industry-specific automation packages that address unique challenges in various sectors.' },
  { id: 'ai-solutions', title: 'AI Solutions', type: 'service' as const, url: '/services/ai-solutions', description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights.' },
  { id: 'documentation', title: 'Documentation', type: 'service' as const, url: '/services/documentation', description: 'Automate document creation, processing, and management to reduce administrative burden.' },
  { id: 'finance', title: 'Financial Systems', type: 'service' as const, url: '/services/finance', description: 'Streamline financial operations by automating invoicing, payment tracking, and reconciliation.' },
];

const PAGES = [
  { id: 'home', title: 'Home', type: 'page' as const, url: '/' },
  { id: 'about', title: 'About Us', type: 'page' as const, url: '/about', description: 'Learn about our team, mission, and technology stack.' },
  { id: 'cases', title: 'Case Studies', type: 'page' as const, url: '/cases', description: 'Explore our successful client projects and solutions.' },
  { id: 'contacts', title: 'Contact Us', type: 'page' as const, url: '/contacts', description: 'Get in touch with our team for a consultation.' },
];

// Функция для преобразования кейсов в результаты поиска
function casesToSearchResults(): SearchResult[] {
  return allCaseStudies.map(cs => ({
    id: cs.id,
    title: cs.title,
    type: 'case',
    url: `/cases/${cs.id}`,
    description: cs.description,
    tags: [cs.solutionType, ...cs.technologies.slice(0, 2)]
  }));
}

export function SearchBar({
  className,
  placeholder = 'Start typing...',
  onSearch,
  isLoading = false,
  isExpanded = false,
  onToggle,
  variant = 'default',
  maxResults = 5
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  
  // Обработка клика вне компонента и скролла
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        if (variant === 'overlay' && isExpanded && onToggle) {
          onToggle();
        }
      }
    };

    const handleScroll = () => {
      if (variant === 'overlay' && isExpanded && onToggle) {
        onToggle();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowResults(false);
        if (variant === 'overlay' && isExpanded && onToggle) {
          onToggle();
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [variant, isExpanded, onToggle]);
  
  // Сброс поиска при изменении маршрута
  useEffect(() => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  }, [pathname]);
  
  // Выполнение поиска при изменении запроса
  useEffect(() => {
    const performSearch = (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      
      const lowerCaseQuery = query.toLowerCase();
      
      // Создаем массив всех доступных данных
      const allCases = casesToSearchResults();
      const allServices = [...SERVICES];
      const allPages = [...PAGES];
      
      // Функция для проверки, соответствует ли элемент запросу
      const matches = (item: SearchResult) => {
        const titleMatch = item.title.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = item.description?.toLowerCase().includes(lowerCaseQuery) || false;
        const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) || false;
        
        return titleMatch || descriptionMatch || tagsMatch;
      };
      
      // Фильтруем и объединяем результаты
      const matchingCases = allCases.filter(matches);
      const matchingServices = allServices.filter(matches);
      const matchingPages = allPages.filter(matches);
      
      // Объединяем все результаты, начиная с наиболее релевантных
      const results = [
        ...matchingServices,
        ...matchingCases, 
        ...matchingPages,
      ].slice(0, 20); // Ограничиваем общее количество результатов
      
      setSearchResults(results);
    };

    performSearch(searchQuery);

    if (onSearch) {
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);
  
  // Обработчик ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };
  
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
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setShowResults(false);
      }
    }, 200);
  };
  
  // Функция для очистки поиска
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    if (onSearch) {
      onSearch('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Функция для установки заданного запроса
  const setSearchTerm = (term: string) => {
    handleInputChange({ target: { value: term } } as React.ChangeEvent<HTMLInputElement>);
  };
  
  // Фильтрация и ограничение результатов
  const displayResults = searchResults.slice(0, maxResults);
  const hasResults = displayResults.length > 0;
  const hasMoreResults = searchResults.length > maxResults;
  
  // Отображение результатов поиска для обычной версии
  const renderResults = () => {
    if (!showResults) return null;
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full mt-2 left-0 right-0 bg-[#12071A] border border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-light-gray">Search...</p>
            </div>
          ) : hasResults ? (
            <div>
              <div className="py-2">
                {displayResults.map((result) => (
                  <Link 
                    key={`${result.type}-${result.id}`} 
                    href={result.url}
                    className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-start">
                      <div className="flex-grow">
                        <div className="font-medium text-white">{result.title}</div>
                        {result.description && (
                          <p className="text-gray-300 text-sm line-clamp-1">{result.description}</p>
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
                <div className="border-t border-gray-600 p-3 text-center">
                  <Link 
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="text-primary text-sm hover:underline"
                    onClick={() => setShowResults(false)}
                  >
                    Show all results
                  </Link>
                </div>
              )}
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="p-4 text-center">
              <p className="text-gray-300">Nothing was found for &quot;{searchQuery}&quot;</p>
              <div className="mt-3">
                <p className="text-sm text-gray-400 mb-2">Try these popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setSearchTerm("CRM")}
                  >
                    CRM Integration
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setSearchTerm("Document")}
                  >
                    Document Automation
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Вариант minimal
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
  
  // Кнопка для overlay когда не развернут
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
  
  // Улучшенный overlay с фиолетовым блюром
  if (variant === 'overlay' && isExpanded) {
    return (
      <div className="fixed inset-0 z-50">
        {/* Фиолетовое затемнение с блюром */}
        <motion.div
          className="fixed inset-0 bg-black/30"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          onClick={onToggle}
        />
        
        {/* Поисковое окно */}
        <div className="fixed inset-0 flex items-start justify-center pointer-events-none">
          <motion.div
            className="w-full max-w-2xl mt-20 mx-4 bg-[#12071A]/95 rounded-lg shadow-2xl border border-purple-500/30 pointer-events-auto"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onClick={(e) => e.stopPropagation()}
            ref={searchRef}
          >
            <div className="p-4 flex items-center border-b border-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="flex-grow bg-transparent border-none outline-none text-white placeholder-gray-400"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoFocus
              />
              <button
                onClick={onToggle}
                className="ml-2 text-gray-400 hover:text-white p-1 rounded-full focus:outline-none transition-colors"
                aria-label="Close search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Результаты поиска */}
            {(searchQuery.length > 0 || isLoading) && (
              <div>
                {isLoading ? (
                  <div className="p-4 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-2 text-gray-300">Search...</p>
                  </div>
                ) : hasResults ? (
                  <div>
                    <div className="py-2">
                      {displayResults.map((result) => (
                        <Link 
                          key={`${result.type}-${result.id}`} 
                          href={result.url}
                          className="block px-4 py-3 hover:bg-gray-700 transition-colors"
                          onClick={onToggle}
                        >
                          <div className="flex items-start">
                            <div>
                              <div className="font-medium text-white">{result.title}</div>
                              {result.description && (
                                <p className="text-gray-300 text-sm line-clamp-2 mt-1">{result.description}</p>
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
                      <div className="border-t border-gray-600 p-4 text-center">
                        <Link 
                          href={`/search?q=${encodeURIComponent(searchQuery)}`}
                          className="text-primary hover:underline"
                          onClick={onToggle}
                        >
                          Show all results ({searchResults.length})
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-300 mb-4">Nothing was found for &quot;{searchQuery}&quot;</p>
                    <p className="text-sm text-gray-400">
                      Try different keywords or check the correct spelling.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Популярные поиски когда нет запроса */}
            {!searchQuery && !isLoading && (
              <div className="p-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setSearchTerm("CRM")}
                  >
                    CRM Integration
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setSearchTerm("Document")}
                  >
                    Document Automation
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setSearchTerm("AI")}
                  >
                    AI Solutions
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
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