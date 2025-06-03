"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
      id: 'services',
      title: 'Our Services',
      href: '/services',
      items: [
        { href: '/services/business-process', label: 'Workflow Automation' },
        { href: '/services/crm-integration', label: 'CRM Integrations' },
        { href: '/services/boxed-solutions', label: 'Boxed Solutions' },
        { href: '/services/ai-solutions', label: 'AI-Powered Solutions' },
        { href: '/services/documentation', label: 'Automated Document Flow' },
        { href: '/services/finance', label: 'Finance Automations' },
      ]
    },
    {
      id: 'cases',
      title: 'Our Cases',
      href: '/cases',
      items: [
        { href: '/cases/broker-calculator', label: 'Custom web-app' },
        { href: '/cases/stripe-invoicing', label: 'Stripe Invoicing' },
        { href: '/cases/document-generation', label: 'Documents Generation' },
        { href: '/cases/kitchen-cabinetry-solution', label: 'Kitchen company Solution' },
        { href: '/cases/ai-crm-assistant', label: 'AI custom solutions' },
      ]
    },
    {
      id: 'about',
      title: 'About Us',
      href: '/about',
      items: [
        { href: '/about#history', label: 'Company' },
        { href: '/about#team', label: 'Team' },
        { href: '/about#methodology', label: 'How it works' },
        { href: '/about#tech', label: 'Tech Stack' },
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us',
      href: '/contacts',
      items: [
        { href: '/contacts', label: 'Schedule a Call' },
        { href: '/contacts', label: 'Fill out onboarding' },
        { href: '/about#faq', label: 'FAQ' },
      ]
    }
  ];

  return (
    <footer className="bg-dark-gray pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 relative overflow-hidden">
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
                  <Link 
                    href={section.href} 
                    className="text-base font-bold hover:text-secondary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {section.title}
                  </Link>
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
          </div>
        ) : (
          /* Десктопная версия - оригинальная сетка */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {sections.map((section) => (
              <div key={section.id}>
                <Link href={section.href} className="text-base sm:text-lg font-bold mb-3 sm:mb-4 inline-block hover:text-secondary hover:text-shadow-green-soft transition-colors">
                  {section.title}
                </Link>
                <ul className="space-y-2 sm:space-y-3">
                  {section.items.slice(0, section.id === 'contact' ? 3 : 6).map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-light-gray hover:text-white transition-colors text-xs sm:text-sm">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Основная часть */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center mb-0">
          {/* Левая часть - логотип */}
          <div className="-mt-2 sm:-mt-4">
            <Link 
              href="/" 
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #AAAAAA 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                architeq
              </motion.div>
            </Link>
          </div>

          {/* Правая часть */}
          <div className="space-y-4 sm:space-y-6 text-left lg:text-right">
            {/* Слоган */}
            <div>
              <p className="text-sm sm:text-base font-medium">Architect your workflow.</p>
              <p className="text-sm sm:text-base font-medium">Scale with confidence.</p>
            </div>
            
            {/* Контакты */}
            <div className="space-y-2 sm:space-y-3">
              {/* Email */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-2 sm:gap-3">
                <a 
                  href="mailto:hi@architeq.io" 
                  className="text-light-gray hover:text-white transition-colors text-xs sm:text-sm"
                >
                  hi@architeq.io
                </a>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 justify-start lg:justify-end relative">
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
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                </div>

                {/* Tooltip-заглушка для неактивных соцсетей */}
                {showSocialTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 right-0 bg-dark-gray backdrop-blur-md border border-medium-gray rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-light-gray whitespace-nowrap shadow-lg"
                  >
                    Sorry, we don&apos;t do social media yet, but we plan to.
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Линия-разделитель */}
        <div className="border-t-[0.5px] border-light-gray/30 mt-8 sm:mt-12 md:mt-16 mb-4 sm:mb-6"></div>
                
        {/* Нижняя часть футера в стиле Apple */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 py-0 text-xs sm:text-sm text-light-gray">
          {/* Копирайт слева */}
          <div className="sm:w-1/4 text-left">
            <p className="text-xs sm:text-sm">© 2025 Architeq. All rights reserved.</p>
          </div>
          
          {/* Ссылки на Legal документы */}
          <div className="flex flex-wrap gap-3 sm:gap-6 sm:w-2/4 sm:justify-center sm:mx-auto">
            <Link href="/privacy" className="hover:text-white transition-colors text-xs sm:text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors text-xs sm:text-sm">
              Terms of Use
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors text-xs sm:text-sm">
              Cookies
            </Link>
          </div>
          
          {/* Worldwide справа */}
          <div className="hidden sm:block sm:w-1/4 text-right">
            <span className="text-xs sm:text-sm">Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}