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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate results every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveResultIndex((prev) => (prev + 1) % caseStudy.results.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [caseStudy.results.length, isAutoPlaying]);

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

  const getResultDescription = (_result: string, index: number) => {
    return uniqueResultLabels[index] || `Result ${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Immediate Impact */}
      <HeroSection caseStudy={caseStudy} />
      
      {/* Video Section - Full Screen Presence */}
      <VideoSection caseStudy={caseStudy} />
      
      {/* Business Impact Analysis */}
      <InteractiveResultsSection 
        caseStudy={caseStudy} 
        activeIndex={activeResultIndex}
        onIndexChange={handleManualIndexChange}
        getResultDescription={getResultDescription}
        isAutoPlaying={isAutoPlaying}
      />
      
      {/* Challenge & Solution */}
      <ChallengeAndSolutionSection caseStudy={caseStudy} />
      
      
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




function ChallengeAndSolutionSection({ caseStudy }: { caseStudy: CaseStudy }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Enhanced challenge-solution pairs for interactive slider
  const challengeSolutionPairs = useMemo(() => [
    {
      id: 'data-integration',
      challenge: {
        title: 'Disconnected Data Silos',
        subtitle: `Critical business data trapped in incompatible systems across ${caseStudy.industry} operations`,
        description: 'Multiple systems operating in isolation prevent real-time insights and create operational blind spots that limit strategic decision-making capabilities.',
        priority: 'Critical',
        area: 'Data Integration',
        impact: 'Blocks scalability and real-time decision making'
      },
      solutions: [
        {
          title: 'Unified Data Platform',
          description: 'Custom integration layer connecting all business systems with real-time data synchronization',
          technologies: ['Azure', 'API Gateway', 'ETL Pipeline'],
          timeframe: '10',
          keyBenefit: 'Single source of truth for all business data'
        },
        {
          title: 'Real-time Data Synchronization',
          description: 'Bidirectional data sync ensuring consistency across all platforms',
          technologies: ['Webhooks', 'Event Streaming', 'Message Queues'],
          timeframe: '5',
          keyBenefit: 'Instant data consistency across systems'
        }
      ]
    },
    {
      id: 'process-automation',
      challenge: {
        title: 'Manual Process Bottlenecks',
        subtitle: 'Time-consuming manual tasks blocking business scalability and growth',
        description: 'Repetitive manual workflows consume valuable resources and create operational inefficiencies that prevent teams from focusing on strategic initiatives.',
        priority: 'High',
        area: 'Process Automation',
        impact: 'Limits operational efficiency and scalability'
      },
      solutions: [
        {
          title: 'Intelligent Process Automation',
          description: 'AI-powered workflows that learn and adapt to business patterns',
          technologies: ['AI/ML', 'RPA', 'Workflow Engine'],
          timeframe: '8',
          keyBenefit: 'Self-improving automated processes'
        },
        {
          title: 'Smart Workflow Engine',
          description: 'Context-aware automation that handles complex business scenarios',
          technologies: ['OpenAI', 'Logic Apps', 'Decision Trees'],
          timeframe: '11',
          keyBenefit: 'Intelligent decision-making automation'
        }
      ]
    },
    {
      id: 'legacy-modernization',
      challenge: {
        title: 'Outdated Legacy Infrastructure',
        subtitle: 'Aging systems limiting business growth potential and innovation',
        description: 'Legacy systems create technical debt, security vulnerabilities, and integration challenges that prevent modern business transformation.',
        priority: 'High',
        area: 'System Modernization',
        impact: 'Prevents digital transformation and innovation'
      },
      solutions: [
        {
          title: 'Cloud-First Architecture',
          description: 'Scalable cloud infrastructure replacing legacy on-premise systems',
          technologies: ['AWS', 'Kubernetes', 'Microservices'],
          timeframe: '14',
          keyBenefit: 'Infinite scalability and reduced maintenance'
        },
        {
          title: 'Modern API Layer',
          description: 'RESTful APIs enabling seamless system integration and extensibility',
          technologies: ['GraphQL', 'REST', 'API Gateway'],
          timeframe: '7',
          keyBenefit: 'Flexible integration and future-proofing'
        }
      ]
    },
    {
      id: 'decision-analytics',
      challenge: {
        title: 'Slow Decision Making',
        subtitle: 'Lack of real-time insights delaying critical business decisions',
        description: 'Without real-time data analytics, business leaders make decisions based on outdated information, missing opportunities and risking competitive disadvantage.',
        priority: 'Medium',
        area: 'Analytics',
        impact: 'Missed opportunities and competitive disadvantage'
      },
      solutions: [
        {
          title: 'AI-Powered Analytics',
          description: 'Machine learning models providing predictive business insights',
          technologies: ['TensorFlow', 'Python', 'Big Data'],
          timeframe: '12',
          keyBenefit: 'Predictive insights and trend analysis'
        },
        {
          title: 'Executive Dashboards',
          description: 'Live business intelligence with customizable KPI monitoring',
          technologies: ['Power BI', 'React', 'Real-time APIs'],
          timeframe: '6',
          keyBenefit: 'Real-time business performance monitoring'
        }
      ]
    },
    {
      id: 'compliance-risk',
      challenge: {
        title: 'Compliance & Risk Exposure',
        subtitle: 'Manual compliance processes creating regulatory and operational risks',
        description: 'Manual compliance tracking increases the risk of regulatory violations and creates administrative overhead that diverts resources from core business activities.',
        priority: 'Critical',
        area: 'Risk Management',
        impact: 'Regulatory violations and operational risks'
      },
      solutions: [
        {
          title: 'Automated Compliance Engine',
          description: 'Continuous compliance monitoring with automatic regulatory reporting',
          technologies: ['Compliance APIs', 'Audit Tools', 'Monitoring'],
          timeframe: '10',
          keyBenefit: 'Continuous compliance and risk mitigation'
        },
        {
          title: 'Complete Audit Trails',
          description: 'Immutable transaction logs ensuring full regulatory compliance',
          technologies: ['Blockchain', 'Logging', 'Encryption'],
          timeframe: '8',
          keyBenefit: 'Immutable compliance records'
        }
      ]
    }
  ], [caseStudy.industry]);

  // Auto-progression through slides
  useEffect(() => {
    if (!isVisible || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % challengeSolutionPairs.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isVisible, isAutoPlaying, challengeSolutionPairs.length]);

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-[#B0FF74]/20 text-[#B0FF74] border-[#B0FF74]/30';
      case 'Medium': return 'bg-white/20 text-white/80 border-white/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getAreaColor = (area: string) => {
    switch (area) {
      case 'Data Integration': return 'bg-primary/20 text-primary border-primary/30';
      case 'Process Automation': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'System Modernization': return 'bg-neon-blue/20 text-neon-blue border-neon-blue/30';
      case 'Analytics': return 'bg-neon-purple/20 text-neon-purple border-neon-purple/30';
      case 'Risk Management': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-light-gray/20 text-light-gray border-light-gray/30';
    }
  };

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setActiveSlide(prev => prev === 0 ? challengeSolutionPairs.length - 1 : prev - 1);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setActiveSlide(prev => (prev + 1) % challengeSolutionPairs.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveSlide(index);
  };

  const currentPair = challengeSolutionPairs[activeSlide];

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full blur-3xl opacity-5"
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
              Challenge & Solution Spotlight
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              Interactive exploration of business challenges and their intelligent automation solutions
            </p>
          </div>

          {/* Interactive Slider */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 rounded-full bg-[#B0FF74]/10 border border-[#B0FF74]/30 flex items-center justify-center hover:bg-[#B0FF74]/20 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-[#B0FF74] transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 z-20 w-12 h-12 rounded-full bg-[#B0FF74]/10 border border-[#B0FF74]/30 flex items-center justify-center hover:bg-[#B0FF74]/20 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-[#B0FF74] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Challenge-Solution Pair Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-[600px]"
              >
                {/* Challenge Side */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-red-900/20 via-[#170A24] to-[#12071A] rounded-3xl p-8 md:p-12 border border-red-500/30 h-full relative overflow-hidden">
                    {/* Challenge Background Glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-3xl"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      {/* Challenge Header */}
                      <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-4 h-4 rounded-full bg-red-500"></div>
                          <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Business Challenge</span>
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                          {currentPair.challenge.title}
                        </h3>
                        
                        <p className="text-white/70 leading-relaxed mb-10">
                          {currentPair.challenge.description}
                        </p>
                      </div>

                      {/* Challenge Details */}
                      <div className="space-y-8">
                        <div className="flex flex-wrap gap-3">
                          <span className={`text-xs px-4 py-2 rounded-full border ${getPriorityColor(currentPair.challenge.priority)}`}>
                            {currentPair.challenge.priority} Priority
                          </span>
                          <span className={`text-xs px-4 py-2 rounded-full border ${getAreaColor(currentPair.challenge.area)}`}>
                            {currentPair.challenge.area}
                          </span>
                        </div>
                        
                        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                          <div className="text-sm text-red-400 font-medium mb-1">Bottleneck</div>
                          <div className="text-white/80">{currentPair.challenge.impact}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solutions Side */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#0A2A0A] via-[#170A24] to-[#12071A] rounded-3xl p-8 md:p-12 border border-[#B0FF74]/30 h-full relative overflow-hidden">
                    {/* Solutions Background Glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[#B0FF74]/10 to-transparent rounded-3xl"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />
                    
                    <div className="relative z-10">
                      {/* Solutions Header */}
                      <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-4 h-4 rounded-full bg-[#B0FF74]"></div>
                          <span className="text-[#B0FF74] font-semibold text-sm uppercase tracking-wider">Our Solutions</span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                          Intelligent Automation Solutions
                        </h3>
                      </div>

                      {/* Solutions List */}
                      <div className="space-y-6">
                        {currentPair.solutions.map((solution, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-[#B0FF74]/5 rounded-2xl p-6 border border-[#B0FF74]/20 hover:border-[#B0FF74]/40 transition-all duration-300"
                          >
                            <div className="mb-4">
                              <h4 className="text-xl font-bold text-white mb-2">
                                {solution.title}
                              </h4>
                              <p className="text-white/70 leading-relaxed mb-4">
                                {solution.description}
                              </p>
                              
                              <div className="bg-[#B0FF74]/10 rounded-lg p-3 mb-4">
                                <div className="text-sm text-[#B0FF74] font-medium mb-1">Key Benefit</div>
                                <div className="text-white/80">{solution.keyBenefit}</div>
                              </div>
                            </div>


                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                              {solution.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="text-xs px-3 py-1 rounded-full bg-[#B0FF74]/20 text-[#B0FF74] border border-[#B0FF74]/30">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-12 gap-3">
              {challengeSolutionPairs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'bg-[#B0FF74] shadow-lg shadow-[#B0FF74]/50' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#B0FF74]"
                  animate={{ opacity: isAutoPlaying ? [0.3, 1, 0.3] : 0.6 }}
                  transition={{ duration: 1.5, repeat: isAutoPlaying ? Infinity : 0 }}
                />
                <span>{isAutoPlaying ? 'Auto-progression active' : 'Manual control active'}</span>
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
  getResultDescription,
  isAutoPlaying
}: { 
  caseStudy: CaseStudy; 
  activeIndex: number;
  onIndexChange: (index: number) => void;
  getResultDescription: (result: string, index: number) => string;
  isAutoPlaying: boolean;
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

            {/* Active Result Analysis */}
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
                                <motion.div
                                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#B0FF74] to-[#B0FF74]/60 rounded-full"
                                  initial={false}
                                  animate={{ 
                                    width: `${(activeIndex + 1) * (100 / caseStudy.results.length)}%` 
                                  }}
                                  transition={{ 
                                    duration: 0.8, 
                                    ease: "easeInOut"
                                  }}
                                />
                              </div>
                              
                              <span className="text-white/50 text-sm">
                                {activeIndex + 1} of {caseStudy.results.length}
                              </span>
                            </div>
                            
                            {/* Auto-play Indicator */}
                            <div className="flex justify-center mt-4">
                              <div className="flex items-center gap-2 text-white/50 text-xs">
                                <motion.div
                                  className="w-1.5 h-1.5 rounded-full bg-[#B0FF74]"
                                  animate={{ opacity: isAutoPlaying ? [0.3, 1, 0.3] : 0.6 }}
                                  transition={{ duration: 1.5, repeat: isAutoPlaying ? Infinity : 0 }}
                                />
                                <span>{isAutoPlaying ? 'Auto-playing results' : 'Manual control active'}</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
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
            {relatedCases.map((relatedCase, caseIndex) => (
              <motion.div
                key={relatedCase.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: caseIndex * 0.1 }}
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