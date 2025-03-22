// src/components/ui/image-with-fallback.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackClassName?: string;
  fallbackText?: string;
  style?: React.CSSProperties;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  width,
  height,
  fallbackClassName,
  fallbackText,
  style
}: ImageWithFallbackProps) {
  // Проверяем, является ли путь относительным или абсолютным URL
  const isValidImage = src && (src.startsWith('/') || src.startsWith('http'));
  
  if (!isValidImage) {
    // Отображаем заглушку с градиентом
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-medium-gray to-dark-gray flex items-center justify-center",
          fallbackClassName,
          className
        )}
        style={style || { height: height ? `${height}px` : '200px', width: width ? `${width}px` : '100%' }}
      >
        <span className="text-primary text-lg font-bold">{fallbackText || alt.charAt(0)}</span>
      </div>
    );
  }
  
  // Отображаем реальное изображение
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 500}
      height={height || 300}
      className={className}
      style={style}
    />
  );
}