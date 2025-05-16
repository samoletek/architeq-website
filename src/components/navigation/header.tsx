'use client'

import { useState, useEffect, useCallback } from 'react';
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
  'transition-all duration-300 backdrop-blur-4xl',
  variant === 'default' ? (
    isScrolled ? 'bg-[#12071A]/90 py-3 shadow-md' : 'py-5 bg-[#12071A]/80'
  ) : 
  variant === 'transparent' ? (
    isScrolled ? 'bg-[#12071A]/80 py-3 shadow-md' : 'py-5 bg-[#12071A]/70'
  ) : 
  'bg-[#12071A]/90 py-3' // minimal вариант
);
  
  // Анимационные варианты для контейнера выпадающего меню
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };
  
  // Анимационные варианты для элементов выпадающего меню (поочередная анимация сверху вниз)
  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06, // увеличенная задержка для более заметной поочередной анимации
        duration: 0.2,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: 8, transition: { duration: 0.1 } }
  };
  
  // Рендерим обновленное выпадающее меню с вертикальным списком услуг
  const renderDropdown = (item: NavigationItem) => {
    if (!item.children) return null;
    
    return (
      <AnimatePresence>
        {activeDropdown === item.name && (
          <motion.div
          className="absolute top-full left-0 mt-2 py-3 px-4 bg-[#12071A]/90 backdrop-blur-4xl rounded-lg shadow-md border border-primary/10 z-50 min-w-[180px]"
          variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col space-y-2">
              {item.children.map((childItem, index) => (
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
                      setIsMobileMenuOpen(false);
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
    );
  };

  return (
    <header className={cn("fixed w-full z-50", headerBgClasses, className)}>
      <div className="container mx-auto px-4 flex items-center justify-between">
{/* Логотип с анимацией градиента, фиксирующегося с зеленым цветом слева */}
<Link 
  href="/" 
  className="text-2xl font-bold"
>
  <span 
    className="inline-block text-transparent bg-clip-text transition-all duration-500 ease-out"
    style={{ 
      backgroundImage: 'linear-gradient(90deg, #B0FF74 0%, #FFFFFF 50%, #B0FF74 100%)',
      backgroundSize: '200% auto',
      backgroundPosition: '0% center',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundPosition = '100% center';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundPosition = '0% center';
    }}
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
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {item.children ? (
  <div className="flex items-center">
    <Link
      href={item.href}
      className={cn(
        "transition-all duration-300",
        isActive(item.href) 
          ? "text-secondary text-shadow-green-soft" 
          : "text-white/70 hover:text-white hover:text-shadow-white-soft"
      )}
    >
      {item.name}
    </Link>
    <button
      className="ml-1 focus:outline-none text-white/70 hover:text-white"
      onClick={() => handleDropdownToggle(item.name)}
      aria-expanded={activeDropdown === item.name}
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
    </button>
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
              {renderDropdown(item)}
            </div>
          ))}
          
          {/* Поиск на десктопе, если включен */}
          {showSearch && (
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="text-white hover:text-secondary transition-colors -mt-1 flex items-center"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          )}
        </nav>

        {/* CTA кнопка на десктопе - только со свечением текста */}
        <div className="hidden md:block z-10">
          <GlowingTextButton href={ctaButton.href} size="sm" variant="header">
            {ctaButton.text}
          </GlowingTextButton>
        </div>

        {/* Мобильные кнопки (поиск и меню) */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Поиск на мобильном, если включен */}
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

      {/* Мобильное меню - выдвижная панель с обновленным стилем для выпадающих элементов */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-[#12071A]/95 backdrop-blur-4xl z-40 pt-20"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 flex flex-col space-y-5 py-8">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-primary/20 pb-4">
                  {item.children ? (
                    <div>
                    <div className="flex items-center justify-between w-full py-2">
                      <Link
                        href={item.href}
                        className={cn(
                          "font-medium transition-colors",
                          isActive(item.href) 
                            ? "text-secondary text-shadow-green-soft" 
                            : "text-white hover:text-secondary"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        className="text-white"
                        onClick={() => handleDropdownToggle(item.name)}
                      >
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
                      </div>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-4 mt-2 space-y-2"
                          >
                            {item.children.map((child, index) => (
                              <motion.div
                                key={child.name}
                                custom={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "block py-1.5 px-2 transition-colors relative overflow-hidden",
                                    isActive(child.href) 
                                      ? "text-secondary text-shadow-green-soft" 
                                      : "text-white hover:text-secondary"
                                  )}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  target={child.isExternal ? "_blank" : undefined}
                                  rel={child.isExternal ? "noopener noreferrer" : undefined}
                                >
                                  <span className="relative z-10">{child.name}</span>
                                  <motion.span 
                                    className="absolute inset-0 bg-primary/10 -z-0"
                                    initial={{ x: '100%', opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                  />
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 font-medium transition-colors",
                        isActive(item.href) 
                          ? "text-secondary text-shadow-green-soft" 
                          : "text-white hover:text-secondary"
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
              
              {/* CTA кнопка в мобильном меню - обновлена для использования headerCta варианта */}
              <Link 
                href={ctaButton.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Button 
                  variant="secondary" 
                  className="w-full mt-4"
                >
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