"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  // Состояние для отслеживания, анимирован ли элемент
  const [animated, setAnimated] = useState(false);

  // Эффект при монтировании компонента
  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <section className="bg-[#121212] relative overflow-hidden py-20 md:py-32">
      {/* Декоративный элемент - неоновый круг на заднем плане */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary opacity-5 blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animated ? 1 : 0, y: animated ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Business Process Automation for Real Business Growth
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-light-gray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animated ? 1 : 0, y: animated ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We help small and medium businesses optimize workflows, integrate systems, and automate routine tasks.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animated ? 1 : 0, y: animated ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button size="lg" href="/contacts">Book a Consultation</Button>
            <Button variant="secondary" size="lg" href="/services">Explore Solutions</Button>
          </motion.div>
        </div>
      </div>
      
      {/* Декоративный элемент - неоновые линии */}
      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-2 right-0 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}