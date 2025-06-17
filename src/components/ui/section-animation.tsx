// src/components/ui/section-animation.tsx
"use client";

import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { shouldEnableAnimations } from '@/lib/utils/animation';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale';

// Глобальная очередь анимаций для координации между секциями
const animationQueue = {
  activeAnimations: 0,
  maxConcurrent: 2, // Максимальное число одновременных анимаций
  queue: [] as (() => void)[],
  
  // Добавить анимацию в очередь
  enqueue(animationFn: () => void) {
    if (this.activeAnimations < this.maxConcurrent) {
      this.activeAnimations += 1;
      animationFn();
    } else {
      this.queue.push(animationFn);
    }
  },
  
  // Уведомить о завершении анимации и запустить следующую
  dequeue() {
    this.activeAnimations = Math.max(0, this.activeAnimations - 1);
    if (this.queue.length > 0 && this.activeAnimations < this.maxConcurrent) {
      const nextAnimation = this.queue.shift();
      if (nextAnimation) {
        this.activeAnimations += 1;
        nextAnimation();
      }
    }
  }
};

interface SectionAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
  duration?: number;
  once?: boolean;
  threshold?: number;
  visibilityThreshold?: number; // Минимальный процент видимости для запуска
  rootMargin?: string;
  stagger?: boolean;
  staggerChildren?: number;
  staggerDirection?: 'forward' | 'reverse';
  customVariants?: {
    hidden: Variant;
    visible: Variant;
  };
  disabled?: boolean;
  waitForPrevious?: boolean; // Ждать завершения предыдущих анимаций
}

export function SectionAnimation({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  visibilityThreshold = 0.3, // Минимальный процент видимости (30%)
  rootMargin = '-10% 0px', // Изменено с -50px для относительного отступа
  stagger = false,
  staggerChildren = 0.1,
  staggerDirection = 'forward',
  customVariants,
  disabled = false,
  waitForPrevious = false
}: SectionAnimationProps) {
  const { isMobile, isLowPerformance } = useDeviceDetection();
  const controls = useAnimation();
  
  // Улучшенный IntersectionObserver с повышенным threshold
  const [ref, inView, entry] = useInView({
    triggerOnce: once,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Больше точек для определения процента видимости
    rootMargin
  });
  
  // Проверяем, должна ли анимация быть включена
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Состояние для отслеживания клиентского рендеринга
  const [isMounted, setIsMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Отслеживание предыдущего состояния видимости для детектирования входа в область видимости
  const prevInViewRef = useRef(false);
  
  // Задержка для предотвращения мигания при гидратации
  useEffect(() => {
    // Убираем задержку для предотвращения FOUC
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    // Проверяем настройки пользователя для анимаций
    setAnimationsEnabled(shouldEnableAnimations());
    
    // Если отключено принудительно через props или настройки
    // пользователя или устройство с низкой производительностью,
    // немедленно показываем контент
    if (disabled || isLowPerformance || !animationsEnabled) {
      controls.set("visible");
      return;
    }
    
    // Проверка процента видимости элемента
    const visibilityRatio = entry?.intersectionRatio || 0;
    const isVisibleEnough = visibilityRatio >= visibilityThreshold;
    
    // Если элемент достаточно виден и не анимировался ранее
    if (inView && isVisibleEnough && !hasAnimated) {
      // Функция для запуска анимации
      const startAnimation = () => {
        // Используем задержку из пропсов
        setTimeout(() => {
          controls.start("visible").then(() => {
            // Уведомляем очередь о завершении анимации
            if (waitForPrevious) {
              animationQueue.dequeue();
            }
          });
          setHasAnimated(true);
        }, delay * 1000);
      };
      
      // Если настроено ожидание предыдущих анимаций
      if (waitForPrevious) {
        animationQueue.enqueue(startAnimation);
      } else {
        startAnimation();
      }
    }
    
    // Запоминаем текущее состояние для следующей проверки
    prevInViewRef.current = inView;
    
  }, [controls, inView, entry, disabled, isLowPerformance, 
      animationsEnabled, hasAnimated, visibilityThreshold, 
      delay, waitForPrevious]);
  
  // Упрощаем анимации на мобильных устройствах
  const actualDuration = isMobile ? Math.min(duration, 0.4) : duration;
  
  // Определяем начальное смещение в зависимости от направления
  const getInitialOffset = () => {
    const offset = isMobile ? 20 : 30; // Уменьшено с 40 до 30 для более тонкой анимации
    switch (direction) {
      case 'up': return { opacity: 0, y: offset };
      case 'down': return { opacity: 0, y: -offset };
      case 'left': return { opacity: 0, x: offset };
      case 'right': return { opacity: 0, x: -offset };
      case 'scale': return { opacity: 0, scale: 0.96 }; // Изменено с 0.94 для более тонкой анимации
      case 'none': return { opacity: 0 };
      default: return { opacity: 0, y: offset };
    }
  };
  
  // Используем пользовательские варианты или создаем стандартные
  const variants = customVariants || {
    hidden: getInitialOffset(),
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: { 
        duration: actualDuration, 
        delay: 0, // Задержка обрабатывается в useEffect для лучшей координации
        ease: [0.25, 0.1, 0.25, 1], // Улучшенная кривая анимации для более естественного движения
        ...(stagger && {
          staggerChildren,
          staggerDirection: staggerDirection === 'forward' ? 1 : -1,
          delayChildren: 0 // Задержка обрабатывается отдельно
        })
      }
    }
  };
  
  // Добавляем индикатор загрузки для отладки
  const debugMode = false; // Включите для отладки
  
  // Если анимации отключены или компонент не готов, показываем содержимое без анимации
  if (!isMounted || disabled || isLowPerformance || !animationsEnabled) {
    const content = (
      <div className={className}>
        {debugMode && <div className="bg-red-500 text-white p-1 text-xs absolute top-0 right-0 z-50">No Animation</div>}
        {children}
      </div>
    );
    
    // Добавляем небольшую задержку для предотвращения "прыжков" при гидратации
    if (!isMounted) {
      return <div className={className}>{children}</div>;
    }
    
    return content;
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {debugMode && (
        <div className={`p-1 text-xs absolute top-0 right-0 z-50 ${hasAnimated ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {hasAnimated ? 'Animated' : 'Waiting'} - {Math.round((entry?.intersectionRatio || 0) * 100)}%
        </div>
      )}
      {children}
    </motion.div>
  );
}

// Анимированный контейнер с анимацией stagger для дочерних элементов
export function AnimatedContainer({
  children,
  className,
  staggerTime = 0.1,
  ...props
}: Omit<SectionAnimationProps, 'staggerChildren'> & { staggerTime?: number }) {
  // Состояние для отслеживания клиентского рендеринга
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Убираем задержку для предотвращения FOUC
    setIsMounted(true);
  }, []);
  
  // Если компонент не смонтирован, показываем статический контент
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <SectionAnimation
      stagger={true}
      staggerChildren={staggerTime}
      className={className}
      {...props}
    >
      {children}
    </SectionAnimation>
  );
}

// Анимированный элемент для использования внутри AnimatedContainer
export function AnimatedItem({
  children,
  className,
  direction = 'up',
  duration = 0.4,
}: {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  duration?: number;
}) {
  // Состояние для отслеживания клиентского рендеринга
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Небольшая задержка для предотвращения мигания при гидратации
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Определяем начальное смещение в зависимости от направления
  const getItemOffset = () => {
    const offset = 20;
    switch (direction) {
      case 'up': return { opacity: 0, y: offset };
      case 'down': return { opacity: 0, y: -offset };
      case 'left': return { opacity: 0, x: offset };
      case 'right': return { opacity: 0, x: -offset };
      case 'scale': return { opacity: 0, scale: 0.95 };
      case 'none': return { opacity: 0 };
      default: return { opacity: 0, y: offset };
    }
  };
  
  const itemVariants = {
    hidden: getItemOffset(),
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: { 
        duration, 
        ease: [0.25, 0.1, 0.25, 1] // Улучшенная кривая анимации
      }
    }
  };
  
  // Если компонент не смонтирован, показываем статический контент
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div 
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}