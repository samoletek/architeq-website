'use client'

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { usePathname } from 'next/navigation';
import { SearchBar } from '@/components/ui/search-bar';
import { motion, AnimatePresence } from 'framer-motion';

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

// Навигация по умолчанию
const defaultNavigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/cases' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contacts' },
];

export default function Header({
  logo,
  navigation = defaultNavigation,
  ctaButton = {
    text: 'Book a Consultation',
    href: '/contacts'
  },
  showSearch = false,
  className,
  variant = 'default'
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isMobile } = useDeviceDetection();
  const pathname = usePathname();

  // Эффект для отслеживания скролла
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
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Функция для определения, является ли ссылка активной
  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);
  
  // Обработчик наведения на элемент с выпадающим меню
  const handleMouseEnter = (name: string) => {
    if (!isMobile) {
      setActiveDropdown(name);
    }
  };
  
  // Обработчик ухода с элемента с выпадающим меню
  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };
  
  // Обработчик клика на элемент с выпадающим меню на мобильных
  const handleDropdownToggle = (name: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === name ? null : name);
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

  // Фоновые стили в зависимости от прокрутки и варианта
  const headerBgClasses = cn(
    'transition-all duration-300',
    variant === 'default' ? (
      isScrolled ? 'bg-background/80 backdrop-blur py-3 shadow-md' : 'py-5 bg-transparent'
    ) : 
    variant === 'transparent' ? (
      isScrolled ? 'bg-background/70 backdrop-blur py-3 shadow-md' : 'py-5 bg-transparent'
    ) : 
    'bg-dark-gray py-3' // minimal вариант
  );
  
  // Рендерим выпадающее меню для элемента
  const renderDropdown = (item: NavigationItem) => {
    if (!item.children) return null;
    
    return (
      <AnimatePresence>
        {activeDropdown === item.name && (
          <motion.div
            className="absolute top-full left-0 w-48 py-2 mt-1 bg-dark-gray rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {item.children.map((childItem) => (
              <Link
                key={childItem.name}
                href={childItem.href}
                className={cn(
                  "block px-4 py-2 text-light-gray hover:text-white hover:bg-medium-gray/50 transition-colors",
                  isActive(childItem.href) && "text-primary font-medium"
                )}
                onClick={() => {
                  setActiveDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
                target={childItem.isExternal ? "_blank" : undefined}
                rel={childItem.isExternal ? "noopener noreferrer" : undefined}
              >
                {childItem.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <header className={cn("fixed w-full z-50", headerBgClasses, className)}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="text-2xl font-bold text-white z-10">
          {logo || "Architeq"}
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {item.children ? (
                <button
                  className={cn(
                    "text-white hover:text-primary transition-colors duration-300 relative group flex items-center",
                    isActive(item.href) && "text-primary"
                  )}
                  onClick={() => handleDropdownToggle(item.name)}
                  aria-expanded={activeDropdown === item.name}
                >
                  <span>{item.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(
                      "ml-1 h-4 w-4 transition-transform duration-200",
                      activeDropdown === item.name ? "rotate-180" : ""
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-white hover:text-primary transition-colors duration-300 relative group",
                    isActive(item.href) && "text-primary"
                  )}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                >
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
              {renderDropdown(item)}
            </div>
          ))}
          
          {/* Поиск на десктопе, если включен */}
          {showSearch && (
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="text-white hover:text-primary transition-colors"
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
        <Link href={ctaButton.href} className="hidden md:inline-flex z-10">
          <Button>
            {ctaButton.text}
          </Button>
        </Link>

        {/* Мобильные кнопки (поиск и меню) */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Поиск на мобильном, если включен */}
          {showSearch && (
            <button 
              className="text-white p-2"
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

      {/* Мобильное меню - выдвижная панель */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/90 z-40 pt-20"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 flex flex-col space-y-6 py-8">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-medium-gray/30 pb-4">
                  {item.children ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-white py-2 font-medium"
                        onClick={() => handleDropdownToggle(item.name)}
                      >
                        <span>{item.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-4 mt-2"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={cn(
                                  "block py-2 text-light-gray hover:text-white transition-colors",
                                  isActive(child.href) && "text-primary"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                                target={child.isExternal ? "_blank" : undefined}
                                rel={child.isExternal ? "noopener noreferrer" : undefined}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-white py-2 hover:text-primary transition-colors font-medium",
                        isActive(item.href) && "text-primary"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <Link 
                href={ctaButton.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Button className="w-full mt-4">
                  {ctaButton.text}
                </Button>
              </Link>
            </div>
          </motion.div>
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
    </header>
  );
}