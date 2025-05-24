"use client";

import { useEffect, useState, useRef } from 'react';
import { useDeviceDetection } from './device-detection';

// Стандартные варианты анимаций
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

// Выбор анимации по типу и устройству
export function useAdaptiveAnimationVariants(animationType: string) {
  const { isMobile, isLowPerformance } = useDeviceDetection();

  if (isMobile || isLowPerformance) {
    return fadeInVariants;
  }

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

// ✅ Обновлённый хук с visibilityRatio
export function useScrollAnimation({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = false,
  visibilityThreshold = 0.2
}: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  visibilityThreshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibilityRatio, setVisibilityRatio] = useState(0);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        setVisibilityRatio(ratio);

        if (entry.isIntersecting && ratio >= visibilityThreshold) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(currentRef);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin, triggerOnce, visibilityThreshold]);

  return { ref, isVisible, visibilityRatio };
}

// Отложенная анимация
export function useDelayedAnimation(delay: number = 0) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return { shouldAnimate };
}

// Staggered анимации
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

// Настройки анимации в зависимости от устройства
export function useAnimationSettings() {
  const { isMobile, isTablet, isLowPerformance } = useDeviceDetection();

  const baseSettings = {
    duration: 0.5,
    staggerChildren: 0.1,
    delayChildren: 0.1,
    reduceMotion: false,
  };

  if (isMobile && isLowPerformance) {
    return {
      ...baseSettings,
      duration: 0.3,
      staggerChildren: 0.05,
      delayChildren: 0.05,
      reduceMotion: true,
    };
  }

  if (isMobile) {
    return {
      ...baseSettings,
      duration: 0.4,
      staggerChildren: 0.07,
      delayChildren: 0.07,
    };
  }

  if (isTablet) {
    return {
      ...baseSettings,
      duration: 0.45,
      staggerChildren: 0.08,
      delayChildren: 0.08,
    };
  }

  return baseSettings;
}

// Проверка поддержки Web Animations API
export function supportsWebAnimations(): boolean {
  return typeof Element !== 'undefined' && 'animate' in Element.prototype;
}

// Учитываем prefers-reduced-motion
export function useEnableAnimations(): boolean {
  const { isLowPerformance } = useDeviceDetection();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  return !isLowPerformance && !prefersReducedMotion;
}

// Функция вне React для enable check
export function shouldEnableAnimations(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isOldBrowser =
    /msie\s[1-8]|trident\/[1-6]|edge\/[1-12]/i.test(ua) ||
    /firefox\/[1-50]/i.test(ua) ||
    /chrome\/[1-50]/i.test(ua);

  const isLowPerformance = isOldBrowser || (isMobile && window.innerWidth < 768);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return !isLowPerformance && !prefersReducedMotion;
}
