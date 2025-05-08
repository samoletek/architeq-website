import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GradientText } from '@/components/ui/gradient-text';
import { GlowEffect } from '@/components/ui/animations/glow-effect';
import { allCases } from '@/data/cases-data';

interface CaseRelatedSectionProps {
  relatedIds: string[];
}

export const CaseRelatedSection: React.FC<CaseRelatedSectionProps> = ({
  relatedIds,
}) => {
  // Получаем данные о связанных кейсах
  const relatedCases = relatedIds
    .map(id => allCases.find(c => c.id === id))
    .filter(Boolean);
  
  if (relatedCases.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <GradientText variant="primary" className="inline">
              Related Case Studies
            </GradientText>
          </h2>
          <p className="text-light-muted max-w-2xl mx-auto">
            Explore other automation success stories similar to this one
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedCases.map((caseItem, index) => (
            <Link
            key={caseItem?.id || `related-case-${index}`}
            href={caseItem?.id ? `/cases/${caseItem.id}` : '#'}
            className="block group"
            >
              <GlowEffect color="primary" intensity={0.6}>
                <div className="bg-dark-deeper/80 backdrop-blur-md rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  {/* Изображение */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={caseItem?.image || ''}
                      alt={caseItem?.title || ''}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-deeper to-transparent opacity-80"></div>
                  </div>
                  
                  {/* Контент */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                      {caseItem?.title}
                    </h3>
                    <p className="text-sm text-light-muted mb-4">
                      {caseItem?.company}
                    </p>
                    
                    <div className="mt-auto">
                      <span className="text-primary text-sm font-medium group-hover:underline">
                        View Case Study
                      </span>
                    </div>
                  </div>
                </div>
              </GlowEffect>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseRelatedSection;