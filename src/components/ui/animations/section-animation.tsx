// src/components/ui/animations/section-animation.tsx
import React, { ReactNode, useRef } from 'react';
import { useInView } from 'framer-motion';

interface SectionAnimationProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'none';
  delay?: number;
}

export const SectionAnimation: React.FC<SectionAnimationProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const getAnimationClass = () => {
    if (animation === 'none') return '';
    
    return isInView 
      ? `animate-${animation} opacity-100` 
      : 'opacity-0';
  };
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ${getAnimationClass()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};