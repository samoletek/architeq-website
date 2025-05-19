// src/components/ui/scroll-animation.tsx
"use client";

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils/utils';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'scale' | 'parallax' | 'rotate';
  strength?: number; // Сила эффекта (1-10)
}

export default function ScrollAnimation({
  children,
  className,
  animationType = 'fadeIn',
  strength = 5
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Настраиваем скролл-эффекты - хуки должны быть вызваны на верхнем уровне
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Применяем пружинный эффект для плавности
  const springScroll = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001 
  });
  
  // Нормализуем силу эффекта
  const normalizedStrength = strength / 10;
  
  // Предварительно создаем все возможные трансформации
  const fadeOpacity = useTransform(springScroll, [0, 0.5], [0.2, 1]);
  const slideY = useTransform(springScroll, [0, 1], [50 * normalizedStrength, 0]);
  const scaleValue = useTransform(springScroll, [0, 0.5], [0.9, 1]);
  const parallaxY = useTransform(springScroll, [0, 1], [-30 * normalizedStrength, 30 * normalizedStrength]);
  const rotateValue = useTransform(springScroll, [0, 1], [-5 * normalizedStrength, 0]);
  
  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Выбираем нужные свойства на основе типа анимации
  const getStyleProps = () => {
    if (!isMounted) return {};
    
    switch (animationType) {
      case 'fadeIn':
        return { opacity: fadeOpacity };
      case 'slideUp':
        return { y: slideY, opacity: fadeOpacity };
      case 'scale':
        return { scale: scaleValue, opacity: fadeOpacity };
      case 'parallax':
        return { y: parallaxY };
      case 'rotate':
        return { rotate: rotateValue };
      default:
        return {};
    }
  };

  // Выбираем правильный стиль отображения
  const styleProps = getStyleProps();

  // Не применяем эффекты на сервере
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div 
      ref={ref}
      className={cn("will-change-transform", className)}
      style={styleProps}
    >
      {children}
    </motion.div>
  );
}