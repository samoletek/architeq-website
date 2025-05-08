import React from 'react';
import Image from 'next/image';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

interface TeamMemberCardProps {
  name: string;
  position: string;
  description: string;
  image: string;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  position,
  description,
  image
}) => {
  return (
    <GlowEffect color="primary">
      <div className="team-member-card overflow-hidden rounded-xl bg-dark bg-opacity-40 border border-primary/10 transition-all duration-300 hover:border-primary/30 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        </div>
        
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold text-light mb-1">{name}</h3>
          <p className="text-primary font-medium mb-4">{position}</p>
          <p className="text-light-muted text-sm">{description}</p>
        </div>
      </div>
    </GlowEffect>
  );
};