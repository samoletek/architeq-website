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

// Простая статичная версия для мобильных
function SimpleMobileContactCard({ className }: ContactCaseCardProps) {
  return (
    <div className={cn("relative", className)}>
      <Link href="/contacts" className="block h-full">
        <div className="bg-dark-gray rounded-xl border border-gray-600/50 p-3 min-h-[280px] flex flex-col transition-colors duration-200 hover:border-primary/30">
          
          {/* Теги */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10">
                Custom
              </span>
              <span className="bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10">
                Consultation
              </span>
              <span className="bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10">
                Your Industry
              </span>
            </div>
          </div>

          {/* Контент */}
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-white leading-tight mb-2">
              Create Your Custom Solution
            </h3>

            <p className="text-xs text-light-gray leading-relaxed mb-2 line-clamp-2">
              Tell us about your business challenges, and we will create a tailored automation solution that fits your specific needs and goals.
            </p>
            
            {/* Key Results */}
            <div className="mb-3">
              <h4 className="text-[10px] font-semibold text-primary mb-1">
                Key Results:
              </h4>
              <ul className="space-y-0.5">
                <li className="flex items-start">
                  <span className="text-primary mr-1 text-[10px] flex-shrink-0 mt-0.5">•</span>
                  <span className="text-[10px] text-light-gray leading-relaxed">
                    <span className="text-primary">Personalized solution design</span> based on your workflow
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-1 text-[10px] flex-shrink-0 mt-0.5">•</span>
                  <span className="text-[10px] text-light-gray leading-relaxed">
                    <span className="text-primary">Expert consultation included</span> with automation specialists
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-600/40 mt-auto pt-2">
            <p className="text-[10px] text-white flex items-center mb-1">
              <span className="text-light-gray mr-1.5 flex-shrink-0">Company:</span>
              <span className="font-medium truncate">Your Company</span>
            </p>

            <p className="text-[10px] text-white/80 flex items-center">
              <svg className="h-2.5 w-2.5 mr-1 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="truncate">Your Location</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Расширенная версия для десктопа с анимациями
function EnhancedDesktopContactCard({
  className,
  index = 0,
  isVisible = true
}: ContactCaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Анимационные варианты
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
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
      className={cn('relative transition-all duration-300 h-full', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/contacts" className="block h-full">
        <div className="relative bg-dark-gray rounded-xl h-full flex flex-col contact-case-card min-h-[360px]">
          
          {/* Теги */}
          <div className="relative z-10 pt-4 px-5 pb-3">
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-white/10">
                Custom
              </span>
              <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-white/10">
                Consultation
              </span>
              <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-white/10">
                Your Industry
              </span>
            </div>
          </div>

          {/* Контент */}
          <div className="flex-grow z-10 px-5 py-3">
            <h3 className="text-lg font-semibold text-white leading-tight mb-3">
              Create Your Custom Solution
            </h3>

            <p className={cn(
              "text-xs line-clamp-3 leading-relaxed mb-4 transition-colors duration-300",
              isHovered ? "text-white" : "text-light-gray"
            )}>
              Tell us about your business challenges, and we will create a tailored automation solution that fits your specific needs and goals.
            </p>
            
            {/* Key Results */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold mb-2 text-primary">
                Key Results:
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-0.5 flex-shrink-0 text-sm">•</span>
                  <span className={cn(
                    "text-xs leading-relaxed transition-colors duration-300",
                    isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Personalized solution design</span> based on your workflow
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-0.5 flex-shrink-0 text-sm">•</span>
                  <span className={cn(
                    "text-xs leading-relaxed transition-colors duration-300",
                    isHovered ? "text-white" : "text-light-gray"
                  )}>
                    <span className="text-primary">Expert consultation included</span> with automation specialists
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-0.5 flex-shrink-0 text-sm">•</span>
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
          <div className="border-t border-medium-gray/40 mt-auto flex-shrink-0 z-10 px-5 py-3">
            <p className="text-xs text-white flex items-center mb-1">
              <span className="text-light-gray flex-shrink-0 mr-2">Company:</span>
              <span className="font-medium truncate">Your Company</span>
            </p>

            <p className="text-xs text-white/80 flex items-center">
              <svg className="h-4 w-4 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="truncate">Your Location</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ContactCaseCard(props: ContactCaseCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // На мобильных всегда используем простую версию
  if (isMobile) {
    return <SimpleMobileContactCard {...props} />;
  }

  // На десктопе используем расширенную версию
  return <EnhancedDesktopContactCard {...props} />;
}