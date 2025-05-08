"use client";

import React, { useState, useRef } from 'react';

interface GlowEffectProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'blue-accent';
  intensity?: number;
  active?: boolean;
  className?: string;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  color = 'primary',
  intensity = 1,
  active = true,
  className = '',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !active) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Map color names to color variable names
  const colorMap = {
    'primary': 'var(--color-primary)',
    'secondary': 'var(--color-secondary)',
    'accent': 'var(--color-accent)',
    'blue-accent': 'var(--color-blue-accent)',
  };
  
  // Only show the effect if active and hovered
  const showEffect = active && isHovered;
  
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${position.x}px`,
        '--mouse-y': `${position.y}px`,
        '--glow-color': colorMap[color],
        '--glow-intensity': intensity.toString(),
      } as React.CSSProperties}
    >
      {children}
      
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-lg ${
          showEffect ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            var(--glow-color) 0%,
            transparent 60%
          )`,
          opacity: showEffect ? 0.15 * intensity : 0,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};