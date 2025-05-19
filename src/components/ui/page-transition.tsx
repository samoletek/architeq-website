// src/components/ui/page-transition.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'slideUp' | 'slideDown';
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className,
  variant = 'fade'
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    // Небольшая задержка для уверенности, что все DOM элементы загружены
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Определяем варианты анимации
  const getAnimationVariants = () => {
    switch (variant) {
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        };
      case 'slideDown':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 }
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

  // Если компонент не смонтирован на клиенте, просто возвращаем контент без анимации
  if (!isMounted) {
    return <div className={className}>{children}</div>;
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