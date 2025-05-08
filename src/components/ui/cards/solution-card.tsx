import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/icons/icon';
import { GlowEffect } from '@/components/ui/animations/glow-effect';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/buttons/button';

interface SolutionCardProps {
  title: string;
  description: string;
  capabilities: string[];
  link: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  capabilities,
  link,
}) => {
  return (
    <GlowEffect className="h-full">
      <div className="relative p-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
        <h3 className="text-2xl font-bold text-white mb-4">
          <GradientText variant="primary">{title}</GradientText>
        </h3>
        <p className="text-light-muted mb-6">{description}</p>
        
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-white mb-4">Core Capabilities:</h4>
          <ul className="space-y-3">
            {capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-3">
                <Icon name="check-circle" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-light-muted">{capability}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link href={link}>
          <Button variant="gradient" className="w-full">
            Learn More
          </Button>
        </Link>
      </div>
    </GlowEffect>
  );
};

export default SolutionCard;