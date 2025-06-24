import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'case-study' | 'service';
  size?: 'sm' | 'md' | 'lg' | 'auto';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
  intensity?: 'subtle' | 'normal' | 'strong';
  disabled?: boolean; // Отключить эффект на мобильных устройствах
}

/**
 * GlowCard Component
 * Адаптированная версия GlowCard под стили Architeq
 * Создает интерактивный эффект свечения, следующий за курсором мыши
 */
const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'auto',
  width,
  height,
  customSize = true, // По умолчанию используем гибкие размеры
  intensity = 'normal',
  disabled = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Определяем цветовую схему в зависимости от варианта
  const getVariantConfig = () => {
    switch (variant) {
      case 'primary':
        return {
          hue: 280, // Фиолетовый (primary)
          spread: 100,
          bgColor: 'linear-gradient(to_bottom, #170A24 0%, #150920 50%, #12071A 100%)',
          borderColor: 'rgba(178, 75, 243, 0.3)', // primary/30
          shadowColor: 'rgba(178, 75, 243, 0.2)'
        };
      case 'secondary':
      case 'accent':
        return {
          hue: 120, // Зеленый (secondary)
          spread: 80,
          bgColor: 'linear-gradient(to_bottom, #0A2A0A 0%, #170A24 50%, #12071A 100%)',
          borderColor: 'rgba(176, 255, 116, 0.3)', // secondary/30
          shadowColor: 'rgba(176, 255, 116, 0.2)'
        };
      case 'case-study':
        return {
          hue: 120, // Зеленый для кейсов
          spread: 90,
          bgColor: 'linear-gradient(to_bottom, #0A2A0A 0%, #170A24 50%, #12071A 100%)',
          borderColor: 'rgba(176, 255, 116, 0.4)',
          shadowColor: 'rgba(176, 255, 116, 0.3)'
        };
      case 'service':
        return {
          hue: 280, // Фиолетовый для услуг
          spread: 110,
          bgColor: 'linear-gradient(to_bottom, #170A24 0%, #150920 50%, #12071A 100%)',
          borderColor: 'rgba(178, 75, 243, 0.4)',
          shadowColor: 'rgba(178, 75, 243, 0.3)'
        };
      default:
        return {
          hue: 280,
          spread: 100,
          bgColor: 'linear-gradient(to_bottom, #170A24 0%, #150920 50%, #12071A 100%)',
          borderColor: 'rgba(178, 75, 243, 0.3)',
          shadowColor: 'rgba(178, 75, 243, 0.2)'
        };
    }
  };

  // Настройки интенсивности
  const getIntensityConfig = () => {
    switch (intensity) {
      case 'subtle':
        return {
          bgOpacity: 0.05,
          borderOpacity: 0.6,
          lightOpacity: 0.3,
          spotlightSize: 150
        };
      case 'strong':
        return {
          bgOpacity: 0.15,
          borderOpacity: 1,
          lightOpacity: 1,
          spotlightSize: 250
        };
      default: // normal
        return {
          bgOpacity: 0.08,
          borderOpacity: 0.8,
          lightOpacity: 0.6,
          spotlightSize: 200
        };
    }
  };

  // Отслеживание движения мыши
  useEffect(() => {
    if (disabled) return;

    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, [disabled]);

  const variantConfig = getVariantConfig();
  const intensityConfig = getIntensityConfig();

  // Размеры карточки
  const getSizeClasses = () => {
    if (customSize || size === 'auto') {
      return ''; // Используем className или встроенные стили
    }
    
    const sizeMap = {
      sm: 'w-48 h-64',
      md: 'w-64 h-80',
      lg: 'w-80 h-96'
    };
    
    return sizeMap[size] || '';
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties = {
      '--base': variantConfig.hue,
      '--spread': variantConfig.spread,
      '--radius': '16', // Соответствует rounded-2xl
      '--border': '1.5', // Тонкая граница
      '--backdrop': variantConfig.borderColor,
      '--backup-border': variantConfig.borderColor,
      '--size': intensityConfig.spotlightSize,
      '--bg-spot-opacity': intensityConfig.bgOpacity,
      '--border-spot-opacity': intensityConfig.borderOpacity,
      '--border-light-opacity': intensityConfig.lightOpacity,
      '--outer': '1',
      '--border-size': 'calc(var(--border, 1.5) * 1px)',
      '--spotlight-size': 'calc(var(--size, 200) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      '--saturation': variant === 'secondary' || variant === 'case-study' ? '100' : '80',
      '--lightness': variant === 'secondary' || variant === 'case-study' ? '70' : '60',
      background: variantConfig.bgColor,
      border: `1.5px solid ${variantConfig.borderColor}`,
      boxShadow: `0 8px 32px ${variantConfig.shadowColor}`,
      position: 'relative',
      touchAction: 'none',
    } as React.CSSProperties;

    // Добавляем размеры если указаны
    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  // CSS для псевдоэлементов
  const glowStyles = `
    [data-glow]:not([data-disabled="true"])::before,
    [data-glow]:not([data-disabled="true"])::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    [data-glow]:not([data-disabled="true"]):hover::before,
    [data-glow]:not([data-disabled="true"]):hover::after {
      opacity: 1;
    }
    
    [data-glow]:not([data-disabled="true"])::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 280) calc(var(--saturation, 80) * 1%) calc(var(--lightness, 60) * 1%) / var(--border-spot-opacity, 0.8)), 
        transparent 100%
      );
      filter: brightness(1.5);
    }
    
    [data-glow]:not([data-disabled="true"])::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 0% 100% / var(--border-light-opacity, 0.6)), 
        transparent 100%
      );
    }
    
    [data-glow]:not([data-disabled="true"]) [data-glow-inner] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      filter: blur(1px);
      background: radial-gradient(
        calc(var(--spotlight-size) * 1.5) calc(var(--spotlight-size) * 1.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 280) calc(var(--saturation, 80) * 1%) calc(var(--lightness, 60) * 1%) / var(--bg-spot-opacity, 0.08)), 
        transparent
      );
      pointer-events: none;
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    
    [data-glow]:not([data-disabled="true"]):hover [data-glow-inner] {
      opacity: 1;
    }

    /* Отключаем эффекты на мобильных устройствах */
    @media (max-width: 768px) {
      [data-glow]::before,
      [data-glow]::after,
      [data-glow] [data-glow-inner] {
        display: none;
      }
    }

    /* Поддержка reduced motion */
    @media (prefers-reduced-motion: reduce) {
      [data-glow]::before,
      [data-glow]::after,
      [data-glow] [data-glow-inner] {
        transition: none;
        opacity: 0 !important;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: glowStyles }} />
      <div
        ref={cardRef}
        data-glow
        data-disabled={disabled}
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          rounded-2xl 
          relative 
          overflow-hidden
          transition-all 
          duration-500 
          hover:scale-[1.02]
          backdrop-blur-sm
          ${className}
        `}
      >
        {!disabled && <div ref={innerRef} data-glow-inner></div>}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default GlowCard;