// src/components/ui/cards/case-card.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { storage } from '@/lib/utils/common';

export interface CaseCardProps {
  id?: string;
  title: string;
  description?: string;
  industry?: string;
  company: string;
  location?: string;
  results?: string[];
  image?: string;
  tags: string[];
  href: string;
  className?: string;
  isCompact?: boolean;
  priority?: boolean;
  onClick?: () => void;
}

const getGradientColorFromString = (str: string): string => {
  // Генерируем хеш на основе названия
  const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Выбираем оттенок из теплой палитры (красный, оранжевый, янтарный)
  // Hue: 0-60 (красные и оранжевые тона)
  const baseHue = hash % 60;
  
  return `hsl(${baseHue}, 80%, 35%)`;
};

export function CaseCard({
  id,
  title,
  description,
  industry,
  company,
  location,
  results,
  image,
  tags,
  href,
  className,
  isCompact = false,
  priority = false,
  onClick
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useDeviceDetection();
  
  // Создаем градиент на основе названия компании
  const startColor = getGradientColorFromString(company);
  const endColor = getGradientColorFromString(company + title);
  const gradientStyle = {
    background: `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`
  };
  
  // Эффект для сохранения просмотренных кейсов
  useEffect(() => {
    if (id && typeof window !== 'undefined') {
      // При клике сохраняем в истории просмотренных
      const handleSaveToHistory = () => {
        const recentlyViewed = storage.get<string[]>('recentlyViewedCases', []);
        
        // Если уже есть в истории, удаляем его (чтобы добавить в начало)
        const filteredHistory = recentlyViewed.filter(caseId => caseId !== id);
        
        // Добавляем текущий кейс в начало списка
        const updatedHistory = [id, ...filteredHistory].slice(0, 10); // Ограничиваем 10 последними
        
        storage.set('recentlyViewedCases', updatedHistory);
      };
      
      // Находим ссылку или элемент
      const linkElement = document.querySelector(`a[href="${href}"]`);
      if (linkElement) {
        linkElement.addEventListener('click', handleSaveToHistory);
        
        return () => {
          linkElement.removeEventListener('click', handleSaveToHistory);
        };
      }
    }
  }, [id, href]);
  
  // Определяем высоту карточки в зависимости от режима
  const cardHeight = isCompact ? 'auto' : 'h-full';
  
  // Основной контент карточки
  const cardContent = (
    <motion.div
      className={cn(
        'bg-dark-gray rounded-xl overflow-hidden border border-transparent',
        'transition-all duration-300 flex flex-col',
        isHovered ? 'border-primary/30 shadow-neon-glow -translate-y-1' : 'shadow-sm',
        cardHeight,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: isMobile ? 0 : -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Верхняя часть с изображением/градиентом и тегами */}
      <div className="relative">
        <div className="pt-3 px-3 pb-3" style={gradientStyle}>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Изображение (если есть) */}
        {image && !isCompact && (
          <div className="h-40 relative">
            <ImageWithFallback
              src={image}
              alt={`${title} - ${company}`}
              fill
              className="w-full"
              category="case"
              priority={priority}
            />
          </div>
        )}
      </div>
      
      {/* Основной контент (название кейса и описание) */}
      <div className="px-4 py-5 flex-grow">
        {/* Название кейса */}
        <h3 className="text-xl font-semibold text-white leading-tight mb-2">
          {title}
        </h3>
        
        {/* Описание (если есть и не в компактном режиме) */}
        {description && !isCompact && (
          <p className="text-light-gray text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}
        
        {/* Результаты (если есть и не в компактном режиме) */}
        {results && results.length > 0 && !isCompact && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-2 text-primary">Результаты:</h4>
            <ul className="text-light-gray text-sm space-y-1">
              {results.slice(0, 2).map((result, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="line-clamp-1">{result}</span>
                </li>
              ))}
              {results.length > 2 && (
                <li className="text-primary text-xs mt-1">+ еще {results.length - 2}</li>
              )}
            </ul>
          </div>
        )}
      </div>
      
      {/* Нижняя часть с компанией и локацией */}
      <div className="px-3 pb-3 border-t border-medium-gray/40 pt-3 mt-auto">
        {/* Компания */}
        <p className="text-white text-sm flex items-center mb-1">
          <span className="text-light-gray mr-2">Компания:</span>
          <span className="font-medium truncate">{company}</span>
        </p>
        
        {/* Локация или индустрия */}
        {(location || industry) && (
          <p className="text-white/80 text-sm flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1 text-primary flex-shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {location ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              )}
            </svg>
            <span className="truncate">{location || industry}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
  
  // Если задан onClick, оборачиваем в button, иначе в Link
  if (onClick) {
    return (
      <button 
        onClick={onClick} 
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
      >
        {cardContent}
      </button>
    );
  }
  
  // По умолчанию оборачиваем в Link
  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  );
}

// Экспортируем компактную версию карточки как отдельный компонент
export function CompactCaseCard(props: Omit<CaseCardProps, 'isCompact'>) {
  return <CaseCard {...props} isCompact={true} />;
}