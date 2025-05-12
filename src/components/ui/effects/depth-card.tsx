'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface DepthCardProps {
  children: React.ReactNode;
  className?: string;
  // Уровень глубины от 1 до 5
  depthLevel?: 1 | 2 | 3 | 4 | 5;
  // Тип свечения
  glowType?: 'none' | 'primary' | 'secondary' | 'blue' | 'purple' | 'teal' | 'white';
  // Интенсивность свечения от 1 до 3
  glowIntensity?: 1 | 2 | 3;
  // Усиление эффекта при наведении
  enhanceOnHover?: boolean;
  // Подъем элемента при наведении
  liftOnHover?: boolean;
  // Угол перспективы при наведении
  tiltOnHover?: boolean;
  // Макс. угол наклона (градусы)
  maxTiltAngle?: number;
  // Цвет границы
  borderColor?: 'none' | 'primary' | 'secondary' | 'dark' | 'light' | 'custom';
  // Пользовательский класс для границы, если borderColor='custom'
  customBorderClass?: string;
  // Скругление углов
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  // Фон карточки
  background?: 'dark' | 'transparent' | 'gradient-primary' | 'gradient-secondary' | 'custom';
  // Пользовательский класс для фона, если background='custom'
  customBackgroundClass?: string;
}

const DepthCard: React.FC<DepthCardProps> = ({
  children,
  className,
  depthLevel = 2,
  glowType = 'none',
  glowIntensity = 1,
  enhanceOnHover = true,
  liftOnHover = true,
  tiltOnHover = false,
  maxTiltAngle = 5,
  borderColor = 'none',
  customBorderClass = '',
  rounded = 'md',
  background = 'dark',
  customBackgroundClass = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { isLowPerformance } = useDeviceDetection();

  // Обработчик движения мыши для эффекта наклона
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltOnHover || isLowPerformance) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Вычисляем смещение от центра в диапазоне от -1 до 1
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);
    
    // Устанавливаем наклон с учетом максимального угла
    setTilt({
      x: offsetY * maxTiltAngle, // Инвертируем для более естественного ощущения
      y: -offsetX * maxTiltAngle,
    });
  };

  // Сбрасываем наклон при уходе курсора
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Определяем класс тени на основе уровня глубины
  const depthShadowClass = `shadow-depth-${depthLevel}`;

  // Определяем класс свечения
  let glowClass = '';
  let enhancedGlowClass = '';

  if (glowType !== 'none') {
    switch (glowType) {
      case 'primary':
        glowClass = 'shadow-neon-glow';
        enhancedGlowClass = 'shadow-neon-glow-intense';
        break;
      case 'secondary':
        glowClass = 'shadow-neon-green-glow';
        enhancedGlowClass = 'shadow-neon-green-glow-intense';
        break;
      case 'blue':
        glowClass = 'shadow-neon-blue';
        enhancedGlowClass = 'shadow-neon-blue';
        break;
      case 'purple':
        glowClass = 'shadow-neon-purple';
        enhancedGlowClass = 'shadow-neon-purple';
        break;
      case 'teal':
        glowClass = 'shadow-neon-teal';
        enhancedGlowClass = 'shadow-neon-teal';
        break;
      case 'white':
        glowClass = 'shadow-white-glow';
        enhancedGlowClass = 'shadow-white-glow-intense';
        break;
      default:
        glowClass = '';
        enhancedGlowClass = '';
    }

    // Уменьшаем интенсивность для уровней 1 и 2
    if (glowIntensity === 1) {
      glowClass = glowClass.replace('shadow-', 'shadow-sm ');
    } else if (glowIntensity === 3) {
      glowClass = enhancedGlowClass;
      enhancedGlowClass = enhancedGlowClass.replace('-intense', '-intense');
    }
  }

  // Определяем класс границы
  let borderClass = '';
  
  if (borderColor !== 'none') {
    switch (borderColor) {
      case 'primary':
        borderClass = 'border border-primary/30';
        break;
      case 'secondary':
        borderClass = 'border border-secondary/30';
        break;
      case 'dark':
        borderClass = 'border border-gray-800';
        break;
      case 'light':
        borderClass = 'border border-gray-700';
        break;
      case 'custom':
        borderClass = customBorderClass;
        break;
    }
  }

  // Определяем класс скругления
  let roundedClass = '';
  
  switch (rounded) {
    case 'none':
      roundedClass = '';
      break;
    case 'sm':
      roundedClass = 'rounded-sm';
      break;
    case 'md':
      roundedClass = 'rounded-md';
      break;
    case 'lg':
      roundedClass = 'rounded-lg';
      break;
    case 'xl':
      roundedClass = 'rounded-xl';
      break;
    case 'full':
      roundedClass = 'rounded-full';
      break;
  }

  // Определяем класс фона
  let backgroundClass = '';
  
  switch (background) {
    case 'dark':
      backgroundClass = 'bg-medium-gray/30 backdrop-blur-sm';
      break;
    case 'transparent':
      backgroundClass = 'bg-transparent';
      break;
    case 'gradient-primary':
      backgroundClass = 'bg-primary-gradient';
      break;
    case 'gradient-secondary':
      backgroundClass = 'bg-secondary-gradient';
      break;
    case 'custom':
      backgroundClass = customBackgroundClass;
      break;
  }

  // Финальные классы и стили для карточки
  const cardClasses = cn(
    'transition-all duration-300 overflow-hidden',
    depthShadowClass,
    isHovered && enhanceOnHover ? enhancedGlowClass : glowClass,
    borderClass,
    roundedClass,
    backgroundClass,
    'transform-gpu', // Использование GPU для ускорения
    className
  );

  // Стили для наклона
  const tiltStyle = isHovered && tiltOnHover && !isLowPerformance
    ? {
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${liftOnHover ? 'translateZ(10px)' : ''}`,
      }
    : {};

  // Анимации Framer Motion
  const hoverAnimations = isLowPerformance
    ? {}
    : {
        scale: isHovered && liftOnHover ? 1.02 : 1,
        y: isHovered && liftOnHover ? -5 : 0,
        transition: { duration: 0.3 },
      };

  return (
    <motion.div
      className={cardClasses}
      style={tiltStyle}
      animate={hoverAnimations}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default DepthCard;