"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TravelingBorderGlowProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  intensity?: 'subtle' | 'normal' | 'strong';
  disabled?: boolean;
  isHovered?: boolean;
}

/**
 * TravelingBorderGlow - автоматический эффект свечения по границам
 * Создает движущиеся световые лучи по периметру карточки
 */
const TravelingBorderGlow: React.FC<TravelingBorderGlowProps> = ({
  children,
  className = '',
  variant = 'primary',
  intensity = 'normal',
  disabled = false,
  isHovered = false
}) => {
  // Цветовая схема в зависимости от варианта
  const getVariantColors = () => {
    switch (variant) {
      case 'secondary':
        return {
          light: '176, 255, 116', // secondary green
          accent: '134, 255, 80',
          borderGlow: 'rgba(176, 255, 116, 0.3)'
        };
      default: // primary
        return {
          light: '255, 255, 255', // white
          accent: '178, 75, 243', // primary purple
          borderGlow: 'rgba(255, 255, 255, 0.3)'
        };
    }
  };

  // Настройки интенсивности
  const getIntensitySettings = () => {
    switch (intensity) {
      case 'subtle':
        return { opacity: 0.6, blur: 1, thickness: '3px' };
      case 'strong':
        return { opacity: 1, blur: 3, thickness: '5px' };
      default: // normal
        return { opacity: 0.8, blur: 2, thickness: '4px' };
    }
  };

  const colors = getVariantColors();
  const settings = getIntensitySettings();

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Основное свечение карточки */}
      <motion.div 
        className="absolute -inset-[1px] transition-all duration-500 pointer-events-none"
        style={{ 
          borderRadius: 'inherit',
          opacity: isHovered ? 0.8 : 1
        }}
        animate={{
          boxShadow: [
            `0 0 10px 2px ${colors.borderGlow}`,
            `0 0 15px 5px ${colors.borderGlow}`,
            `0 0 10px 2px ${colors.borderGlow}`
          ],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />

      {/* Движущиеся световые лучи по границам */}
      <div 
        className="absolute -inset-[1px] overflow-hidden transition-transform duration-500 pointer-events-none" 
        style={{ 
          borderRadius: 'inherit'
        }}
      >
        {/* Верхний луч */}
        <motion.div 
          className="absolute top-0 left-0 w-[50%] bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ 
            height: settings.thickness,
            opacity: settings.opacity,
            filter: `blur(${settings.blur}px)`
          }}
          animate={{ 
            left: ["-50%", "100%"],
            opacity: [0.5, settings.opacity, 0.5],
            filter: [`blur(${settings.blur}px)`, `blur(${settings.blur + 1}px)`, `blur(${settings.blur}px)`]
          }}
          transition={{ 
            left: {
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1
            },
            opacity: {
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror"
            },
            filter: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror"
            }
          }}
        />
        
        {/* Правый луч */}
        <motion.div 
          className="absolute top-0 right-0 h-[50%] bg-gradient-to-b from-transparent via-white to-transparent"
          style={{ 
            width: settings.thickness,
            opacity: settings.opacity,
            filter: `blur(${settings.blur}px)`
          }}
          animate={{ 
            top: ["-50%", "100%"],
            opacity: [0.5, settings.opacity, 0.5],
            filter: [`blur(${settings.blur}px)`, `blur(${settings.blur + 1}px)`, `blur(${settings.blur}px)`]
          }}
          transition={{ 
            top: {
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 0.6
            },
            opacity: {
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.6
            },
            filter: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.6
            }
          }}
        />
        
        {/* Нижний луч */}
        <motion.div 
          className="absolute bottom-0 right-0 w-[50%] bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ 
            height: settings.thickness,
            opacity: settings.opacity,
            filter: `blur(${settings.blur}px)`
          }}
          animate={{ 
            right: ["-50%", "100%"],
            opacity: [0.5, settings.opacity, 0.5],
            filter: [`blur(${settings.blur}px)`, `blur(${settings.blur + 1}px)`, `blur(${settings.blur}px)`]
          }}
          transition={{ 
            right: {
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 1.2
            },
            opacity: {
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1.2
            },
            filter: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1.2
            }
          }}
        />
        
        {/* Левый луч */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[50%] bg-gradient-to-b from-transparent via-white to-transparent"
          style={{ 
            width: settings.thickness,
            opacity: settings.opacity,
            filter: `blur(${settings.blur}px)`
          }}
          animate={{ 
            bottom: ["-50%", "100%"],
            opacity: [0.5, settings.opacity, 0.5],
            filter: [`blur(${settings.blur}px)`, `blur(${settings.blur + 1}px)`, `blur(${settings.blur}px)`]
          }}
          transition={{ 
            bottom: {
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 1.8
            },
            opacity: {
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1.8
            },
            filter: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1.8
            }
          }}
        />
        
        {/* Угловые световые точки */}
        <motion.div 
          className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]"
          animate={{ 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        <motion.div 
          className="absolute top-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]"
          animate={{ 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 2.4, 
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]"
          animate={{ 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 2.2, 
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]"
          animate={{ 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 2.3, 
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1.5
          }}
        />
      </div>

      {/* Общее свечение границ */}
      <div 
        className="absolute -inset-[0.5px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 transition-all duration-500 pointer-events-none" 
        style={{ 
          borderRadius: 'inherit',
          opacity: isHovered ? 0.8 : 0.6
        }}
      />
      
      {/* Контент */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default TravelingBorderGlow;