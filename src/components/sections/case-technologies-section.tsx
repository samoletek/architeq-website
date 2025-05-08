import React from 'react';
import { GradientText } from '@/components/ui/gradient-text';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

interface CaseTechnologiesSectionProps {
  technologies: string[];
}

export const CaseTechnologiesSection: React.FC<CaseTechnologiesSectionProps> = ({
  technologies,
}) => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <GradientText variant="primary" className="inline">
              Technologies
            </GradientText>
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <GlowEffect key={index} color="primary" intensity={0.6} active={true}>
                <div 
                  className="bg-dark-deeper/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30 text-light hover:bg-primary/10 transition-all duration-300"
                >
                  {tech}
                </div>
              </GlowEffect>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseTechnologiesSection;