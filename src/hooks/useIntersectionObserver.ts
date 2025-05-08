import { useState, useEffect, RefObject } from 'react';

interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionOptions = {},
  once = true
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      
      // Отключаем наблюдение после первого появления, если необходимо
      if (entry.isIntersecting && once) {
        observer.disconnect();
      }
    }, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0
    });
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, options.root, options.rootMargin, options.threshold, once]);
  
  return isVisible;
}