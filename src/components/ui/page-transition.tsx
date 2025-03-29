'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEnableAnimations } from '@/lib/utils/animation'; // Использование нового хука вместо функции

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const enableAnimations = useEnableAnimations(); // Используем хук вместо функции shouldEnableAnimations
  
  // Добавляем состояние для отслеживания клиентского рендеринга
  const [isMounted, setIsMounted] = useState(false);
  
  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    // Небольшая задержка для уверенности, что все DOM элементы загружены
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Если анимации отключены или компонент не смонтирован на клиенте, 
  // просто отображаем содержимое без анимаций
  if (!enableAnimations || !isMounted) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;