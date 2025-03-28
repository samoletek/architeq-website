// src/components/sections/hero-section.tsx
"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/section-animation';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-[#121212] relative overflow-hidden py-20 md:py-32">
      {/* Декоративный элемент - неоновый круг на заднем плане */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary opacity-5 blur-[120px] -translate-y-1/2 translate-x-1/2"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.07, 0.05] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <SectionAnimation delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Business Process Automation for Real Business Growth
            </h1>
          </SectionAnimation>
          
          <SectionAnimation delay={0.4}>
            <p className="mt-6 text-xl text-light-gray">
              We help small and medium businesses optimize workflows, integrate systems, and automate routine tasks.
            </p>
          </SectionAnimation>
          
          <SectionAnimation delay={0.6}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/contacts">
                <Button size="lg">Book a Consultation</Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" size="lg">Explore Solutions</Button>
              </Link>
            </div>
          </SectionAnimation>
        </div>
      </div>
      
      {/* Декоративный элемент - неоновые линии */}
      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <motion.div 
        className="absolute bottom-2 right-0 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{ 
          width: ['80%', '70%', '80%'], 
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </section>
  );
}