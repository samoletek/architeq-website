// src/components/ui/cards/contact-case-card.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';

export interface ContactCaseCardProps {
  className?: string;
  index?: number;
  isVisible?: boolean;
}

// Фиолетовая палитра вместо зеленой
const purplePalette = ['#B24BF3', '#9A3FD1', '#8B34C7', '#7B47CF', '#6B3AB8', '#5A2EA0', '#4A2287'];

const getHash = (str: string) =>
  str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

const getTwoColors = (key: string) => {
  const hash = getHash(key);
  const index1 = hash % purplePalette.length;
  const index2 = (hash * 7) % purplePalette.length;
  return [
    purplePalette[index1],
    purplePalette[index2 === index1 ? (index2 + 1) % purplePalette.length : index2]
  ];
};

const getTwoOffsets = (key: string) => {
  const hash = getHash(key);
  const left1 = 10 + (hash % 30);
  const left2 = 60 + ((hash * 3) % 30);
  return [left1, left2];
};

export function ContactCaseCard({
  className,
  index = 0,
  isVisible = true
}: ContactCaseCardProps) {
  // Добавляем состояние hover
  const [isHovered, setIsHovered] = useState(false);

  const gradientKey = "Your Company" + "Create Your Custom Solution";
  const [color1, color2] = getTwoColors(gradientKey);
  const [left1, left2] = getTwoOffsets(gradientKey);

  // Анимационные варианты для карточки
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.1 + index * 0.1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
      className={cn(
        'relative transition-all duration-500 ease-out',
        'min-h-[480px] h-full overflow-hidden',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/contacts" className="block h-full">
        <div
          className={cn(
            'relative bg-dark-gradient rounded-xl p-8 h-full',
            'border-2 border-primary/30',
            'transition-all duration-500 ease-out',
            // Убраны hover эффекты - только базовые классы
            'contact-case-card'
          )}
          style={{
            // Убраны hover стили - только базовое состояние
            boxShadow: '0 1px 30px rgba(0, 0, 0, 0.1), 0 0 18px rgba(178, 75, 243, 0.6)',
          }}
        >
          {/* Фиолетовый градиент внизу карточки - БЕЗ HOVER */}
          <div 
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent opacity-50"
          />

          {/* Внутреннее свечение - БЕЗ HOVER */}
          <div 
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0"
          />

          {/* Фиолетовые пятна свечения снизу - БЕЗ HOVER */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
            {[{ color: color1, left: left1 }, { color: color2, left: left2 }].map((spot, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${spot.left}%`,
                  width: `220px`,
                  height: '220px', // Фиксированная высота
                  opacity: 0.3, // Фиксированная прозрачность
                  transform: 'translate(-50%, 50%)',
                  borderRadius: '9999px',
                  filter: 'blur(100px)',
                  mixBlendMode: 'screen',
                  background: `
                    radial-gradient(circle, ${spot.color}FF 0%, transparent 60%),
                    radial-gradient(circle, ${spot.color}FF 0%, transparent 50%),
                    radial-gradient(circle, ${spot.color}CC 0%, transparent 70%),
                    radial-gradient(circle, ${spot.color}AA 0%, transparent 80%),
                    radial-gradient(circle, ${spot.color}88 0%, transparent 90%)
                  `
                }}
              />
            ))}
          </div>

          {/* Контент карточки */}
          <div className="relative z-10 h-full flex flex-col">
            
            {/* Теги */}
            <div className="mb-6 flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10">
                  Custom
                </span>
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10">
                  Consultation
                </span>
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10">
                  Your Industry
                </span>
              </div>
            </div>

            {/* Заголовок */}
            <div className="mb-4 flex-shrink-0">
              <h3 className="text-2xl font-bold leading-tight text-white line-clamp-2">
                Create Your Custom Solution
              </h3>
            </div>

            {/* Компания и локация */}
            <div className="mb-6 flex-shrink-0">
              <p className="text-white text-xs flex items-center mb-2">
                <span className="text-light-gray mr-2">Company:</span>
                <span className="font-medium truncate">Your Company</span>
              </p>

              <p className="text-white/80 text-xs flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span className="truncate">Your Location</span>
              </p>
            </div>
            
            {/* Описание - растет по содержимому */}
            <div className="mb-auto flex-grow">
              <p className={cn(
                "leading-relaxed text-base mb-8 line-clamp-4 transition-colors duration-300",
                isHovered ? "text-white" : "text-light-gray"
              )}>
                Tell us about your business challenges, and we&apos;ll create a tailored automation solution that fits your specific needs and goals.
              </p>
              
              {/* Key Results - выравниваются по нижнему краю описания */}
              <div className="mt-auto">
                <h4 className="text-base font-semibold mb-4 text-primary">
                  Key Results:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0 text-lg">
                      •
                    </span>
                    <span className={cn(
                      "text-sm leading-relaxed transition-colors duration-300",
                      isHovered ? "text-white" : "text-light-gray"
                    )}>
                      <span className="text-primary">Personalized solution design</span> based on your specific workflow
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0 text-lg">
                      •
                    </span>
                    <span className={cn(
                      "text-sm leading-relaxed transition-colors duration-300",
                      isHovered ? "text-white" : "text-light-gray"
                    )}>
                      <span className="text-primary">Expert consultation included</span> with our automation specialists
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0 text-lg">
                      •
                    </span>
                    <span className={cn(
                      "text-sm leading-relaxed transition-colors duration-300",
                      isHovered ? "text-white" : "text-light-gray"
                    )}>
                      <span className="text-primary">Tailored to your specific needs</span> and industry requirements
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}