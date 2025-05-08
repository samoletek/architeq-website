import React from 'react';
import Link from 'next/link';
import { GradientText } from '@/components/ui/gradient-text';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

export const CaseCtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-dark to-blue-accent/5"></div>
      <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[120px] animate-float"></div>
      <div className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full bg-blue-accent/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-dark-deeper/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-primary/10 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <GradientText variant="primary" className="inline">
              Ready to Streamline the Flow?
            </GradientText>
          </h2>
          
          <p className="text-lg text-light-muted mb-6 max-w-2xl mx-auto">
            Trust our team to map your processes and uncover automation potential.
          </p>
          
          <p className="text-light mb-8">
            Just clear insights into what automation can do for your business.
          </p>
          
          <GlowEffect color="primary" intensity={1.2}>
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-primary/80 to-blue-accent/80 hover:from-primary hover:to-blue-accent text-white px-8 py-4 rounded-lg border border-primary/30 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              See How It Works
            </Link>
          </GlowEffect>
        </div>
      </div>
    </section>
  );
};

export default CaseCtaSection;