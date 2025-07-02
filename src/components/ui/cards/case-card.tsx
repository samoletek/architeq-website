// src/components/ui/cards/case-card.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { storage } from '@/lib/utils/common';
import TravelingBorderGlow from '@/components/ui/effects/traveling-border-glow';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface CaseCardProps {
  id?: string;
  title: string;
  description?: string;
  industry?: string;
  company: string;
  location?: string;
  results?: string[];
  image?: string;
  tags?: string[];
  href: string;
  className?: string;
  isCompact?: boolean;
  priority?: boolean;
  onClick?: () => void;
  index?: number;
  isVisible?: boolean;
}

// Простая статичная карточка для мобильных устройств
function SimpleMobileCard({
  id,
  title,
  description,
  company,
  location,
  industry,
  results,
  tags,
  href,
  onClick
}: CaseCardProps) {
  // Простое сохранение в историю без useEffect
  const handleClick = () => {
    if (id && typeof window !== 'undefined') {
      try {
        const recentlyViewed = storage.get<string[]>('recentlyViewedCases', []);
        const filteredHistory = recentlyViewed.filter(caseId => caseId !== id);
        const updatedHistory = [id, ...filteredHistory].slice(0, 10);
        storage.set('recentlyViewedCases', updatedHistory);
      } catch {
        // Игнорируем ошибки localStorage
      }
    }
    if (onClick) onClick();
  };

  const cardContent = (
    <div className="bg-dark-gray rounded-xl border border-gray-600 p-2.5 flex flex-col transition-colors duration-200 hover:border-secondary/30 min-h-fit">
      {/* Теги */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-black/60 text-white text-[9px] px-1 py-0.5 rounded border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Заголовок */}
      <h3 className="text-base font-semibold text-white leading-tight mb-3">
        {title}
      </h3>
      
      {/* Описание */}
      {description && (
        <p className="text-[10px] text-light-gray leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>
      )}
      
      {/* Результаты */}
      {results && results.length > 0 && (
        <div className="mb-3">
          <h4 className="text-[10px] font-semibold text-secondary mb-1">Key Results:</h4>
          <ul className="space-y-0.5">
            {results.slice(0, 2).map((result, index) => (
              <li key={index} className="flex items-start">
                <span className="text-secondary mr-1 text-[10px] flex-shrink-0 mt-0.5">•</span>
                <span 
                  className="text-[10px] text-light-gray leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: result.replace(/(\d+(?:-\d+)?%|\d+x|\d+\.\d+x|\d+ times)/g, '<span class="text-secondary">$1</span>')
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Footer */}
      <div className="border-t border-gray-600 mt-auto pt-2">
        <p className="text-[10px] text-white flex items-center mb-1">
          <span className="text-light-gray mr-1.5 flex-shrink-0">Company:</span>
          <span className="font-medium truncate">{company}</span>
        </p>
        
        {(location || industry) && (
          <p className="text-[10px] text-white/80 flex items-center">
            <svg className="h-2.5 w-2.5 mr-1 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{location || industry}</span>
          </p>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={handleClick} className="w-full text-left">
        {cardContent}
      </button>
    );
  }

  return (
    <Link href={href} onClick={handleClick}>
      {cardContent}
    </Link>
  );
}

// Расширенная карточка для десктопа с анимациями
function EnhancedDesktopCard({
  id,
  title,
  description,
  industry,
  company,
  location,
  results,
  tags,
  href,
  className,
  isCompact,
  onClick,
  index = 0,
  isVisible = true
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Цветовая схема для градиентов
  const greenPalette = ['#B0FF74', '#9AFF6D', '#8BFF50', '#7CFF33'];
  const getHash = (str: string) => str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const getTwoColors = (key: string) => {
    const hash = getHash(key);
    const index1 = hash % greenPalette.length;
    const index2 = (hash * 7) % greenPalette.length;
    return [
      greenPalette[index1],
      greenPalette[index2 === index1 ? (index2 + 1) % greenPalette.length : index2]
    ];
  };
  const getTwoOffsets = (key: string) => {
    const hash = getHash(key);
    return [15 + (hash % 25), 65 + ((hash * 3) % 25)];
  };

  const gradientKey = company + title;
  const [color1, color2] = getTwoColors(gradientKey);
  const [left1, left2] = getTwoOffsets(gradientKey);

  // Сохранение в историю
  useEffect(() => {
    if (id && typeof window !== 'undefined') {
      const handleSaveToHistory = () => {
        try {
          const recentlyViewed = storage.get<string[]>('recentlyViewedCases', []);
          const filteredHistory = recentlyViewed.filter(caseId => caseId !== id);
          const updatedHistory = [id, ...filteredHistory].slice(0, 10);
          storage.set('recentlyViewedCases', updatedHistory);
        } catch {
          // Игнорируем ошибки localStorage
        }
      };

      const linkElement = document.querySelector(`a[href="${href}"]`);
      if (linkElement) {
        linkElement.addEventListener('click', handleSaveToHistory);
        return () => linkElement.removeEventListener('click', handleSaveToHistory);
      }
    }
  }, [id, href]);

  // Анимационные варианты
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1 + index * 0.1
      }
    }
  };

  const cardContent = (
    <TravelingBorderGlow variant="secondary" intensity="subtle" className="rounded-xl group">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        className={cn(
          'bg-dark-gray rounded-xl overflow-hidden border transition-all duration-300 flex flex-col relative',
          'case-card-enhanced min-h-[400px]',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Анимированные пятна свечения */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {[{ color: color1, left: left1 }, { color: color2, left: left2 }].map((spot, spotIndex) => (
          <motion.div
            key={spotIndex}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 0.6 : 0.3, 
              height: isHovered ? 'clamp(260px, 18vh, 320px)' : 'clamp(200px, 14vh, 260px)' 
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: `${spot.left}%`,
              width: 'clamp(180px, 12vh, 240px)',
              transform: 'translate(-50%, 50%)',
              borderRadius: '9999px',
              filter: 'blur(80px)',
              background: `radial-gradient(circle, ${spot.color}FF 0%, transparent 70%)`
            }}
          />
        ))}
      </div>

      {/* Теги */}
      <div className="relative z-10 pt-4 px-5 pb-3">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="flex-grow z-10 px-5 py-3">
        <h3 className="text-lg font-semibold text-white leading-tight mb-3">
          {title}
        </h3>

        {description && !isCompact && (
          <p className={cn(
            "text-xs text-light-gray line-clamp-3 leading-relaxed mb-4 transition-colors duration-300",
            isHovered ? "text-white" : "text-light-gray"
          )}>
            {description}
          </p>
        )}

        {results && results.length > 0 && !isCompact && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-secondary mb-2">Key Results:</h4>
            <ul className="space-y-1">
              {results.slice(0, 3).map((result, resultIndex) => (
                <li key={resultIndex} className="flex items-start">
                  <span className="text-secondary mr-2 mt-0.5 flex-shrink-0 text-sm">•</span>
                  <span className={cn(
                    "text-xs leading-relaxed transition-colors duration-300",
                    isHovered ? "text-white" : "text-light-gray"
                  )} 
                  dangerouslySetInnerHTML={{ 
                    __html: result.replace(/(\d+(?:-\d+)?%|\d+x|\d+\.\d+x|\d+ times)/g, '<span class="text-secondary">$1</span>')
                  }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-medium-gray/40 mt-auto z-10 px-5 py-3">
        <p className="text-xs text-white flex items-center mb-1">
          <span className="text-light-gray flex-shrink-0 mr-2">Company:</span>
          <span className="font-medium truncate">{company}</span>
        </p>

        {(location || industry) && (
          <p className="text-xs text-white/80 flex items-center">
            <svg className="h-4 w-4 mr-2 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{location || industry}</span>
          </p>
        )}
      </div>
    </motion.div>
    </TravelingBorderGlow>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {cardContent}
      </button>
    );
  }

  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  );
}

// Основной компонент с автоматическим выбором версии
export function CaseCard(props: CaseCardProps) {
  const { isMobile } = useDeviceDetection();

  // На мобильных всегда используем простую версию
  if (isMobile) {
    return <SimpleMobileCard {...props} />;
  }

  // На десктопе используем расширенную версию
  return <EnhancedDesktopCard {...props} />;
}

export function CompactCaseCard(props: Omit<CaseCardProps, 'isCompact'>) {
  return <CaseCard {...props} isCompact={true} />;
}