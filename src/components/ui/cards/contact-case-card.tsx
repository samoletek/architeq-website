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

export function ContactCaseCard({
  className,
  index = 0,
  isVisible = true
}: ContactCaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Анимационные варианты для карточки - те же что у обычных карточек
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
        'relative transition-all duration-500 ease-out h-full',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/contacts" className="block h-full">
        <div
          className={cn(
            'relative bg-dark-gray rounded-xl h-full flex flex-col',
            'contact-case-card' // Использует фиолетовые стили из globals.css
          )}
          style={{
            minHeight: '500px',
          }}
        >
          {/* Теги */}
          <div className="pt-4 px-6 pb-4 relative z-10">
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

          {/* Контент */}
          <div className="flex-grow z-10 pl-6 pr-6 py-4">
            {/* Заголовок - КАК В ОБЫЧНЫХ КАРТОЧКАХ */}
            <h3 className="text-xl font-semibold leading-tight text-white mb-4">
              Create Your Custom Solution
            </h3>

            {/* Описание */}
            <p className={cn(
              "text-sm leading-relaxed line-clamp-3 mb-4 transition-colors duration-300",
              isHovered ? "text-white" : "text-light-gray"
            )}>
              Tell us about your business challenges, and we will create a tailored automation solution that fits your specific needs and goals.
            </p>
            
            {/* Key Results */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-3 text-primary">
                Key Results:
              </h4>
              <ul className="space-y-1.5">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1 flex-shrink-0 text-sm">•</span>
                  <span className={cn(
                    "text-xs leading-relaxed transition-colors duration-300",
                    isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Personalized solution design</span> based on your workflow
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1 flex-shrink-0 text-sm">•</span>
                  <span className={cn(
                    "text-xs leading-relaxed transition-colors duration-300",
                    isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Expert consultation included</span> with automation specialists
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1 flex-shrink-0 text-sm">•</span>
                  <span className={cn(
                    "text-xs leading-relaxed transition-colors duration-300",
                    isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Tailored to your needs</span> and industry requirements
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-medium-gray/40 mt-auto flex-shrink-0 px-6 pb-4 pt-4 z-10">
            <p className="text-sm text-white flex items-center mb-2">
              <span className="text-light-gray flex-shrink-0 mr-2">Company:</span>
              <span className="font-medium truncate">Your Company</span>
            </p>

            <p className="text-sm text-white/80 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-primary flex-shrink-0"
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
        </div>
      </Link>
    </motion.div>
  );
}