"use client";
import React from 'react';

interface GradientBackgroundProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'cta' | 'about';
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'primary',
  className = '',
}) => {
  // Different gradient configurations based on variant
  const gradients = {
    primary: 'bg-gradient-to-br from-primary/20 via-dark-deeper to-blue-accent/10',
    secondary: 'bg-gradient-to-tr from-secondary/10 via-dark-deeper to-primary/10',
    accent: 'bg-gradient-to-r from-accent/10 via-dark-deeper to-blue-accent/10',
    cta: 'bg-gradient-to-b from-primary/20 via-dark-deeper to-blue-accent/10',
    about: 'bg-gradient-to-bl from-primary/10 via-dark-deeper to-blue-accent/10',
  };
  
  return (
    <div className={`absolute inset-0 ${gradients[variant]} animate-gradient-shift ${className}`}></div>
  );
};