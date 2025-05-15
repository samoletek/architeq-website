// Обновленный файл src/app/search/page.tsx

"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { allCaseStudies } from '@/lib/data/case-studies';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';

// Предопределенные результаты поиска для сервисов
const SERVICES = [
  { id: 'business-process', title: 'Business Process Automation', type: 'service' as const, url: '/services/business-process', description: 'Automate complex business processes by connecting different systems, eliminating manual data entry, and creating workflows.' },
  { id: 'crm-integration', title: 'CRM Integration', type: 'service' as const, url: '/services/crm-integration', description: 'Connect your CRM system with other business tools to create a unified information environment.' },
  { id: 'boxed-solutions', title: 'Boxed Solutions', type: 'service' as const, url: '/services/boxed-solutions', description: 'Industry-specific automation packages that address unique challenges in various sectors.' },
  { id: 'ai-solutions', title: 'AI Solutions', type: 'service' as const, url: '/services/ai-solutions', description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights.' },
  { id: 'documentation', title: 'Documentation', type: 'service' as const, url: '/services/documentation', description: 'Automate document creation, processing, and management to reduce administrative burden.' },
  { id: 'finance', title: 'Financial Systems', type: 'service' as const, url: '/services/finance', description: 'Streamline financial operations by automating invoicing, payment tracking, and reconciliation.' },
];

// Основные страницы
const PAGES = [
  { id: 'home', title: 'Home', type: 'page' as const, url: '/' },
  { id: 'about', title: 'About Us', type: 'page' as const, url: '/about', description: 'Learn about our team, mission, and technology stack.' },
  { id: 'cases', title: 'Case Studies', type: 'page' as const, url: '/cases', description: 'Explore our successful client projects and solutions.' },
  { id: 'contacts', title: 'Contact Us', type: 'page' as const, url: '/contacts', description: 'Get in touch with our team for a consultation.' },
];

// Интерфейс для результатов поиска
interface SearchResult {
  id: string;
  title: string;
  type: 'case' | 'service' | 'page';
  url: string;
  description?: string;
  tags?: string[];
}

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

// Компонент загрузки
function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="ml-4">One moment...</p>
    </div>
  );
}

// Компонент с результатами поиска
// Замените функцию SearchResults, чтобы избежать дублирования props:

function SearchResults({ 
  query, 
  searchResults, 
  isLoading 
}: { 
  query: string, 
  searchResults: SearchResult[], 
  isLoading: boolean 
}) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (searchResults.length > 0) {
    return (
      <div className="space-y-6">
        {searchResults.map((result, index) => (
          <Link 
            key={`${result.type}-${result.id}`}
            href={result.url}
            className="block"
          >
            <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.5,
    delay: index * 0.08,
    ease: [0.25, 0.1, 0.25, 1.0]
  }}
  // Ключевое изменение для мгновенной реакции:
  whileHover={{ 
    y: -10,
    scale: 1.03, 
    boxShadow: "0 0 20px rgba(119, 71, 207, 0.5)",
    transition: {
      // Практически нулевая задержка для мгновенной реакции
      duration: 0.25,  // Быстрее, но сохраняет плавность
      // Специальная кривая с очень быстрым началом
      ease: [0.05, 0.7, 0.1, 1.0],
      // Индивидуальные настройки для каждого свойства
      y: {
        duration: 0.15,  // Ещё быстрее для вертикального движения
        ease: [0, 0.7, 0.2, 1.0]  // Максимально быстрый старт (0)
      },
      scale: {
        duration: 0.2,
        ease: [0, 0.6, 0.1, 1.0]
      }
    }
  }}
  className="bg-[#12071A]/90 rounded-lg p-6 border border-medium-gray hover:border-primary/50 cursor-pointer hover:shadow-neon-glow"
>
              <div className="flex flex-col">
                <div className="mb-1 flex items-center">
                  <span className={cn(
                    "inline-block px-2 py-1 text-xs rounded-full mr-2",
                    result.type === 'case' ? 'bg-primary/10 text-primary' :
                    result.type === 'service' ? 'bg-neon-blue/10 text-neon-blue' :
                    'bg-neon-purple/10 text-neon-purple'
                  )}>
                    {result.type === 'case' ? 'Case Study' : 
                    result.type === 'service' ? 'Service' : 'Page'}
                  </span>
                  <h2 className="text-xl font-semibold">{result.title}</h2>
                </div>
                
                {result.description && (
                  <p className="text-light-gray mt-2">{result.description}</p>
                )}
                
                {result.tags && result.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {result.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-medium-gray text-light-gray text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 text-primary text-sm flex items-center group">
                  <span className="group-hover:text-secondary transition-colors duration-300">View details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 group-hover:text-secondary transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    );
  } 
  
  if (query) {
    return (
      <div className="bg-[#12071A]/90 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Sorry, no results found</h3>
        <p className="text-light-gray mb-6">
          We could not find any content matching: {query}. Please try a different search term or explore our services and case studies.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <Link href="/services">
            <Button variant="secondary">Our Services</Button>
          </Link>
          <Link href="/cases">
            <Button variant="secondary">Case Studies</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Home Page</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#12071A]/90 rounded-lg p-8 text-center">
      <h3 className="text-xl font-semibold mb-4">What are you looking for?</h3>
      <p className="text-light-gray mb-6">
        Try searching for services, case studies, or specific technologies like CRM, Document Automation, or AI.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <Link href="/search?q=CRM">
          <Button variant="secondary">CRM</Button>
        </Link>
        <Link href="/search?q=Document">
          <Button variant="secondary">Document</Button>
        </Link>
        <Link href="/search?q=AI">
          <Button variant="secondary">AI</Button>
        </Link>
      </div>
    </div>
  );
}

// Основной компонент поиска, обернутый в Suspense
function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Обновить состояние поиска при изменении URL
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Функция поиска
  useEffect(() => {
    // Короткая задержка для лучшего UX
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsLoading(false);
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
      const matchingServices = allServices.filter(matches);
      const matchingCases = allCases.filter(matches);
      const matchingPages = allPages.filter(matches);
      
      // Объединяем все результаты, начиная с наиболее релевантных
      const results = [
        ...matchingServices,
        ...matchingCases, 
        ...matchingPages,
      ];
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);

  // Обработчик отправки формы поиска
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Анимация для кнопки "Back to Home" (как в heroSection)
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.0, 
        delay: 0.3,
        ease: "easeOut" 
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок страницы */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {query ? `Search results for "${query}"` : 'Search'}
          </h1>
          {!isLoading && (
            <p className="text-light-gray">
              {searchResults.length} results found
            </p>
          )}
        </motion.div>
        
        {/* Поисковая строка с обновленными стилями */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              {/* 1. Изменен цвет поисковой строки на [#12071A]/80 
                  3. Добавлено свечение поисковой строке в зеленом акцентном цвете */}
              <input
                type="text"
                className="w-full bg-[#12071A]/80 border border-medium-gray rounded-lg py-3 pl-10 pr-20 text-white placeholder-light-gray/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 hover:shadow-neon-green-glow focus:shadow-neon-green-glow"
                placeholder="Search for services, case studies, or technologies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* 4. Иконка поиска со свечением белого цвета */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray group-hover:text-white transition-all duration-300 group-hover:text-shadow-white-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {/* 2. Кнопка Search с анимацией как в hero-section */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <button
                 type="submit"
                 className="bg-secondary text-gray-900 px-4 py-2 rounded-full font-medium h-9 flex items-center justify-center focus:outline-none focus:ring-0 shadow-neon-green-glow hover:shadow-neon-green-glow-intense transition-all duration-300"
                >
                Search
               </button>
              </div>
            </div>
          </form>
        </motion.div>
        
        {/* Популярные теги для поиска */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm text-light-gray mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/search?q=CRM">
              <motion.span 
                className="px-3 py-1 bg-medium-gray hover:bg-medium-gray/80 transition-colors rounded-full text-sm cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(119, 71, 207, 0.2)" }}
              >
                CRM
              </motion.span>
            </Link>
            <Link href="/search?q=Document">
              <motion.span 
                className="px-3 py-1 bg-medium-gray hover:bg-medium-gray/80 transition-colors rounded-full text-sm cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(119, 71, 207, 0.2)" }}
              >
                Document
              </motion.span>
            </Link>
            <Link href="/search?q=AI">
              <motion.span 
                className="px-3 py-1 bg-medium-gray hover:bg-medium-gray/80 transition-colors rounded-full text-sm cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(119, 71, 207, 0.2)" }}
              >
                AI
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Результаты поиска */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SearchResults 
            query={query} 
            searchResults={searchResults} 
            isLoading={isLoading} 
          />
        </motion.div>
        
        {/* 7. и 8. Кнопка "Back to Home" с анимацией и эффектом плавающей кнопки */}
        <motion.div 
          className="fixed bottom-20 right-20 z-50"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          whileHover="hover"
        >
          <Link href="/">
            <Button 
              variant="secondary" 
              className="shadow-neon-green-glow px-6 py-3 text-base font-medium transition-all hover:shadow-neon-green-glow-intense focus:outline-none focus:ring-0"
              >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <SiteLayout>
      <Suspense fallback={<LoadingState />}>
        <SearchPageContent />
      </Suspense>
    </SiteLayout>
  );
}