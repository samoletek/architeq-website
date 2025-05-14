// src/components/ui/interactive-search.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface SearchSuggestion {
  text: string;
  highlighted?: string[];
  href: string;
}

interface InteractiveSearchProps {
  className?: string;
  suggestions?: SearchSuggestion[];
  autoRotateSuggestions?: boolean;
  rotationSpeed?: number; // в миллисекундах
  onSearch?: (query: string) => void;
}

export default function InteractiveSearch({
  className,
  suggestions = [
    { 
      text: "How to automate business processes", 
      highlighted: ["automate", "business processes"], 
      href: "/services/business-process" 
    },
    { 
      text: "CRM integration solutions", 
      highlighted: ["CRM integration"], 
      href: "/services/crm-integration" 
    },
    { 
      text: "AI-powered workflow optimization", 
      highlighted: ["AI-powered", "workflow"], 
      href: "/services/ai-solutions" 
    },
    { 
      text: "Document automation systems", 
      highlighted: ["Document automation"], 
      href: "/services/documentation" 
    },
    { 
      text: "Financial process optimization", 
      highlighted: ["Financial process"], 
      href: "/services/finance" 
    },
  ],
  autoRotateSuggestions = true,
  rotationSpeed = 3000,
  onSearch
}: InteractiveSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { /* isMobile */ } = useDeviceDetection();

  // Обработка нажатия на Escape для сворачивания поиска
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Автоматическая ротация предложений
  useEffect(() => {
    if (!autoRotateSuggestions || !isExpanded) return;

    const interval = setInterval(() => {
      setActiveSuggestionIndex(prev => 
        prev === suggestions.length - 1 ? 0 : prev + 1
      );
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotateSuggestions, isExpanded, rotationSpeed, suggestions.length]);

  // Фокус на поле ввода при расширении
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Подсветка ключевых слов в предложении
  const highlightWords = (text: string, wordsToHighlight: string[] = []) => {
    if (wordsToHighlight.length === 0) return <span>{text}</span>;

    // Собираем регулярное выражение для всех слов, которые нужно подсветить
    const regex = new RegExp(`(${wordsToHighlight.join('|')})`, 'gi');
    
    // Разбиваем текст на части: подсвеченные и обычные
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => {
          // Проверяем, нужно ли подсветить эту часть
          const shouldHighlight = wordsToHighlight.some(
            word => part.toLowerCase() === word.toLowerCase()
          );
          
          return shouldHighlight ? (
            <span key={i} className="text-secondary font-medium">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </>
    );
  };

  // Обработка отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    // Можно добавить редирект на страницу поиска или другую логику
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative transition-all duration-300",
        isExpanded ? "w-64 md:w-80" : "w-10",
        className
      )}
    >
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? "100%" : "2.5rem",
          height: isExpanded ? "auto" : "2.5rem",
          borderRadius: isExpanded ? "0.5rem" : "9999px"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex items-center bg-dark-gray/70 backdrop-blur-sm border border-primary/20 overflow-hidden"
      >
        {/* Иконка поиска */}
        <motion.button
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (!isExpanded && inputRef.current) {
              setTimeout(() => inputRef.current?.focus(), 300);
            }
          }}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
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
        </motion.button>

        {/* Поле ввода */}
        <form onSubmit={handleSubmit} className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className={cn(
              "w-full bg-transparent border-none outline-none text-white py-2 pr-3 transition-all",
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
        </form>
      </motion.div>

      {/* Выпадающие предложения */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-2 bg-dark-gray/80 backdrop-blur-md border border-primary/20 rounded-md overflow-hidden shadow-neon-glow z-50"
          >
            <div className="py-2 max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <motion.a
                  key={index}
                  href={suggestion.href}
                  initial={{ opacity: 0.6, x: -10 }}
                  animate={{ 
                    opacity: activeSuggestionIndex === index ? 1 : 0.6, 
                    x: activeSuggestionIndex === index ? 0 : -10,
                    backgroundColor: activeSuggestionIndex === index ? 'rgba(119, 71, 207, 0.1)' : 'transparent'
                  }}
                  transition={{ duration: 0.3 }}
                  className="block px-4 py-2 text-white hover:bg-primary/10 transition-colors cursor-pointer"
                  onClick={() => setIsExpanded(false)}
                >
                  {highlightWords(suggestion.text, suggestion.highlighted)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}