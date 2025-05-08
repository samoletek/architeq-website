"use client";
import React, { useState, useRef, useEffect } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);
  
  // CSS classes for different animations
  const animationClasses = {
    'fade-up': 'transform translate-y-16 opacity-0',
    'fade-down': 'transform -translate-y-16 opacity-0',
    'fade-left': 'transform translate-x-16 opacity-0',
    'fade-right': 'transform -translate-x-16 opacity-0',
    'zoom-in': 'transform scale-95 opacity-0',
  };
  
  const styles = {
    transition: `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? 'transform-none opacity-100' : animationClasses[animation]}`}
      style={styles}
    >
      {children}
    </div>
  );
};