'use client';

import React, { ButtonHTMLAttributes } from 'react';

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const GhostButton: React.FC<GhostButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 border-2';
  
  const variants = {
    primary: 'border-primary text-primary hover:bg-primary/20 focus:ring-primary',
    secondary: 'border-secondary text-secondary hover:bg-secondary/20 focus:ring-secondary',
    accent: 'border-accent-blue text-accent-blue hover:bg-accent-blue/20 focus:ring-accent-blue',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};