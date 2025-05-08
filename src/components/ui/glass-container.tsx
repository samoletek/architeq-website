import React, { ReactNode } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      relative
      bg-dark-deeper/40
      backdrop-blur-md
      border
      border-primary/20
      rounded-lg
      shadow-xl
      shadow-primary/5
      overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  );
};