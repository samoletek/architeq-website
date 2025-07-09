// src/components/sections/hero-section.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HeroSearch from '@/components/ui/hero-search';

interface HeroSectionProps {
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
}

export default function HeroSection({
  description = "We build digital systems that flex, scale, and adapt — for companies across industries.",
  primaryCta = {
    text: "Explore Solutions",
    href: "/services"
  }
}: HeroSectionProps) {  

  // Фиксированный статический градиент для слов
  const staticGradientStyle = {
    background: 'linear-gradient(90deg, #B0FF74 0%, #FFFFFF 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  // Унифицированные варианты анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section className="section-hero relative overflow-hidden">
      {/* Эффекты фона */}
      <div className="absolute right-0 top-[20%] opacity-20 w-[30vw] h-[30vw] rounded-full bg-primary/30 blur-[100px]" />
      <div className="absolute left-10 bottom-[10%] opacity-20 w-[20vw] h-[20vw] rounded-full bg-secondary/20 blur-[80px]" />
      
      <div className="container mx-auto relative z-10 h-full flex items-center">
        {/* Мобильная версия */}
        <div className="max-w-3xl md:hidden animate-fade-in">
          <h1 className="font-bold leading-tight mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl fade-in-1">
            <span style={staticGradientStyle}>Architect</span> your workflow<br />
            <span style={staticGradientStyle}>Scale</span> with confidence
          </h1>
          
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 mb-6 sm:mb-8 md:mb-10 font-sans leading-relaxed max-w-2xl fade-in-2">
            <p>{description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 fade-in-3">
            <Button 
              variant="secondary" 
              size="lg" 
              href={primaryCta.href} 
              className="shadow-neon-green-glow text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              {primaryCta.text}
            </Button>
            
            <div className="w-full sm:w-auto fade-in-4">
              <HeroSearch />
            </div>
          </div>
        </div>
        
        {/* Десктопная версия */}
        <motion.div 
          className="max-w-3xl hidden md:block"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, staggerChildren: 0.15, ease: "easeOut" }}
        >
          <motion.h1 
            className="font-bold leading-tight mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            variants={itemVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span style={staticGradientStyle}>Architect</span> your workflow<br />
            <span style={staticGradientStyle}>Scale</span> with confidence
          </motion.h1>
          
          <motion.div
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 mb-6 sm:mb-8 md:mb-10 font-sans leading-relaxed max-w-2xl"
          >
            <p>{description}</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            variants={itemVariants}
          >
            <Button 
              variant="secondary" 
              size="lg" 
              href={primaryCta.href} 
              className="shadow-neon-green-glow text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              {primaryCta.text}
            </Button>
            
            <div className="w-full sm:w-auto">
              <HeroSearch />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}