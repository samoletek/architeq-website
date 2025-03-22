// src/components/ui/cards/case-card.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

interface CaseCardProps {
  title: string;
  description: string;
  industry: string;
  company: string;
  results: string[];
  image: string;
  tags: string[];
  href: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CaseCard({
  title,
  description,
  industry,
  company,
  results,
  image,
  tags,
  href,
  className,
  style
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Создаем уникальный градиент на основе названия компании
  const generateGradient = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hash * 2) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 60%, 20%) 0%, hsl(${hue2}, 70%, 15%) 100%)`;
  };

  return (
    <Link href={href}>
      <motion.div
        className={cn(
          'bg-dark-gray rounded-xl overflow-hidden h-full border border-transparent',
          'hover:border-primary/30 transition-all duration-300 flex flex-col',
          isHovered ? 'shadow-neon-glow -translate-y-1' : '',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        style={style}
      >
        {/* Верхняя часть с визуализацией */}
        <div className="relative h-[200px]">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ 
              background: generateGradient(company),
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-white/80 mb-2">{company.charAt(0)}</div>
              <div className="text-xs uppercase tracking-wider text-white/60">{industry}</div>
            </div>
          </div>
          
          {/* Теги */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Название внизу изображения */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-gray to-transparent">
            <h3 className="text-xl font-sans font-semibold text-white">{title}</h3>
          </div>
        </div>
        
        {/* Информация о кейсе */}
        <div className="p-6 flex-grow flex flex-col">
          <p className="text-light-gray text-sm mb-4">{company} • {industry}</p>
          <p className="text-light-gray mb-4">{description}</p>
          
          {/* Результаты */}
          <div className="mt-auto">
            <h4 className="text-sm font-semibold mb-2 text-primary">Key Results:</h4>
            <ul className="text-sm text-light-gray space-y-1">
              {results.slice(0, 2).map((result, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Кнопка "Подробнее" */}
          <div className="mt-4 flex items-center text-primary font-medium text-sm">
            View Case Study
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
      </motion.div>
    </Link>
  );
}