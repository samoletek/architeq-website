// src/components/sections/hero-section.tsx
"use client";

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
}

export default function HeroSection({
  _title = "Architect your workflow",
  _subtitle = "Scale with confidence",
  _description = "We build digital systems that flex, scale, and adapt — for companies across industries.",
  primaryCta = {
    text: "Explore Solutions",
    href: "/services"
  }
}: HeroSectionProps) {  
  const { isMobile, isLowPerformance } = useDeviceDetection();
  const [isMounted, setIsMounted] = useState(false);
  
  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Разбиваем описание на две строки примерно поровну по словам
  const descriptionParts = [
    "We build digital systems that flex, scale,",
    "and adapt — for companies across industries."
  ];

  // Если компонент не смонтирован на клиенте, возвращаем статический контент
  if (!isMounted) {
    return (
      <section className="py-16 md:py-24">
        <div className="container px-6 mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="accent-text">Architect</span> your workflow
            <br />
            <span className="accent-text">Scale</span> with confidence
          </h1>
          <div className="text-base md:text-lg text-white/70 mt-10 font-sans">
            <p>{descriptionParts[0]}</p>
            <p>{descriptionParts[1]}</p>
          </div>
          <div className="mt-10">
            <Button variant="secondary" size="md" href={primaryCta.href} className="shadow-neon-green-glow px-6 py-2 text-sm">
              {primaryCta.text}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Фиксированный статический градиент для слов
  const staticGradientStyle = {
    background: 'linear-gradient(90deg, #B0FF74 0%, #FFFFFF 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-6 mx-auto">
        {/* Первая строка заголовка - анимация справа налево */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span 
              className="transition-all duration-300 ease-out"
              style={staticGradientStyle}
            >
              Architect
            </span> your workflow
          </h1>
        </motion.div>
        
        {/* Вторая строка заголовка - анимация справа налево с небольшой задержкой */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span 
              className="transition-all duration-300 ease-out"
              style={staticGradientStyle}
            >
              Scale
            </span> with confidence
          </h1>
        </motion.div>
        
        {/* Описание - также с анимацией справа налево */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="text-base md:text-lg text-white/80 mt-10 font-sans leading-relaxed">
            <p>{descriptionParts[0]}</p>
            <p>{descriptionParts[1]}</p>
          </div>
        </motion.div>
        
        {/* Кнопка - также с анимацией справа налево */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <div className="mt-10">
            <Button 
              variant="secondary" 
              size="md" 
              href={primaryCta.href} 
              className="shadow-neon-green-glow px-6 py-2 text-sm"
            >
              {primaryCta.text}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}