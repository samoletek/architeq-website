// src/components/ui/cards/case-card.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { storage } from '@/lib/utils/common';
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
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Анимационные варианты для карточек
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

  // Уменьшенная высота для мобильных устройств
  const cardHeight = isCompact 
    ? 'auto' 
    : isMobile 
      ? 'min-h-[280px]'
      : 'min-h-[380px] sm:min-h-[420px]';

  const cardContent = (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
      className={cn(
        'bg-dark-gray rounded-xl overflow-hidden border',
        'transition-all duration-300 flex flex-col relative',
        'case-card-enhanced',
        isHovered ? 'case-card-hovered' : '',
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
      {/* Зеленые пятна свечения снизу */}
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

      {/* Теги - ОТОБРАЖАЮТСЯ ЕСЛИ ЕСТЬ */}
      <div className={cn(
        "relative z-10",
        isMobile ? "pt-2 px-3 pb-2" : "pt-4 px-6 pb-4"
      )}>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Контент */}
      <div className={cn(
        "flex-grow z-10",
        isMobile ? "pl-3 pr-4 py-2" : "pl-6 pr-6 py-4"
      )}>
        {/* ЗАГОЛОВОК - КАК В ФИОЛЕТОВОЙ КАРТОЧКЕ */}
        <h3 className={cn(
          "font-semibold text-white leading-tight",
          isMobile ? "text-base mb-2" : "text-xl mb-4"  // КАК В CONTACT КАРТОЧКЕ!
        )}>
          {title}
        </h3>

        {/* ОПИСАНИЕ - КАК В ФИОЛЕТОВОЙ КАРТОЧКЕ */}
        {description && !isCompact && (
          <p className={cn(
            "text-light-gray line-clamp-3 leading-relaxed transition-colors duration-300",
            isMobile ? "text-xs mb-2" : "text-sm mb-4",  // КАК В CONTACT КАРТОЧКЕ!
            isHovered ? "text-white" : "text-light-gray"
          )}>
            {description}
          </p>
        )}

        {/* KEY RESULTS - ЗЕЛЕНЫЕ ЦВЕТА */}
        {results && results.length > 0 && !isCompact && (
          <div className={cn(
            isMobile ? "mb-2" : "mb-4"
          )}>
            <h4 className={cn(
              "font-semibold text-secondary",  // ЗЕЛЕНЫЙ ЦВЕТ!
              isMobile ? "text-xs mb-1" : "text-sm mb-3"
            )}>
              Key Results:
            </h4>
            <ul className="space-y-1.5">
              {results.slice(0, isMobile ? 2 : 3).map((result, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary mr-2 mt-1 flex-shrink-0 text-sm">•</span>  {/* ЗЕЛЕНЫЙ ЦВЕТ! */}
                  <span className={cn(
                    "leading-relaxed transition-colors duration-300",
                    isMobile ? "text-xs" : "text-xs",
                    isHovered ? "text-white" : "text-light-gray"
                  )} 
                  dangerouslySetInnerHTML={{ 
                    __html: result.replace(/(\d+(?:-\d+)?%|\d+x|\d+\.\d+x|\d+ times)/g, '<span class="text-secondary">$1</span>')  // ЗЕЛЕНЫЙ ЦВЕТ!
                  }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer - КАК В ФИОЛЕТОВОЙ КАРТОЧКЕ */}
      <div className={cn(
        "border-t border-medium-gray/40 mt-auto z-10 flex-shrink-0",
        isMobile ? "px-3 pb-3 pt-2" : "px-6 pb-4 pt-4"
      )}>
        <p className={cn(
          "text-white flex items-center",
          isMobile ? "text-xs mb-1" : "text-sm mb-2"
        )}>
          <span className="text-light-gray flex-shrink-0 mr-2">Company:</span>
          <span className="font-medium truncate">{company}</span>
        </p>

        {(location || industry) && (
          <p className={cn(
            "text-white/80 flex items-center",
            isMobile ? "text-xs" : "text-sm"
          )}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-secondary flex-shrink-0"
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