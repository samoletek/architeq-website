// src/components/ui/hero-search.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import Link from 'next/link';

// Интерфейс для поисковых тегов/категорий
interface SearchTag {
  text: string;
  href: string;
}

// Интерфейс для поисковых подсказок
interface SearchSuggestion {
  text: string;
  highlighted?: string[];
  href: string;
}

const searchTags: SearchTag[] = [
  { text: "Document Automation", href: "/services/documentation" },
  { text: "AI Solutions", href: "/services/ai-solutions" },
  { text: "Business Process", href: "/services/business-process" },
  { text: "CRM Integration", href: "/services/crm-integration" },
  { text: "Financial Process", href: "/services/finance" },
];

const searchSuggestions: { [key: string]: SearchSuggestion[] } = {
  "Document Automation": [
    { 
      text: "Document automation systems", 
      highlighted: ["Document automation"], 
      href: "/services/documentation" 
    },
    { 
      text: "Digital forms and templates", 
      highlighted: ["Digital forms"], 
      href: "/services/documentation" 
    },
  ],
  "AI Solutions": [
    { 
      text: "AI-powered workflow optimization", 
      highlighted: ["AI-powered", "workflow"], 
      href: "/services/ai-solutions" 
    },
    { 
      text: "Machine learning for business", 
      highlighted: ["Machine learning"], 
      href: "/services/ai-solutions" 
    },
  ],
  "Business Process": [
    { 
      text: "How to automate business processes", 
      highlighted: ["automate", "business processes"], 
      href: "/services/business-process" 
    },
    { 
      text: "Business workflow efficiency", 
      highlighted: ["Business workflow"], 
      href: "/services/business-process" 
    },
  ],
  "CRM Integration": [
    { 
      text: "CRM integration solutions", 
      highlighted: ["CRM integration"], 
      href: "/services/crm-integration" 
    },
    { 
      text: "Customer data management", 
      highlighted: ["Customer data"], 
      href: "/services/crm-integration" 
    },
  ],
  "Financial Process": [
    { 
      text: "Financial process optimization", 
      highlighted: ["Financial process"], 
      href: "/services/finance" 
    },
    { 
      text: "Automated invoicing systems", 
      highlighted: ["Automated invoicing"], 
      href: "/services/finance" 
    },
  ],
};

export default function HeroSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Обработчик наведения на поисковую иконку
  const handleSearchHover = () => {
    setIsExpanded(true);
  };

  // Обработчик ухода с поисковой иконки
  const handleSearchLeave = () => {
    setIsExpanded(false);
    setActiveTag(null);
  };

  // Обработчик наведения на тег
  const handleTagHover = (tagName: string) => {
    setActiveTag(tagName);
  };

  // Обработчик ухода с тега
  const handleTagLeave = () => {
    setActiveTag(null);
  };

  // Подсветка ключевых слов в предложении
  const highlightWords = (text: string, wordsToHighlight: string[] = []) => {
    if (wordsToHighlight.length === 0) return <span>{text}</span>;

    const regex = new RegExp(`(${wordsToHighlight.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => {
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

  // Установка фокуса при расширении
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isExpanded]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={handleSearchHover}
      onMouseLeave={handleSearchLeave}
    >
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? "280px" : "44px",
          height: "44px",
          borderRadius: isExpanded ? "0.375rem" : "9999px"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center bg-dark-gray/60 backdrop-blur-sm shadow-sm border border-primary/20 overflow-hidden"
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
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className={cn(
            "w-full bg-transparent border-none outline-none text-white text-lg py-2 pr-3 transition-all",
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        />
      </motion.div>

      {/* Выпадающие подсказки */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-2 bg-dark-gray/80 backdrop-blur-md border border-primary/20 rounded-md overflow-hidden shadow-depth-3 z-50"
          >
            {/* Поисковые теги */}
            <div className="p-3 grid grid-cols-2 gap-2">
              {searchTags.slice(0, 4).map((tag, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => handleTagHover(tag.text)}
                  onMouseLeave={handleTagLeave}
                  className="relative"
                >
                  <Link 
                    href={tag.href}
                    className={cn(
                      "block px-3 py-2 text-center text-sm font-medium rounded-md",
                      "bg-secondary text-black shadow-sm hover:shadow-neon-green-glow transition-all",
                    )}
                  >
                    {tag.text}
                  </Link>
                  
                  {/* Подсказки при наведении на тег */}
                  <AnimatePresence>
                    {activeTag === tag.text && searchSuggestions[tag.text] && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-64 mt-1 z-10 bg-dark-gray/90 backdrop-blur-md border border-primary/20 rounded-md shadow-md"
                      >
                        {searchSuggestions[tag.text].map((suggestion, idx) => (
                          <Link
                            key={idx}
                            href={suggestion.href}
                            className="block px-3 py-2 text-white hover:bg-primary/10 transition-colors"
                          >
                            {highlightWords(suggestion.text, suggestion.highlighted)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}