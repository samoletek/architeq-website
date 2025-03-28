// src/lib/utils/animation.ts
import { useEffect, useState, useRef } from 'react';
import { useDeviceDetection } from './device-detection';

// Стандартный набор анимаций для входа элементов
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const fadeInDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

export const fadeInRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Функция для выбора вариантов анимации в зависимости от производительности устройства
export function getAdaptiveAnimationVariants(animationType: string) {
  const { isMobile, isLowPerformance } = useDeviceDetection();
  
  // Для мобильных устройств или устройств с низкой производительностью 
  // используем более простые анимации
  if (isMobile || isLowPerformance) {
    // Возвращаем только fade in для всех типов
    return fadeInVariants;
  }
  
  // Для других устройств возвращаем соответствующую анимацию
  switch (animationType) {
    case 'fadeInUp':
      return fadeInUpVariants;
    case 'fadeInDown':
      return fadeInDownVariants;
    case 'fadeInLeft':
      return fadeInLeftVariants;
    case 'fadeInRight':
      return fadeInRightVariants;
    case 'scaleIn':
      return scaleInVariants;
    case 'fadeIn':
    default:
      return fadeInVariants;
  }
}

// Хук для анимации по скроллу с IntersectionObserver
export function useScrollAnimation(threshold: number = 0.1, rootMargin: string = '0px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Отключаем observer после первого срабатывания
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin]);
  
  return { ref, isVisible };
}

// Хук для отложенной анимации (с задержкой)
export function useDelayedAnimation(delay: number = 0): {
  shouldAnimate: boolean;
} {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return { shouldAnimate };
}

// Функция для создания staggered анимаций (последовательные анимации для списков)
export function createStaggeredAnimations(childrenCount: number, baseDelay: number = 0.1) {
  return Array.from({ length: childrenCount }).map((_, i) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: baseDelay * i,
        duration: 0.5,
      },
    },
  }));
}

// Адаптивные настройки анимации в зависимости от устройства
export function getAnimationSettings() {
  const { isMobile, isTablet, isDesktop, isLowPerformance } = useDeviceDetection();
  
  // Базовые настройки
  const baseSettings = {
    duration: 0.5,
    staggerChildren: 0.1,
    delayChildren: 0.1,
    reduceMotion: false,
  };
  
  // Настройки для мобильных устройств с низкой производительностью
  if (isMobile && isLowPerformance) {
    return {
      ...baseSettings,
      duration: 0.3,
      staggerChildren: 0.05,
      delayChildren: 0.05,
      reduceMotion: true,
    };
  }
  
  // Настройки для мобильных устройств
  if (isMobile) {
    return {
      ...baseSettings,
      duration: 0.4,
      staggerChildren: 0.07,
      delayChildren: 0.07,
    };
  }
  
  // Настройки для планшетов
  if (isTablet) {
    return {
      ...baseSettings,
      duration: 0.45,
      staggerChildren: 0.08,
      delayChildren: 0.08,
    };
  }
  
  // Вернуть базовые настройки для десктопов (или по умолчанию)
  return baseSettings;
}

// Упрощенная функция проверки поддержки Web Animations API
export function supportsWebAnimations(): boolean {
  return typeof Element !== 'undefined' && 'animate' in Element.prototype;
}

// Проверка разрешения на анимацию (учитывает prefers-reduced-motion)
export function shouldEnableAnimations(): boolean {
  if (typeof window === 'undefined') return false;
  
  const { isLowPerformance } = useDeviceDetection();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Отключаем анимации для устройств с низкой производительностью
  // или если пользователь предпочитает уменьшить движение
  return !isLowPerformance && !prefersReducedMotion;
}