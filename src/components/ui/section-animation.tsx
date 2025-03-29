// src/components/ui/section-animation.tsx
"use client";

import { ReactNode, useEffect, useState } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { shouldEnableAnimations } from '@/lib/utils/animation';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale';

interface SectionAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
  duration?: number;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  stagger?: boolean;
  staggerChildren?: number;
  staggerDirection?: 'forward' | 'reverse';
  customVariants?: {
    hidden: Variant;
    visible: Variant;
  };
  disabled?: boolean;
}

export function SectionAnimation({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  threshold = 0.1,
  rootMargin = '0px',
  stagger = false,
  staggerChildren = 0.1,
  staggerDirection = 'forward',
  customVariants,
  disabled = false
}: SectionAnimationProps) {
  const { isMobile, isLowPerformance } = useDeviceDetection();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
    rootMargin
  });
  
  // Проверяем, должна ли анимация быть включена
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Состояние для отслеживания клиентского рендеринга
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Отмечаем, что компонент смонтирован на клиенте
    setIsMounted(true);
    
    // Проверяем настройки пользователя для анимаций
    setAnimationsEnabled(shouldEnableAnimations());
    
    // Если отключено принудительно через props или настройки
    // пользователя или устройство с низкой производительностью,
    // немедленно показываем контент
    if (disabled || isLowPerformance || !animationsEnabled) {
      controls.set("visible");
    } else if (inView) {
      controls.start("visible");
    }
  }, [controls, inView, disabled, isLowPerformance, animationsEnabled]);
  
  // Упрощаем анимации на мобильных устройствах
  const actualDuration = isMobile ? Math.min(duration, 0.4) : duration;
  const actualDelay = isMobile ? Math.min(delay, 0.2) : delay;
  
  // Определяем начальное смещение в зависимости от направления
  const getInitialOffset = () => {
    const offset = isMobile ? 20 : 40;
    switch (direction) {
      case 'up': return { opacity: 0, y: offset };
      case 'down': return { opacity: 0, y: -offset };
      case 'left': return { opacity: 0, x: offset };
      case 'right': return { opacity: 0, x: -offset };
      case 'scale': return { opacity: 0, scale: 0.94 };
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
        delay: actualDelay,
        ease: "easeOut",
        ...(stagger && {
          staggerChildren,
          staggerDirection: staggerDirection === 'forward' ? 1 : -1,
          delayChildren: actualDelay
        })
      }
    }
  };
  
  // Если анимации отключены или это первый серверный рендер, 
  // показываем содержимое без анимации
  if (!isMounted || disabled || isLowPerformance || !animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
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
    setIsMounted(true);
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
        ease: "easeOut" 
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