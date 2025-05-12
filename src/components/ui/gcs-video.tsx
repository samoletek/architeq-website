"use client";

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface GCSVideoProps {
  caseId: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  onError?: () => void;
  placeholder?: React.ReactNode;
}

export function GCSVideo({
  caseId,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  onError,
  placeholder
}: GCSVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Формируем URL для видео в Google Cloud Storage
  const bucketName = process.env.NEXT_PUBLIC_GCS_BUCKET_NAME || 'architeq-videos';
  const videoUrl = `https://storage.googleapis.com/${bucketName}/case-studies/${caseId}.mp4`;
  
  // Стили с бордером из Benefits Section и свечением как у case-card
  const containerStyles = cn(
    "bg-dark-purple/40 backdrop-blur-sm rounded-lg overflow-hidden border transition-all duration-300",
    isHovered ? "border-primary/50 shadow-neon-glow" : "border-primary/30",
    className
  );

  const handleError = () => {
    console.error(`Failed to load video: ${videoUrl}`);
    setHasError(true);
    if (onError) onError();
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // Состояние ошибки
  if (hasError) {
    return (
      <div className={cn(containerStyles, "aspect-video flex items-center justify-center p-8")}>
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-white mb-2">Case study visualization is coming soon</p>
          <p className="text-primary/60 text-sm">Our motion designers are working on it!</p>
          <p className="text-primary/40 text-xs mt-2">ID: {caseId}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className={cn(
          containerStyles,
          "relative",
          !isLoaded && "animate-pulse"
        )}
        style={{ aspectRatio: '16/9' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Загрузка */}
        {!isLoaded && !hasError && (placeholder || (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-primary/60">Loading preview...</p>
            </div>
          </div>
        ))}
        
        {/* Видео превью */}
        <video
          ref={videoRef}
          src={videoUrl}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            !isLoaded ? "opacity-0" : "opacity-100"
          )}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          onError={handleError}
          onLoadedData={handleVideoLoad}
          playsInline
        />
        
        {/* Кнопка расширения в правом нижнем углу */}
        {isLoaded && !hasError && (
          <div className="absolute bottom-4 right-4 z-10">
            <button
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 backdrop-blur-sm group"
              onClick={handleExpandClick}
              aria-label="Expand to fullscreen"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 group-hover:scale-110 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Модальное окно с полноэкранным видео */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Кнопка закрытия */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Видео на весь экран */}
            <video
              src={videoUrl}
              className="w-full h-full object-contain"
              autoPlay
              controls
              onError={handleError}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}