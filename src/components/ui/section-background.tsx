// src/components/ui/section-background.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useScroll } from 'framer-motion';

interface SectionBackgroundProps {
  colors: string[];
  activeSection: number;
}

export default function SectionBackground({ 
  colors, 
  activeSection = 0 
}: SectionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState<string>(colors[0] || '');
  const [nextColor, setNextColor] = useState<string>(colors[1] || '');
  const [progress, setProgress] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    // Обновляем текущий и следующий цвета на основе активной секции
    setCurrentColor(colors[activeSection] || colors[0] || '');
    
    const nextIndex = (activeSection + 1) % colors.length;
    setNextColor(colors[nextIndex] || colors[0] || '');
    
    // Следим за прогрессом скролла для плавного перехода между цветами
    const unsubscribe = smoothProgress.onChange((value) => {
      // Преобразуем глобальный прогресс скролла в прогресс для текущей секции
      const sectionProgress = (value * colors.length) % 1;
      setProgress(sectionProgress);
    });
    
    return () => {
      unsubscribe();
    };
  }, [activeSection, colors, smoothProgress]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: progress < 0.5 
          ? `linear-gradient(to bottom, ${currentColor}, ${nextColor})` 
          : `linear-gradient(to bottom, ${nextColor}, ${currentColor})`,
        opacity: 1,
        transition: 'background 0.5s ease'
      }}
    >
      {/* Дополнительные эффекты фона можно добавить здесь */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}