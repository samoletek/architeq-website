import React from 'react';
import { GradientText } from '@/components/ui/gradient-text';

interface CaseProblemSectionProps {
  problem: string;
}

export const CaseProblemSection: React.FC<CaseProblemSectionProps> = ({
  problem,
}) => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Декоративный элемент */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <GradientText variant="primary" className="inline">
              Problem
            </GradientText>
          </h2>
          
          <div className="bg-dark-deeper/80 backdrop-blur-md rounded-lg p-8 border border-primary/10 shadow-lg">
            <p className="text-lg text-light-muted leading-relaxed">
              {problem}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseProblemSection;