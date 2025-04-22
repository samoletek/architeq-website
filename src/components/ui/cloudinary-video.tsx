// src/components/ui/cloudinary-video.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowPerformance } = useDeviceDetection();
  
  // Проверяем publicId
  useEffect(() => {
    if (!publicId) {
      console.warn("CloudinaryVideo: Missing publicId");
      setHasError(true);
    }
  }, [publicId]);
  
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
    console.log(`Failed to load video for case: ${publicId}`);
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

  // Закрытие модального окна по Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Обработчик клика по видео
  const handlePlayClick = () => {
    if (hasError) return; // Не открываем модальное окно, если есть ошибка
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        ref={videoRef}
        className={cn(
          "relative overflow-hidden rounded-lg bg-dark-gray cursor-pointer", 
          !isLoaded && !hasError && "animate-pulse",
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlayClick}
      >
        {/* Состояние ошибки - показываем заглушку */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-gray p-4">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-light-gray mb-2">Case study visualization is coming soon</p>
              <p className="text-light-gray/60 text-sm">Our motion designers are working on it!</p>
              {publicId && <p className="text-light-gray/40 text-xs mt-2">ID: {publicId}</p>}
            </div>
          </div>
        )}
        
        {/* Пользовательский placeholder */}
        {!isLoaded && !hasError && placeholder ? placeholder : null}
        
        {/* Превью или заглушка */}
        {!hasError && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-gray">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-light-gray">View Demo</p>
            </div>
          </div>
        )}
        
        {/* Тонированная подложка при наведении */}
        {!hasError && (
          <div className={cn(
            "absolute inset-0 bg-black transition-opacity duration-300",
            isHovered ? "opacity-40" : "opacity-0"
          )} />
        )}
        
        {/* Кнопка Play при наведении */}
        {!hasError && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            isHovered ? "scale-110 opacity-100" : "scale-100 opacity-80"
          )}>
            <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Видео Cloudinary */}
        {isVisible && !hasError && (
          <div className={cn(
            "w-full h-full transition-opacity duration-500",
            !isLoaded ? "opacity-0" : "opacity-100"
          )}>
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

      {/* Модальное окно с видео */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-dark-gray rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Видео в модальном окне */}
              <div className="w-full aspect-video">
                <CldVideoPlayer
                  width="100%"
                  height="100%"
                  src={`case-studies/${publicId}`}
                  autoPlay={true}
                  loop={loop}
                  muted={muted}
                  controls={true}
                  onError={handleError}
                  className="w-full h-full object-cover"
                  transformation={{
                    quality: 'auto:best',
                    format: 'auto'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}