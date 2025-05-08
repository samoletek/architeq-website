"use client";
import React, { useState, useRef, useEffect } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}) => {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      
      const scrollY = window.scrollY;
      const element = parallaxRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementCenter = elementTop + rect.height / 2;
      const windowCenter = scrollY + window.innerHeight / 2;
      const distanceFromCenter = elementCenter - windowCenter;
      
      // Calculate parallax offset
      const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? -0.1 : 0.1);
      setOffset(parallaxOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);
  
  return (
    <div
      ref={parallaxRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        style={{ transform: `translateY(${offset}px)` }}
        className="transition-transform duration-100 ease-linear"
      >
        {children}
      </div>
    </div>
  );
};