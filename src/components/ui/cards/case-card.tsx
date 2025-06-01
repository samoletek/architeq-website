// src/components/ui/cards/case-card.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { storage } from '@/lib/utils/common';
import { generateCardTags } from '@/lib/utils/tag-utils';
import { getCaseStudyById } from '@/lib/data/case-studies';

export interface CaseCardProps {
  id?: string;
  title: string;
  description?: string;
  industry?: string;
  company: string;
  location?: string;
  results?: string[];
  image?: string;
  tags?: string[]; // Оставляем для обратной совместимости
  href: string;
  className?: string;
  isCompact?: boolean;
  priority?: boolean;
  onClick?: () => void;
  // Новые пропсы для анимаций как в Services
  index?: number;
  isVisible?: boolean;
}

// Меняем теплую палитру на акцентную зеленую палитру
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
  const [displayTags, setDisplayTags] = useState<string[]>([]);

  const gradientKey = company + title;
  const [color1, color2] = getTwoColors(gradientKey);
  const [left1, left2] = getTwoOffsets(gradientKey);

  // Генерируем теги с помощью новой системы
  useEffect(() => {
    if (id) {
      const caseStudy = getCaseStudyById(id);
      if (caseStudy) {
        const generatedTags = generateCardTags(caseStudy);
        setDisplayTags(generatedTags);
      } else if (tags) {
        setDisplayTags(tags);
      }
    } else if (tags) {
      setDisplayTags(tags);
    }
  }, [id, tags]);

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

  // Анимационные варианты для карточек (из Services)
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

  const cardHeight = isCompact ? 'auto' : 'min-h-[480px]';

  const cardContent = (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
      className={cn(
        'relative group transition-all duration-500 ease-out',
        'bg-dark-gradient rounded-xl p-8',
        'border-2 border-secondary/30 hover:border-secondary/50',
        'hover:transform hover:scale-[1.02] hover:-translate-y-2',
        'h-full overflow-hidden',
        cardHeight,
        className
      )}
      style={{
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 15px rgba(176, 255, 116, 0.25), 0 0 30px rgba(176, 255, 116, 0.15)'
          : '0 1px 30px rgba(0, 0, 0, 0.1), 0 0 18px rgba(176, 255, 116, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Зеленый градиент внизу карточки (из Services) */}
      <div 
        className={`
          absolute inset-x-0 bottom-0 h-20 
          bg-gradient-to-t from-secondary/20 via-secondary/10 to-transparent
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-50'}
        `} 
      />

      {/* Внутреннее свечение при hover (из Services) */}
      <div 
        className={`
          absolute inset-0 rounded-xl 
          bg-gradient-to-br from-secondary/5 via-transparent to-secondary/5
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} 
      />

      {/* Зеленые пятна свечения снизу (твоя оригинальная логика) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {[{ color: color1, left: left1 }, { color: color2, left: left2 }].map((spot, index) => (
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
        ))}
      </div>

      {/* Контент карточки */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* ОБНОВЛЕННЫЕ Теги */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag, index) => (
              <span
                key={index}
                className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Заголовок */}
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-2xl font-bold leading-tight text-white line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Компания и локация */}
        <div className="mb-6 flex-shrink-0">
          <p className="text-white text-xs flex items-center mb-2">
            <span className="text-light-gray mr-2">Company:</span>
            <span className="font-medium truncate">{company}</span>
          </p>

          {(location || industry) && (
            <p className="text-white/80 text-xs flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1 text-secondary flex-shrink-0"
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                )}
              </svg>
              <span className="truncate">{location || industry}</span>
            </p>
          )}
        </div>
        
        {/* Описание - растет по содержимому */}
        <div className="mb-auto flex-grow">
          {description && !isCompact && (
            <p className={cn(
              "leading-relaxed text-base mb-8 line-clamp-4 transition-colors duration-300",
              isHovered ? "text-white" : "text-light-gray"
            )}>
              {description}
            </p>
          )}
          
          {/* Key Results - выравниваются по нижнему краю описания */}
          {results && results.length > 0 && !isCompact && (
            <div className="mt-auto">
              <h4 className="text-base font-semibold mb-4 text-secondary">
                Key Results:
              </h4>
              <ul className="space-y-2">
                {results.slice(0, 3).map((result, rIndex) => (
                  <li key={rIndex} className="flex items-start">
                    <span className="text-secondary mr-3 mt-1 flex-shrink-0 text-lg">
                      •
                    </span>
                    <span 
                      className={cn(
                        "text-sm leading-relaxed transition-colors duration-300",
                        isHovered ? "text-white" : "text-light-gray"
                      )}
                      dangerouslySetInnerHTML={{ 
                        __html: result.replace(/(\d+(?:-\d+)?%|\d+x|\d+\.\d+x|\d+ times)/g, '<span class="text-secondary">$1</span>')
                      }} 
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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