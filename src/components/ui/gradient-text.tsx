"use client";
import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'blue';
  animated?: boolean;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  variant = 'primary',
  animated = true,
  className = '',
}) => {
  // Different gradient configurations based on variant
  const gradients = {
    primary: 'from-primary to-blue-accent',
    secondary: 'from-secondary to-primary',
    accent: 'from-accent to-primary',
    blue: 'from-blue-accent to-secondary',
  };
  
  const baseClasses = 'bg-clip-text text-transparent';
  const gradientClasses = `bg-gradient-to-r ${gradients[variant]}`;
  const animationClasses = animated ? 'bg-size-200 animate-gradient-shift' : '';
  
  return (
    <span className={`${baseClasses} ${gradientClasses} ${animationClasses} ${className}`}>
      {children}
    </span>
  );
};