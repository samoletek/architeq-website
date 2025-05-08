import React from 'react';
import { GradientText } from '@/components/ui/gradient-text';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

interface CaseResultsSectionProps {
  results: string[];
}

export const CaseResultsSection: React.FC<CaseResultsSectionProps> = ({
  results,
}) => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Декоративный элемент */}
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-secondary/5 blur-[120px]"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <GradientText variant="secondary" className="inline">
              Results
            </GradientText>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <GlowEffect key={index} color="secondary" intensity={0.5} active>
                <div className="h-full bg-dark-deeper/80 backdrop-blur-md rounded-lg p-6 border border-secondary/10 shadow-lg flex items-start">
                  <div className="h-10 w-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-secondary font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-light-muted leading-relaxed">
                    {result}
                  </p>
                </div>
              </GlowEffect>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseResultsSection;