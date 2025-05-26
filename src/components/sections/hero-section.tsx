// src/components/sections/hero-section.tsx
"use client";

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

  // Варианты анимации для различных элементов
  const titleVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // cubic-bezier с эффектом "ease-out-expo"
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.3,
        ease: "easeOut" 
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.6,
        ease: "easeOut" 
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.8,
        ease: "easeOut" 
      }
    }
  };

  return (
    <section className="section-hero relative overflow-hidden">
      {/* Эффекты фона */}
      <div className="absolute right-0 top-[20%] opacity-20 w-[30vw] h-[30vw] rounded-full bg-primary/30 blur-[100px]" />
      <div className="absolute left-10 bottom-[10%] opacity-20 w-[20vw] h-[20vw] rounded-full bg-secondary/20 blur-[80px]" />
      
      <div className="container mx-auto relative z-10 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Заголовок с анимацией и адаптивными размерами */}
          <h1 className="font-bold leading-tight mb-4 sm:mb-6 md:mb-8">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="mb-1 sm:mb-2"
            >
              <span style={staticGradientStyle} className="mr-1 sm:mr-2">Architect </span>
              <span>your workflow</span>
            </motion.div>
            
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
            >
              <span style={staticGradientStyle} className="mr-1 sm:mr-2">Scale </span>
              <span>with confidence</span>
            </motion.div>
          </h1>
          
          {/* Описание с адаптивными размерами */}
          <motion.div
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 mb-6 sm:mb-8 md:mb-10 font-sans leading-relaxed max-w-2xl"
          >
            <p>{description}</p>
          </motion.div>
          
          {/* Кнопка и поиск */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <Button 
                variant="secondary" 
                size="lg" 
                href={primaryCta.href} 
                className="shadow-neon-green-glow text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                {primaryCta.text}
              </Button>
            </motion.div>
            
            <motion.div
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              className="w-full sm:w-auto"
            >
              <HeroSearch />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}