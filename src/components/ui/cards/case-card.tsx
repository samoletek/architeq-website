// src/components/ui/cards/case-card.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';

interface CaseCardProps {
  title: string;
  description?: string; // Оставим как необязательный, но не будем использовать
  industry?: string; // Оставим как необязательный, но не будем использовать
  company: string;
  location?: string;
  results?: string[]; // Оставим как необязательный, но не будем использовать
  image?: string; // Оставим как необязательный, но не будем использовать
  tags: string[];
  href: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CaseCard({
  title,
  company,
  location,
  tags,
  href,
  className,
  style
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Создаем градиент только в теплых тонах
  const generateWarmGradient = (name: string) => {
    // Генерируем хеш на основе названия компании
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Выбираем теплые цвета (красный, оранжевый, янтарный)
    // Hue: 0-60 (красные и оранжевые тона)
    const baseHue = hash % 60; // Ограничиваем теплыми цветами
    const hue1 = baseHue;
    const hue2 = (baseHue + 20) % 60; // Смещение для градиента
    
    return `linear-gradient(135deg, 
      hsl(${hue1}, 75%, 35%) 0%, 
      hsl(${hue2}, 85%, 25%) 100%)`;
  };

  return (
    <Link href={href}>
      <motion.div
        className={cn(
          'bg-dark-gray rounded-xl overflow-hidden h-full border border-transparent',
          'hover:border-primary/30 transition-all duration-300 flex flex-col justify-between',
          isHovered ? 'shadow-neon-glow -translate-y-1' : '',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        style={style}
      >
        {/* Верхняя часть с градиентом и тегами */}
        <div 
          className="pt-3 px-3 pb-3 flex flex-wrap gap-2"
          style={{
            background: generateWarmGradient(company)
          }}
        >
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Основной контент (название кейса) */}
        <div className="px-4 py-5 flex-grow">
          {/* Название кейса - увеличенный на один пункт */}
          <h3 className="text-2xl font-sans font-semibold text-white leading-tight">
            {title}
          </h3>
        </div>
        
        {/* Нижняя часть с компанией и локацией */}
        <div className="px-3 pb-3">
          {/* Компания */}
          <p className="text-white text-base flex items-center mb-1">
            <span className="text-light-gray mr-2">Company:</span>
            <span className="font-medium">{company}</span>
          </p>
          
          {/* Локация */}
          {location && (
            <p className="text-white/80 text-base flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1 text-primary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              {location}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}