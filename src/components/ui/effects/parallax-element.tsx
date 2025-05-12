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

  return (
    <motion.div
      ref={elementRef}
      className={cn('will-change-transform', className)}
      style={{
        y: isLowPerformance ? 0 : (continuous ? continuousOffset : yOffset),
        x: isLowPerformance ? 0 : (continuous && direction === 'horizontal' ? continuousOffset : xOffset),
        transition: `transform ${delay}s cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement;