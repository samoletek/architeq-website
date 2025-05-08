// src/components/ui/glowing-text-button.tsx
'use client';

import React, { ButtonHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils/utils';

interface GlowingTextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'header' | 'hero'; // Разные варианты поведения
}

export const GlowingTextButton: React.FC<GlowingTextButtonProps> = ({
  children,
  href,
  size = 'md',
  variant = 'header', // По умолчанию как в хедере
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  // Базовые стили контейнера
  const containerStyles = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-500',
    'focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
    // Только для header добавляем стили кнопки
    variant === 'header' && 'rounded-lg py-2 px-4',
    variant === 'header' && isHovered && 'bg-secondary shadow-neon-green-glow-intense',
    // Для hero убираем любые стили кнопки, только inline
    variant === 'hero' && 'bg-transparent',
    sizes[size],
    className
  );
  
  // Стили для текста
  const textStyles = cn(
    'transition-all duration-500',
    // Для header варианта: белый светящийся текст -> графитовый текст на зеленом фоне
    variant === 'header' && (
      isHovered
        ? 'text-site-bg font-medium' // Графитовый текст при наведении (на зеленом фоне)
        : 'text-white animate-wave-glow-white font-medium' // Белое свечение в обычном состоянии
    ),
    // Для hero варианта: белый светящийся текст -> зеленый светящийся текст
    variant === 'hero' && (
      isHovered
        ? 'text-secondary animate-wave-glow-green font-medium' // Зеленый текст с зеленым свечением при наведении
        : 'text-white animate-wave-glow-white font-medium' // Белое свечение в обычном состоянии
    )
  );
  
  // Обработчики наведения
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Для hero варианта не используем <button> или <a> с padding, просто <span>
  if (variant === 'hero') {
    return (
      <span 
        onClick={href ? () => window.location.href = href : undefined}
        className={cn("cursor-pointer", containerStyles)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={textStyles}>{children}</span>
      </span>
    );
  }
  
  // Для header используем обычный button/a
  if (href) {
    return (
      <a 
        href={href} 
        className={containerStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={textStyles}>{children}</span>
      </a>
    );
  }
  
  return (
    <button
      className={containerStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={textStyles}>{children}</span>
    </button>
  );
};