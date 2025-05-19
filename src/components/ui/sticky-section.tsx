// src/components/ui/sticky-section.tsx - обновленная версия
"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils/utils';

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
  sectionHeight?: string; // Высота секции (например, '100vh')
  threshold?: number; // Порог для начала анимации (0-1)
  index?: number; // Индекс секции для упорядочивания и отслеживания
  backgroundColor?: string; // Фоновый цвет (может быть градиентом)
}

export default function StickySection({
  children,
  className,
  sectionHeight = '200vh', // Увеличиваем высоту для лучшего эффекта
  threshold = 0.3,
  index = 0,
  backgroundColor
}: StickySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Отслеживаем прокрутку в пределах секции
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Преобразуем прогресс скролла для анимации
  const opacity = useTransform(scrollYProgress, [0, threshold, 0.9, 1], [1, 1, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, threshold, 0.9, 1], [1, 1, 0.95, 0.9]);
  const y = useTransform(scrollYProgress, [0, threshold, 0.9, 1], [0, 0, 30, 60]);
  
  useEffect(() => {
    // Для отладки - логируем инициализацию компонента
    console.log(`Sticky section ${index} initialized with height ${sectionHeight}`);
  }, [index, sectionHeight]);

  
  return (
    <div 
      ref={sectionRef} 
      className={cn("relative", className)}
      style={{
        height: sectionHeight,
        backgroundColor: backgroundColor || 'transparent',
      }}
      data-section-index={index}
    >
      {/* Добавляем класс для отладки */}
      <div 
          className="sticky-element top-0 left-0 w-full overflow-hidden" // Изменяем класс "sticky" на "sticky-element"
         style={{ 
         position: 'sticky', // Явно задаем стиль position: sticky
         height: '100vh',
         zIndex: 10 - index 
      }}
>
        <motion.div
          ref={contentRef}
          className="h-full w-full flex items-center justify-center"
          style={{ 
            opacity,
            scale,
            y
          }}
        >
          {/* Добавляем индикатор секции для отладки */}
          <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded text-sm">
            Section {index}
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
