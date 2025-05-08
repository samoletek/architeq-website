import React from 'react';
import { GradientText } from '@/components/ui/gradient-text';

interface CaseSolutionSectionProps {
  solution: string[];
}

export const CaseSolutionSection: React.FC<CaseSolutionSectionProps> = ({
  solution,
}) => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Декоративный элемент */}
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-accent/5 blur-[120px]"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <GradientText variant="secondary" className="inline">
              Solution
            </GradientText>
          </h2>
          
          <div className="bg-dark-deeper/80 backdrop-blur-md rounded-lg p-8 border border-secondary/10 shadow-lg">
            <ul className="space-y-4">
              {solution.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-start group"
                >
                  <span className="flex h-6 w-6 rounded-full border border-secondary/50 bg-dark flex-shrink-0 items-center justify-center mr-4 mt-0.5 group-hover:bg-secondary/20 transition-all duration-300">
                  <span className="h-2 w-2 rounded-full bg-secondary"></span>
                  </span>
                  <span className="text-light-muted group-hover:text-light transition-colors duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseSolutionSection;