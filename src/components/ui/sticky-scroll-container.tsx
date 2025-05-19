// src/components/ui/sticky-scroll-container.tsx
"use client";

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils/utils';

interface StickyScrollContainerProps {
  children: ReactNode;
  className?: string;
  backgroundColors?: string[];
}

// Интерфейс для пропсов, которые мы передаем в дочерний компонент
interface ChildProps {
  index?: number;
  backgroundColor?: string;
}

export default function StickyScrollContainer({
  children,
  className,
  backgroundColors = []
}: StickyScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  useEffect(() => {
    // Находим все секции внутри контейнера
    const sections = containerRef.current?.querySelectorAll('[data-section-index]') || [];
    
    // Функция для определения активной секции при скролле
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Логируем для отладки
      console.log(`Scroll position: ${scrollPosition}`);
      
      // Находим текущую активную секцию на основе положения
      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionIndexAttr = sectionElement.dataset.sectionIndex;
        
        // Проверяем, есть ли атрибут data-section-index
        if (sectionIndexAttr) {
          const sectionIndex = parseInt(sectionIndexAttr, 10);
          
          // Точка активации - когда верхняя граница секции находится по центру viewport
          // или немного выше
          if (
            scrollPosition >= sectionTop - viewportHeight * 0.4 &&
            scrollPosition < sectionTop + sectionHeight - viewportHeight * 0.6
          ) {
            console.log(`Setting active section to ${sectionIndex}`);
            setActiveSection(sectionIndex);
            
            // Добавляем класс для визуального отслеживания активной секции
            document.querySelectorAll('.active-section').forEach(el => {
              el.classList.remove('active-section');
            });
            sectionElement.classList.add('active-section');
          }
        }
      });
    };
    
    // Добавляем обработчик события скролла
    window.addEventListener('scroll', handleScroll);
    
    // Вызываем handleScroll один раз при монтировании для установки начального состояния
    handleScroll();
    
    // Инициализируем отладочный элемент
    const debugElement = document.createElement('div');
    debugElement.id = 'sticky-debug';
    debugElement.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 9999;
      font-size: 12px;
      pointer-events: none;
    `;
    document.body.appendChild(debugElement);
    
    // Обновляем отладочный элемент при скролле
    const updateDebug = () => {
      const debugEl = document.getElementById('sticky-debug');
      if (debugEl) {
        debugEl.innerHTML = `
          <div>Scroll: ${window.scrollY.toFixed(0)}px</div>
          <div>Active section: ${activeSection}</div>
          <div>Viewport height: ${window.innerHeight}px</div>
        `;
      }
    };
    
    window.addEventListener('scroll', updateDebug);
    updateDebug(); // Инициализируем
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateDebug);
      document.getElementById('sticky-debug')?.remove();
    };
  }, [activeSection]); // Добавляем activeSection в массив зависимостей
  
  // Модифицируем дочерние элементы
  const childrenWithProps = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      const childProps: ChildProps = {
        index: i,
        backgroundColor: backgroundColors[i % backgroundColors.length] || undefined
      };
      
      return React.cloneElement(child, childProps);
    }
    return child;
  });
  
  return (
    <div 
      ref={containerRef} 
      className={cn("relative min-h-screen", className)}
      data-active-section={activeSection}
    >
      {childrenWithProps}
    </div>
  );
}