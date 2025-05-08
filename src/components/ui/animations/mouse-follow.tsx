"use client";

import React from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface MouseFollowProps {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  className?: string;
}

export const MouseFollow: React.FC<MouseFollowProps> = ({
  children,
  color = '#B24BF3',
  size = 8,
  className = '',
}) => {
  const { x, y } = useMousePosition();

  return (
    <div
      className={`cursor-follower fixed pointer-events-none z-50 transition-transform duration-100 ${className}`}
      style={{
        width: size,
        height: size,
        transform: `translate(${x}px, ${y}px)`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    >
      {children}
    </div>
  );
};