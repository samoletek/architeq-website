'use client';

import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  scrollDirection: 'up' | 'down' | null;
}

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';

      setScrollPosition({
        scrollY,
        scrollX,
        scrollDirection,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollPosition;
};