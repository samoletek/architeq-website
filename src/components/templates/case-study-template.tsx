"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GCSVideo } from '@/components/ui/gcs-video';
import { SectionAnimation } from '@/components/ui/section-animation';
import { useScrollAnimation } from '@/lib/utils/animation';
import { CaseStudy } from '@/lib/data/case-studies';

interface CaseStudyTemplateProps {
  caseStudy: CaseStudy;
  relatedCases: CaseStudy[];
}

export default function CaseStudyTemplate({ caseStudy, relatedCases }: CaseStudyTemplateProps) {
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);


  // Детекция мобильных устройств
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate results every 4 seconds (отключено на мобильных)
  useEffect(() => {
    if (!isAutoPlaying || isMobile) return;
    
    const interval = setInterval(() => {
      setActiveResultIndex((prev) => (prev + 1) % caseStudy.results.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [caseStudy.results.length, isAutoPlaying, isMobile]);

  const handleManualIndexChange = (index: number) => {
    setIsAutoPlaying(false);
    setActiveResultIndex(index);
  };

  // Generate all unique labels at once to avoid duplicates
  const uniqueResultLabels = useMemo(() => {
    const usedLabels = new Set<string>();
    
    return caseStudy.results.map((result, index) => {
      const lowerResult = result.toLowerCase();
      
      // Helper function to get unique label
      const getUniqueLabel = (primaryLabel: string, variations: string[] = []) => {
        if (!usedLabels.has(primaryLabel)) {
          usedLabels.add(primaryLabel);
          return primaryLabel;
        }
        
        // Try variations if primary is used
        for (const variation of variations) {
          if (!usedLabels.has(variation)) {
            usedLabels.add(variation);
            return variation;
          }
        }
        
        // Final fallback with index
        const fallback = `${primaryLabel} ${index + 1}`;
        usedLabels.add(fallback);
        return fallback;
      };
      
      // Advanced keyword mapping with multiple variations
      if (lowerResult.includes('revenue') || lowerResult.includes('income') || lowerResult.includes('sales')) {
        return getUniqueLabel('Revenue Growth', ['Sales Performance', 'Income Increase', 'Revenue Boost']);
      }
      if (lowerResult.includes('lead') || lowerResult.includes('conversion')) {
        return getUniqueLabel('Lead Generation', ['Conversion Rate', 'Lead Quality', 'Customer Acquisition']);
      }
      if (lowerResult.includes('time') && (lowerResult.includes('reduce') || lowerResult.includes('faster') || lowerResult.includes('speed'))) {
        return getUniqueLabel('Time Efficiency', ['Process Speed', 'Time Reduction', 'Rapid Processing']);
      }
      if (lowerResult.includes('cost') && (lowerResult.includes('save') || lowerResult.includes('reduction') || lowerResult.includes('lower'))) {
        return getUniqueLabel('Cost Savings', ['Cost Reduction', 'Budget Optimization', 'Financial Efficiency']);
      }
      if (lowerResult.includes('error') || lowerResult.includes('accuracy') || lowerResult.includes('quality') || lowerResult.includes('mistake')) {
        return getUniqueLabel('Quality Control', ['Error Elimination', 'Accuracy Improvement', 'Quality Assurance']);
      }
      if (lowerResult.includes('automation') || lowerResult.includes('manual') || lowerResult.includes('workflow')) {
        return getUniqueLabel('Process Automation', ['Workflow Optimization', 'Manual Reduction', 'Task Automation']);
      }
      if (lowerResult.includes('efficiency') || lowerResult.includes('productivity') || lowerResult.includes('performance') || lowerResult.includes('output')) {
        return getUniqueLabel('Productivity Boost', ['Efficiency Gain', 'Performance Improvement', 'Output Increase']);
      }
      if (lowerResult.includes('compliance') || lowerResult.includes('regulatory') || lowerResult.includes('standard') || lowerResult.includes('audit')) {
        return getUniqueLabel('Compliance Success', ['Regulatory Alignment', 'Standards Achievement', 'Audit Readiness']);
      }
      if (lowerResult.includes('capacity') || lowerResult.includes('throughput') || lowerResult.includes('volume') || lowerResult.includes('scale')) {
        return getUniqueLabel('Scalability Gain', ['Capacity Increase', 'Volume Growth', 'Throughput Boost']);
      }
      if (lowerResult.includes('integration') || lowerResult.includes('connect') || lowerResult.includes('sync') || lowerResult.includes('unified')) {
        return getUniqueLabel('System Integration', ['Data Sync', 'Platform Unity', 'Connectivity Boost']);
      }
      if (lowerResult.includes('data') || lowerResult.includes('insight') || lowerResult.includes('analytic') || lowerResult.includes('report')) {
        return getUniqueLabel('Data Intelligence', ['Analytics Power', 'Insight Generation', 'Reporting Excellence']);
      }
      if (lowerResult.includes('user') || lowerResult.includes('experience') || lowerResult.includes('satisfaction') || lowerResult.includes('adoption')) {
        return getUniqueLabel('User Experience', ['Customer Satisfaction', 'User Adoption', 'Experience Quality']);
      }
      if (lowerResult.includes('security') || lowerResult.includes('protection') || lowerResult.includes('secure') || lowerResult.includes('safety')) {
        return getUniqueLabel('Security Enhancement', ['Data Protection', 'Safety Improvement', 'Security Boost']);
      }
      if (lowerResult.includes('deployment') || lowerResult.includes('implementation') || lowerResult.includes('rollout') || lowerResult.includes('launch')) {
        return getUniqueLabel('Implementation Success', ['Deployment Speed', 'Rollout Efficiency', 'Launch Success']);
      }
      if (lowerResult.includes('maintenance') || lowerResult.includes('support') || lowerResult.includes('monitoring') || lowerResult.includes('uptime')) {
        return getUniqueLabel('Operational Excellence', ['System Reliability', 'Support Quality', 'Maintenance Efficiency']);
      }
      
      // Percentage-based results get special treatment
      const percentMatch = result.match(/(~?\d+(?:-\d+)?)%/);
      if (percentMatch) {
        // Extract the numeric part, handling ~ and ranges
        const numericPart = percentMatch[1].replace(/[~-]/g, '');
        const percent = parseInt(numericPart);
        if (percent >= 50) {
          return getUniqueLabel('Major Improvement', ['Significant Gain', 'Substantial Progress', 'High Impact']);
        } else {
          return getUniqueLabel('Performance Gain', ['Efficiency Boost', 'Process Enhancement', 'Metric Improvement']);
        }
      }
      
      // Context-based fallbacks with variations
      const businessTerms = ['business', 'operational', 'strategic', 'financial', 'technical'];
      const impactTerms = ['improvement', 'optimization', 'enhancement', 'increase', 'boost', 'growth'];
      
      for (const term of businessTerms) {
        if (lowerResult.includes(term)) {
          return getUniqueLabel(`${term.charAt(0).toUpperCase() + term.slice(1)} Impact`, 
            [`${term.charAt(0).toUpperCase() + term.slice(1)} Success`, `${term.charAt(0).toUpperCase() + term.slice(1)} Boost`]);
        }
      }
      
      for (const term of impactTerms) {
        if (lowerResult.includes(term)) {
          return getUniqueLabel(`Performance ${term.charAt(0).toUpperCase() + term.slice(1)}`, 
            [`Process ${term.charAt(0).toUpperCase() + term.slice(1)}`, `System ${term.charAt(0).toUpperCase() + term.slice(1)}`]);
        }
      }
      
      // Final unique fallbacks based on position
      const positionLabels = [
        'Primary Outcome', 'Secondary Benefit', 'Additional Gain', 'Further Improvement', 
        'Extended Impact', 'Supplementary Result', 'Enhanced Performance', 'Optimized Process'
      ];
      
      return positionLabels[index] || `Outcome ${index + 1}`;
    });
  }, [caseStudy.results]);

  const getResultDescription = (_result: string, index: number) => {
    return uniqueResultLabels[index] || `Result ${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Immediate Impact */}
      <HeroSection caseStudy={caseStudy} />
      
      {/* Video Section - Full Screen Presence */}
      <SectionAnimation>
        <VideoSection caseStudy={caseStudy} />
      </SectionAnimation>
      
      {/* Business Impact Analysis */}
      <SectionAnimation>
        <InteractiveResultsSection 
          caseStudy={caseStudy} 
          activeIndex={activeResultIndex}
          onIndexChange={handleManualIndexChange}
          getResultDescription={getResultDescription}
        />
      </SectionAnimation>
      
      {/* Challenge & Solution */}
      <SectionAnimation>
        <ChallengeAndSolutionSection caseStudy={caseStudy} isMobile={isMobile} />
      </SectionAnimation>
      
      
      {/* Client Testimonial */}
      {caseStudy.testimonial && (
        <SectionAnimation>
          <TestimonialSection testimonial={caseStudy.testimonial} />
        </SectionAnimation>
      )}
      
      {/* Technical Deep-dive */}
      <SectionAnimation>
        <TechnicalSection caseStudy={caseStudy} />
      </SectionAnimation>
      
      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <SectionAnimation>
          <RelatedCasesSection relatedCases={relatedCases} />
        </SectionAnimation>
      )}
      
      {/* Call to Action */}
      <SectionAnimation>
        <CTASection />
      </SectionAnimation>
    </div>
  );
}

function HeroSection({ caseStudy }: { caseStudy: CaseStudy }) {
  const [isMobile, setIsMobile] = useState(false);

  // Детекция мобильных устройств
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hero scroll animation как в about page
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
      }
    }
  };

  return (
    <section ref={heroRef} className="section-hero bg-transparent relative overflow-hidden">
      {/* Animated Background - только на десктопе */}
      {!isMobile && (
        <div className="absolute inset-0">
          <motion.div 
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
            animate={{
              background: [
                "radial-gradient(circle, rgba(176, 255, 116, 0.3) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(176, 255, 116, 0.5) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(176, 255, 116, 0.3) 0%, transparent 70%)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-15"
            animate={{
              background: [
                "radial-gradient(circle, rgba(144, 238, 144, 0.2) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(144, 238, 144, 0.4) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(144, 238, 144, 0.2) 0%, transparent 70%)"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isHeroVisible ? "visible" : "hidden"}
          variants={heroVariants}
        >
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center text-light-gray mb-6">
            <Link href="/cases" className="hover:text-white transition-colors text-xs">
              Case Studies
            </Link>
            <span className="mx-2 text-primary text-xs">/</span>
            <span className="text-white text-xs">{caseStudy.title}</span>
          </div>

          {/* Company Badge - уменьшенный на мобилке */}
          <div className={`inline-flex items-center gap-2 bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-full ${isMobile ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'} mb-8 border border-[#B0FF74]/20`}>
            <div className="w-3 h-3 rounded-full bg-[#B0FF74] animate-pulse"></div>
            <span className="text-white font-medium">{caseStudy.company}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{caseStudy.location}</span>
          </div>

          {/* Main Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{
              textShadow: '0 0 30px rgba(176, 255, 116, 0.8), 0 0 60px rgba(176, 255, 116, 0.5)'
            }}
          >
            {caseStudy.title}
          </h1>

          {/* Description - уменьшенный на мобилке */}
          <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed`}>
            {caseStudy.shortDescription || caseStudy.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => {
                const metricsSection = document.getElementById('business-impact');
                metricsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Business Impact
            </Button>
            <Link 
              href="/contacts"
              className="text-white/80 hover:text-white transition-colors duration-300 text-lg font-medium group"
            >
              <span className="flex items-center">
                See How It Works
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Quick Stats - в одну линию на мобилке */}
          <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-1 md:grid-cols-3'} gap-6 max-w-4xl mx-auto`}>
            <div className="text-center">
              <div className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} font-bold text-[#B0FF74] mb-2`}>
                {caseStudy.industry}
              </div>
              <div className="text-gray-400 text-xs">Industry</div>
            </div>
            <div className="text-center">
              <div className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} font-bold text-[#B0FF74] mb-2`}>
                {caseStudy.solutionType}
              </div>
              <div className="text-gray-400 text-xs">Solution Type</div>
            </div>
            <div className="text-center">
              <div className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} font-bold text-[#B0FF74] mb-2`}>
                {caseStudy.technologies.length}+
              </div>
              <div className="text-gray-400 text-xs">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - только на десктопе */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#B0FF74]/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-[#B0FF74] rounded-full mt-2"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}

function VideoSection({ caseStudy }: { caseStudy: CaseStudy }) {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Детекция мобильных устройств
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer для контроля воспроизведения
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // На мобильных не автозапускаем и останавливаем при выходе из зоны видимости
        if (isMobile && !entry.isIntersecting) {
          setShouldPlay(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  const handleVideoClick = () => {
    if (isMobile) {
      setShouldPlay(!shouldPlay);
    }
  };

  return (
    <section ref={sectionRef} className="py-12 bg-transparent" id="video-section">
      <div className="container mx-auto px-4">
        {/* Video player - centered and full screen presence */}
        <div className="max-w-6xl mx-auto">
          <div className="cursor-pointer" onClick={handleVideoClick}>
            <div 
              className="rounded-lg shadow-[0_0_8px_rgba(178,75,243,0.3)]"
              style={{
                border: '2px solid rgba(178, 75, 243, 0.4)'
              }}
            >
              <div className="aspect-video rounded-lg overflow-hidden">
              <GCSVideo 
                caseId={caseStudy.id} 
                autoPlay={isMobile ? shouldPlay : true}
                loop={true}
                muted={true}
                controls={isMobile}
                placeholder={
                  <div className="h-full flex items-center justify-center bg-gradient-to-b from-dark-gray to-medium-gray">
                    <div className="text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg text-light-gray">
                        {isMobile ? 'Tap to play video' : 'Loading case study visualization...'}
                      </p>
                    </div>
                  </div>
                }
                onError={() => console.log(`Failed to load video for case: ${caseStudy.id}`)}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




function ChallengeAndSolutionSection({ caseStudy, isMobile }: { caseStudy: CaseStudy; isMobile: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects - только на десктопе */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full blur-3xl opacity-5 bg-[radial-gradient(ellipse,_rgba(176,255,116,0.3)_0%,_transparent_70%)]" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
              }}
            >
              Challenge & Solution
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              Real business challenges and our targeted automation solutions
            </p>
          </div>

          {/* Challenge-Solution Display */}
          <div className="space-y-8">
            {/* Challenge Section - Top */}
            <div className="relative">
              <div className={`bg-gradient-to-br from-red-900/20 via-[#170A24] to-[#12071A] rounded-3xl ${isMobile ? 'p-6' : 'p-8 md:p-12'} border border-red-500/30 relative overflow-hidden w-full max-w-6xl mx-auto`}>
                {/* Challenge Background Glow - только на десктопе */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-3xl opacity-60" />
                )}
                
                <div className="relative z-10">
                  {/* Challenge Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-4 h-4 rounded-full bg-red-500" />
                      <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Business Challenge</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      Business Bottleneck
                    </h3>
                  </div>

                  {/* Challenge Description */}
                  <div>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {caseStudy.problem}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-[#B0FF74]/20 border border-[#B0FF74]/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#B0FF74]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Solutions Section - Bottom */}
            <div className="relative">
              <div className={`bg-gradient-to-br from-[#0A2A0A] via-[#170A24] to-[#12071A] rounded-3xl ${isMobile ? 'p-6' : 'p-8 md:p-12'} border border-[#B0FF74]/30 relative overflow-hidden w-full max-w-6xl mx-auto`}>
                {/* Solutions Background Glow - только на десктопе */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B0FF74]/10 to-transparent rounded-3xl opacity-60" />
                )}
                
                <div className="relative z-10">
                  {/* Solutions Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-4 h-4 rounded-full bg-[#B0FF74]" />
                      <span className="text-[#B0FF74] font-semibold text-sm uppercase tracking-wider">Our Solution</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      Solution Points
                    </h3>
                  </div>

                  {/* Solutions List */}
                  <div>
                    <div className="space-y-4">
                      {caseStudy.solution?.map((solutionPoint, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-[#B0FF74]/5 rounded-xl border border-[#B0FF74]/20 hover:border-[#B0FF74]/40 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B0FF74]/20 border border-[#B0FF74]/30 flex items-center justify-center">
                            <span className="text-[#B0FF74] font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-white/80 leading-relaxed">
                            {solutionPoint}
                          </p>
                        </div>
                      )) || (
                        <div className="text-white/60 text-center py-8">
                          Solution details will be available soon.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function InteractiveResultsSection({ 
  caseStudy, 
  activeIndex, 
  onIndexChange,
  getResultDescription
}: { 
  caseStudy: CaseStudy; 
  activeIndex: number;
  onIndexChange: (index: number) => void;
  getResultDescription: (result: string, index: number) => string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Детекция мобильных устройств
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Enhanced business insights for each result
  const getBusinessInsight = (result: string) => {
    const lowerResult = result.toLowerCase();
    
    // Revenue insights
    if (lowerResult.includes('revenue') || lowerResult.includes('sales') || lowerResult.includes('income')) {
      return {
        insight: "Revenue growth of this magnitude reflects successful automation implementation, where streamlined operations directly translate into measurable business expansion and improved market competitiveness.",
        keyFactor: "Revenue Acceleration",
        businessValue: "Direct ROI through increased sales efficiency"
      };
    }
    
    // Time and efficiency insights
    if (lowerResult.includes('time') && (lowerResult.includes('reduc') || lowerResult.includes('faster') || lowerResult.includes('speed'))) {
      return {
        insight: "Significant time reduction creates a cascading effect throughout the organization, allowing teams to focus on high-value activities while maintaining operational excellence at scale.",
        keyFactor: "Time Optimization",
        businessValue: "Workforce productivity and strategic focus"
      };
    }
    
    // Cost reduction insights
    if (lowerResult.includes('cost') && (lowerResult.includes('reduc') || lowerResult.includes('save') || lowerResult.includes('lower'))) {
      return {
        insight: "Cost optimization at this level demonstrates the power of intelligent automation to eliminate inefficiencies and create sustainable financial benefits for long-term growth.",
        keyFactor: "Cost Management",
        businessValue: "Improved profit margins and resource allocation"
      };
    }
    
    // Quality and accuracy insights
    if (lowerResult.includes('error') || lowerResult.includes('accuracy') || lowerResult.includes('quality') || lowerResult.includes('mistake')) {
      return {
        insight: "Enhanced accuracy metrics showcase how automated quality control systems eliminate human error while maintaining consistency across all business processes.",
        keyFactor: "Quality Excellence",
        businessValue: "Customer satisfaction and operational reliability"
      };
    }
    
    // Lead generation and conversion insights
    if (lowerResult.includes('lead') || lowerResult.includes('conversion') || lowerResult.includes('customer')) {
      return {
        insight: "Improved lead performance demonstrates how targeted automation enhances customer acquisition pipelines and accelerates business development outcomes.",
        keyFactor: "Lead Optimization",
        businessValue: "Sustainable customer growth and market expansion"
      };
    }
    
    // Productivity and efficiency insights
    if (lowerResult.includes('efficiency') || lowerResult.includes('productivity') || lowerResult.includes('performance') || lowerResult.includes('output')) {
      return {
        insight: "Productivity gains of this magnitude reflect comprehensive process optimization that empowers teams to achieve more with existing resources.",
        keyFactor: "Performance Enhancement",
        businessValue: "Scalable operational capacity without proportional cost increase"
      };
    }
    
    // Automation and workflow insights
    if (lowerResult.includes('automation') || lowerResult.includes('manual') || lowerResult.includes('workflow') || lowerResult.includes('process')) {
      return {
        insight: "Process automation success demonstrates the transformation from manual, error-prone operations to intelligent, self-managing systems that scale with business growth.",
        keyFactor: "Workflow Intelligence",
        businessValue: "Scalable operations with reduced manual oversight"
      };
    }
    
    // Data and insights
    if (lowerResult.includes('data') || lowerResult.includes('insight') || lowerResult.includes('analytic') || lowerResult.includes('report')) {
      return {
        insight: "Enhanced data capabilities provide real-time business intelligence that enables proactive decision-making and strategic planning based on accurate, timely information.",
        keyFactor: "Data Intelligence",
        businessValue: "Informed strategic decisions and competitive advantage"
      };
    }
    
    // Compliance and governance
    if (lowerResult.includes('compliance') || lowerResult.includes('audit') || lowerResult.includes('regulatory') || lowerResult.includes('governance')) {
      return {
        insight: "Compliance automation ensures consistent adherence to regulatory requirements while reducing the administrative burden on operational teams.",
        keyFactor: "Regulatory Excellence",
        businessValue: "Risk mitigation and operational confidence"
      };
    }
    
    // Capacity and scalability
    if (lowerResult.includes('capacity') || lowerResult.includes('scale') || lowerResult.includes('volume') || lowerResult.includes('throughput')) {
      return {
        insight: "Increased capacity demonstrates how intelligent automation enables business scaling without proportional infrastructure investment or operational complexity.",
        keyFactor: "Scalability Achievement",
        businessValue: "Growth readiness and market opportunity capture"
      };
    }
    
    // Default insight
    return {
      insight: "This measurable outcome represents successful digital transformation that creates competitive advantages through intelligent process optimization and strategic automation implementation.",
      keyFactor: "Digital Transformation",
      businessValue: "Sustainable competitive advantage and future-ready operations"
    };
  };

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? caseStudy.results.length - 1 : activeIndex - 1;
    onIndexChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === caseStudy.results.length - 1 ? 0 : activeIndex + 1;
    onIndexChange(newIndex);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              id="business-impact"
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
              }}
            >
              Measurable Results
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Quantifiable business outcomes demonstrating the tangible value of our automation solutions
            </p>
          </div>

          {/* Interactive Results Display */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-8`}>
            {/* Navigation - hidden on mobile */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => onIndexChange(index)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 relative group ${
                        activeIndex === index 
                          ? 'bg-[#B0FF74]/10 border border-[#B0FF74]/30' 
                          : 'bg-white/5 border border-transparent hover:border-[#B0FF74]/20'
                      }`}
                    >
                      {activeIndex === index && (
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#B0FF74]/20 to-transparent" />
                      )}
                      
                      <div className="relative z-10 flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          activeIndex === index ? 'bg-[#B0FF74]' : 'bg-white/30'
                        }`}></div>
                        <span className={`font-medium transition-colors duration-300 ${
                          activeIndex === index ? 'text-white' : 'text-white/70'
                        }`}>
                          {getResultDescription(result, index)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Result Analysis */}
            <div className={isMobile ? 'col-span-1' : 'lg:col-span-2'}>
              <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl p-8 md:p-12 border border-[#B0FF74]/20 relative overflow-hidden">
                {/* Background Glow - только на десктопе */}
                {!isMobile && (
                  <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_rgba(176,255,116,0.5)_0%,_transparent_70%)]" />
                )}

                <div className="relative z-10">
                  {/* Result Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {caseStudy.results[activeIndex]}
                  </h3>
                  
                  {/* Business Insight */}
                  <div className="space-y-6">
                    {(() => {
                      const insight = getBusinessInsight(caseStudy.results[activeIndex]);
                      return (
                        <>
                          <div>
                            <h4 className="text-lg font-semibold text-[#B0FF74] mb-3">Strategic Impact</h4>
                            <p className="text-white/80 leading-relaxed">
                              {insight.insight}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 rounded-lg p-4">
                              <h5 className="text-sm font-medium text-[#B0FF74] mb-2">Key Factor</h5>
                              <p className="text-white/70">{insight.keyFactor}</p>
                            </div>
                            
                            <div className="bg-white/5 rounded-lg p-4">
                              <h5 className="text-sm font-medium text-[#B0FF74] mb-2">Business Value</h5>
                              <p className="text-white/70">{insight.businessValue}</p>
                            </div>
                          </div>
                          
                          {/* Progress Indicator */}
                          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#B0FF74]"></div>
                              <span className="text-[#B0FF74] font-medium text-sm">Verified Impact</span>
                            </div>
                            
                            <div className="flex-1 bg-white/10 rounded-full h-2 relative overflow-hidden">
                              <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#B0FF74] to-[#B0FF74]/60 rounded-full transition-all duration-300"
                                style={{ width: `${(activeIndex + 1) * (100 / caseStudy.results.length)}%` }}
                              />
                            </div>
                            
                            <span className="text-white/50 text-sm">
                              {activeIndex + 1} of {caseStudy.results.length}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Navigation buttons for mobile */}
              {isMobile && (
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={handlePrevious}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-[#B0FF74]/30 text-white hover:bg-[#B0FF74]/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  
                  <span className="text-white/70 text-sm">
                    {activeIndex + 1} / {caseStudy.results.length}
                  </span>
                  
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-[#B0FF74]/30 text-white hover:bg-[#B0FF74]/10 transition-colors"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialSection({ testimonial }: { testimonial: CaseStudy['testimonial'] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Детекция мобильных устройств
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Function to highlight key business terms in testimonials
  const highlightKeyWords = (text: string) => {
    const keyWords = [
      'automation', 'efficiency', 'streamlined', 'optimized', 'improved', 
      'reduced', 'increased', 'enhanced', 'transformation', 'innovative',
      'solution', 'process', 'workflow', 'integration', 'performance',
      'quality', 'productivity', 'revenue', 'cost', 'time', 'faster',
      'savings', 'breakthrough', 'remarkable', 'exceptional', 'outstanding'
    ];
    
    let highlightedText = text;
    keyWords.forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, 
        `<span class="text-[#B0FF74] font-semibold relative inline-block" style="text-shadow: 0 0 15px rgba(176, 255, 116, 0.8), 0 0 30px rgba(176, 255, 116, 0.4); background: linear-gradient(135deg, rgba(176, 255, 116, 0.1) 0%, rgba(176, 255, 116, 0.05) 100%); border-radius: 4px; padding: 1px 3px;">$1</span>`
      );
    });
    
    return highlightedText;
  };

  if (!testimonial) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern - только на десктопе */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-5 bg-[radial-gradient(ellipse,_rgba(176,255,116,0.4)_0%,_transparent_70%)]" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Quote Icon */}
          <div className="w-16 h-16 rounded-full bg-[#B0FF74]/10 flex items-center justify-center mx-auto mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#B0FF74]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>

          {/* Quote */}
          <blockquote className="text-lg md:text-xl font-light text-white/90 italic leading-relaxed mb-8">
            <span dangerouslySetInnerHTML={{ 
              __html: `&ldquo;${highlightKeyWords(testimonial.quote)}&rdquo;` 
            }} />
          </blockquote>

          {/* Author */}
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-[#B0FF74] rounded-full mb-4"></div>
            <h4 className="text-xl font-bold text-[#B0FF74] mb-2">
              {testimonial.author}
            </h4>
            <p className="text-white/60">
              {testimonial.position}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechnicalSection({ caseStudy }: { caseStudy: CaseStudy }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
              }}
            >
              Technical Deep Dive
            </h2>
            <p className="text-xl text-white/70">
              Explore the technical architecture and implementation details
            </p>
          </div>

          {/* Expandable Technical Content */}
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl border border-[#B0FF74]/20 overflow-hidden">
            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-8 text-left hover:bg-white/5 transition-colors duration-300 flex items-center justify-between group"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#B0FF74] transition-colors duration-300">
                  Implementation Architecture
                </h3>
                <p className="text-white/70">
                  Click to explore technical details and architecture decisions
                </p>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#B0FF74]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-t border-[#B0FF74]/20"
                >
                  <div className="p-8 space-y-8">
                    {/* Architecture Overview */}
                    <div>
                      <h4 className="text-xl font-bold text-[#B0FF74] mb-4">Architecture Overview</h4>
                      <p className="text-white/80 leading-relaxed">
                        The solution was built using a microservices architecture that ensures scalability, 
                        maintainability, and fault tolerance. Each component was designed to handle specific 
                        business functions while maintaining loose coupling between services.
                      </p>
                    </div>

                    {/* Technologies Grid */}
                    <div>
                      <h4 className="text-xl font-bold text-[#B0FF74] mb-4">Technology Stack</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-lg font-semibold text-white mb-3">Core Technologies</h5>
                          <div className="space-y-2">
                            {caseStudy.technologies.map((tech, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                                <div className="w-2 h-2 rounded-full bg-[#B0FF74]"></div>
                                <span className="text-white/80">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {caseStudy.alternativeTechnologies && (
                          <div>
                            <h5 className="text-lg font-semibold text-white mb-3">Alternative Options</h5>
                            <div className="space-y-2">
                              {caseStudy.alternativeTechnologies.slice(0, 5).map((tech, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 opacity-60">
                                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                                  <span className="text-white/60">{tech}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Integration Points */}
                    <div>
                      <h4 className="text-xl font-bold text-[#B0FF74] mb-4">Key Integration Points</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="w-8 h-8 rounded-full bg-[#B0FF74]/20 flex items-center justify-center mx-auto mb-3">
                            <div className="w-3 h-3 rounded-full bg-[#B0FF74]"></div>
                          </div>
                          <h6 className="font-semibold text-white mb-2">API Integrations</h6>
                          <p className="text-white/70 text-sm">RESTful APIs with OAuth 2.0</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="w-8 h-8 rounded-full bg-[#B0FF74]/20 flex items-center justify-center mx-auto mb-3">
                            <div className="w-3 h-3 rounded-full bg-[#B0FF74]"></div>
                          </div>
                          <h6 className="font-semibold text-white mb-2">Data Sync</h6>
                          <p className="text-white/70 text-sm">Real-time bidirectional sync</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="w-8 h-8 rounded-full bg-[#B0FF74]/20 flex items-center justify-center mx-auto mb-3">
                            <div className="w-3 h-3 rounded-full bg-[#B0FF74]"></div>
                          </div>
                          <h6 className="font-semibold text-white mb-2">Webhooks</h6>
                          <p className="text-white/70 text-sm">Event-driven notifications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedCasesSection({ relatedCases }: { relatedCases: CaseStudy[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A0A0A] relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
              }}
            >
              Related Success Stories
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore other transformative automation solutions we&apos;ve delivered
            </p>
          </div>

          {/* Related Cases Grid with uniform sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {relatedCases.map((relatedCase) => (
              <div
                key={relatedCase.id}
                className="group cursor-pointer w-full max-w-sm"
              >
                <Link href={`/cases/${relatedCase.id}`}>
                  <div className="rounded-2xl group h-full">
                    <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl p-6 border border-[#B0FF74]/20 hover:border-[#B0FF74]/40 transition-all duration-300 h-full min-h-[280px] relative overflow-hidden flex flex-col">
                    {/* Background Glow on Hover - упрощенная */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B0FF74]/0 to-[#B0FF74]/0 group-hover:from-[#B0FF74]/5 group-hover:to-[#B0FF74]/0 transition-all duration-300"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Company Badge */}
                      <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#B0FF74]"></div>
                        <span className="text-white/70 text-sm">{relatedCase.company}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#B0FF74] transition-colors duration-300">
                        {relatedCase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm mb-4 leading-relaxed flex-grow">
                        {relatedCase.shortDescription || relatedCase.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {relatedCase.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center text-[#B0FF74] group-hover:gap-2 transition-all duration-300 mt-auto">
                        <span className="text-sm font-medium">Read Case Study</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Детекция мобильных устройств
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-cta bg-transparent relative overflow-hidden">
      {/* Background Effects - только на десктопе */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_rgba(176,255,116,0.4)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_rgba(144,238,144,0.3)_0%,_transparent_70%)]" />
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{
              textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
            }}
          >
            Ready to Transform Your Business?
          </h2>
          
          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can implement a similar automation solution tailored to your specific business needs and challenges.
          </p>
          
          <div className="flex justify-center">
            <Link href="/contacts">
              <Button 
                variant="secondary" 
                size="lg"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  See How It Works
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}