"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GCSVideo } from '@/components/ui/gcs-video';
import { CaseStudy } from '@/lib/data/case-studies';

interface CaseStudyTemplateProps {
  caseStudy: CaseStudy;
  relatedCases: CaseStudy[];
}

export default function CaseStudyTemplate({ caseStudy, relatedCases }: CaseStudyTemplateProps) {
  const [activeResultIndex, setActiveResultIndex] = useState(0);

  // Auto-rotate results every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveResultIndex((prev) => (prev + 1) % caseStudy.results.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [caseStudy.results.length]);

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
      const percentMatch = result.match(/(\d+)%/);
      if (percentMatch) {
        const percent = parseInt(percentMatch[1]);
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

  const getResultDescription = (result: string, index: number) => {
    return uniqueResultLabels[index] || `Result ${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Immediate Impact */}
      <HeroSection caseStudy={caseStudy} />
      
      {/* Video Section - Full Screen Presence */}
      <VideoSection caseStudy={caseStudy} />
      
      {/* Impact Metrics with Animations */}
      <ImpactMetricsSection caseStudy={caseStudy} />
      
      {/* Challenge & Solution */}
      <ChallengeAndSolutionSection caseStudy={caseStudy} />
      
      {/* Interactive Results */}
      <InteractiveResultsSection 
        caseStudy={caseStudy} 
        activeIndex={activeResultIndex}
        onIndexChange={setActiveResultIndex}
        getResultDescription={getResultDescription}
      />
      
      {/* Client Testimonial */}
      {caseStudy.testimonial && (
        <TestimonialSection testimonial={caseStudy.testimonial} />
      )}
      
      {/* Technical Deep-dive */}
      <TechnicalSection caseStudy={caseStudy} />
      
      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <RelatedCasesSection relatedCases={relatedCases} />
      )}
      
      {/* Call to Action */}
      <CTASection />
    </div>
  );
}

function HeroSection({ caseStudy }: { caseStudy: CaseStudy }) {
  const titleControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      titleControls.start("visible");
    }, 300);
    return () => clearTimeout(timer);
  }, [titleControls]);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="section-hero bg-transparent relative overflow-hidden">
      {/* Animated Background */}
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
            ease: "easeInOut"
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
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center text-light-gray mb-6">
            <Link href="/cases" className="hover:text-white transition-colors text-xs">
              Case Studies
            </Link>
            <span className="mx-2 text-primary text-xs">/</span>
            <span className="text-white text-xs">{caseStudy.title}</span>
          </div>

          {/* Company Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-full px-4 py-2 mb-8 border border-[#B0FF74]/20"
          >
            <div className="w-3 h-3 rounded-full bg-[#B0FF74] animate-pulse"></div>
            <span className="text-white font-medium">{caseStudy.company}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{caseStudy.location}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial="hidden"
            animate={titleControls}
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{
              textShadow: '0 0 30px rgba(176, 255, 116, 0.8), 0 0 60px rgba(176, 255, 116, 0.5)'
            }}
          >
            {caseStudy.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            {caseStudy.shortDescription || caseStudy.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16"
          >
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => {
                const metricsSection = document.getElementById('impact-metrics');
                metricsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Impact Metrics
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
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-[#B0FF74] mb-2">
                {caseStudy.industry}
              </div>
              <div className="text-gray-400 text-xs">Industry</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-[#B0FF74] mb-2">
                {caseStudy.solutionType}
              </div>
              <div className="text-gray-400 text-xs">Solution Type</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-[#B0FF74] mb-2">
                {caseStudy.technologies.length}+
              </div>
              <div className="text-gray-400 text-xs">Technologies</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
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
      </motion.div>
    </section>
  );
}

function VideoSection({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="py-12 bg-transparent" id="video-section">
      <div className="container mx-auto px-4">
        {/* Video player - centered and full screen presence */}
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video rounded-lg overflow-hidden video-button-glow">
            <GCSVideo 
              caseId={caseStudy.id} 
              autoPlay={true}
              loop={true}
              muted={true}
              controls={false}
              placeholder={
                <div className="h-full flex items-center justify-center bg-gradient-to-b from-dark-gray to-medium-gray">
                  <div className="text-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg text-light-gray">Loading case study visualization...</p>
                  </div>
                </div>
              }
              onError={() => console.log(`Failed to load video for case: ${caseStudy.id}`)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactMetricsSection({ caseStudy }: { caseStudy: CaseStudy }) {
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

  // Extract numerical values from results for animation
  const extractNumber = (text: string) => {
    const match = text.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <section id="impact-metrics" ref={sectionRef} className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-10"
          animate={{
            background: [
              "radial-gradient(ellipse, rgba(176, 255, 116, 0.3) 0%, transparent 70%)",
              "radial-gradient(ellipse, rgba(176, 255, 116, 0.5) 0%, transparent 70%)",
              "radial-gradient(ellipse, rgba(176, 255, 116, 0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
            }}
          >
            Transformation Impact
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Measurable results that demonstrate the power of automation and intelligent process design
          </p>
        </motion.div>

        {/* Improved grid layout with proper centering */}
        <div className={`gap-8 max-w-6xl mx-auto ${
          // For small numbers, use flexbox for perfect centering
          caseStudy.results.length <= 2 
            ? 'flex flex-wrap justify-center'
            : caseStudy.results.length === 3 
              ? 'grid grid-cols-1 md:grid-cols-3 justify-items-center' 
              : caseStudy.results.length === 4 
                ? 'grid grid-cols-1 md:grid-cols-2 justify-items-center' 
                : caseStudy.results.length === 5 
                  ? 'grid grid-cols-1 md:grid-cols-3 justify-items-center'
                  : caseStudy.results.length === 6 
                    ? 'grid grid-cols-1 md:grid-cols-3 justify-items-center' 
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'
        }`}>
          {caseStudy.results.map((result, index) => {
            const number = extractNumber(result);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className={`relative group cursor-default ${
                  // For flex layout (1-2 items), set consistent width
                  caseStudy.results.length <= 2 
                    ? 'w-full max-w-sm'
                    : // For 5 items, special handling for last 2 items
                      caseStudy.results.length === 5 && index >= 3 
                        ? 'w-full max-w-sm'
                        : 'w-full'
                }`}
                style={{
                  // For 5-item grid, place last 2 items in centered positions
                  ...(caseStudy.results.length === 5 && index >= 3 && {
                    gridColumn: index === 3 ? '1 / 2' : '3 / 4'
                  })
                }}
              >
                {/* Card Background */}
                <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl p-8 border border-[#B0FF74]/20 relative overflow-hidden h-full transition-all duration-500 hover:border-[#B0FF74]/40">
                  
                  {/* Animated Background Glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(176, 255, 116, 0.3) 0%, transparent 70%)'
                    }}
                  />
                  
                  {/* Number Animation */}
                  {number > 0 && (
                    <div className="text-center mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.2 + 0.3,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="text-5xl md:text-6xl font-bold text-[#B0FF74] relative z-10"
                        style={{
                          textShadow: '0 0 30px rgba(176, 255, 116, 0.8)'
                        }}
                      >
                        <AnimatedCounter 
                          from={0} 
                          to={number} 
                          isVisible={isVisible}
                          delay={index * 0.2 + 0.5}
                        />%
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Result Text */}
                  <div className="relative z-10">
                    <p className="text-white text-lg font-medium leading-relaxed text-center">
                      {result}
                    </p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#B0FF74] opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-[#B0FF74] opacity-40"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Animated Counter Component
function AnimatedCounter({ 
  from, 
  to, 
  isVisible, 
  delay = 0 
}: { 
  from: number; 
  to: number; 
  isVisible: boolean; 
  delay?: number; 
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 FPS
      const increment = (to - from) / steps;
      let current = from;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= to) {
          setCount(to);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isVisible, from, to, delay]);

  return <span>{count}</span>;
}


function ChallengeAndSolutionSection({ caseStudy }: { caseStudy: CaseStudy }) {
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
    <section ref={sectionRef} className="py-16 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header - Reduced spacing */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
              }}
            >
              Challenge & Solution
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Understanding the challenges and our systematic approach to transforming business processes
            </p>
          </div>

          {/* Two-column layout with optimized spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Challenge Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-red-900/20 via-[#170A24] to-[#12071A] rounded-2xl p-6 md:p-8 border border-red-500/30 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-red-500"></div>
                <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-red-400"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-red-500"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-red-400"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">The Challenge</h3>
                </div>
                
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>
            </motion.div>

            {/* Solution Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-[#0A2A0A] via-[#170A24] to-[#12071A] rounded-2xl p-6 md:p-8 border border-[#B0FF74]/30 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#B0FF74]"></div>
                <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#B0FF74]"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-[#B0FF74]"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#B0FF74]"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#B0FF74]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#B0FF74]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Our Solution</h3>
                </div>
                
                {/* Solution Steps */}
                <div className="space-y-3">
                  {caseStudy.solution?.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#B0FF74]/20 border border-[#B0FF74]/40 flex items-center justify-center text-[#B0FF74] font-bold text-xs relative mt-1">
                        {index + 1}
                        <motion.div
                          className="absolute inset-0 rounded-full border border-[#B0FF74]/60"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      </div>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies Sidebar - moved to bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-6 pt-4 border-t border-[#B0FF74]/20"
                >
                  <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#B0FF74]/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded bg-[#B0FF74]"></div>
                    </div>
                    Tech Stack
                  </h4>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {caseStudy.technologies.slice(0, 6).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-[#B0FF74]/10 text-[#B0FF74] px-2 py-1 rounded-full border border-[#B0FF74]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
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
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(176, 255, 116, 0.8), 0 0 40px rgba(176, 255, 116, 0.4)'
              }}
            >
              Measurable Results
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Quantifiable improvements that demonstrate the value of our automation solutions
            </p>
          </div>

          {/* Interactive Results Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-3">
                {caseStudy.results.map((result, index) => (
                  <motion.button
                    key={index}
                    onClick={() => onIndexChange(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 relative group ${
                      activeIndex === index 
                        ? 'bg-[#B0FF74]/10 border border-[#B0FF74]/30' 
                        : 'bg-white/5 border border-transparent hover:border-[#B0FF74]/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeIndex === index && (
                      <motion.div 
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#B0FF74]/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
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
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Result Display */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl p-8 md:p-12 border border-[#B0FF74]/20 relative overflow-hidden"
                >
                  {/* Background Glow */}
                  <motion.div 
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-10"
                    animate={{
                      background: [
                        "radial-gradient(circle, rgba(176, 255, 116, 0.5) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(176, 255, 116, 0.7) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(176, 255, 116, 0.5) 0%, transparent 70%)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                      {caseStudy.results[activeIndex]}
                    </h3>
                    
                    {/* Visual Elements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="text-white/70">
                          This improvement demonstrates the power of systematic automation and process optimization.
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#B0FF74]"></div>
                          <span className="text-[#B0FF74] font-medium">Verified Result</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-[#B0FF74]/30 flex items-center justify-center relative">
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-[#B0FF74]"
                            style={{
                              clipPath: `polygon(0 0, ${activeIndex * 25 + 25}% 0, ${activeIndex * 25 + 25}% 100%, 0 100%)`
                            }}
                            initial={{ clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" }}
                            animate={{ 
                              clipPath: `polygon(0 0, ${activeIndex * 25 + 25}% 0, ${activeIndex * 25 + 25}% 100%, 0 100%)`
                            }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                          <span className="text-[#B0FF74] font-bold text-lg">
                            {activeIndex + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialSection({ testimonial }: { testimonial: CaseStudy['testimonial'] }) {
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
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-5"
          animate={{
            background: [
              "radial-gradient(ellipse, rgba(176, 255, 116, 0.4) 0%, transparent 70%)",
              "radial-gradient(ellipse, rgba(176, 255, 116, 0.6) 0%, transparent 70%)",
              "radial-gradient(ellipse, rgba(176, 255, 116, 0.4) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-[#B0FF74]/10 flex items-center justify-center mx-auto mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#B0FF74]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-light text-white/90 italic leading-relaxed mb-8"
          >
            <span dangerouslySetInnerHTML={{ 
              __html: `&ldquo;${highlightKeyWords(testimonial.quote)}&rdquo;` 
            }} />
          </motion.blockquote>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-1 h-12 bg-[#B0FF74] rounded-full mb-4"></div>
            <h4 className="text-xl font-bold text-[#B0FF74] mb-2">
              {testimonial.author}
            </h4>
            <p className="text-white/60">
              {testimonial.position}
            </p>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl border border-[#B0FF74]/20 overflow-hidden"
          >
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
                  transition={{ duration: 0.5, ease: "easeInOut" }}
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
          </motion.div>
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

          {/* Related Cases Grid with dynamic centering */}
          <div className={`gap-8 ${
            relatedCases.length <= 2 
              ? 'flex flex-wrap justify-center' 
              : 'grid grid-cols-1 md:grid-cols-3 justify-items-center'
          }`}>
            {relatedCases.map((relatedCase, index) => (
              <motion.div
                key={relatedCase.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group cursor-pointer ${
                  relatedCases.length <= 2 ? 'w-full max-w-sm' : 'w-full'
                }`}
              >
                <Link href={`/cases/${relatedCase.id}`}>
                  <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl p-8 border border-[#B0FF74]/20 hover:border-[#B0FF74]/40 transition-all duration-300 h-full relative overflow-hidden">
                    {/* Background Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B0FF74]/0 to-[#B0FF74]/0 group-hover:from-[#B0FF74]/5 group-hover:to-[#B0FF74]/0 transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                      {/* Company Badge */}
                      <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#B0FF74]"></div>
                        <span className="text-white/70 text-sm">{relatedCase.company}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#B0FF74] transition-colors duration-300">
                        {relatedCase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm mb-6 leading-relaxed">
                        {relatedCase.shortDescription || relatedCase.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
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
                      <div className="flex items-center text-[#B0FF74] group-hover:gap-2 transition-all duration-300">
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
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
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
    <section ref={sectionRef} className="section-cta bg-transparent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          animate={{
            background: [
              "radial-gradient(circle, rgba(176, 255, 116, 0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176, 255, 116, 0.6) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176, 255, 116, 0.4) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          animate={{
            background: [
              "radial-gradient(circle, rgba(144, 238, 144, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(144, 238, 144, 0.5) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(144, 238, 144, 0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}