import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GradientText } from '@/components/ui/gradient-text';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

interface CaseHeroSectionProps {
  title: string;
  description: string;
  company: string;
  location: string;
  image: string;
}

export const CaseHeroSection: React.FC<CaseHeroSectionProps> = ({
  title,
  description,
  company,
  location,
  image,
}) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Фоновое изображение с оверлеем */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-deeper/90 via-dark/90 to-dark/95 z-10"></div>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>
      
      {/* Контент */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center">
            <span className="text-light-muted text-sm">{company}</span>
            <span className="mx-2 text-light-muted">•</span>
            <span className="text-light-muted text-sm">{location}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText variant="primary" className="inline">
              {title}
            </GradientText>
          </h1>
          
          <p className="text-xl text-light-muted mb-8 md:w-4/5">
            {description}
          </p>
          
          <GlowEffect color="primary" intensity={0.8}>
            <Link 
              href="/contact?case=interested" 
              className="inline-block bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-lg border border-primary/30 transition-all duration-300"
            >
              Interested in a Similar Solution
            </Link>
          </GlowEffect>
        </div>
      </div>
      
      {/* Декоративный элемент */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent z-10"></div>
    </section>
  );
};

export default CaseHeroSection;