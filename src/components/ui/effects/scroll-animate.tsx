'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface ScrollAnimateProps {
  children: React.ReactNode;
  className?: string;
  // Тип эффекта появления
  animationType?: 
    'fadeIn' | 
    'fadeInUp' | 
    'fadeInDown' | 
    'fadeInLeft' | 
    'fadeInRight' | 
    'zoomIn' | 
    'slideIn' | 
    'blur' | 
    'none';
  // Задержка анимации (в секундах)
  delay?: number;
  // Продолжительность анимации (в секундах)
  duration?: number;
  // Отступ до активации (в пикселях)
  threshold?: number;
  // Пересечение (в диапазоне от 0 до 1)
  intersectionThreshold?: number;
  // Повторять анимацию при каждом появлении
  repeatOnVisible?: boolean;
  // Реагировать на скроллинг (меняться при прокрутке)
  reactToScroll?: boolean;
  // Дополнительные пользовательские варианты анимации
  customVariants?: Variants;
  // Отступ для срабатывания в формате CSS (например, '200px')
  rootMargin?: string;
  // Однократная анимация
  once?: boolean;
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  className,
  animationType = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 100,
  intersectionThreshold = 0.1,
  repeatOnVisible = false,
  reactToScroll = false,
  customVariants,
  rootMargin = '0px',
  once = true,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isLowPerformance } = useDeviceDetection();

  // Варианты анимаций
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration, delay } },
  };

  const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration, delay } },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration, delay } },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration, delay } },
  };

  const zoomIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration, delay } },
  };

  const slideIn: Variants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { duration, delay } },
  };

  const blurEffect: Variants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      transition: { duration, delay } 
    },
  };

  const noAnimation: Variants = {
    hidden: {},
    visible: {},
  };

  // Выбор варианта анимации
  const getAnimationVariant = (): Variants => {
    if (customVariants) return customVariants;
    
    if (isLowPerformance) return fadeIn; // В случае низкой производительности используем самую простую анимацию
    
    switch (animationType) {
      case 'fadeIn': return fadeIn;
      case 'fadeInUp': return fadeInUp;
      case 'fadeInDown': return fadeInDown;
      case 'fadeInLeft': return fadeInLeft;
      case 'fadeInRight': return fadeInRight;
      case 'zoomIn': return zoomIn;
      case 'slideIn': return slideIn;
      case 'blur': return blurEffect;
      case 'none': return noAnimation;
      default: return fadeIn;
    }
  };

  // Настройка наблюдателя за видимостью элемента
  useEffect(() => {
    if (isLowPerformance && !hasAnimated) {
      // Для устройств с низкой производительностью отображаем элемент сразу
      controls.start('visible');
      setHasAnimated(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    // Создаем наблюдатель
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || repeatOnVisible) {
            controls.start('visible');
            
            // Если анимация должна происходить только один раз, отмечаем флаг
            if (once) {
              setHasAnimated(true);
              // Отключаем наблюдатель после анимации, если это разовая анимация
              observer.unobserve(currentRef);
            }
          }
        } else if (repeatOnVisible && !once) {
          // Сбрасываем анимацию, если элемент пропал из видимости и нужно повторять
          controls.start('hidden');
        }
      },
      {
        threshold: intersectionThreshold,
        rootMargin: rootMargin,
      }
    );

    observer.observe(currentRef);

    // Отключаем наблюдатель при размонтировании
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [controls, hasAnimated, isLowPerformance, intersectionThreshold, once, repeatOnVisible, rootMargin]);

  // Настройка отслеживания скроллинга для интерактивной анимации
  useEffect(() => {
    if (!reactToScroll || isLowPerformance) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Расчет прогресса скроллинга (0 - элемент только появился снизу, 1 - элемент уходит вверх)
      let progress = 1 - (rect.bottom / windowHeight);
      
      // Ограничиваем значения от 0 до 1
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Вызываем один раз для инициализации
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reactToScroll, isLowPerformance]);

  // Стили, зависящие от прогресса скроллинга
  const scrollStyles = reactToScroll && !isLowPerformance
    ? {
        opacity: 1 - scrollProgress * 0.5, // Пример: затухание при прокрутке
        transform: `scale(${1 - scrollProgress * 0.1})`, // Пример: уменьшение при прокрутке
      }
    : {};

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={getAnimationVariant()}
      style={reactToScroll ? scrollStyles : {}}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimate;