"use client";

import { useState, useEffect } from 'react';
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

export default function SearchPage() {
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

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Заголовок страницы */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {query ? `Search results for "${query}"` : 'Search'}
            </h1>
            {!isLoading && (
              <p className="text-light-gray">
                {searchResults.length} results found
              </p>
            )}
          </div>
          
          {/* Поисковая строка */}
          <div className="mb-8">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 pl-10 pr-20 text-white placeholder-light-gray/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Search for services, case studies, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Button type="submit" variant="primary" className="h-9">
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Популярные теги для поиска */}
          <div className="mb-8">
            <p className="text-sm text-light-gray mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/search?q=CRM">
                <span className="px-3 py-1 bg-medium-gray hover:bg-medium-gray/80 transition-colors rounded-full text-sm cursor-pointer">
                  CRM Integration
                </span>
              </Link>
              <Link href="/search?q=Document">
                <span className="px-3 py-1 bg-medium-gray hover:bg-medium-gray/80 transition-colors rounded-full text-sm cursor-pointer">
                  Document Automation
                </span>
              </Link>
              <Link href="/search?q=AI">
                <span className="px-3 py-1 bg-medium-gray hover:bg-medium-gray/80 transition-colors rounded-full text-sm cursor-pointer">
                  AI Solutions
                </span>
              </Link>
              <Link href="/search?q=Finance">
                <span className="px-3 py-1 bg-medium-gray hover:bg-medium-gray/80 transition-colors rounded-full text-sm cursor-pointer">
                  Financial Systems
                </span>
              </Link>
            </div>
          </div>

          {/* Состояние загрузки */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="ml-4">One moment...</p>
            </div>
          ) : searchResults.length > 0 ? (
            /* Результаты поиска */
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <motion.div 
                  key={`${result.type}-${result.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-dark-gray rounded-lg p-6 hover:border-primary/30 border border-medium-gray transition-colors"
                >
                  <Link href={result.url} className="block">
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
                      
                      <div className="mt-4 text-primary text-sm flex items-center">
                        <span>View details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
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
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : query ? (
            /* Ничего не найдено */
            <div className="bg-dark-gray rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-light-gray mb-6">
                We could not find any content matching '{query}'. Please try a different search term or explore our services and case studies.
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
          ) : (
            /* Начальное состояние - без запроса */
            <div className="bg-dark-gray rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">What are you looking for?</h3>
              <p className="text-light-gray mb-6">
                Try searching for services, case studies, or specific technologies like 'CRM', 'Document Automation', or 'AI'.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <Link href="/search?q=CRM">
                  <Button variant="secondary">CRM Integration</Button>
                </Link>
                <Link href="/search?q=Document">
                  <Button variant="secondary">Document Automation</Button>
                </Link>
                <Link href="/search?q=AI">
                  <Button variant="secondary">AI Solutions</Button>
                </Link>
              </div>
            </div>
          )}
          
          {/* Кнопка возврата */}
          <div className="mt-8 text-center">
            <Link href="/">
              <Button variant="secondary">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}