// src/components/ui/cards/clickable-tag.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';

export interface ClickableTagProps {
  children: React.ReactNode;
  type: 'company' | 'technology' | 'location' | 'default';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  variant?: 'solid' | 'outline';
}

export function ClickableTag({
  children,
  type,
  onClick,
  className,
  disabled = false,
  size = 'sm',
  variant = 'solid'
}: ClickableTagProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Получаем стили для типа тега
  const getTypeStyles = () => {
    const styles = {
      company: {
        solid: 'bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 hover:border-secondary/50',
        outline: 'bg-transparent text-secondary border-secondary/50 hover:bg-secondary/10 hover:border-secondary/70'
      },
      technology: {
        solid: 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 hover:border-primary/50',
        outline: 'bg-transparent text-primary border-primary/50 hover:bg-primary/10 hover:border-primary/70'
      },
      location: {
        solid: 'bg-white/15 text-white border-white/30 hover:bg-white/25 hover:border-white/50',
        outline: 'bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white/70'
      },
      default: {
        solid: 'bg-medium-gray/20 text-light-gray border-medium-gray/30 hover:bg-medium-gray/30 hover:border-medium-gray/50',
        outline: 'bg-transparent text-light-gray border-medium-gray/50 hover:bg-medium-gray/10 hover:border-medium-gray/70'
      }
    };
    return styles[type][variant];
  };

  // Получаем иконку для типа тега
  const getTypeIcon = () => {
    const icons = {
      company: '🏢',
      technology: '⚙️',
      location: '📍',
      default: '🏷️'
    };
    return icons[type];
  };

  // Получаем эффект свечения
  const getGlowEffect = () => {
    if (!isHovered || disabled) return '';
    
    const glows = {
      company: 'shadow-neon-green-glow',
      technology: 'shadow-neon-glow',
      location: 'shadow-white-glow',
      default: ''
    };
    return glows[type];
  };

  // Варианты анимации
  const tagVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Варианты для свечения
  const glowVariants = {
    idle: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  const Component = onClick ? motion.button : motion.span;

  return (
    <Component
      variants={tagVariants}
      initial="idle"
      whileHover={!disabled ? "hover" : "idle"}
      whileTap={!disabled && onClick ? "tap" : "idle"}
      onClick={onClick && !disabled ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        // Базовые стили
        'relative inline-flex items-center rounded-md border transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        
        // Размеры
        sizeClasses[size],
        
        // Стили типа
        getTypeStyles(),
        
        // Эффект свечения
        getGlowEffect(),
        
        // Состояния
        onClick && !disabled && 'cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        
        // Focus styles для кнопок
        onClick && type === 'company' && 'focus:ring-secondary',
        onClick && type === 'technology' && 'focus:ring-primary',
        onClick && type === 'location' && 'focus:ring-white',
        
        className
      )}
      disabled={disabled}
    >
      {/* Внутреннее свечение */}
      <motion.div
        variants={glowVariants}
        className={cn(
          "absolute inset-0 rounded-md opacity-0",
          type === 'company' && "bg-secondary/10",
          type === 'technology' && "bg-primary/10",
          type === 'location' && "bg-white/10",
          type === 'default' && "bg-medium-gray/10"
        )}
      />
      
      {/* Контент */}
      <span className="relative z-10 flex items-center">
        {/* Иконка */}
        <span className="mr-1 text-xs opacity-70">
          {getTypeIcon()}
        </span>
        
        {/* Текст */}
        <span className="font-medium leading-none">
          {children}
        </span>
        
        {/* Индикатор кликабельности */}
        {onClick && !disabled && (
          <motion.span
            animate={isHovered ? { x: [0, 2, 0] } : { x: 0 }}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
            className="ml-1 text-xs opacity-60"
          >
            →
          </motion.span>
        )}
      </span>

      {/* Дополнительные эффекты для hover */}
      {isHovered && !disabled && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.3 }}
          className={cn(
            "absolute inset-0 rounded-md blur-md -z-10",
            type === 'company' && "bg-secondary",
            type === 'technology' && "bg-primary",
            type === 'location' && "bg-white",
            type === 'default' && "bg-medium-gray"
          )}
        />
      )}
    </Component>
  );
}

// Готовые компоненты для разных типов тегов
export function CompanyTag(props: Omit<ClickableTagProps, 'type'>) {
  return <ClickableTag {...props} type="company" />;
}

export function TechnologyTag(props: Omit<ClickableTagProps, 'type'>) {
  return <ClickableTag {...props} type="technology" />;
}

export function LocationTag(props: Omit<ClickableTagProps, 'type'>) {
  return <ClickableTag {...props} type="location" />;
}

export function DefaultTag(props: Omit<ClickableTagProps, 'type'>) {
  return <ClickableTag {...props} type="default" />;
}