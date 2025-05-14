// src/components/ui/hero-search.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import Link from 'next/link';
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

// Интерфейс для поисковых тегов/категорий
interface SearchTag {
  text: string;
  href: string;
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

const searchTags: SearchTag[] = [
  { text: "Document Automation", href: "/services/documentation" },
  { text: "AI Solutions", href: "/services/ai-solutions" },
  { text: "Business Process", href: "/services/business-process" },
  { text: "CRM Integration", href: "/services/crm-integration" },
  { text: "Financial Process", href: "/services/finance" },
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

export default function HeroSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Инициализируем состояние после монтирования
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Обработчик наведения на поисковую иконку
  const handleSearchHover = () => {
    if (isReady && !isSearchMode) {
      setIsExpanded(true);
    }
  };

  // Обработчик ухода с поисковой иконки
  const handleSearchLeave = () => {
    if (!isSearchMode) {
      // Добавляем задержку для предотвращения мигания
      setTimeout(() => {
        setIsExpanded(false);
      }, 50);
    }
  };

  // Обработчик клика на поисковую строку
  const handleSearchClick = () => {
    setIsSearchMode(true);
    setIsExpanded(true);
    
    if (inputRef.current) {
      inputRef.current.placeholder = "Search...";
      inputRef.current.focus();
    }
  };

  // Обработчик ввода в поисковую строку
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Выполнение поиска при изменении запроса
  useEffect(() => {
    if (!isSearchMode || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    
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
    ].slice(0, 3); // Ограничиваем до 3 результатов
    
    setSearchResults(results);
  }, [searchQuery, isSearchMode]);

  // Функция для очистки поиска
  const clearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery('');
    setSearchResults([]);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Установка фокуса при расширении
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isExpanded]);

  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSearchMode(false);
        if (inputRef.current) {
          inputRef.current.placeholder = "Choose for details ...";
        }
        setSearchQuery('');
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isReady) {
    return (
      <div className="relative h-11 w-11">
        <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-white/80 bg-dark-gray/60 backdrop-blur-sm shadow-sm border border-primary/20 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ minWidth: '44px', minHeight: '44px' }}
      onMouseEnter={handleSearchHover}
      onMouseLeave={handleSearchLeave}
    >
      <motion.div
        initial={{ width: "44px", borderRadius: "9999px" }}
        animate={{
          width: isExpanded ? "400px" : "44px",
          borderRadius: isExpanded ? "0.375rem" : "9999px"
        }}
        layout
        transition={{ 
          type: "spring", 
          stiffness: 350, 
          damping: 25,
          mass: 1,
          bounce: 0.2
        }}
        className="absolute top-0 left-0 flex items-center bg-dark-gray/60 backdrop-blur-sm shadow-sm border border-primary/20 overflow-hidden h-11"
        style={{ willChange: 'width, border-radius' }}
        onClick={handleSearchClick}
      >
        {/* Иконка поиска */}
        <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-white/80">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        {/* Поле ввода */}
        <motion.input
          ref={inputRef}
          type="text"
          placeholder={isSearchMode ? "Search..." : "Choose .."}
          value={searchQuery}
          onChange={handleInputChange}
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
          className="w-full bg-transparent border-none outline-none text-white text-lg py-2 pr-3"
          style={{ 
            pointerEvents: isExpanded ? 'auto' : 'none',
            willChange: 'opacity'
          }}
        />
        
        {/* Кнопка очистки поиска */}
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 text-white/60 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </motion.div>

      {/* Выпадающие подсказки - режим быстрого доступа */}
      <AnimatePresence>
        {isExpanded && !isSearchMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
            transition={{ 
              duration: 0.2,
              delay: 0.05
            }}
            className="absolute top-full left-0 mt-1 bg-dark-gray/80 backdrop-blur-md border border-primary/20 rounded-md overflow-hidden shadow-depth-3 z-50"
            style={{ 
              width: "400px",
              position: 'absolute'
            }}
          >
            {/* Поисковые теги */}
            <div className="p-3 grid grid-cols-2 gap-2">
              {searchTags.slice(0, 4).map((tag, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.2,
                    delay: 0.1 + index * 0.05
                  }}
                >
                  <Link 
                    href={tag.href}
                    className={cn(
                      "block px-2 py-2 text-center text-sm font-medium rounded-md truncate",
                      "bg-secondary text-black shadow-sm hover:shadow-neon-green-glow transition-all",
                      "h-8 flex items-center justify-center"
                    )}
                  >
                    {tag.text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Результаты поиска - режим поиска */}
      <AnimatePresence>
        {isExpanded && isSearchMode && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
            transition={{ 
              duration: 0.2,
              delay: 0.05
            }}
            className="absolute top-full left-0 mt-1 bg-black/90 backdrop-blur-md border border-primary/10 rounded-md overflow-hidden shadow-depth-3 z-50"
            style={{ 
              width: "400px",
              position: 'absolute',
              backgroundColor: 'rgba(16, 10, 32, 0.95)'
            }}
          >
            {/* Результаты поиска в сетке 3x3 */}
            <div className="p-2">
              <div className="grid grid-cols-3 gap-2">
                {searchResults.map((result) => (
                  <Link 
                    key={`${result.type}-${result.id}`} 
                    href={result.url}
                    className="block p-2 hover:bg-primary/10 rounded-md transition-colors text-center"
                    onClick={() => {
                      setIsSearchMode(false);
                      setIsExpanded(false);
                    }}
                  >
                    <div className="text-sm font-medium truncate">{result.title}</div>
                    <div className="text-xs text-white/60 truncate">
                      {result.type === 'case' ? 'Case Study' : 
                       result.type === 'service' ? 'Service' : 'Page'}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ссылка на полный поиск */}
            <div className="p-2 border-t border-primary/10 text-center">
              <Link 
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="text-sm text-primary hover:text-secondary transition-colors"
                onClick={() => {
                  setIsSearchMode(false);
                  setIsExpanded(false);
                }}
              >
                Show all results
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}