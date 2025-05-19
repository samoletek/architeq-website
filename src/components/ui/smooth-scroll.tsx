// src/components/ui/smooth-scroll.tsx
"use client";

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Функция для плавного скроллинга
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (!href || !href.startsWith('#')) return;
      
      const targetId = href === '#' ? 'top' : href.slice(1);
      const targetElement = targetId === 'top' 
        ? document.body 
        : document.getElementById(targetId);
      
      if (!targetElement) return;
      
      e.preventDefault();
      
      window.scrollTo({
        top: targetId === 'top' ? 0 : targetElement.offsetTop - 100, // Отступ сверху
        behavior: 'smooth'
      });
    };

    // Добавляем обработчики событий для всех ссылок с хэшем
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });

    // Удаляем обработчики при размонтировании
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  return null; // Компонент не рендерит ничего в DOM
}