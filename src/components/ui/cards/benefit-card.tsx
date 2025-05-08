import React from 'react';
import { Icon } from '@/components/ui/icons/icon';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon }) => {
  return (
    <GlowEffect className="h-full">
      <div className="relative p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
            <Icon name={icon} className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-light-muted">{description}</p>
          </div>
        </div>
      </div>
    </GlowEffect>
  );
};

export default BenefitCard;