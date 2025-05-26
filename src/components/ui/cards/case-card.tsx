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
  tags: string[];
  href: string;
  className?: string;
  isCompact?: boolean;
  priority?: boolean;
  onClick?: () => void;
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
  onClick
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

  // Уменьшенная высота для мобильных устройств
  const cardHeight = isCompact 
    ? 'auto' 
    : isMobile 
      ? 'min-h-[280px]' // Уменьшено с 380px до 280px для мобильных
      : 'min-h-[380px] sm:min-h-[420px]';

  const cardContent = (
    <motion.div
      className={cn(
        'bg-dark-gray rounded-xl overflow-hidden border',
        'transition-all duration-300 flex flex-col relative',
        'case-card-enhanced',
        isHovered ? 'case-card-hovered' : '',
        cardHeight,
        className
      )}
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

      {/* Теги - уменьшенные отступы для мобильных */}
      <div className={cn(
        "relative z-10",
        isMobile ? "pt-2 px-3 pb-2" : "pt-5 px-4 pb-5"
      )}>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "bg-black/60 backdrop-blur-sm text-white rounded-md border border-white/10",
                isMobile ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-0.5 sm:py-1"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Контент - уменьшенные отступы для мобильных */}
      <div className={cn(
        "flex-grow z-10",
        isMobile ? "pl-3 pr-4 py-2" : "pl-6 pr-8 py-5"
      )}>
        <h3 className={cn(
          "font-semibold text-white leading-tight",
          isMobile ? "text-base mb-2" : "text-2xl mb-6"
        )}>
          {title}
        </h3>

        {description && !isCompact && (
          <p className={cn(
            "text-light-gray line-clamp-3",
            isMobile ? "text-xs mb-2" : "text-md mb-3"
          )}>
            {description}
          </p>
        )}

        {results && results.length > 0 && !isCompact && (
          <div className={cn(
            isMobile ? "mb-2" : "mb-5"
          )}>
            <h4 className={cn(
              "font-medium text-secondary",
              isMobile ? "text-xs mb-1" : "text-sm mb-4"
            )}>Key results:</h4>
            <ul className={cn(
              "text-light-gray space-y-0.5",
              isMobile ? "text-xs" : "text-md"
            )}>
              {results.slice(0, isMobile ? 2 : 4).map((result, index) => (
                <li key={index} className="flex items-start">
                  <span className={cn(
                    "text-secondary flex-shrink-0",
                    isMobile ? "mr-1" : "mr-1.5 sm:mr-2"
                  )}>•</span>
                  <span className="line-clamp-1 leading-relaxed" dangerouslySetInnerHTML={{ 
                    __html: result.replace(/(\d+(?:-\d+)?%|\d+x|\d+\.\d+x|\d+ times)/g, '<span class="text-secondary">$1</span>')
                  }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer - уменьшенные отступы для мобильных */}
      <div className={cn(
        "border-t border-medium-gray/40 mt-auto z-10",
        isMobile ? "px-3 pb-3 pt-2" : "px-6 pb-6 pt-4"
      )}>
        <p className={cn(
          "text-white flex items-center",
          isMobile ? "text-xs mb-1" : "text-sm mb-2"
        )}>
          <span className={cn(
            "text-light-gray flex-shrink-0",
            isMobile ? "mr-1" : "mr-1.5 sm:mr-2"
          )}>Company:</span>
          <span className="font-medium truncate">{company}</span>
        </p>

        {(location || industry) && (
          <p className={cn(
            "text-white/80 flex items-center",
            isMobile ? "text-xs" : "text-sm"
          )}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "text-secondary flex-shrink-0",
                isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1 sm:mr-1.5"
              )}
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