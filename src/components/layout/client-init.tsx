"use client";

import { useEffect } from 'react';

export function ClientInit() {
  useEffect(() => {
    // Небольшая задержка для плавной загрузки
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}