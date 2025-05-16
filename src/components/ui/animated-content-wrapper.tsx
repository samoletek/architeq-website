// src/components/ui/animated-content-wrapper.tsx
"use client";

import React from 'react'; // Удалим неиспользуемые импорты
import { motion } from 'framer-motion';
import { ScrollProvider } from '@/lib/context/ScrollContext';

interface AnimatedSectionProps {
  children: React.ReactNode;
  id: string;
  delay?: number;
}

// Обертка для секций с анимацией появления
export function AnimatedSection({
  children,
  id,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}      // Начинаем невидимыми и смещенными вниз
      whileInView={{                        // При появлении в поле зрения
        opacity: 1,                         // Становимся видимыми
        y: 0,                               // Возвращаемся в исходное положение
        transition: {
          duration: 0.8,                    // Плавная анимация
          delay: delay                      // Задержка для каскадного эффекта
        }
      }}
      viewport={{ once: true, amount: 0.2 }} // Срабатывает один раз при 20% видимости
    >
      {children}
    </motion.div>
  );
}

// Главный компонент-обертка для страницы
export default function AnimatedPage({ children }: { children: React.ReactNode }) {
  // Идентификаторы для секций
  const sectionIds = ['hero', 'benefits', 'solutions', 'cases', 'testimonials', 'cta'];
  
  return (
    <ScrollProvider>
      {React.Children.map(children, (child, index) => {
        const sectionId = sectionIds[index] || `section-${index}`;
        return (
          <AnimatedSection 
            key={sectionId} 
            id={sectionId}
            delay={0} // Уберем задержку для первого отображения
          >
            {child}
          </AnimatedSection>
        );
      })}
    </ScrollProvider>
  );
}