// src/components/ui/cloudinary-video.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
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

// Функция для создания URL видео из Cloudinary
function getCloudinaryUrl(publicId: string, options: Record<string, any> = {}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.error('Cloudinary cloud name is not defined in environment variables');
    return '';
  }
  
  const transformations = [];
  
  // Добавляем трансформации, если они есть
  if (options.quality) {
    transformations.push(`q_${options.quality}`);
  }
  
  if (options.format) {
    transformations.push(`f_${options.format}`);
  }
  
  // Формируем URL
  const transformationString = transformations.length > 0 
    ? `${transformations.join(',')}` 
    : '';
  
  // Проверяем, включает ли publicId путь к папке
  const fullPublicId = publicId.includes('/') ? publicId : `case-studies/${publicId}`;
  
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformationString}/${fullPublicId}`;
}

// Функция для проверки доступности видео (предварительная загрузка с HEAD запросом)
async function checkVideoAvailability(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Error checking video availability for ${url}:`, error);
    return false;
  }
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
  const [videoAvailable, setVideoAvailable] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowPerformance } = useDeviceDetection();
  
  // Проверяем publicId
  useEffect(() => {
    if (!publicId) {
      console.warn("CloudinaryVideo: Missing publicId");
      setHasError(true);
      return;
    }
    
    // Формируем URL для видео
    const videoUrl = getCloudinaryUrl(publicId, {
      quality: isMobile || isLowPerformance ? 'auto' : 'auto',
      format: 'auto'
    });
    
    // Проверяем доступность видео
    const checkAvailability = async () => {
      const isAvailable = await checkVideoAvailability(videoUrl);
      setVideoAvailable(isAvailable);
      if (!isAvailable) {
        console.error(`Video not available for case: ${publicId}`);
        setHasError(true);
        if (onError) onError();
      }
    };
    
    checkAvailability();
  }, [publicId, isMobile, isLowPerformance, onError]);
  
  // Используем Intersection Observer для ленивой загрузки
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Обработчик события ошибки
  const handleError = () => {
    console.error(`Failed to load video for case: ${publicId}`);
    setHasError(true);
    if (onError) onError();
  };

  // Обработчик события загрузки видео
  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

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

  // Формируем URL для видео
  const videoUrl = publicId ? getCloudinaryUrl(publicId, {
    quality: isMobile || isLowPerformance ? 'auto' : 'auto',
    format: 'auto'
  }) : '';

  // Определяем, показывать ли заглушку
  const shouldShowFallback = hasError || !publicId || videoAvailable === false;

  return (
    <>
      <div 
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-lg bg-dark-gray cursor-pointer", 
          !isLoaded && !shouldShowFallback && "animate-pulse",
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlayClick}
      >
        {/* Состояние ошибки - показываем заглушку */}
        {shouldShowFallback && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-gray p-4">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0021 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-light-gray mb-2">Case study visualization is coming soon</p>
              <p className="text-light-gray/60 text-sm">Our motion designers are working on it!</p>
              {publicId && <p className="text-light-gray/40 text-xs mt-2">ID: {publicId}</p>}
            </div>
          </div>
        )}
        
        {/* Пользовательский placeholder */}
        {!isLoaded && !shouldShowFallback && placeholder ? placeholder : null}
        
        {/* Превью или заглушка для загрузки */}
        {!shouldShowFallback && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-gray">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-light-gray">Loading preview...</p>
            </div>
          </div>
        )}
        
        {/* Тонированная подложка при наведении */}
        {!shouldShowFallback && (
          <div className={cn(
            "absolute inset-0 bg-black transition-opacity duration-300",
            isHovered ? "opacity-40" : "opacity-0"
          )} />
        )}
        
        {/* Кнопка Play при наведении */}
        {!shouldShowFallback && (
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
        
        {/* Видео */}
        {isVisible && !shouldShowFallback && videoUrl && (
          <div className={cn(
            "w-full h-full transition-opacity duration-500",
            !isLoaded ? "opacity-0" : "opacity-100"
          )}>
            <video
              ref={videoRef}
              width={width}
              height={height}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              controls={controls}
              onError={handleError}
              onLoadedData={handleVideoLoad}
              className="w-full h-full object-cover"
              playsInline
              src={videoUrl}
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
                {videoUrl && (
                  <video
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    autoPlay={true}
                    loop={loop}
                    muted={false}
                    controls={true}
                    onError={handleError}
                    className="w-full h-full object-cover"
                    playsInline
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}