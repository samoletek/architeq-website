"use client";

import React, { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  intensity?: 'subtle' | 'normal' | 'strong';
  disabled?: boolean;
}

/**
 * FuturisticCard Component
 * Создает футуристическую карточку с 3D эффектами, как в референсе
 * Включает анимированные градиенты, световые лучи и интерактивные эффекты
 */
const FuturisticCard: React.FC<FuturisticCardProps> = ({
  children,
  className = '',
  variant = 'primary',
  intensity = 'normal',
  disabled = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values для 3D трансформации
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Настройки поворота в зависимости от интенсивности
  const getRotationSettings = () => {
    switch (intensity) {
      case 'subtle':
        return { range: 8, perspective: 2000 };
      case 'strong':
        return { range: 20, perspective: 800 };
      default: // normal
        return { range: 12, perspective: 1200 };
    }
  };

  const rotationSettings = getRotationSettings();
  
  // 3D трансформации - только горизонтальная ось (влево-вправо)
  const rotateY = useTransform(mouseX, [-300, 300], [-rotationSettings.range, rotationSettings.range]);
  
  // Цветовая схема в зависимости от варианта
  const getVariantColors = () => {
    switch (variant) {
      case 'secondary':
        return {
          primary: '176, 255, 116', // secondary green
          accent: '134, 255, 80',
          background: 'linear-gradient(135deg, rgba(10, 42, 10, 0.8) 0%, rgba(23, 10, 36, 0.9) 50%, rgba(18, 7, 26, 0.95) 100%)',
          borderGlow: 'rgba(176, 255, 116, 0.3)'
        };
      default: // primary
        return {
          primary: '178, 75, 243', // primary purple
          accent: '199, 95, 255',
          background: 'linear-gradient(135deg, rgba(23, 10, 36, 0.8) 0%, rgba(21, 9, 32, 0.9) 50%, rgba(18, 7, 26, 0.95) 100%)',
          borderGlow: 'rgba(178, 75, 243, 0.3)'
        };
    }
  };

  const colors = getVariantColors();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${className}`}
      style={{
        perspective: disabled ? 'none' : rotationSettings.perspective,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={disabled ? {} : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* 3D трансформируемая карточка */}
      <motion.div
        className="relative w-full h-full"
        style={disabled ? {} : { rotateY }}
      >
        {/* Фоновые анимированные градиенты */}
        {!disabled && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Основной пульсирующий градиент */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 30% 20%, rgba(${colors.primary}, 0.4) 0%, transparent 50%), 
                            radial-gradient(circle at 70% 80%, rgba(${colors.accent}, 0.3) 0%, transparent 50%)`
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Движущиеся световые пятна */}
            <motion.div
              className="absolute w-32 h-32 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, rgba(${colors.primary}, 0.6) 0%, transparent 70%)`,
                filter: 'blur(20px)'
              }}
              animate={{
                x: ['-20%', '120%'],
                y: ['-20%', '120%'],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute w-24 h-24 rounded-full opacity-25"
              style={{
                background: `radial-gradient(circle, rgba(${colors.accent}, 0.5) 0%, transparent 70%)`,
                filter: 'blur(15px)'
              }}
              animate={{
                x: ['120%', '-20%'],
                y: ['120%', '-20%'],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        )}

        {/* Анимированные световые лучи по краям */}
        {!disabled && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            {/* Верхний луч */}
            <motion.div
              className="absolute top-0 left-0 h-[1px] w-full opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(to right, transparent, rgba(${colors.primary}, 0.8), transparent)`
              }}
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Правый луч */}
            <motion.div
              className="absolute top-0 right-0 w-[1px] h-full opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(${colors.primary}, 0.8), transparent)`
              }}
              animate={{
                y: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Нижний луч */}
            <motion.div
              className="absolute bottom-0 right-0 h-[1px] w-full opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(to left, transparent, rgba(${colors.primary}, 0.8), transparent)`
              }}
              animate={{
                x: ['100%', '-100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Левый луч */}
            <motion.div
              className="absolute bottom-0 left-0 w-[1px] h-full opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(to top, transparent, rgba(${colors.primary}, 0.8), transparent)`
              }}
              animate={{
                y: ['100%', '-100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />

            {/* Угловые световые точки */}
            {[
              { corner: 'top-0 left-0', delay: 0 },
              { corner: 'top-0 right-0', delay: 0.5 },
              { corner: 'bottom-0 right-0', delay: 1 },
              { corner: 'bottom-0 left-0', delay: 1.5 }
            ].map((corner, index) => (
              <motion.div
                key={index}
                className={`absolute ${corner.corner} w-2 h-2 rounded-full opacity-0 group-hover:opacity-100`}
                style={{
                  background: `rgba(${colors.primary}, 0.9)`,
                  boxShadow: `0 0 10px rgba(${colors.primary}, 0.6)`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: corner.delay
                }}
              />
            ))}
          </div>
        )}

        {/* Свечение по границам карточки */}
        {!disabled && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            {/* Верхняя граница */}
            <div 
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(${colors.primary}, 0.1) 10%, 
                  rgba(${colors.primary}, 0.8) 50%, 
                  rgba(${colors.primary}, 0.1) 90%, 
                  transparent 100%)`
              }}
            />
            
            {/* Правая граница */}
            <div 
              className="absolute top-0 right-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(180deg, 
                  transparent 0%, 
                  rgba(${colors.primary}, 0.1) 10%, 
                  rgba(${colors.primary}, 0.8) 50%, 
                  rgba(${colors.primary}, 0.1) 90%, 
                  transparent 100%)`
              }}
            />
            
            {/* Нижняя граница */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(270deg, 
                  transparent 0%, 
                  rgba(${colors.primary}, 0.1) 10%, 
                  rgba(${colors.primary}, 0.8) 50%, 
                  rgba(${colors.primary}, 0.1) 90%, 
                  transparent 100%)`
              }}
            />
            
            {/* Левая граница */}
            <div 
              className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(0deg, 
                  transparent 0%, 
                  rgba(${colors.primary}, 0.1) 10%, 
                  rgba(${colors.primary}, 0.8) 50%, 
                  rgba(${colors.primary}, 0.1) 90%, 
                  transparent 100%)`
              }}
            />

            {/* Дополнительное внешнее свечение */}
            <div 
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(45deg, 
                  rgba(${colors.primary}, 0.1), 
                  rgba(${colors.accent}, 0.1), 
                  rgba(${colors.primary}, 0.1), 
                  rgba(${colors.accent}, 0.1))`,
                filter: 'blur(1px)',
                zIndex: -1
              }}
            />
          </div>
        )}

        {/* Основной контент с стеклянным эффектом */}
        <div 
          className="relative rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden h-full"
          style={{
            background: colors.background,
            borderColor: colors.borderGlow,
            boxShadow: disabled ? 'none' : `
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 0 0 1px ${colors.borderGlow},
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Noise texture overlay для текстуры */}
          {!disabled && (
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          )}
          
          {/* Контент */}
          <div className="relative z-10 h-full">
            {children}
          </div>
        </div>
      </motion.div>

      {/* Стили для мобильных устройств */}
      <style jsx>{`
        @media (max-width: 768px) {
          .group .absolute {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .group .absolute {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default FuturisticCard;