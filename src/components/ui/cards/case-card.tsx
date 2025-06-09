// src/components/ui/cards/case-card.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
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
  tags?: string[];
  href: string;
  className?: string;
  isCompact?: boolean;
  priority?: boolean;
  onClick?: () => void;
  index?: number;
  isVisible?: boolean;
}

// Акцентная зеленая палитра
const greenPalette = ['#B0FF74', '#9AFF6D', '#8BFF50', '#7CFF33', '#6DFF16', '#5EFF00', '#50E000'];

const getHash = (str: string) =>
  str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

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
  const left1 = 10 + (hash % 30);
  const left2 = 60 + ((hash * 3) % 30);
  return [left1, left2];
};

export function CaseCard({
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
  isCompact = false,
  onClick,
  index = 0,
  isVisible = true
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Увеличили порог до 768px для лучшей детекции мобильных
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Дополнительная проверка для отключения эффектов на слабых устройствах
  const shouldDisableEffects = isMobile || 
    (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent));

  const gradientKey = company + title;
  const [color1, color2] = getTwoColors(gradientKey);
  const [left1, left2] = getTwoOffsets(gradientKey);

  useEffect(() => {
    if (id && typeof window !== 'undefined') {
      const handleSaveToHistory = () => {
        const recentlyViewed = storage.get<string[]>('recentlyViewedCases', []);
        const filteredHistory = recentlyViewed.filter(caseId => caseId !== id);
        const updatedHistory = [id, ...filteredHistory].slice(0, 10);
        storage.set('recentlyViewedCases', updatedHistory);
      };

      const linkElement = document.querySelector(`a[href="${href}"]`);
      if (linkElement) {
        linkElement.addEventListener('click', handleSaveToHistory);
        return () => {
          linkElement.removeEventListener('click', handleSaveToHistory);
        };
      }
    }
  }, [id, href]);

  // Анимационные варианты для карточек - только для десктопа
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.1 + index * 0.1
      }
    }
  };

  // Более компактные адаптивные высоты для всех устройств
  const cardHeight = isCompact 
    ? 'auto' 
    : cn(
        // Мобильные устройства
        'min-h-[250px]',
        // Планшеты
        'md:min-h-[300px]',
        // Маленькие ноутбуки
        'lg:min-h-[340px]',
        // Обычные ноутбуки и десктопы
        'xl:min-h-[360px]',
        // Большие экраны (MacBook Pro 15", большие мониторы)
        'wide:min-h-[400px]',
        // Очень большие экраны
        '3xl:min-h-[400px]'
      );

  const cardContent = (
    <motion.div
      initial={shouldDisableEffects ? false : "hidden"}
      animate={shouldDisableEffects ? false : (isVisible ? "visible" : "hidden")}
      variants={shouldDisableEffects ? {} : cardVariants}
      className={cn(
        'bg-dark-gray rounded-xl overflow-hidden border',
        'transition-all duration-300 flex flex-col relative',
        'case-card-enhanced',
        !shouldDisableEffects && isHovered ? 'case-card-hovered' : '',
        cardHeight,
        className
      )}
      style={!shouldDisableEffects ? {
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 15px rgba(176, 255, 116, 0.25), 0 0 30px rgba(176, 255, 116, 0.15)'
          : '0 1px 30px rgba(0, 0, 0, 0.1), 0 0 18px rgba(176, 255, 116, 0.3)',
      } : {}}
      onMouseEnter={!shouldDisableEffects ? () => setIsHovered(true) : undefined}
      onMouseLeave={!shouldDisableEffects ? () => setIsHovered(false) : undefined}
    >
      {/* Зеленые пятна свечения снизу */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {[{ color: color1, left: left1 }, { color: color2, left: left2 }].map((spot, index) => (
          shouldDisableEffects ? (
            // Статичные пятна на мобильных для производительности
            <div
              key={index}
              style={{
                position: 'absolute',
                bottom: 0,
                left: `${spot.left}%`,
                width: `220px`,
                height: '220px',
                opacity: 0.3,
                transform: 'translate(-50%, 50%)',
                borderRadius: '9999px',
                filter: 'blur(100px)',
                mixBlendMode: 'screen',
                background: `
                  radial-gradient(circle, ${spot.color}FF 0%, transparent 60%),
                  radial-gradient(circle, ${spot.color}FF 0%, transparent 50%),
                  radial-gradient(circle, ${spot.color}CC 0%, transparent 70%),
                  radial-gradient(circle, ${spot.color}AA 0%, transparent 80%),
                  radial-gradient(circle, ${spot.color}88 0%, transparent 90%)
                `
              }}
            />
          ) : (
            // Анимированные пятна на десктопе
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isHovered ? 0.9 : 0.3, 
                height: isHovered ? '280px' : '220px' 
              }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: `${spot.left}%`,
                width: `220px`,
                transform: 'translate(-50%, 50%)',
                borderRadius: '9999px',
                filter: 'blur(100px)',
                mixBlendMode: 'screen',
                background: `
                  radial-gradient(circle, ${spot.color}FF 0%, transparent 60%),
                  radial-gradient(circle, ${spot.color}FF 0%, transparent 50%),
                  radial-gradient(circle, ${spot.color}CC 0%, transparent 70%),
                  radial-gradient(circle, ${spot.color}AA 0%, transparent 80%),
                  radial-gradient(circle, ${spot.color}88 0%, transparent 90%)
                `
              }}
            />
          )
        ))}
      </div>

      {/* Теги - более компактные отступы */}
      <div className={cn(
        "relative z-10",
        // Мобильные
        "pt-2 px-3 pb-2",
        // Планшеты
        "md:pt-3 md:px-4 md:pb-3",
        // Ноутбуки
        "lg:pt-3 lg:px-4 lg:pb-3",
        // Большие экраны
        "xl:pt-4 xl:px-5 xl:pb-4",
        "wide:pt-4 wide:px-4 wide:pb-4"
      )}>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={cn(
                  "bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded border border-white/10",
                  // Очень компактные размеры тегов
                  "text-xs",
                  "md:text-xs",
                  "lg:text-xs", 
                  "xl:text-xs",
                  "wide:text-xs"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Контент - более компактные отступы */}
      <div className={cn(
        "flex-grow z-10",
        // Мобильные
        "px-3 py-2",
        // Планшеты
        "md:px-4 md:py-2",
        // Ноутбуки
        "lg:px-4 lg:py-3",
        // Большие экраны
        "xl:px-5 xl:py-3",
        "wide:px-6 wide:py-4"
      )}>
        {/* ЗАГОЛОВОК - очень компактные размеры шрифтов */}
        <h3 className={cn(
          "font-semibold text-white leading-tight mb-2",
          // Мобильные
          "text-xs",
          // Планшеты
          "md:text-sm",
          // Ноутбуки
          "lg:text-base",
          // Обычные десктопы
          "xl:text-base",
          // Большие экраны (MacBook Pro 15", мониторы)
          "wide:text-lg",
          // Очень большие экраны
          "3xl:text-xl"
        )}>
          {title}
        </h3>

        {/* ОПИСАНИЕ - очень компактные размеры */}
        {description && !isCompact && (
          <p className={cn(
            "text-light-gray line-clamp-3 leading-relaxed mb-3",
            // Мобильные
            "text-[10px]",
            // Планшеты
            "md:text-xs",
            // Ноутбуки
            "lg:text-xs",
            // Обычные десктопы
            "xl:text-xs",
            // Большие экраны
            "wide:text-xs",
            // Очень большие экраны
            "3xl:text-xs",
            !shouldDisableEffects && "transition-colors duration-300",
            !shouldDisableEffects && isHovered ? "text-white" : "text-light-gray"
          )}>
            {description}
          </p>
        )}

        {/* KEY RESULTS - очень компактные размеры */}
        {results && results.length > 0 && !isCompact && (
          <div className="mb-3">
            <h4 className={cn(
              "font-semibold text-secondary mb-1.5",
              // Мобильные
              "text-[10px]",
              // Планшеты
              "md:text-xs",
              // Ноутбуки+
              "lg:text-xs",
              "xl:text-xs",
              "wide:text-sm"
            )}>
              Key Results:
            </h4>
            <ul className="space-y-1">
              {results.slice(0, isMobile ? 2 : 3).map((result, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary mr-1.5 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className={cn(
                    "leading-relaxed",
                    // Мобильные
                    "text-[10px]",
                    // Планшеты
                    "md:text-[10px]",
                    // Ноутбуки
                    "lg:text-xs",
                    // Обычные десктопы
                    "xl:text-xs",
                    // Большие экраны
                    "wide:text-xs",
                    // Очень большие экраны
                    "3xl:text-sm",
                    !shouldDisableEffects && "transition-colors duration-300",
                    !shouldDisableEffects && isHovered ? "text-white" : "text-light-gray"
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

      {/* Footer - очень компактные размеры */}
      <div className={cn(
        "border-t border-medium-gray/40 mt-auto z-10 flex-shrink-0",
        // Мобильные
        "px-3 pb-2 pt-2",
        // Планшеты
        "md:px-4 md:pb-3 md:pt-3",
        // Ноутбуки и выше
        "lg:px-4 lg:pb-3 lg:pt-3",
        "xl:px-5",
        "wide:px-6"
      )}>
        <p className={cn(
          "text-white flex items-center mb-1",
          // Мобильные
          "text-[10px]",
          // Планшеты и выше
          "md:text-xs",
          "lg:text-xs",
          "xl:text-xs",
          "wide:text-xs"
        )}>
          <span className="text-light-gray flex-shrink-0 mr-2">Company:</span>
          <span className="font-medium truncate">{company}</span>
        </p>

        {(location || industry) && (
          <p className={cn(
            "text-white/80 flex items-center",
            // Мобильные
            "text-[10px]",
            // Планшеты и выше
            "md:text-xs",
            "lg:text-xs", 
            "xl:text-xs",
            "wide:text-xs"
          )}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1.5 text-secondary flex-shrink-0"
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
            </svg>
            <span className="truncate">{location || industry}</span>
          </p>
        )}
      </div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-secondary rounded-xl"
      >
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

export function CompactCaseCard(props: Omit<CaseCardProps, 'isCompact'>) {
  return <CaseCard {...props} isCompact={true} />;
}