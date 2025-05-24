// src/components/sections/testimonials-section.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { useDeviceDetection } from '@/lib/utils/device-detection';

// Интерфейс для данных отзыва
export interface Testimonial {
  id: number | string;
  quote: string;
  author: string;
  title: string;
  company?: string;
  image?: string;
  rating?: number;
  highlightedPhrases?: string[];
}

// Параметры секции
export interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
  withQuotes?: boolean;
  variant?: 'default' | 'compact' | 'cards';
  className?: string;
  maxWidth?: string;
}

// Функция для выделения ключевых слов
const highlightKeyPhrases = (text: string, phrases: string[] = []) => {
  if (!phrases.length) return <>{text}</>;
  
  let lastIndex = 0;
  const parts: React.ReactNode[] = [];
  
  phrases.forEach((phrase, i) => {
    const lowerText = text.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    const index = lowerText.indexOf(lowerPhrase, lastIndex);
    
    if (index !== -1) {
      if (index > lastIndex) {
        parts.push(<span key={`text-${i}-1`}>{text.substring(lastIndex, index)}</span>);
      }
      
      parts.push(
        <span key={`highlight-${i}`} className="text-secondary font-semibold">
          {text.substring(index, index + phrase.length)}
        </span>
      );
      
      lastIndex = index + phrase.length;
    }
  });
  
  if (lastIndex < text.length) {
    parts.push(<span key="text-last">{text.substring(lastIndex)}</span>);
  }
  
  return <>{parts}</>;
};

// Данные для отзывов по умолчанию
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "We automated our full invoicing cycle — what used to take days now runs seamlessly. The result? Faster cash flow and zero manual effort.",
    author: "Uliana Pak",
    title: "CFO at EclipseGroup",
    image: "/images/testimonials/alex-johnson.jpg",
    highlightedPhrases: ["full invoicing cycle", "used to take days"]
  },
  {
    id: 2,
    quote: "Thanks to Architeq's custom AI bot, we handle 70% more client inquiries without expanding our team — faster responses, happier customers.",
    author: "Alexandr Alexeyev",
    title: "CEO at Up-Struct LLC",
    image: "/images/testimonials/maria-rodriguez.jpg",
    highlightedPhrases: ["AI bot", "faster responses", "happier customers"]
  },
  {
    id: 3,
    quote: "Their industry-tailored automation eliminated document errors and sped up our entire logistics workflow. Total game changer.",
    author: "Anastasiia Trokhymchuk",
    title: "Legal Officer at LaneWise",
    image: "/images/testimonials/david-chen.jpg",
    highlightedPhrases: ["sped up our entire logistics workflow"]
  },
];

export default function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = "Hear from Teams We've Empowered",
  subtitle = "Our clients share how automation reshaped their operations.",
  autoplay = true,
  autoplaySpeed = 5000,
  withQuotes = true,
  variant = 'default',
  className,
  maxWidth = "4xl",
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { isMobile, isTablet } = useDeviceDetection();
  const testimonialsCount = testimonials.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsCount);
  }, [testimonialsCount]);
  
  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsCount) % testimonialsCount);
  }, [testimonialsCount]);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px'
      }
    );
  
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Автопереключение
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(nextTestimonial, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [isPlaying, nextTestimonial, autoplaySpeed]);

  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(autoplay);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(autoplay), autoplaySpeed);
  };
  
  // Обработчики для свайпа на тачскринах
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50;
    
    if (isSwipe) {
      if (distance > 0) {
        nextTestimonial();
      } else {
        prevTestimonial();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  const maxWidthClass = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
  }[maxWidth] || 'max-w-4xl';

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };
  
  // Компактный вариант
  if (variant === 'compact') {
    return (
      <section 
        ref={sectionRef}
        className={cn("section-testimonials bg-site-bg", className)}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="font-bold mb-4 sm:mb-6 md:mb-8">{title}</h2>
            {subtitle && (
              <p className="text-light-gray text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-dark-gray rounded-lg p-4 sm:p-6 text-center flex-1 max-w-xs w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {testimonial.rating && (
                  <div className="flex items-center justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={cn(
                          "w-4 h-4 mx-0.5",
                          i < testimonial.rating! ? "text-primary" : "text-medium-gray"
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                )}
                
                <p className="text-xs sm:text-sm md:text-base mb-4 line-clamp-4">
                  {testimonial.highlightedPhrases 
                    ? highlightKeyPhrases(testimonial.quote, testimonial.highlightedPhrases) 
                    : testimonial.quote}
                </p>
                
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 mr-3">
                    <ImageWithFallback
                      src={testimonial.image || ''}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      category="testimonial"
                      fallbackText={testimonial.author.charAt(0)}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-xs sm:text-sm">{testimonial.author}</p>
                    <p className="text-light-gray text-xs">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Вариант с карточками
  if (variant === 'cards') {
    return (
      <section 
        ref={sectionRef}
        className={cn("section-testimonials bg-dark-gray", className)}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h2 className="font-bold mb-4 sm:mb-6 md:mb-8">{title}</h2>
            {subtitle && (
              <p className="text-light-gray text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-medium-gray rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-4 sm:p-6">
                  {withQuotes && (
                    <div className="text-3xl sm:text-4xl text-secondary opacity-20 mb-3"></div>
                  )}
                  
                  {testimonial.rating && (
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={cn(
                            "w-4 h-4 mr-1",
                            i < testimonial.rating! ? "text-secondary" : "text-medium-gray"
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-white text-sm sm:text-base mb-6 line-clamp-5">
                    {testimonial.highlightedPhrases 
                      ? highlightKeyPhrases(testimonial.quote, testimonial.highlightedPhrases) 
                      : testimonial.quote}
                  </p>
                  
                  <div className="flex items-center mt-auto pt-4 border-t border-dark-gray">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                      <ImageWithFallback
                        src={testimonial.image || ''}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        category="testimonial"
                        fallbackText={testimonial.author.charAt(0)}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{testimonial.author}</h4>
                      <p className="text-light-gray text-xs sm:text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Вариант по умолчанию с каруселью
  return (
    <section 
      className={cn("section-testimonials bg-dark-gray", className)}
      ref={sectionRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="font-bold mb-4 sm:mb-6 md:mb-8">{title}</h2>
          {subtitle && (
            <p className="text-light-gray text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className={cn("relative mx-auto", maxWidthClass)}>
          {/* Большие кавычки */}
          {withQuotes && (
            <>
              <div className="absolute -top-6 sm:-top-8 md:-top-10 -left-6 sm:-left-8 md:-left-10 text-4xl sm:text-5xl md:text-6xl text-secondary opacity-30"></div>
              <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 -right-6 sm:-right-8 md:-right-10 text-4xl sm:text-5xl md:text-6xl text-secondary opacity-30"></div>
            </>
          )}
          
          {/* Карусель отзывов */}
          <div className="relative min-h-[200px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[380px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                {/* Цитата */}
                <blockquote className="text-center">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-white leading-relaxed px-4">
                    {testimonials[activeIndex].highlightedPhrases 
                      ? highlightKeyPhrases(testimonials[activeIndex].quote, testimonials[activeIndex].highlightedPhrases) 
                      : testimonials[activeIndex].quote}
                  </p>
                  <footer>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mr-3 sm:mr-5 flex-shrink-0 flex items-center">
                        <ImageWithFallback
                          src={testimonials[activeIndex].image || ''}
                          alt={testimonials[activeIndex].author}
                          width={56}
                          height={56}
                          category="testimonial"
                          fallbackText={testimonials[activeIndex].author.charAt(0)}
                        />
                      </div>
                      <div className="text-left">
                        <cite className="font-medium text-base sm:text-lg md:text-xl text-white not-italic">
                          {testimonials[activeIndex].author}
                        </cite>
                        <p className="text-light-gray text-xs sm:text-sm md:text-base">
                          {testimonials[activeIndex].title}
                        </p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Навигационные стрелки - только на десктопе */}
          {(!isMobile && !isTablet) && testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute top-1/2 -left-16 lg:-left-28 transform -translate-y-1/2 text-secondary hover:text-white transition-colors duration-300 focus:outline-none group"
                aria-label="Previous testimonial"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 lg:h-10 lg:w-10 transition-all duration-300 group-hover:neon-green-glow" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute top-1/2 -right-16 lg:-right-28 transform -translate-y-1/2 text-secondary hover:text-white transition-colors duration-300 focus:outline-none group"
                aria-label="Next testimonial"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 lg:h-10 lg:w-10 transition-all duration-300 group-hover:neon-green-glow" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Навигационные точки */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-6 sm:mt-8 space-x-3 sm:space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300",
                    index === activeIndex 
                      ? "bg-secondary" 
                      : "bg-medium-gray hover:bg-light-gray"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Простой компонент для отдельного отзыва
export function SingleTestimonial({
  testimonial,
  withQuote = true,
  className,
}: {
  testimonial: Testimonial;
  withQuote?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("bg-dark-gray rounded-lg p-4 sm:p-6", className)}>
      {withQuote && (
        <div className="text-3xl sm:text-4xl text-secondary opacity-20 mb-3"></div>
      )}
      
      {testimonial.rating && (
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={cn(
                "w-4 h-4 mr-1",
                i < testimonial.rating! ? "text-secondary" : "text-medium-gray"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
      )}
      
      <p className="text-white text-sm sm:text-base mb-6">
        {testimonial.highlightedPhrases 
          ? highlightKeyPhrases(testimonial.quote, testimonial.highlightedPhrases) 
          : testimonial.quote}
      </p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4">
          <ImageWithFallback
            src={testimonial.image || ''}
            alt={testimonial.author}
            width={48}
            height={48}
            category="testimonial"
            fallbackText={testimonial.author.charAt(0)}
          />
        </div>
        <div>
          <h4 className="font-medium text-sm sm:text-base">{testimonial.author}</h4>
          <p className="text-light-gray text-xs sm:text-sm">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}