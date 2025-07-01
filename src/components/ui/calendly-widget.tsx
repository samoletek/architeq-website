"use client";

import { useEffect, useRef, useCallback, useState } from 'react';

interface CalendlyWidgetProps {
  url: string;
  styles?: {
    height?: string;
    minWidth?: string;
    width?: string;
    transform?: string;
    transformOrigin?: string;
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
  const [isLoading, setIsLoading] = useState(true);

  // Функция для инициализации виджета
  const initWidget = useCallback(() => {
    // Проверяем что виджет еще не инициализирован
    if (typeof window !== 'undefined' && window.Calendly && calendlyRef.current) {
      // Проверяем что в контейнере еще нет iframe (избегаем дублирования)
      const existingIframe = calendlyRef.current.querySelector('iframe');
      if (existingIframe) {
        setIsLoading(false);
        return;
      }
      
      // Очищаем контейнер перед инициализацией
      calendlyRef.current.innerHTML = '';
      
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
      
      // Устанавливаем таймер для скрытия загрузки
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, [url, prefill]);

  // Загрузка скрипта Calendly
  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    
    const loadWidget = () => {
      if (typeof window !== 'undefined' && !window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => initWidget();
        document.head.appendChild(script);
      } else if (window.Calendly) {
        // Если скрипт уже загружен, инициализируем виджет
        initWidget();
      }
      
      // Устанавливаем таймаут на случай, если виджет загружается слишком долго
      loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    };
    
    loadWidget();
    
    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [url]); // Зависимость только от URL

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
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-gray/50 z-10 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-3"></div>
            <p className="text-light-gray">Loading...</p>
          </div>
        </div>
      )}
      <div 
        ref={calendlyRef}
        className={`calendly-inline-widget ${className}`} 
        style={styles}
        data-auto-load="false"
      ></div>
    </div>
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