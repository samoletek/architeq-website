// src/components/ui/cards/contact-case-card.tsx
"use client";

import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Дополнительная проверка для отключения эффектов на слабых устройствах
  const shouldDisableEffects = isMobile || 
    (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent));

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

  // Более компактные адаптивные высоты
  const cardHeight = cn(
    // Мобильные устройства
    'min-h-[250px]',
    // Планшеты
    'md:min-h-[300px]',
    // Маленькие ноутбуки
    'lg:min-h-[340px]',
    // Обычные ноутбуки и десктопы
    'xl:min-h-[360px]',
    // Большие экраны (MacBook Pro 15", большие мониторы)
    'wide:min-h-[380px]',
    // Очень большие экраны
    '3xl:min-h-[400px]'
  );

  return (
    <motion.div
      initial={shouldDisableEffects ? false : "hidden"}
      animate={shouldDisableEffects ? false : (isVisible ? "visible" : "hidden")}
      variants={shouldDisableEffects ? {} : cardVariants}
      className={cn(
        'relative transition-all duration-300 h-full',
        className
      )}
      onMouseEnter={!shouldDisableEffects ? () => setIsHovered(true) : undefined}
      onMouseLeave={!shouldDisableEffects ? () => setIsHovered(false) : undefined}
    >
      <Link href="/contacts" className="block h-full">
        <div
          className={cn(
            'relative bg-dark-gray rounded-xl h-full flex flex-col',
            'contact-case-card',
            cardHeight
          )}
        >
          {/* Теги */}
          <div className={cn(
            "relative z-10",
            // Мобильные
            "pt-2 px-3 pb-2",
            // Планшеты
            "md:pt-3 md:px-4 md:pb-3",
            // Ноутбуки
            "lg:pt-3 lg:px-4 lg:pb-3",
            // Большие экраны
            "xl:pt-4 xl:px-5 xl:pb-4",
            "wide:pt-4 wide:px-6 wide:pb-4"
          )}>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10">
                Custom
              </span>
              <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10">
                Consultation
              </span>
              <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10">
                Your Industry
              </span>
            </div>
          </div>

          {/* Контент */}
          <div className={cn(
            "flex-grow z-10",
            // Мобильные
            "px-3 py-2",
            // Планшеты
            "md:px-4 md:py-2",
            // Ноутбуки
            "lg:px-4 lg:py-3",
            // Большие экраны
            "xl:px-5 xl:py-3",
            "wide:px-6 wide:py-4"
          )}>
            {/* Заголовок - очень компактные размеры */}
            <h3 className={cn(
              "font-semibold text-white leading-tight mb-2",
              // Мобильные
              "text-xs",
              // Планшеты
              "md:text-sm",
              // Ноутбуки
              "lg:text-base",
              // Обычные десктопы
              "xl:text-base",
              // Большие экраны
              "wide:text-lg",
              // Очень большие экраны
              "3xl:text-xl"
            )}>
              Create Your Custom Solution
            </h3>

            {/* Описание */}
            <p className={cn(
              "line-clamp-3 leading-relaxed mb-3",
              // Мобильные
              "text-[10px]",
              // Планшеты
              "md:text-xs",
              // Ноутбуки
              "lg:text-xs",
              // Обычные десктопы
              "xl:text-xs",
              // Большие экраны
              "wide:text-xs",
              // Очень большие экраны
              "3xl:text-xs",
              !shouldDisableEffects && "transition-colors duration-300",
              !shouldDisableEffects && isHovered ? "text-white" : "text-light-gray"
            )}>
              Tell us about your business challenges, and we will create a tailored automation solution that fits your specific needs and goals.
            </p>
            
            {/* Key Results */}
            <div className="mb-3">
              <h4 className={cn(
                "font-semibold mb-1.5 text-primary",
                // Мобильные
                "text-[10px]",
                // Планшеты
                "md:text-xs",
                // Ноутбуки и выше
                "lg:text-xs",
                "xl:text-xs",
                "wide:text-sm"
              )}>
                Key Results:
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="text-primary mr-1.5 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className={cn(
                    "leading-relaxed",
                    // Мобильные
                    "text-[10px]",
                    // Планшеты
                    "md:text-[10px]",
                    // Ноутбуки
                    "lg:text-xs",
                    // Обычные десктопы
                    "xl:text-xs",
                    // Большие экраны
                    "wide:text-xs",
                    // Очень большие экраны
                    "3xl:text-xs",
                    !shouldDisableEffects && "transition-colors duration-300",
                    !shouldDisableEffects && isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Personalized solution design</span> based on your workflow
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-1.5 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className={cn(
                    "leading-relaxed",
                    // Мобильные
                    "text-[10px]",
                    // Планшеты
                    "md:text-[10px]",
                    // Ноутбуки
                    "lg:text-xs",
                    // Обычные десктопы
                    "xl:text-xs",
                    // Большие экраны
                    "wide:text-xs",
                    // Очень большие экраны
                    "3xl:text-xs",
                    !shouldDisableEffects && "transition-colors duration-300",
                    !shouldDisableEffects && isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Expert consultation included</span> with automation specialists
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-1.5 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className={cn(
                    "leading-relaxed",
                    // Мобильные
                    "text-[10px]",
                    // Планшеты
                    "md:text-[10px]",
                    // Ноутбуки
                    "lg:text-xs",
                    // Обычные десктопы
                    "xl:text-xs",
                    // Большие экраны
                    "wide:text-xs",
                    // Очень большие экраны
                    "3xl:text-xs",
                    !shouldDisableEffects && "transition-colors duration-300",
                    !shouldDisableEffects && isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Tailored to your needs</span> and industry requirements
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className={cn(
            "border-t border-medium-gray/40 mt-auto flex-shrink-0 z-10",
            // Мобильные
            "px-3 pb-2 pt-2",
            // Планшеты
            "md:px-4 md:pb-3 md:pt-3",
            // Ноутбуки и выше
            "lg:px-4 lg:pb-3 lg:pt-3",
            "xl:px-5",
            "wide:px-6"
          )}>
            <p className={cn(
              "text-white flex items-center mb-1",
              // Мобильные
              "text-xs",
              // Планшеты и выше
              "md:text-xs",
              "lg:text-xs",
              "xl:text-xs",
              "wide:text-xs"
            )}>
              <span className="text-light-gray flex-shrink-0 mr-2">Company:</span>
              <span className="font-medium truncate">Your Company</span>
            </p>

            <p className={cn(
              "text-white/80 flex items-center",
              // Мобильные
              "text-[10px]",
              // Планшеты и выше
              "md:text-xs",
              "lg:text-xs", 
              "xl:text-xs",
              "wide:text-xs"
            )}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1.5 text-primary flex-shrink-0"
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