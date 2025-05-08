"use client";

import React from 'react';

interface GlassmorphismProps {
  children: React.ReactNode;
  variant?: 'light' | 'medium' | 'strong' | 'purple' | 'blue' | 'card' | 'nav';
  className?: string;
}

export const Glassmorphism: React.FC<GlassmorphismProps> = ({
  children,
  variant = 'medium',
  className = '',
}) => {
  const variantClasses = {
    light: 'glass-light',
    medium: 'glass-medium',
    strong: 'glass-strong',
    purple: 'glass-purple',
    blue: 'glass-blue',
    card: 'glass-card',
    nav: 'glass-nav',
  };

  const selectedClass = variantClasses[variant];

  return (
    <div className={`${selectedClass} ${className}`}>
      {children}
    </div>
  );
};