// src/components/sections/hero-section.tsx
"use client";

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useDeviceDetection } from '@/lib/utils/device-detection';

interface HeroSectionProps {
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  decorativeElements?: boolean;
}

export default function HeroSection({
  title = "Architect your workflow. Scale with confidence.",
  description = "We architect digital systems that flex, scale, and adapt — for companies across industries.",
  primaryCta = {
    text: "Schedule a call",
    href: "/contacts"
  },
  secondaryCta = {
    text: "Explore Solutions",
    href: "/services"
  },
  decorativeElements = true
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
  
  // Упрощаем анимацию для мобильных или низкопроизводительных устройств
  const simplifiedAnimation = isMobile || isLowPerformance;

  // Если компонент не смонтирован на клиенте, возвращаем статический контент
  if (!isMounted) {
    return (
      <section className="bg-[#121212] relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {title}
            </h1>
            <p className="mt-6 text-xl text-light-gray">
              {description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href={primaryCta.href}>
                <Button size="lg">{primaryCta.text}</Button>
              </Link>
              <Link href={secondaryCta.href}>
                <Button variant="secondary" size="lg">{secondaryCta.text}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#121212] relative overflow-hidden py-20 md:py-32">
      {/* Декоративные элементы (если включены) */}
      {decorativeElements && isMounted && (
        <>
          {/* Неоновый круг на заднем плане */}
          <motion.div 
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary opacity-5 blur-[120px] -translate-y-1/2 translate-x-1/2"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.05, 0.07, 0.05] 
            }}
            transition={{ 
              duration: simplifiedAnimation ? 12 : 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          {/* Неоновые линии внизу */}
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <motion.div 
            className="absolute bottom-2 right-0 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            animate={{ 
              width: ['80%', '70%', '80%'], 
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ 
              duration: simplifiedAnimation ? 15 : 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {title}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mt-6 text-xl text-light-gray">
              {description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href={primaryCta.href}>
                <Button size="lg">{primaryCta.text}</Button>
              </Link>
              <Link href={secondaryCta.href}>
                <Button variant="secondary" size="lg">{secondaryCta.text}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}