// src/lib/utils/animation.ts
"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useDeviceDetection } from './device-detection';

// Стандартный набор анимаций для входа элементов с улучшенными кривыми анимации
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 }, // Изменено с 0.9 для более тонкой анимации
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Новые улучшенные варианты для сложных анимаций
export const revealVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const slideUpFadeInVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1],
      opacity: { duration: 0.5 },
      scale: { duration: 0.7 }
    }
  }
};

// Хук для выбора вариантов анимации в зависимости от производительности устройства
export function useAdaptiveAnimationVariants(animationType: string) {
  const { isMobile, isLowPerformance } = useDeviceDetection();
  
  // Если устройство с низкой производительностью, используем только простое появление
  if (isLowPerformance) {
    return fadeInVariants;
  }
  
  // Для мобильных устройств используем упрощенные анимации
  if (isMobile) {
    // Даже на мобильных сохраняем разные типы анимаций, но упрощаем их
    switch (animationType) {
      case 'fadeInUp':
      case 'fadeInDown':
        return { 
          ...fadeInVariants,
          transition: { duration: 0.4, ease: "easeOut" }
        };
      case 'fadeInLeft':
      case 'fadeInRight':
        return { 
          ...fadeInVariants,
          transition: { duration: 0.4, ease: "easeOut" }
        };
      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.97 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" }
          }
        };
      case 'fadeIn':
      default:
        return fadeInVariants;
    }
  }
  
  // Для остальных устройств возвращаем соответствующую анимацию
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
    case 'reveal':
      return revealVariants;
    case 'slideUpFadeIn':
      return slideUpFadeInVariants;
    case 'fadeIn':
    default:
      return fadeInVariants;
  }
}

// Улучшенный хук для анимации по скроллу с IntersectionObserver
export function useScrollAnimation(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    visibilityThreshold?: number;
    delayStart?: number;
  } = {}
) {
  const { 
    threshold = 0.3, // Увеличено с 0.1 для более позднего запуска
    rootMargin = '-10% 0px', // Использует проценты вместо пикселей
    triggerOnce = true,
    visibilityThreshold = 0.3, // Минимальный процент видимости для запуска
    delayStart = 0 // Задержка старта анимации в мс
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [visibilityRatio, setVisibilityRatio] = useState(0);
  
  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;
    
    // Состояние для отслеживания запущенного таймера
    let animationTimer: NodeJS.Timeout | null = null;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Обновляем процент видимости
        setVisibilityRatio(entry.intersectionRatio);
        
        // Проверяем достаточную видимость
        const isVisibleEnough = entry.intersectionRatio >= visibilityThreshold;
        
        if (entry.isIntersecting && isVisibleEnough && !hasAnimated) {
          // Если есть задержка, используем setTimeout
          if (delayStart > 0) {
            animationTimer = setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) setHasAnimated(true);
            }, delayStart);
          } else {
            setIsVisible(true);
            if (triggerOnce) setHasAnimated(true);
          }
        } else if (!entry.isIntersecting && !triggerOnce) {
          setIsVisible(false);
          
          // Отменяем таймер, если элемент вышел из области видимости до запуска анимации
          if (animationTimer) {
            clearTimeout(animationTimer);
            animationTimer = null;
          }
        }
      },
      {
        threshold: Array.isArray(threshold) ? threshold : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin,
      }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, [threshold, rootMargin, triggerOnce, visibilityThreshold, hasAnimated, delayStart]);
  
  return { ref, isVisible, visibilityRatio, hasAnimated };
}

// Усовершенствованный хук для отложенной анимации с поддержкой отмены
export function useDelayedAnimation(delay: number = 0, deps: React.DependencyList = []): {
  shouldAnimate: boolean;
  reset: () => void;
} {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Функция сброса анимации
  const reset = useCallback(() => {
    setShouldAnimate(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    // Сбрасываем анимацию при изменении зависимостей
    reset();
    
    // Запускаем анимацию после задержки
    timerRef.current = setTimeout(() => {
      setShouldAnimate(true);
      timerRef.current = null;
    }, delay);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
  
  return { shouldAnimate, reset };
}

// Улучшенная функция для создания staggered анимаций с более естественным распределением
export function createStaggeredAnimations(
  childrenCount: number, 
  options: {
    baseDelay?: number;
    staggerPattern?: 'linear' | 'exponential' | 'random';
    direction?: 'forward' | 'reverse';
    duration?: number;
  } = {}
) {
  const { 
    baseDelay = 0.1, 
    staggerPattern = 'linear', 
    direction = 'forward',
    duration = 0.5
  } = options;
  
  // Вычисляем задержку в зависимости от паттерна
  const getDelay = (index: number): number => {
    const normalizedIndex = direction === 'reverse' ? (childrenCount - 1 - index) : index;
    
    switch (staggerPattern) {
      case 'exponential':
        // Экспоненциальное распределение - начинается быстро, затем замедляется
        return baseDelay * Math.pow(1.2, normalizedIndex);
      case 'random':
        // Случайное распределение в пределах baseDelay * childrenCount
        return baseDelay * normalizedIndex + (Math.random() * baseDelay * 0.5);
      case 'linear':
      default:
        // Линейное распределение
        return baseDelay * normalizedIndex;
    }
  };
  
  return Array.from({ length: childrenCount }).map((_, i) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: getDelay(i),
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      },
    },
  }));
}

// Хук для получения адаптивных настроек анимации в зависимости от устройства
export function useAnimationSettings() {
  const { isMobile, isTablet, isLowPerformance } = useDeviceDetection();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);
  
  // Базовые настройки
  const baseSettings = {
    duration: 0.5,
    staggerChildren: 0.1,
    delayChildren: 0.1,
    reduceMotion: false,
  };
  
  // Настройки с учетом предпочтения уменьшения движения
  if (prefersReducedMotion) {
    return {
      ...baseSettings,
      duration: 0.3,
      staggerChildren: 0.03,
      delayChildren: 0.03,
      reduceMotion: true,
    };
  }
  
  // Настройки для мобильных устройств с низкой производительностью
  if (isMobile && isLowPerformance) {
    return {
      ...baseSettings,
      duration: 0.25,
      staggerChildren: 0.04,
      delayChildren: 0.04,
      reduceMotion: true,
    };
  }
  
  // Настройки для мобильных устройств
  if (isMobile) {
    return {
      ...baseSettings,
      duration: 0.35,
      staggerChildren: 0.06,
      delayChildren: 0.06,
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

// Улучшенный хук для проверки разрешения на анимацию
export function useEnableAnimations(): boolean {
  const { isLowPerformance } = useDeviceDetection();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [savedPreference, setSavedPreference] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Проверяем сохраненные настройки пользователя
      try {
        const saved = localStorage.getItem('enableAnimations');
        if (saved !== null) {
          setSavedPreference(saved === 'true');
        }
      } catch {
        // Игнорируем ошибки localStorage
      }
      
      // Проверяем предпочтения системы
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      
      // Добавляем слушатель для изменения предпочтений
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = (mediaQueryEvent: MediaQueryListEvent) => {
        setPrefersReducedMotion(mediaQueryEvent.matches);
      };
      
      // Добавляем слушатель с учетом разной поддержки браузеров
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        mediaQuery.addListener(handleChange);
      }
      
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);
  
  // Приоритет: сохраненные настройки > системные предпочтения > производительность устройства
  if (savedPreference !== null) {
    return savedPreference;
  }
  
  // Отключаем анимации для устройств с низкой производительностью
  // или если пользователь предпочитает уменьшить движение
  return !isLowPerformance && !prefersReducedMotion;
}

// Улучшенная функция для обратной совместимости - используется вне React-компонентов
export function shouldEnableAnimations(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // Проверяем сохраненные настройки пользователя
    const saved = localStorage.getItem('enableAnimations');
    if (saved !== null) {
      return saved === 'true';
    }
  } catch {
    // Игнорируем ошибки localStorage
  }
  
  // Определяем маломощность устройства без использования хука
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isOldBrowser = 
    /msie\s[1-8]|trident\/[1-6]|edge\/[1-12]/i.test(ua) || 
    /firefox\/[1-50]/i.test(ua) ||
    /chrome\/[1-50]/i.test(ua);
    
  // Улучшенное определение низкой производительности
  // Учитываем RAM и количество ядер процессора, если доступно
  const isLowPerformance = (() => {
    // Базовая проверка на основе старого браузера или маленького экрана
    let isLowPower = isOldBrowser || (isMobile && window.innerWidth < 768);
    
    // Дополнительно проверяем аппаратные возможности
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      isLowPower = true;
    }
    
    // Проверяем deviceMemory, если доступно (только в Chrome)
    // @ts-expect-error - свойство существует только в некоторых браузерах
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
      isLowPower = true;
    }
    
    return isLowPower;
  })();
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Проверяем на низкую производительность и предпочтения по уменьшению движения
  return !isLowPerformance && !prefersReducedMotion;
}

// Новый хук для координации анимаций между компонентами
export function useCoordinatedAnimation(
  id: string, 
  dependencies: React.DependencyList = []
): { 
  canAnimate: boolean; 
  onAnimationComplete: () => void;
} {
  // Глобальный объект для отслеживания анимаций
  // Создаем его при первом использовании
  if (typeof window !== 'undefined' && !window.__animationCoordinator) {
    window.__animationCoordinator = {
      sequences: {},
      register: function(animId: string, sequenceId?: string) {
        if (sequenceId) {
          if (!this.sequences[sequenceId]) {
            this.sequences[sequenceId] = [];
          }
          this.sequences[sequenceId].push(animId);
        }
        return true;
      },
      unregister: function(animId: string, sequenceId?: string) {
        if (sequenceId && this.sequences[sequenceId]) {
          this.sequences[sequenceId] = this.sequences[sequenceId].filter(i => i !== animId);
        }
      },
      canAnimate: function(animId: string, sequenceId?: string) {
        if (!sequenceId) return true;
        
        const sequence = this.sequences[sequenceId] || [];
        return sequence.indexOf(animId) === 0;
      },
      complete: function(animId: string, sequenceId?: string) {
        if (!sequenceId) return;
        
        const sequence = this.sequences[sequenceId] || [];
        const index = sequence.indexOf(animId);
        
        if (index === 0 && sequence.length > 1) {
          this.sequences[sequenceId].shift();
        }
      }
    };
  }
  
  // Состояние для отслеживания разрешения на анимацию
  const [canAnimate, setCanAnimate] = useState(false);
  const sequenceId = useRef<string | undefined>(undefined);
  
  // Определение координатора
  const getCoordinator = () => {
    return typeof window !== 'undefined' ? window.__animationCoordinator : null;
  };
  
  // Обработчик завершения анимации
  const onAnimationComplete = useCallback(() => {
    const coordinator = getCoordinator();
    if (coordinator && sequenceId.current) {
      coordinator.complete(id, sequenceId.current);
    }
  }, [id]);
  
  // Регистрация в координаторе при монтировании и при изменении зависимостей
  useEffect(() => {
    const coordinator = getCoordinator();
    if (!coordinator) return;
    
    // Формируем уникальный ID последовательности на основе зависимостей
    sequenceId.current = dependencies.length > 0 
      ? `seq_${dependencies.join('_')}` 
      : undefined;
    
    // Регистрируем анимацию
    const registered = coordinator.register(id, sequenceId.current);
    if (registered) {
      setCanAnimate(coordinator.canAnimate(id, sequenceId.current));
    }
    
    // Отменяем регистрацию при размонтировании
    return () => {
      coordinator.unregister(id, sequenceId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  // Проверяем, можем ли анимировать при каждом рендере
  useEffect(() => {
    const coordinator = getCoordinator();
    if (coordinator && sequenceId.current) {
      setCanAnimate(coordinator.canAnimate(id, sequenceId.current));
    }
  });
  
  return { canAnimate, onAnimationComplete };
}

// Для TypeScript - глобальное расширение типа Window
declare global {
  interface Window {
    __animationCoordinator?: {
      sequences: Record<string, string[]>;
      register: (id: string, sequenceId?: string) => boolean;
      unregister: (id: string, sequenceId?: string) => void;
      canAnimate: (id: string, sequenceId?: string) => boolean;
      complete: (id: string, sequenceId?: string) => void;
    };
  }
}