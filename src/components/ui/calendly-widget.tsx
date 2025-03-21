"use client";

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    // Убедимся, что Calendly API загружен
    if (typeof window !== 'undefined' && !window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Очистка при размонтировании компонента
    return () => {
      if (calendlyRef.current && window.Calendly) {
        window.Calendly.destroyBadgeWidget(calendlyRef.current);
      }
    };
  }, []);

  useEffect(() => {
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
          customAnswers?: {
            a1?: string;
            a2?: string;
            a3?: string;
          }
        }
      }) => void;
      destroyBadgeWidget: (element: HTMLElement) => void;
    };
  }
}