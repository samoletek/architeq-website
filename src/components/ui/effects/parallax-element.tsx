'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  // Скорость параллакса (отрицательная для противоположного направления)
  speed?: number;
  // Направление движения: 'vertical' (default) или 'horizontal'
  direction?: 'vertical' | 'horizontal';
  // Максимальное смещение в пикселях
  maxOffset?: number;
  // Тип отслеживания: 'element' следит за положением самого элемента,
  // 'scroll' следит за глобальной прокруткой
  trackType?: 'element' | 'scroll';
  // Непрерывное движение (независимо от скролла)
  continuous?: boolean;
  // Скорость непрерывного движения
  continuousSpeed?: number;
  // Задержка эффекта (плавный старт)
  delay?: number;
  // Базовое смещение в пикселях
  baseOffset?: number;
  // Привязка к скроллу страницы (для абсолютно позиционированных элементов)
  scrollSync?: boolean;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  className,
  speed = 0.5,
  direction = 'vertical',
  maxOffset = 100,
  trackType = 'element',
  continuous = false,
  continuousSpeed = 1,
  delay = 0,
  baseOffset = 0,
  scrollSync = false,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isLowPerformance } = useDeviceDetection();
  
  // Для непрерывного движения
  const [continuousOffset, setContinuousOffset] = useState(0);
  
  // Для отслеживания скролла с Framer Motion
  const { scrollYProgress } = useScroll({
    target: trackType === 'element' ? elementRef : undefined,
    offset: ["start end", "end start"]
  });

  // Трансформация значения скролла в смещение (для обоих направлений)
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? 
      [baseOffset - (maxOffset * speed), baseOffset + (maxOffset * speed)] : 
      [baseOffset, baseOffset]
  );

  const xOffset = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' ? 
      [baseOffset - (maxOffset * speed), baseOffset + (maxOffset * speed)] : 
      [baseOffset, baseOffset]
  );

  // Анимация непрерывного движения
  useEffect(() => {
    if (continuous && !isLowPerformance) {
      let animationFrame: number;
      let startTime: number;

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        
        const elapsedTime = time - startTime;
        const offset = (Math.sin(elapsedTime * 0.001 * continuousSpeed) * maxOffset * 0.3);
        
        setContinuousOffset(offset);
        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [continuous, continuousSpeed, maxOffset, isLowPerformance]);

  // Добавляем использование scrollSync
  useEffect(() => {
    if (!scrollSync || isLowPerformance) return;
    
    // Синхронизация с позицией скролла страницы
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Получаем положение элемента относительно видимой области
      const rect = elementRef.current.getBoundingClientRect();
      
      // Вычисляем относительную позицию элемента (0 - вверху экрана, 1 - внизу)
      const viewportPosition = rect.top / windowHeight;
      
      // Создаем смещение, зависящее от положения скролла и элемента
      let offset;
      
      if (direction === 'vertical') {
        // Вертикальное смещение в зависимости от скролла
        offset = (scrollPosition * speed * 0.05) + (viewportPosition * maxOffset * speed);
        elementRef.current.style.transform = `translateY(${offset}px)`;
      } else {
        // Горизонтальное смещение в зависимости от скролла
        offset = (scrollPosition * speed * 0.02) + (viewportPosition * maxOffset * speed);
        elementRef.current.style.transform = `translateX(${offset}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Вызываем однократно для установки начального положения
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollSync, direction, speed, maxOffset, isLowPerformance]);

  // Определяем, какие смещения использовать в зависимости от параметров
  const getMotionStyle = () => {
    // Если используется scrollSync, смещение будет управляться через DOM API
    if (scrollSync) {
      return {};
    }
    
    // Если устройство с низкой производительностью, отключаем эффекты
    if (isLowPerformance) {
      return {};
    }
    
    // Если используется непрерывное движение, применяем соответствующее смещение
    if (continuous) {
      return {
        y: direction === 'vertical' ? continuousOffset : 0,
        x: direction === 'horizontal' ? continuousOffset : 0,
        transition: `transform ${delay}s cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
      };
    }
    
    // В остальных случаях используем стандартные смещения на основе прокрутки
    return {
      y: direction === 'vertical' ? yOffset : 0,
      x: direction === 'horizontal' ? xOffset : 0,
      transition: `transform ${delay}s cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
    };
  };

  return (
    <motion.div
      ref={elementRef}
      className={cn('will-change-transform', className)}
      style={getMotionStyle()}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement;