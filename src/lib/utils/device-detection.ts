// src/lib/utils/device-detection.ts
import { useEffect, useState } from 'react';

export function useDeviceDetection() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDevice('mobile');
      } else if (width < 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };
    
    // Определяем начальный тип устройства
    updateDeviceType();
    
    // Добавляем слушатель для resize
    window.addEventListener('resize', updateDeviceType);
    
    // Очищаем слушатель при размонтировании
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);
  
  return {
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop'
  };
}