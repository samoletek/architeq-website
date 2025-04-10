// src/components/ui/cloudinary-video.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface CloudinaryVideoProps {
  publicId: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  onError?: () => void;
  placeholder?: React.ReactNode;
}

export function CloudinaryVideo({
  publicId,
  width = 800,
  height = 450,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  className,
  onError,
  placeholder
}: CloudinaryVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowPerformance } = useDeviceDetection();
  
  // Определим качество видео в зависимости от устройства
  const quality = isMobile || isLowPerformance ? 'auto:low' : 'auto:good';
  
  // Используем Intersection Observer для ленивой загрузки
  useEffect(() => {
    if (!videoRef.current) return;
    
    // Сохраняем ссылку на DOM элемент
    const currentElement = videoRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(currentElement);
    
    return () => {
      // Используем сохраненную ссылку в функции очистки
      observer.unobserve(currentElement);
    };
  }, []);

  // Обработчик события ошибки
  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // Проверка, когда видео загружено
  useEffect(() => {
    // Используем setTimeout, чтобы дать время загрузиться видео
    const timer = setTimeout(() => {
      if (isVisible && !hasError) {
        setIsLoaded(true);
      }
    }, 1000); // Задержка 1 секунда
    
    return () => clearTimeout(timer);
  }, [isVisible, hasError]);

  return (
    <div 
      ref={videoRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-dark-gray", 
        !isLoaded && !hasError && "animate-pulse",
        className
      )}
      style={{ aspectRatio: `${width}/${height}` }}
    >
        {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-gray p-4">
            <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-light-gray mb-2">Case study visualization is coming soon</p>
            <p className="text-light-gray/60 text-sm">Our motion designers are working on it!</p>
            </div>
        </div>
        )}
      
      {!isLoaded && !hasError && placeholder ? placeholder : null}
      
      {isVisible && !hasError && (
        <div className={cn(!isLoaded && "opacity-0", "transition-opacity duration-500")}>
          <CldVideoPlayer
            width={width}
            height={height}
            src={`case-studies/${publicId}`}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            controls={controls}
            onError={handleError}
            className="w-full h-full object-cover"
            transformation={{
              quality,
              format: 'auto'
            }}
          />
        </div>
      )}
    </div>
  );
}