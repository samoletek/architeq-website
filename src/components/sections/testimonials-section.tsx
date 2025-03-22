"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';

// Данные для отзывов
const testimonials = [
  {
    id: 1,
    quote: "§78 helped us automate our entire invoicing process. What used to take days now happens automatically, and we&apos;ve seen a significant improvement in cash flow.",
    author: "Alex Johnson",
    title: "CFO at EclipseGroup",
    image: "/images/testimonials/alex-johnson.jpg",
  },
  {
    id: 2,
    quote: "The custom AI solution developed by §78 revolutionized our customer service. We now handle 70% more requests without adding staff, and customer satisfaction has improved dramatically.",
    author: "Maria Rodriguez",
    title: "Operations Director at Up-Struct LLC",
    image: "/images/testimonials/maria-rodriguez.jpg",
  },
  {
    id: 3,
    quote: "Implementing the boxed solution for our logistics business has eliminated errors in calculations and invoicing. The transparency in logistics and payments has transformed our operations.",
    author: "David Chen",
    title: "CEO at LaneWise",
    image: "/images/testimonials/david-chen.jpg",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Автопереключение каждые 5 секунд
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  // Пауза автопереключения при наведении мыши
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
    // Возобновляем автопереключение через 5 секунд после клика
    setTimeout(() => setAutoplay(true), 5000);
  };

  return (
    <section 
      className="py-20 bg-[#121212]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-light-gray max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about our automation solutions.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Кавычки */}
          <div className="absolute -top-10 -left-10 text-6xl text-primary opacity-30">&quot;</div>
          <div className="absolute -bottom-10 -right-10 text-6xl text-primary opacity-30">&quot;</div>
          
          {/* Карусель отзывов */}
          <div className="relative h-64 md:h-48 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <blockquote className="text-center">
                  <p className="text-xl md:text-2xl mb-6 text-white">
                    {testimonials[activeIndex].quote}
                  </p>
                  <footer>
                    <div className="flex items-center justify-center mb-2">
                      {/* Временная заглушка для аватара */}
                      <div className="w-12 h-12 rounded-full bg-medium-gray flex items-center justify-center text-primary text-lg font-bold mr-4">
                        {testimonials[activeIndex].author.charAt(0)}
                      </div>
                      <div className="text-left">
                        <cite className="font-medium text-white not-italic">
                          {testimonials[activeIndex].author}
                        </cite>
                        <p className="text-light-gray text-sm">
                          {testimonials[activeIndex].title}
                        </p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Навигационные точки */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex 
                    ? "bg-primary" 
                    : "bg-medium-gray hover:bg-light-gray"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}