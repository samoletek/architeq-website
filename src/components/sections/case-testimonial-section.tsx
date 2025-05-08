import React from 'react';
import Image from 'next/image';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  image: string;
}

interface CaseTestimonialSectionProps {
  testimonial: Testimonial;
}

export const CaseTestimonialSection: React.FC<CaseTestimonialSectionProps> = ({
  testimonial,
}) => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-10 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-blue-accent/5 blur-[120px]"></div>
      
      <div className="container mx-auto px-4">
        <GlowEffect color="primary" intensity={0.6} active>
          <div className="max-w-4xl mx-auto bg-dark-deeper/70 backdrop-blur-lg rounded-2xl p-8 md:p-10 lg:p-12 border border-primary/10 shadow-lg relative">
            {/* Декоративные кавычки */}
            <div className="absolute top-6 left-6 text-8xl text-primary/10 font-serif">
              "
            </div>
            <div className="absolute bottom-6 right-6 text-8xl text-primary/10 font-serif">
              "
            </div>
            
            <div className="md:flex items-center gap-8">
              {/* Фото автора отзыва */}
              <div className="mb-6 md:mb-0 flex-shrink-0">
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div>
                {/* Цитата */}
                <blockquote className="text-light-muted text-lg md:text-xl italic mb-6 relative z-10">
                  {testimonial.quote}
                </blockquote>
                
                {/* Автор */}
                <div>
                  <div className="font-medium text-light">{testimonial.author}</div>
                  <div className="text-primary text-sm">{testimonial.position}</div>
                </div>
              </div>
            </div>
          </div>
        </GlowEffect>
      </div>
    </section>
  );
};

export default CaseTestimonialSection;