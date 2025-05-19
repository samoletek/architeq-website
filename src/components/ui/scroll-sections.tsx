// src/components/ui/scroll-sections.tsx
"use client";

import React, { useRef, useEffect, ReactNode, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { shouldEnableAnimations } from '@/lib/utils/animation';

// Регистрируем плагин ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionContainerProps {
  children: ReactNode;
  className?: string;
}

// Изменена экспортная декларация на export function
export function ScrollSectionContainer({ children, className = '' }: ScrollSectionContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const { isMobile, isLowPerformance } = useDeviceDetection();

  useEffect(() => {
    // Отладочные логи
  console.log("GSAP initialized:", typeof gsap !== 'undefined');
  console.log("ScrollTrigger initialized:", typeof ScrollTrigger !== 'undefined');
  console.log("Animation enabled:", isEnabled);
  console.log("Mobile:", isMobile);
  console.log("Low performance:", isLowPerformance);
  
  // Проверяем, должны ли быть включены анимации
  const enableAnimations = shouldEnableAnimations();
  console.log("Should enable animations:", enableAnimations);
  setIsEnabled(enableAnimations && !isLowPerformance && !isMobile);

    // Оптимизация для ScrollTrigger
    if (isEnabled) {
      // Уменьшаем количество обновлений для повышения производительности
      gsap.ticker.lagSmoothing(1000, 16); // Оптимизация тиков GSAP
      
      // Отключаем лишние обновления ScrollTrigger для экономии ресурсов
      ScrollTrigger.config({ 
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
      });
    }

    // Очищаем ScrollTrigger при размонтировании
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [isEnabled, isLowPerformance, isMobile]);

  return (
    <div 
      ref={containerRef} 
      className={`${className} relative ${isEnabled ? 'scroll-smooth' : ''}`}
    >
      {children}
    </div>
  );
}

interface StickySectionProps {
  children: ReactNode;
  className?: string;
  index: number; // Индекс секции для определения порядка
  duration?: number; // Продолжительность прилипания (в % от высоты вьюпорта)
}

// Изменена экспортная декларация на export function
export function StickySection({ 
  children, 
  className = '', 
  index, 
  duration = 50 
}: StickySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const { isMobile, isLowPerformance } = useDeviceDetection();

  useEffect(() => {
    // Проверяем, должны ли быть включены анимации
    const enableAnimations = shouldEnableAnimations();
    setIsEnabled(enableAnimations && !isLowPerformance && !isMobile);
    
    // Если анимации отключены, не настраиваем ScrollTrigger
    if (!enableAnimations || isLowPerformance || isMobile) return;
    
    if (sectionRef.current && contentRef.current) {
      const section = sectionRef.current;
      const content = contentRef.current;
      
      // Настраиваем ScrollTrigger для эффекта прилипания 
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top", // Начать, когда верх секции достигает верха окна
        end: `+=${duration}vh`, // Длительность эффекта в vh (viewport height)
        pin: content, // Фиксируем содержимое, а не весь контейнер
        pinSpacing: true,
        anticipatePin: 1, // Уменьшает рывки при закреплении
        markers: false, // Только для отладки - в продакшене убираем!
        scrub: false, // Отключаем scrub для более плавного эффекта
      });
      
      // Анимация перехода между секциями
      if (index > 0) { // Только для секций после первой
        gsap.fromTo(
          content,
          { 
            opacity: 0.8, 
            y: 30, // Начинаем с небольшим смещением вниз
            scale: 0.98 
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=10%", // Начинаем чуть раньше
              end: "top top+=20%",
              scrub: 0.5, // Плавная анимация при скролле
            } 
          }
        );
      }
      
      // Очистка при размонтировании компонента
      return () => {
        trigger.kill();
      };
    }
  }, [duration, isLowPerformance, isMobile, index, isEnabled]);

  return (
    <div 
      ref={sectionRef} 
      className={`${className} relative section-container`}
      data-index={index}
      style={{ 
        height: `${100 + duration}vh`,
        border: "3px solid rgba(255,0,0,0.3)",  // Красная рамка для отладки
        marginBottom: "20px" // Отступ между секциями
      }}
    >
      <div 
        ref={contentRef}
        className="w-full h-full section-content"
        style={{
            background: index % 2 === 0 ? 
              "rgba(0,0,0,0.1)" : "rgba(50,0,100,0.1)" // Чередующийся фон
          }}
      >
        {children}
      </div>
    </div>
  );
}