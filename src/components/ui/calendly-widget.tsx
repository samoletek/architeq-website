"use client";

import { useEffect, useRef, useCallback } from 'react';

interface CalendlyWidgetProps {
  url: string;
  styles?: {
    height?: string;
    minWidth?: string;
    width?: string;
  };
  className?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: {
      a1?: string;
      a2?: string;
      a3?: string;
    };
  };
}

export default function CalendlyWidget({ 
  url, 
  styles = { 
    height: '630px',
    minWidth: '320px',
    width: '100%'
  }, 
  className = '',
  prefill
}: CalendlyWidgetProps) {
  const calendlyRef = useRef<HTMLDivElement>(null);

  // Функция для инициализации виджета
  const initWidget = useCallback(() => {
    // Инициализируем виджет, когда Calendly API загружен
    if (typeof window !== 'undefined' && window.Calendly && calendlyRef.current) {
      if (prefill) {
        // Если есть данные для предзаполнения, используем их
        window.Calendly.initInlineWidget({
          url: url,
          parentElement: calendlyRef.current,
          prefill: {
            name: prefill.name,
            email: prefill.email,
            customAnswers: prefill.customAnswers
          }
        });
      } else {
        // Без предзаполнения
        window.Calendly.initInlineWidget({
          url: url,
          parentElement: calendlyRef.current
        });
      }
    }
  }, [url, prefill]);

  // Загрузка скрипта Calendly
  useEffect(() => {
    // Убедимся, что Calendly API загружен
    if (typeof window !== 'undefined' && !window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = initWidget; // Инициализируем после загрузки скрипта
      document.head.appendChild(script);
    } else {
      // Если скрипт уже загружен, просто инициализируем виджет
      initWidget();
    }
  }, [initWidget]);

// Очистка при размонтировании компонента
useEffect(() => {
  const currentRef = calendlyRef.current;
  
  return () => {
    if (currentRef && window.Calendly) {
      try {
        window.Calendly.destroyBadgeWidget(currentRef);
      } catch (e) {
        console.error('Error destroying Calendly widget:', e);
      }
    }
  };
}, []);

  return (
    <div 
      ref={calendlyRef}
      className={`calendly-inline-widget ${className}`} 
      style={styles}
      data-auto-load="false"
    ></div>
  );
}

// Добавим типы для Calendly API
declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        }
      }) => void;
      destroyBadgeWidget: (element: HTMLElement) => void;
    };
  }
}