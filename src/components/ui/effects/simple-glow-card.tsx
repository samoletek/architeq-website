"use client";

import React, { useRef, useEffect, ReactNode } from 'react';

interface SimpleGlowCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Simple Glow Card - базовая реализация эффекта свечения при наведении
 * Создает radial gradient, следующий за курсором мыши
 */
const SimpleGlowCard: React.FC<SimpleGlowCardProps> = ({ children, className = '', variant = 'primary', onMouseEnter, onMouseLeave }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseEnter = () => {
      card.style.setProperty('--opacity', '1');
      if (onMouseEnter) onMouseEnter();
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--opacity', '0');
      if (onMouseLeave) onMouseLeave();
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [onMouseEnter, onMouseLeave]);

  // Определяем цвета в зависимости от варианта
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          borderColor: 'border-secondary/20',
          hoverBorderColor: 'hover:border-secondary/40',
          shadowColor: 'hover:shadow-secondary/20',
          glowBackground: '#0A2A0A',
          glowOverlay: 'rgba(176, 255, 116, 0.1)', // secondary green
          glowBorder: 'rgba(176, 255, 116, 0.3)'
        };
      default: // primary
        return {
          borderColor: 'border-primary/20',
          hoverBorderColor: 'hover:border-primary/40',
          shadowColor: 'hover:shadow-primary/20',
          glowBackground: '#170A24',
          glowOverlay: 'rgba(178, 75, 243, 0.1)', // primary purple
          glowBorder: 'rgba(178, 75, 243, 0.3)'
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      ref={cardRef}
      className={`
        relative 
        rounded-2xl 
        border 
        ${variantStyles.borderColor}
        bg-[linear-gradient(to_bottom,_${variant === 'secondary' ? '#0A2A0A' : '#170A24'}_0%,_#150920_50%,_#12071A_100%)]
        overflow-hidden
        transition-all 
        duration-300
        ${variantStyles.hoverBorderColor}
        hover:shadow-lg
        ${variantStyles.shadowColor}
        group
        ${className}
      `}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--opacity': '0',
      } as React.CSSProperties}
    >
      {/* Glow effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${variantStyles.glowOverlay}, transparent 40%)`,
          opacity: 'var(--opacity)',
        }}
      />
      
      {/* Border glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${variantStyles.glowBorder}, transparent 40%)`,
          opacity: 'var(--opacity)',
          mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SimpleGlowCard;