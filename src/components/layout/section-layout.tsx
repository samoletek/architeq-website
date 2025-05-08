import React from 'react';
import { SectionAnimation } from '@/components/ui/animations/section-animation';

interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'gradient' | 'pattern';
  id?: string;
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  className = '',
  background = 'default',
  id,
}) => {
  const getBackgroundClass = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-to-br from-dark-deeper/50 to-dark';
      case 'pattern':
        return 'bg-pattern-grid';
      default:
        return 'bg-dark';
    }
  };

  return (
    <SectionAnimation>
      <section
        id={id}
        className={`relative py-16 md:py-24 ${getBackgroundClass()} ${className}`}
      >
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>
    </SectionAnimation>
  );
}