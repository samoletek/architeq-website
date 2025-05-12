'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface GradientFollowProps {
  children: React.ReactNode;
  className?: string;
  // Цвета градиента
  gradientColors?: string[];
  // Тип градиента: первичный, вторичный или пользовательский
  gradientType?: 'primary' | 'secondary' | 'blue' | 'custom';
  // Радиус градиента в %
  gradientSize?: number;
  // Интенсивность градиента (от 0 до 1)
  intensity?: number;
  // Включить размытие
  blur?: boolean;
  // Размер размытия в пикселях
  blurSize?: number;
  // Скорость анимации движения (от 0 до 1, где 1 - мгновенное)
  followSpeed?: number;
  // Непрерывное движение градиента
  continuousMovement?: boolean;
  // Стиль контейнера
  containerStyle?: React.CSSProperties;
}

const GradientFollow: React.FC<GradientFollowProps> = ({
  children,
  className,
  gradientType = 'primary',
  gradientColors,
  gradientSize = 30,
  intensity = 0.7,
  blur = true,
  blurSize = 40,
  followSpeed = 0.7,
  continuousMovement = false,
  containerStyle,
}) => {
  // Получаем ссылку на контейнер
  const containerRef = useRef<HTMLDivElement>(null);
  // Состояние для отслеживания положения градиента
  const [position, setPosition] = useState({ x: 50, y: 50 });
  // Данные для анимации
  const animationRef = useRef<number | null>(null);
  const targetPosition = useRef({ x: 50, y: 50 });
  // Определяем возможности устройства
  const { isMobile, isLowPerformance } = useDeviceDetection();

  // Функция для определения цветов градиента
  const getGradientColors = (): string[] => {
    if (gradientColors && gradientColors.length >= 2) {
      return gradientColors;
    }

    switch (gradientType) {
      case 'primary':
        return ['rgba(119, 71, 207, ' + intensity + ')', 'rgba(77, 173, 255, ' + intensity + ')'];
      case 'secondary':
        return ['rgba(176, 255, 116, ' + intensity + ')', 'rgba(0, 245, 212, ' + intensity + ')'];
      case 'blue':
        return ['rgba(77, 173, 255, ' + intensity + ')', 'rgba(0, 120, 255, ' + intensity + ')'];
      case 'custom':
      default:
        return ['rgba(119, 71, 207, ' + intensity + ')', 'rgba(77, 173, 255, ' + intensity + ')'];
    }
  };

  // Обновление положения градиента при движении мыши
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && !isLowPerformance) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      targetPosition.current = { x, y };
      
      if (followSpeed === 1) {
        // Мгновенное перемещение
        setPosition({ x, y });
      } else if (!animationRef.current) {
        // Запуск анимации плавного перемещения
        animateGradientMovement();
      }
    }
  };

  // Анимация непрерывного движения
  useEffect(() => {
    if (continuousMovement && !isLowPerformance && !isMobile) {
      const interval = setInterval(() => {
        const x = 50 + Math.sin(Date.now() / 3000) * 30;
        const y = 50 + Math.cos(Date.now() / 4000) * 30;
        
        targetPosition.current = { x, y };
        if (!animationRef.current) {
          animateGradientMovement();
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [continuousMovement, isLowPerformance, isMobile]);

  // Функция для плавной анимации движения градиента
  const animateGradientMovement = () => {
    if (!containerRef.current || isLowPerformance) return;
    
    const animate = () => {
      setPosition(prev => {
        // Расчет нового положения с эффектом плавности
        const dx = (targetPosition.current.x - prev.x) * followSpeed;
        const dy = (targetPosition.current.y - prev.y) * followSpeed;
        
        const newX = prev.x + dx;
        const newY = prev.y + dy;
        
        // Если мы почти достигли цели, останавливаем анимацию
        const isCloseEnough = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1;
        
        if (isCloseEnough && !continuousMovement) {
          animationRef.current = null;
          return { x: targetPosition.current.x, y: targetPosition.current.y };
        }
        
        animationRef.current = requestAnimationFrame(animate);
        return { x: newX, y: newY };
      });
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Очистка анимации при размонтировании
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Автоматическое начальное положение для мобильных устройств
  useEffect(() => {
    if (isMobile || isLowPerformance) {
      setPosition({ x: 50, y: 30 });
    }
  }, [isMobile, isLowPerformance]);

  // Генерируем радиальный градиент на основе текущего положения
  const gradientBackground = () => {
    const colors = getGradientColors();
    const blurFilter = blur ? `blur(${blurSize}px)` : '';
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${colors[0]} 0%, ${colors[1]} ${gradientSize}%, transparent 100%)`,
      filter: blurFilter,
      opacity: isLowPerformance ? 0.3 : 1,
      mixBlendMode: 'screen',
      zIndex: 0,
    };
  };

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      style={{ ...containerStyle }}
    >
      {/* Градиентный фон */}
      <div style={gradientBackground()} />
      
      {/* Содержимое */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientFollow;