"use client";

import React, { useEffect, useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Glassmorphism } from '@/components/ui/glassmorphism';

interface FloatingNavItem {
  id: string;
  label: string;
}

interface FloatingNavProps {
  items: FloatingNavItem[];
  className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ items, className = "" }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item.id));
      const viewportHeight = window.innerHeight;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2;
        
        if (isVisible) {
          setActiveSection(items[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hide floating nav when at the top
  if (scrollY < 100) return null;

  return (
    <Glassmorphism
      className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-40 rounded-lg p-1 ${className}`}
      blur="sm"
      opacity={0.8}
    >
      <nav className="flex flex-col items-center space-y-4 py-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 
              ${activeSection === item.id 
                ? 'bg-primary scale-125' 
                : 'bg-light-muted hover:bg-white'
              }`}
            aria-label={item.label}
          >
            <span className={`
              absolute right-full mr-3 top-1/2 transform -translate-y-1/2 
              whitespace-nowrap text-sm text-light-muted pointer-events-none
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              ${activeSection === item.id ? 'opacity-100 text-white' : ''}
            `}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </Glassmorphism>
  );
};

export default FloatingNav;