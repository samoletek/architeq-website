// src/components/ui/image-with-fallback.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export type ImageCategory = 'team' | 'solution' | 'testimonial' | 'case' | 'project' | 'default';

export interface ImageWithFallbackProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackClassName?: string;
  fallbackText?: string;
  category?: ImageCategory;
  containerClassName?: string;
  forceShowFallback?: boolean;
  placeholderIcon?: React.ReactNode;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string; // Например: '1/1', '16/9'
}

export function ImageWithFallback({
  src,
  alt,
  className,
  width = 300,
  height = 300,
  fallbackClassName,
  fallbackText,
  category = 'default',
  containerClassName,
  priority = false,
  forceShowFallback = false,
  placeholderIcon,
  objectFit = 'cover',
  aspectRatio,
  quality,
  sizes,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useDeviceDetection();
  
  // Сбрасываем состояние ошибки при изменении src
  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);
  
  // Функция для определения цвета заглушки на основе категории
  const getFallbackGradient = () => {
    switch (category) {
      case 'team': return 'from-[#333333] to-[#1E1E1E]';
      case 'solution': return 'from-primary/30 to-dark-gray';
      case 'testimonial': return 'from-neon-blue/30 to-dark-gray';
      case 'case': return 'from-neon-purple/30 to-dark-gray';
      case 'project': return 'from-neon-blue/40 to-[#1E1E1E]';
      default: return 'from-medium-gray to-dark-gray';
    }
  };
  
  // Функция для определения иконки для заглушки
  const getFallbackIcon = () => {
    // Если предоставлена своя иконка, используем её
    if (placeholderIcon) return placeholderIcon;
    
    switch (category) {
      case 'team':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'solution':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'testimonial':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'case':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'project':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      default:
        return (
          <span className="text-3xl font-bold">{fallbackText || alt.charAt(0).toUpperCase()}</span>
        );
    }
  };
  
  // Проверяем, является ли путь относительным или абсолютным URL
  const isValidImage = src && (src.startsWith('/') || src.startsWith('http'));
  const shouldShowFallback = !isValidImage || error || forceShowFallback;
  
  // Определяем класс для objectFit
  const objectFitClass = {
    'cover': 'object-cover',
    'contain': 'object-contain',
    'fill': 'object-fill',
    'none': 'object-none',
    'scale-down': 'object-scale-down'
  }[objectFit];
  
  // Дополнительные стили для контейнера
  const containerStyle: React.CSSProperties = {
    ...(aspectRatio && { aspectRatio }),
    height: !aspectRatio ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    width: !aspectRatio ? (typeof width === 'number' ? `${width}px` : width) : undefined,
  };
  
  if (shouldShowFallback) {
    // Отображаем заглушку с градиентом
    return (
      <div
        className={cn(
          `bg-gradient-to-br ${getFallbackGradient()} flex items-center justify-center rounded-lg overflow-hidden`,
          fallbackClassName,
          containerClassName
        )}
        style={containerStyle}
        role="img"
        aria-label={alt}
      >
        <div className="text-white opacity-70">
          {getFallbackIcon()}
        </div>
      </div>
    );
  }
  
  // Отображаем реальное изображение с ленивой загрузкой
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg", 
        containerClassName,
        !loaded && "bg-gradient-to-br from-dark-gray to-medium-gray animate-pulse"
      )}
      style={containerStyle}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "rounded-lg transition-opacity duration-300",
          objectFitClass,
          !loaded && "opacity-0",
          loaded && "opacity-100",
          className
        )}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        quality={quality || (isMobile ? 75 : 90)} // Уменьшаем качество на мобильных устройствах
        sizes={sizes || (isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw")}
        {...props}
      />
    </div>
  );
}