// src/components/ui/section-animation.tsx
"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface SectionAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function SectionAnimation({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  threshold = 0.1
}: SectionAnimationProps) {
  const { isMobile } = useDeviceDetection();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: threshold
  });
  
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
      case 'none': return { opacity: 0 };
      default: return { opacity: 0, y: offset };
    }
  };
  
  // Анимация появления
  const variants = {
    hidden: getInitialOffset(),
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        duration: actualDuration, 
        delay: actualDelay,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}