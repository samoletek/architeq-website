// src/components/ui/effects/wave-divider.tsx
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface WaveDividerProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  height?: number; // высота в пикселях
  opacity?: number;
  disableParallax?: boolean;
}

export default function WaveDivider({
  className,
  variant = 'primary',
  height = 120,
  opacity = 0.1,
  disableParallax = false
}: WaveDividerProps) {
  const { isLowPerformance } = useDeviceDetection();
  const ref = useRef<HTMLDivElement>(null);
  
  // Получаем прогресс скролла
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Трансформируем прогресс скролла в движение волны
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isLowPerformance || disableParallax ? 0 : -50]
  );
  
  // Определяем цвет волны на основе варианта
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return { start: '#7747CF', end: '#4DADFF' };
      case 'secondary':
        return { start: '#B0FF74', end: '#00F5D4' };
      case 'accent':
        return { start: '#B0FF74', end: '#FFFFFF' };
      default:
        return { start: '#7747CF', end: '#4DADFF' };
    }
  };
  
  const colors = getGradientColors();
  
  return (
    <div 
      ref={ref}
      className={cn(
        "absolute w-full overflow-hidden z-10",
        className
      )}
      style={{ height: `${height}px` }}
    >
      <motion.div
        style={{ y: disableParallax ? 0 : yOffset }}
        className="w-full h-full"
      >
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 1440 ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d={`M0 ${height}V30C240 90 480 120 720 90C960 60 1200 30 1440 60V${height}H0Z`}
            fill={`url(#wave-gradient-${variant})`}
            fillOpacity={opacity}
          />
          <defs>
            <linearGradient
              id={`wave-gradient-${variant}`}
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={colors.start} />
              <stop offset="1" stopColor={colors.end} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}