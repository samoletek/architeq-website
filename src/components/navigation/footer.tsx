"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArchiteqLogo } from '@/components/ui/architeq-logo';

// AnimatedContainer component для плавных анимаций появления
type ViewAnimationProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  // Отключаем сложные анимации на мобилке для лучшей производительности
  if (shouldReduceMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const [showSocialTooltip, setShowSocialTooltip] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Обработчик для соцсетей которые еще не активны
  const handleInactiveSocial = (e: React.MouseEvent, network: string) => {
    e.preventDefault();
    setShowSocialTooltip(network);
  };

  // Обработчик для мобильных выпадающих списков
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Данные для секций
  const sections = [
    {
      id: 'pages',
      title: 'Pages',
      items: [
        { href: '/services', label: 'Solutions' },
        { href: '/cases', label: 'Cases' },
        { href: '/about', label: 'About' },
        { href: '/contacts', label: 'Contact' },
        { href: '/search', label: 'Search' },
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      items: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
        { href: '/cookies', label: 'Cookies' },
      ]
    }
  ];

  return (
    <footer className="bg-dark-gray pt-12 sm:pt-16 md:pt-20 pb-0 relative overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-site-bg via-dark-gray to-dark-purple opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        {/* Мобильная версия с выпадающими списками */}
        {isMobile ? (
          <div className="mb-8">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-white/10 last:border-b-0">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-base font-bold font-mono hover:text-secondary transition-colors">
                    {section.title}
                  </span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: openSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                <AnimatePresence>
                  {openSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-4 space-y-2">
                        {section.items.map((item, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link 
                              href={item.href} 
                              className="text-light-gray hover:text-white transition-colors text-sm block py-1 pl-4"
                            >
                              {item.label}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {/* Слоган и copyright под дропдаунами на мобилке */}
            <div className="mt-8">
              {/* Слоган слева, copyright справа */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white">Architect your workflow.</p>
                    <p className="text-sm font-medium text-white">Scale with confidence.</p>
                  </div>
                  
                  {/* Социальные сети под слоганом на мобилке */}
                  <div className="flex items-center gap-4 relative">
                    {/* Twitter/X (неактивный) */}
                    <div className="relative">
                      <button
                        className="text-light-gray hover:text-secondary transition-colors relative"
                        onMouseEnter={(e) => handleInactiveSocial(e, 'twitter')}
                        onMouseLeave={() => setShowSocialTooltip(null)}
                        aria-label="Twitter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Facebook (неактивный) */}
                    <div className="relative">
                      <button
                        className="text-light-gray hover:text-secondary transition-colors"
                        onMouseEnter={(e) => handleInactiveSocial(e, 'facebook')}
                        onMouseLeave={() => setShowSocialTooltip(null)}
                        aria-label="Facebook"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Instagram (неактивный) */}
                    <div className="relative">
                      <button
                        className="text-light-gray hover:text-secondary transition-colors"
                        onMouseEnter={(e) => handleInactiveSocial(e, 'instagram')}
                        onMouseLeave={() => setShowSocialTooltip(null)}
                        aria-label="Instagram"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Tooltip-заглушка для неактивных соцсетей на мобилке */}
                    {showSocialTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-2 left-0 bg-dark-gray backdrop-blur-md border border-medium-gray rounded-lg px-3 py-1.5 text-xs text-light-gray whitespace-nowrap shadow-lg z-50"
                      >
                        Sorry, we don&apos;t do social media yet, but we plan to.
                      </motion.div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-light-gray text-right">
                  © 2025 Architeq. Worldwide.<br />All rights reserved.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Десктопная версия - сетка как в хедере */
          <div className="md:grid md:grid-cols-3 flex flex-col gap-8 mb-12">
            {/* Первая колонка - Логотип и основная информация */}
            <AnimatedContainer className="justify-self-start" delay={0.1}>
              <div className="flex flex-col justify-between h-full">
                {/* Логотип */}
                <Link href="/" className="block group">
                  <div className="h-12 w-56 flex items-center">
                    <div className="transform scale-[2.7] origin-left">
                      <ArchiteqLogo size="small" />
                    </div>
                  </div>
                </Link>
                
                {/* Социальные сети над copyright */}
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-4 relative">
                    {/* Twitter/X (неактивный) */}
                    <div className="relative">
                      <button
                        className="text-light-gray hover:text-secondary transition-colors relative"
                        onMouseEnter={(e) => handleInactiveSocial(e, 'twitter')}
                        onMouseLeave={() => setShowSocialTooltip(null)}
                        aria-label="Twitter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Facebook (неактивный) */}
                    <div className="relative">
                      <button
                        className="text-light-gray hover:text-secondary transition-colors"
                        onMouseEnter={(e) => handleInactiveSocial(e, 'facebook')}
                        onMouseLeave={() => setShowSocialTooltip(null)}
                        aria-label="Facebook"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Instagram (неактивный) */}
                    <div className="relative">
                      <button
                        className="text-light-gray hover:text-secondary transition-colors"
                        onMouseEnter={(e) => handleInactiveSocial(e, 'instagram')}
                        onMouseLeave={() => setShowSocialTooltip(null)}
                        aria-label="Instagram"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Tooltip-заглушка для неактивных соцсетей */}
                    {showSocialTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-2 left-0 bg-dark-gray backdrop-blur-md border border-medium-gray rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-light-gray whitespace-nowrap shadow-lg z-50"
                      >
                        Sorry, we don&apos;t do social media yet, but we plan to.
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Copyright */}
                  <p className="text-sm text-light-gray">
                    © 2025 Architeq. Worldwide.<br />All rights reserved.
                  </p>
                </div>
              </div>
            </AnimatedContainer>

            {/* Средняя колонка - пустая */}
            <div className="hidden md:block"></div>
            
            {/* Правая колонка - навигация */}
            <div className="justify-self-end flex gap-20 md:gap-32">
              {/* Pages колонка */}
              <AnimatedContainer delay={0.2}>
                <div className="text-right">
                  <h3 className="font-semibold mb-4 text-white font-mono">Pages</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/services" className="text-light-gray hover:text-white transition-colors text-sm">
                        Solutions
                      </Link>
                    </li>
                    <li>
                      <Link href="/cases" className="text-light-gray hover:text-white transition-colors text-sm">
                        Cases
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-light-gray hover:text-white transition-colors text-sm">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contacts" className="text-light-gray hover:text-white transition-colors text-sm">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/search" className="text-light-gray hover:text-white transition-colors text-sm">
                        Search
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimatedContainer>

              {/* Legal колонка */}
              <AnimatedContainer delay={0.3}>
                <div className="text-right">
                  <h3 className="font-semibold mb-4 text-white font-mono">Legal</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/privacy" className="text-light-gray hover:text-white transition-colors text-sm">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-light-gray hover:text-white transition-colors text-sm">
                        Terms of Use
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-light-gray hover:text-white transition-colors text-sm">
                        Cookies
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        )}

        {/* Простой текст логотипа с градиентом непрозрачности */}
        <AnimatedContainer delay={0.5}>
          <div className="w-full flex items-center justify-center mt-8 overflow-hidden relative h-32 md:h-40 lg:h-48">
            <h1 
              className="text-center text-[8.06rem] md:text-[13.22rem] lg:text-[19.84rem] font-bold text-white/20 select-none leading-none transform translate-y-8 md:translate-y-6 lg:translate-y-8"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
              }}
            >
              architeq
            </h1>
          </div>
        </AnimatedContainer>
      </div>
    </footer>
  );
}