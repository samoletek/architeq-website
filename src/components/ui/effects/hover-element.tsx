'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface HoverElementProps {
  children: React.ReactNode;
  className?: string;
  // Тип эффекта парения
  floatEffect?: 'none' | 'small' | 'medium' | 'large';
  // Скорость парения
  floatSpeed?: 'normal' | 'slow' | 'fast';
  // Повышать ли элемент при наведении
  hoverLift?: boolean;
  // Тень при наведении
  hoverGlow?: 'none' | 'primary' | 'secondary' | 'white' | 'accent';
  // Эффект масштабирования при наведении
  hoverScale?: number;
  // Скорость анимации наведения (в секундах)
  hoverDuration?: number;
  // Непрерывная пульсация тени
  pulseShadow?: boolean;
}

const HoverElement: React.FC<HoverElementProps> = ({
  children,
  className,
  floatEffect = 'none',
  floatSpeed = 'normal',
  hoverLift = true,
  hoverGlow = 'primary',
  hoverScale = 1.02,
  hoverDuration = 0.3,
  pulseShadow = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isLowPerformance } = useDeviceDetection();

  // Определяем классы анимации плавания в зависимости от параметров
  let floatAnimationClass = '';
  if (floatEffect !== 'none' && !isLowPerformance) {
    const speedClass = floatSpeed === 'slow' 
      ? 'float-slow' 
      : floatSpeed === 'fast' 
        ? 'float-fast' 
        : 'float';

    if (floatEffect === 'small') {
      floatAnimationClass = floatSpeed === 'slow' 
        ? 'float-small-slow' 
        : 'float-small';
    } else if (floatEffect === 'medium') {
      floatAnimationClass = speedClass;
    } else if (floatEffect === 'large') {
      floatAnimationClass = speedClass;
    }
  }

  // Определяем класс свечения при наведении
  let hoverGlowClass = '';
  let initialGlowClass = '';
  if (hoverGlow !== 'none') {
    switch(hoverGlow) {
      case 'primary':
        hoverGlowClass = 'shadow-neon-glow-intense';
        initialGlowClass = pulseShadow ? 'shadow-neon-glow animate-pulse-slow' : '';
        break;
      case 'secondary':
        hoverGlowClass = 'shadow-neon-green-glow-intense';
        initialGlowClass = pulseShadow ? 'shadow-neon-green-glow animate-pulse-slow' : '';
        break;
      case 'white':
        hoverGlowClass = 'shadow-white-glow-intense';
        initialGlowClass = pulseShadow ? 'shadow-white-glow animate-pulse-slow' : '';
        break;
      case 'accent':
        hoverGlowClass = 'shadow-accent-glow';
        initialGlowClass = pulseShadow ? 'shadow-accent-glow animate-pulse-slow' : '';
        break;
      default:
        hoverGlowClass = '';
        initialGlowClass = '';
    }
  }

  // Настраиваем параметры анимации Framer Motion
  const hoverAnimation = isLowPerformance
    ? {}
    : {
        scale: hoverScale,
        y: hoverLift ? -5 : 0,
        transition: { duration: hoverDuration },
      };

  // Объединяем все классы вместе
  const combinedClassName = cn(
    'transition-all duration-300',
    floatAnimationClass,
    initialGlowClass,
    isHovered ? hoverGlowClass : '',
    className
  );

  return (
    <motion.div
      className={combinedClassName}
      whileHover={!isLowPerformance ? { ...hoverAnimation } : {}}
      animate={isHovered && !isLowPerformance ? { ...hoverAnimation } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
};

export default HoverElement;