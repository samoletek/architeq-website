"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';

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

  return (
    <Link href={href}>
      <motion.div
        className={cn(
          'bg-dark-gray rounded-xl overflow-hidden h-full border border-transparent',
          'hover:border-primary/30 transition-all duration-300',
          isHovered ? 'shadow-neon-glow -translate-y-1' : '',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Временная заглушка для изображения */}
        <div style={style} className="relative">
          {/* Будет заменено на реальное изображение */}
          {/* <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          /> */}
          
          {/* Градиентная накладка */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-gray to-transparent opacity-70"></div>
          
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
        </div>
        
        {/* Информация о кейсе */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-light-gray text-sm mb-4">{company} • {industry}</p>
          <p className="text-light-gray mb-4">{description}</p>
          
          {/* Результаты */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 text-primary">Key Results:</h4>
            <ul className="text-sm text-light-gray space-y-1">
              {results.slice(0, 2).map((result, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span> {result}
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