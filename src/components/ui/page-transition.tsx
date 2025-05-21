// src/components/ui/page-transition.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'slideUp' | 'slideDown';
  skipInitialTransition?: boolean; // Пропустить анимацию при первой загрузке
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className,
  variant = 'fade',
  skipInitialTransition = true // По умолчанию пропускаем начальную анимацию
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const prevPathRef = useRef<string | null>(null);
  
  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    // Немедленно отмечаем компонент как смонтированный
    // для предотвращения мигания контента
    setIsMounted(true);
    
    // Небольшая задержка, чтобы убедиться, что все DOM элементы загружены и стили применены
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Отслеживаем изменение пути для определения навигации
  useEffect(() => {
    // Если это не первый рендер и путь изменился
    if (prevPathRef.current && prevPathRef.current !== pathname) {
      // Это настоящая навигация, а не первичная загрузка
      setIsInitialRender(false);
    }
    
    // Сохраняем текущий путь для будущего сравнения
    prevPathRef.current = pathname;
  }, [pathname]);

  // Определяем варианты анимации
  const getAnimationVariants = () => {
    switch (variant) {
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -15 }
        };
      case 'slideDown':
        return {
          initial: { opacity: 0, y: -15 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 15 }
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const animationVariants = getAnimationVariants();

  // Если компонент не смонтирован на клиенте или это начальный рендер и мы хотим пропустить анимацию,
  // просто возвращаем контент без анимации
  if (!isMounted || (isInitialRender && skipInitialTransition)) {
    return (
      <div className={cn("min-h-screen", className)} style={{ opacity: 1 }}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={animationVariants.initial}
        animate={animationVariants.animate}
        exit={animationVariants.exit}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1] // Плавная кривая анимации
        }}
        className={cn("min-h-screen", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;