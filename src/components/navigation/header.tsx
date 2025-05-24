'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { usePathname } from 'next/navigation';
import { SearchBar } from '@/components/ui/search-bar';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingTextButton } from '@/components/ui/buttons/glowing-text-button';

// Тип для элемента навигации
export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
  isExternal?: boolean;
}

interface HeaderProps {
  logo?: React.ReactNode;
  navigation?: NavigationItem[];
  ctaButton?: {
    text: string;
    href: string;
  };
  showSearch?: boolean;
  className?: string;
  variant?: 'default' | 'transparent' | 'minimal';
}

// Обновленная навигация с подразделами услуг
const defaultNavigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '/services',
    children: [
      { name: 'AI Solutions', href: '/services/ai-solutions' },
      { name: 'Boxed Solutions', href: '/services/boxed-solutions' },
      { name: 'Business Process', href: '/services/business-process' },
      { name: 'CRM Integration', href: '/services/crm-integration' },
      { name: 'Documentation', href: '/services/documentation' },
      { name: 'Finance', href: '/services/finance' },
    ]
  },
  { name: 'Case Studies', href: '/cases' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contacts' },
];

export default function Header({
  logo,
  navigation = defaultNavigation,
  ctaButton = {
    text: 'Schedule a Call',
    href: '/contacts'
  },
  showSearch = false,
  className
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isMobile } = useDeviceDetection();
  const pathname = usePathname();
  
  // Рефы для позиционирования дропдауна
  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dropdownPosition, setDropdownPosition] = useState<{ left: number; top: number } | null>(null);

  // Эффект для отслеживания скролла и анимации появления
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Закрываем мобильное меню при изменении маршрута
    setIsMobileMenuOpen(false);
    
    // Анимация появления хедера - с задержкой только для домашней страницы
    const isHomePage = pathname === '/';
    const delay = isHomePage ? 800 : 50;
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  // Функция для определения, является ли ссылка активной
  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);
  
  // Вычисление позиции для выпадающего меню
  const updateDropdownPosition = (name: string) => {
    const navItem = navItemRefs.current[name];
    if (navItem) {
      const rect = navItem.getBoundingClientRect();
      setDropdownPosition({
        left: rect.left,
        top: rect.bottom
      });
    }
  };

  // Обработчик наведения на элемент с выпадающим меню
  const handleMouseEnter = (name: string) => {
    if (!isMobile) {
      updateDropdownPosition(name);
      setActiveDropdown(name);
    }
  };
  
  // Обработчик ухода с элемента с выпадающим меню
  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };
  
  // Обработчик открытия/закрытия поиска
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Закрываем мобильное меню при открытии поиска
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Анимационные варианты для контейнера выпадающего меню
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };
  
  // Анимационные варианты для элементов выпадающего меню
  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.2,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: 8, transition: { duration: 0.1 } }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.header 
        className={cn(
          "mx-auto rounded-xl transition-all duration-300 py-4", 
          isScrolled ? "bg-[#12071A]/90 backdrop-blur-sm shadow-[0_0_15px_rgba(119,71,207,0.2)]" : "bg-transparent",
          "max-w-[1400px]", 
          className
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Логотип */}
          <Link 
            href="/" 
            className="text-2xl font-bold"
          >
            <span 
              className="inline-block text-white text-shadow-white transition-all duration-300 hover:text-secondary hover:text-shadow-green"
            >
              {logo || "Architeq"}
            </span>
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={ref => {
                  navItemRefs.current[item.name] = ref;
                }}
              >
                {item.children ? (
                  <div 
                    className="group cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center py-1">
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-all duration-300",
                          isActive(item.href) 
                            ? "text-secondary text-shadow-green-soft" 
                            : "text-white/70 group-hover:text-white group-hover:text-shadow-white-soft"
                        )}
                      >
                        {item.name}
                      </Link>
                      <span
                        className={cn(
                          "ml-1",
                          isActive(item.href) 
                            ? "text-secondary" 
                            : "text-white/70 group-hover:text-white"
                        )}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                    
                    {/* Невидимый мост */}
                    <div 
                      className="absolute w-full h-3 bottom-0 left-0 transform translate-y-full" 
                      onMouseEnter={() => handleMouseEnter(item.name)}
                    />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-all duration-300",
                      isActive(item.href) 
                        ? "text-secondary text-shadow-green-soft" 
                        : "text-white/70 hover:text-white hover:text-shadow-white-soft"
                    )}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Поиск на десктопе */}
            {showSearch && (
              <div className="relative flex items-center">
                <button
                  onClick={toggleSearch}
                  className="text-white hover:text-secondary transition-colors mt-0.5" 
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            )}
          </nav>

          {/* CTA кнопка на десктопе */}
          <div className="hidden md:block z-10">
            <GlowingTextButton href={ctaButton.href} size="sm" variant="header">
              {ctaButton.text}
            </GlowingTextButton>
          </div>

          {/* Мобильные кнопки */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Поиск на мобильном */}
            {showSearch && (
              <button 
                className="text-white hover:text-secondary p-2"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
            
            {/* Кнопка мобильного меню */}
            <button 
              className="text-white p-2 z-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Обновленное мобильное меню - полноэкранное */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Полноэкранный фон */}
              <motion.div
                className="md:hidden fixed inset-0 bg-[#0A0014] z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Контент меню */}
              <motion.div
                className="md:hidden fixed inset-0 z-50 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Верхняя панель с логотипом и кнопкой закрытия */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <Link 
                    href="/" 
                    className="text-xl font-bold text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Architeq
                  </Link>
                  <button 
                    className="text-white/60 hover:text-white p-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Навигационные ссылки */}
                <nav className="flex-1 overflow-y-auto px-6 py-8">
                  <div className="space-y-1">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {/* Пропускаем выпадающие меню на мобильных */}
                        {!item.children ? (
                          <Link
                            href={item.href}
                            className={cn(
                              "block text-3xl font-semibold py-3 transition-colors",
                              isActive(item.href) 
                                ? "text-secondary" 
                                : "text-white/90 hover:text-white"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                            target={item.isExternal ? "_blank" : undefined}
                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          // Для Services просто ссылка без подменю
                          <Link
                            href={item.href}
                            className={cn(
                              "block text-3xl font-semibold py-3 transition-colors",
                              isActive(item.href) 
                                ? "text-secondary" 
                                : "text-white/90 hover:text-white"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* CTA кнопка */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navigation.length * 0.05 + 0.1 }}
                    className="mt-12"
                  >
                    <Link 
                      href={ctaButton.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-block"
                    >
                      <Button 
                        variant="secondary" 
                        className="text-lg px-8 py-4"
                      >
                        {ctaButton.text}
                      </Button>
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Полноэкранный поиск */}
        <AnimatePresence>
          {showSearch && isSearchOpen && (
            <SearchBar 
              variant="overlay" 
              isExpanded={true} 
              onToggle={toggleSearch}
              placeholder="Search is here..."
            />
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Выпадающее меню для десктопа */}
      <AnimatePresence>
        {activeDropdown && dropdownPosition && (
          <motion.div
            className="fixed py-3 px-4 bg-[#12071A]/70 backdrop-blur-sm rounded-lg shadow-md border border-primary/10 z-30 min-w-[200px]"
            style={{
              left: `${dropdownPosition.left}px`,
              top: `${dropdownPosition.top}px`,
            }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col space-y-2">
              {navigation.find(item => item.name === activeDropdown)?.children?.map((childItem, index) => (
                <motion.div
                  key={childItem.name}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={childItem.href}
                    className={cn(
                      "block py-1.5 px-2 transition-colors duration-300 relative overflow-hidden",
                      isActive(childItem.href) 
                        ? "text-secondary text-shadow-green-soft" 
                        : "text-white hover:text-secondary"
                    )}
                    onClick={() => {
                      setActiveDropdown(null);
                    }}
                    target={childItem.isExternal ? "_blank" : undefined}
                    rel={childItem.isExternal ? "noopener noreferrer" : undefined}
                  >
                    <span className="relative z-10">{childItem.name}</span>
                    <motion.span 
                      className="absolute inset-0 bg-primary/10 -z-0"
                      initial={{ x: '100%', opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}