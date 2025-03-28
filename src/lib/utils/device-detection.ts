// src/lib/utils/device-detection.ts
import { useEffect, useState } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type OrientationType = 'portrait' | 'landscape';
export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface DeviceInfo {
  // Тип устройства
  device: DeviceType;
  // Удобные булевы значения для проверки
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  // Ориентация устройства
  orientation: OrientationType;
  isPortrait: boolean;
  isLandscape: boolean;
  // Текущая точка останова (breakpoint) на основе Tailwind
  breakpoint: BreakpointType;
  // Размеры окна
  width: number;
  height: number;
  // Производительность устройства
  isLowPerformance: boolean;
  // Поддержка сенсорного ввода
  hasTouch: boolean;
}

/**
 * Преобразует ширину экрана в точку останова Tailwind
 */
function getBreakpoint(width: number): BreakpointType {
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

/**
 * Определяет тип устройства на основе ширины экрана
 */
function getDeviceType(width: number): DeviceType {
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Определяет ориентацию устройства
 */
function getOrientation(width: number, height: number): OrientationType {
  return width > height ? 'landscape' : 'portrait';
}

/**
 * Определяет, является ли устройство маломощным
 * Используем эвристический подход, основанный на типе устройства и User-Agent
 */
function detectLowPerformance(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Проверяем, есть ли признаки маломощного устройства в User-Agent
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isOldBrowser = 
    /msie\s[1-8]|trident\/[1-6]|edge\/[1-12]/i.test(ua) || 
    /firefox\/[1-50]/i.test(ua) ||
    /chrome\/[1-50]/i.test(ua);
  
  // Если это старый браузер или мобильное устройство с низким разрешением, считаем его маломощным
  return isOldBrowser || (isMobile && window.innerWidth < 768);
}

/**
 * Проверяет наличие сенсорного ввода
 */
function detectTouch(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Проверяем поддержку сенсорного экрана различными способами
  return 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    // Безопасно проверяем наличие свойства msMaxTouchPoints
    !!(navigator as unknown as { msMaxTouchPoints?: number }).msMaxTouchPoints;
}

/**
 * Хук для определения информации об устройстве
 */
export function useDeviceDetection(): DeviceInfo {
  // Функция для получения полной информации об устройстве
  const getDeviceInfo = (): DeviceInfo => {
    if (typeof window === 'undefined') {
      // Возвращаем значения по умолчанию для SSR
      return {
        device: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
        isPortrait: false,
        isLandscape: true,
        breakpoint: 'lg',
        width: 1024,
        height: 768,
        isLowPerformance: false,
        hasTouch: false
      };
    }
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const device = getDeviceType(width);
    const orientation = getOrientation(width, height);
    const breakpoint = getBreakpoint(width);
    const isLowPerformance = detectLowPerformance();
    const hasTouch = detectTouch();
    
    return {
      device,
      isMobile: device === 'mobile',
      isTablet: device === 'tablet',
      isDesktop: device === 'desktop',
      orientation,
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape',
      breakpoint,
      width,
      height,
      isLowPerformance,
      hasTouch
    };
  };
  
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDeviceInfo());
  
  useEffect(() => {
    // Обновляем информацию при изменении размера окна
    const updateDeviceInfo = () => {
      setDeviceInfo(getDeviceInfo());
    };
    
    // Добавляем слушатель для resize
    window.addEventListener('resize', updateDeviceInfo);
    
    // Добавляем слушатель для изменения ориентации
    window.addEventListener('orientationchange', updateDeviceInfo);
    
    // Очищаем слушатели при размонтировании
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);
  
  return deviceInfo;
}

/**
 * Хук для определения, было ли устройство повернуто
 */
export function useOrientationChange(): {
  orientation: OrientationType;
  hasChanged: boolean;
} {
  const { orientation } = useDeviceDetection();
  const [initialOrientation, setInitialOrientation] = useState<OrientationType | null>(null);
  const [hasChanged, setHasChanged] = useState(false);
  
  useEffect(() => {
    if (initialOrientation === null) {
      setInitialOrientation(orientation);
    } else if (initialOrientation !== orientation) {
      setHasChanged(true);
    }
  }, [orientation, initialOrientation]);
  
  return { orientation, hasChanged };
}

/**
 * Утилита для определения, нужно ли загружать тяжелую анимацию на текущем устройстве
 * Эта функция должна использоваться только внутри React-компонентов!
 */
export function useHeavyAnimations(): boolean {
  const { isDesktop, isLowPerformance } = useDeviceDetection();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);
  
  // Включаем тяжелые анимации только на мощных десктопах без предпочтения к уменьшению движения
  return isDesktop && !isLowPerformance && !prefersReducedMotion;
}

/**
 * Хук для определения видимости элемента в области просмотра
 */
export function useIsVisible(ref: React.RefObject<HTMLElement>): boolean {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Элемент считается видимым, когда 10% его площади в области просмотра
    );
    
    observer.observe(currentRef);
    
    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref]);
  
  return isVisible;
}