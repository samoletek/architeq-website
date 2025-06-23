"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useScrollAnimation } from '@/lib/utils/animation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

// Team member interface
interface TeamMember {
  name: string;
  position: string;
  bio: string;
  expertise: string[];
  expandedBio?: string;
  yearsExperience?: number;
  location?: string;
}

// Company value interface
interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

// Achievement interface
interface Achievement {
  number: string;
  suffix: string;
  label: string;
  description: string;
}

// Technology interface
interface Technology {
  name: string;
  category: string;
  description: string;
}

// Team data
const teamMembers: TeamMember[] = [
  {
    name: 'Andrew Serhiienko',
    position: 'Founder & Business Analyst',
    bio: 'Acts as the system architect between business needs and tech implementation, turning complex operational challenges into structured, scalable automation plans that engineers can execute without rework or ambiguity.',
    expandedBio: 'With over 8 years of experience bridging the gap between business strategy and technical execution, Andrew has led digital transformation initiatives for companies ranging from startups to Fortune 500 enterprises. His unique approach involves deep-dive operational analysis followed by systematic automation implementation, resulting in average efficiency gains of 40-60% for client organizations.',
    expertise: ['Business Analysis', 'System Architecture', 'Process Design', 'Strategic Planning'],
    yearsExperience: 8,
    location: 'Remote, EU'
  },
  {
    name: 'Gennady M.',
    position: 'Lead Integration Engineer',
    bio: 'Builds logic-driven integrations between tools and CRMs, ensuring that every platform speaks the same language and that data flows without friction or loss.',
    expandedBio: 'Gennady brings 6+ years of specialized experience in enterprise integrations and API architecture. He has successfully connected over 200 different software platforms and has developed proprietary integration frameworks that reduce implementation time by 50%. His expertise spans from legacy system modernization to cutting-edge cloud-native architectures.',
    expertise: ['System Integration', 'API Development', 'Data Flow', 'Platform Connectivity'],
    yearsExperience: 6,
    location: 'Remote, EU'
  },
  {
    name: 'Yakov S.',
    position: 'AI Solutions Developer',
    bio: 'Designs applied AI systems that go beyond hype—automating decisions, predicting behavior, and solving real problems for growing businesses.',
    expandedBio: 'Yakov combines deep machine learning expertise with practical business acumen, having developed AI solutions that have processed over $10M in business transactions. His focus on explainable AI and ethical implementation ensures that clients understand and trust their automated decision-making systems.',
    expertise: ['AI/ML Development', 'Predictive Analytics', 'Decision Automation', 'Smart Systems'],
    yearsExperience: 5,
    location: 'Remote, EU'
  },
  {
    name: 'Daniil A.',
    position: 'Integration Engineer',
    bio: 'Specializes in stitching together disconnected systems into unified workflows, eliminating manual tasks and ensuring reliable data flow across tools.',
    expandedBio: 'Daniil excels at transforming chaotic manual processes into seamless automated workflows. With 4+ years of experience in process optimization and system integration, he has helped clients eliminate up to 30 hours of manual work per week while improving data accuracy and operational visibility.',
    expertise: ['Workflow Automation', 'System Integration', 'Data Management', 'Process Optimization'],
    yearsExperience: 4,
    location: 'Remote, EU'
  }
];

// Company values data
const companyValues: CompanyValue[] = [
  {
    title: 'Business-First Thinking',
    description: 'Every technical decision serves a clear business purpose. We build solutions that directly impact your bottom line and operational efficiency.',
    icon: 'chart'
  },
  {
    title: 'Iterative Excellence',
    description: 'We deliver working solutions quickly, then iterate based on real-world usage. Your feedback shapes the evolution of your automation systems.',
    icon: 'cycle'
  },
  {
    title: 'Future-Ready Architecture',
    description: 'Our solutions scale with your business. What works for 10 users today will seamlessly grow to support 1000 users tomorrow.',
    icon: 'growth'
  },
  {
    title: 'Transparent Collaboration',
    description: 'You understand every aspect of your solution. We provide clear documentation, training, and ongoing support that empowers your team.',
    icon: 'connect'
  }
];

// Achievements data
const achievements: Achievement[] = [
  {
    number: '50',
    suffix: '+',
    label: 'Successful Projects',
    description: 'Complex automation solutions delivered across diverse industries'
  },
  {
    number: '95',
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Clients report significant operational improvements within 90 days'
  },
  {
    number: '24',
    suffix: '/7',
    label: 'System Reliability',
    description: 'Our automated systems maintain continuous uptime and performance'
  },
  {
    number: '3',
    suffix: 'x',
    label: 'Average ROI',
    description: 'Typical return on investment achieved within the first year'
  }
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Mission & Vision Section */}
      <MissionVisionSection />
      
      {/* Company Values Section */}
      <ValuesSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Interactive Approach Section */}
      <InteractiveApproachSection />
      
      {/* Achievements Section */}
      <AchievementsSection />
      
      {/* Methodology Section */}
      <MethodologySection />
      
      {/* Technology Stack Section */}
      <TechnologyStackSection />
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

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
    <section ref={ref} className="section-hero bg-transparent relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(119, 71, 207, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(178, 75, 243, 0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(119, 71, 207, 0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-15"
          animate={{
            background: [
              "radial-gradient(circle, rgba(176, 255, 116, 0.2) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176, 255, 116, 0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176, 255, 116, 0.2) 0%, transparent 70%)"
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
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{
              textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(178,75,243,0.5)'
            }}
          >
            About Architeq
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            We architect digital systems that flex, scale, and adapt — for companies across industries.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/contacts">
              <Button 
                variant="secondary" 
                size="lg"
              >
                Meet Our Team
              </Button>
            </Link>
            <button 
              onClick={() => {
                const valuesSection = document.getElementById('core-values');
                valuesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white/80 hover:text-white transition-colors duration-300 text-lg font-medium group"
            >
              <span className="flex items-center">
                Our Values
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
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.2
      }
    })
  };

  return (
    <section id="mission" ref={ref} className="section-benefits bg-dark-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            custom={0}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={contentVariants}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}
            >
              Our Story & Mission
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From identifying a critical industry gap to building solutions that truly matter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Side */}
            <motion.div
              custom={1}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={contentVariants}
            >
              <h3 className="text-3xl font-bold mb-6 text-white">The Problem We Saw</h3>
              <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                  Architeq emerged in 2023 when we spotted what was holding back promising companies from reaching their potential. We saw founders and their teams <span className="text-secondary font-medium">drowning in day-to-day operations</span> instead of charting their growth strategy.
                </p>
                <p>
                  These scaling businesses were caught in a trap — spending up to <span className="text-secondary font-medium">70% of their time</span> <span className="text-secondary font-medium">firefighting operational issues</span> while their strategic vision gathered dust.
                </p>
                <p>
                  We built Architeq to <span className="text-secondary font-medium">break this cycle</span>. Before jumping into solutions, we first <span className="text-secondary font-medium">map every process</span> in your business — an approach that delivers immediate clarity and efficiency gains.
                </p>
              </div>
            </motion.div>

            {/* Mission & Vision Side */}
            <motion.div
              custom={2}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={contentVariants}
              className="space-y-8"
            >
              <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl p-8 border border-primary/20 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-4 text-primary">Our Mission</h4>
                  <p className="text-white/80 leading-relaxed">
                    We&apos;re on a mission to liberate ambitious businesses from operational quicksand. By crafting intelligent automation systems, we redirect human talent toward what matters most — strategic thinking and innovation.
                  </p>
                </div>
              </div>

              <div className="bg-[linear-gradient(to_bottom,_#0A2A0A_0%,_#170A24_50%,_#12071A_100%)] rounded-2xl p-8 border border-secondary/20 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent rounded-2xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-4 text-secondary">Our Vision</h4>
                  <p className="text-white/80 leading-relaxed">
                    We&apos;re building toward a world where growing businesses operate through seamlessly integrated systems, not spreadsheets and manual workarounds. Where leadership teams spend Monday mornings discussing market opportunities, not fixing broken processes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const [activeValue, setActiveValue] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [expandedValue, setExpandedValue] = useState<number | null>(null);

  // Enhanced company values with deep-dive content
  const enhancedValues = companyValues.map((value, index) => ({
    ...value,
    deepDive: [
      {
        question: "How does this value impact our client projects?",
        answer: index === 0 
          ? "Every automation solution starts with understanding your business metrics and KPIs. We measure success by your operational improvements, not just technical implementation."
          : index === 1
          ? "We deliver working prototypes within 2-3 weeks, gather your feedback, and iterate rapidly. This approach reduces project risk and ensures the final solution truly fits your needs."
          : index === 2
          ? "Our solutions are built with growth in mind - from single-user workflows to enterprise-scale operations. What works for 10 users today seamlessly scales to 1000+ users tomorrow."
          : "We provide complete documentation, training materials, and ongoing support. You'll understand every aspect of your solution and have the knowledge to make informed decisions about future enhancements."
      },
      {
        question: "What makes our approach different?",
        answer: index === 0
          ? "Unlike tech-first approaches, we start with your business goals and work backward to the technology. This ensures every feature serves a clear purpose and delivers measurable value."
          : index === 1
          ? "Instead of lengthy development cycles, we use rapid prototyping and continuous feedback loops. You see progress weekly and can course-correct early, saving time and budget."
          : index === 2
          ? "We design flexible architectures that adapt to changing business needs. Our solutions grow with you organically, eliminating costly rebuilds as your company scales."
          : "We believe in empowering your team with knowledge. Our transparent approach includes training, documentation, and ongoing support that makes you self-sufficient over time."
      },
      {
        question: "Real-world example?",
        answer: index === 0
          ? "A logistics company wanted \"better automation.\" After analyzing their operations, we discovered the real issue was manual dispatch coordination costing 15 hours weekly. Our solution automated route optimization, saving $50K annually."
          : index === 1
          ? "For a growing SaaS company, we delivered a working customer onboarding automation in 3 weeks. Based on user feedback, we refined it twice more, resulting in 40% faster customer activation compared to their original 6-month development plan."
          : index === 2
          ? "An e-commerce startup's order processing system we built handled 100 orders/day initially. When they grew to 10,000 orders/day, the same system scaled seamlessly without requiring a complete rebuild."
          : "A manufacturing client received complete system documentation, admin training, and 90-day support. Six months later, they were confidently managing the system internally and making their own workflow optimizations."
      }
    ]
  }));

  // Auto-rotation effect with FAQ-style cycling
  useEffect(() => {
    if (!isVisible || !isAutoRotating || userHasInteracted) return;

    const interval = setInterval(() => {
      setActiveValue(prev => (prev + 1) % enhancedValues.length);
    }, 6000); // Longer interval for FAQ-style content
    return () => clearInterval(interval);
  }, [isVisible, isAutoRotating, userHasInteracted, enhancedValues.length]);

  // Resume auto-rotation after user inactivity
  useEffect(() => {
    if (userHasInteracted) {
      const timer = setTimeout(() => {
        setUserHasInteracted(false);
        setIsAutoRotating(true);
      }, 12000); // Longer pause for FAQ interactions
      return () => clearTimeout(timer);
    }
  }, [userHasInteracted]);

  const handleValueChange = (index: number) => {
    setActiveValue(index);
    setIsAutoRotating(false);
    setUserHasInteracted(true);
  };

  const handleDeepDiveToggle = (index: number) => {
    setExpandedValue(expandedValue === index ? null : index);
    setIsAutoRotating(false);
    setUserHasInteracted(true);
  };

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
    <section id="core-values" ref={ref} className="section-solutions bg-transparent relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle, rgba(119,71,207,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(178,75,243,0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(119,71,207,0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(176,255,116,0.2) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176,255,116,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(176,255,116,0.2) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
            }}
          >
            Our Core Values
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            The principles that guide every decision and shape our approach to business transformation
          </p>
        </motion.div>

        {/* FAQ-Style Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeValue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-3xl p-8 md:p-12 border border-primary/30 relative overflow-hidden mb-8"
            >
              {/* Active glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {enhancedValues[activeValue].title}
                  </h3>
                  <div className="text-primary text-sm font-medium">
                    Core Value #{activeValue + 1} of {enhancedValues.length}
                  </div>
                </div>

                {/* Main Description */}
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                  {enhancedValues[activeValue].description}
                </p>

                {/* Deep Dive FAQ */}
                <div className="space-y-4">
                  {enhancedValues[activeValue].deepDive.map((faq, faqIndex) => (
                    <motion.div
                      key={faqIndex}
                      className="bg-white/5 rounded-xl overflow-hidden border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + faqIndex * 0.1 }}
                    >
                      <button
                        onClick={() => handleDeepDiveToggle(faqIndex)}
                        className="w-full p-4 text-left hover:bg-white/5 transition-colors duration-300 flex items-center justify-between group"
                      >
                        <span className={`font-medium pr-4 transition-colors duration-300 ${
                          expandedValue === faqIndex ? 'text-primary' : 'text-white'
                        }`}>{faq.question}</span>
                        <motion.svg
                          className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ rotate: expandedValue === faqIndex ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      
                      <AnimatePresence>
                        {expandedValue === faqIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            <div className="px-4 pb-4">
                              <p className="text-white leading-relaxed pt-4" dangerouslySetInnerHTML={{
                                __html: faq.answer
                                  .replace(/business metrics and KPIs/g, '<span class="text-primary font-semibold">business metrics and KPIs</span>')
                                  .replace(/operational improvements/g, '<span class="text-primary font-semibold">operational improvements</span>')
                                  .replace(/working prototypes within 2-3 weeks/g, '<span class="text-primary font-semibold">working prototypes within 2-3 weeks</span>')
                                  .replace(/reduces project risk/g, '<span class="text-primary font-semibold">reduces project risk</span>')
                                  .replace(/growth in mind/g, '<span class="text-primary font-semibold">growth in mind</span>')
                                  .replace(/seamlessly scales/g, '<span class="text-primary font-semibold">seamlessly scales</span>')
                                  .replace(/complete documentation/g, '<span class="text-primary font-semibold">complete documentation</span>')
                                  .replace(/training materials/g, '<span class="text-primary font-semibold">training materials</span>')
                                  .replace(/business goals/g, '<span class="text-primary font-semibold">business goals</span>')
                                  .replace(/measurable value/g, '<span class="text-primary font-semibold">measurable value</span>')
                                  .replace(/rapid prototyping/g, '<span class="text-primary font-semibold">rapid prototyping</span>')
                                  .replace(/continuous feedback loops/g, '<span class="text-primary font-semibold">continuous feedback loops</span>')
                                  .replace(/flexible architectures/g, '<span class="text-primary font-semibold">flexible architectures</span>')
                                  .replace(/eliminating costly rebuilds/g, '<span class="text-primary font-semibold">eliminating costly rebuilds</span>')
                                  .replace(/empowering your team/g, '<span class="text-primary font-semibold">empowering your team</span>')
                                  .replace(/self-sufficient/g, '<span class="text-primary font-semibold">self-sufficient</span>')
                                  .replace(/automated route optimization/g, '<span class="text-primary font-semibold">automated route optimization</span>')
                                  .replace(/saving \$50K annually/g, '<span class="text-primary font-semibold">saving $50K annually</span>')
                                  .replace(/40% faster customer activation/g, '<span class="text-primary font-semibold">40% faster customer activation</span>')
                                  .replace(/scaled seamlessly/g, '<span class="text-primary font-semibold">scaled seamlessly</span>')
                                  .replace(/without requiring a complete rebuild/g, '<span class="text-primary font-semibold">without requiring a complete rebuild</span>')
                                  .replace(/managing the system internally/g, '<span class="text-primary font-semibold">managing the system internally</span>')
                                  .replace(/workflow optimizations/g, '<span class="text-primary font-semibold">workflow optimizations</span>')
                              }}>
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-6">
          {/* Value Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {enhancedValues.map((value, index) => (
              <motion.button
                key={index}
                onClick={() => handleValueChange(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeValue === index
                    ? 'bg-primary text-black shadow-lg shadow-primary/30'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {value.title}
              </motion.button>
            ))}
          </div>
          
          {/* Progress Indicators */}
          <div className="flex justify-center gap-3">
            {enhancedValues.map((_, index) => (
              <button
                key={index}
                onClick={() => handleValueChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeValue === index 
                    ? 'bg-primary shadow-lg shadow-primary/50' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          
          {/* Auto-rotation Status */}
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: isAutoRotating && !userHasInteracted ? [0.3, 1, 0.3] : 0.6 }}
              transition={{ duration: 1.5, repeat: isAutoRotating && !userHasInteracted ? Infinity : 0 }}
            />
            <span>
              {isAutoRotating && !userHasInteracted ? 'Auto-cycling values' : 'Manual exploration mode'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const [activeMember, setActiveMember] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simple intersection observer for animations only
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Auto-carousel with 6-second intervals
  useEffect(() => {
    if (!isAutoPlaying) return;

    const autoInterval = setInterval(() => {
      setActiveMember(prev => (prev + 1) % teamMembers.length);
    }, 6000);

    return () => clearInterval(autoInterval);
  }, [isAutoPlaying]);

  const handleMemberClick = (index: number) => {
    setActiveMember(index);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const handleMemberExpand = (index: number) => {
    setExpandedMember(expandedMember === index ? null : index);
    setIsAutoPlaying(false); // Stop auto-play when expanding details
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setActiveMember((activeMember - 1 + teamMembers.length) % teamMembers.length);
    } else {
      setActiveMember((activeMember + 1) % teamMembers.length);
    }
  };

  // Simple card visibility logic - only show active card
  const isCardVisible = (index: number) => {
    return index === activeMember;
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05
      }
    })
  };


  return (
    <section 
      ref={sectionRef}
      className="section-benefits bg-dark-gray py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(176,255,116,0.4)'
            }}
          >
            Meet Our Team
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            The experts behind your business transformation and automation success
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Left Navigation - Team member list */}
            <div className="lg:col-span-1">
              <div className="w-full">
                <div className="space-y-2">
                  {teamMembers.map((member, index) => (
                    <motion.button
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      variants={navVariants}
                      onClick={() => handleMemberClick(index)}
                      className={`w-full text-left py-4 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group focus:outline-none ${
                        activeMember === index 
                          ? 'text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {activeMember === index && (
                        <motion.div 
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: 'linear-gradient(135deg, rgba(176,255,116,0.2) 0%, rgba(176,255,116,0.15) 100%)',
                            boxShadow: '0 0 20px rgba(176,255,116,0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            boxShadow: [
                              '0 0 20px rgba(176,255,116,0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                              '0 0 30px rgba(176,255,116,0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                              '0 0 20px rgba(176,255,116,0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            ]
                          }}
                          transition={{
                            opacity: { duration: 0.3 },
                            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />
                      )}
                      
                      {activeMember !== index && (
                        <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      )}
                      
                      <span className={`relative z-10 font-medium text-base md:text-lg leading-relaxed block transition-colors duration-300 ${
                        activeMember === index ? 'text-white font-bold' : 'text-white/90'
                      }`}>
                        {member.name}
                      </span>
                      
                      <span className={`relative z-10 text-sm block transition-colors duration-300 ${
                        activeMember === index ? 'text-secondary font-semibold' : 'text-secondary/70'
                      }`}>
                        {member.position}
                      </span>
                      
                      <span className={`relative z-10 text-xs font-mono mt-1 block transition-colors duration-300 ${
                        activeMember === index ? 'text-secondary' : 'text-white/50'
                      }`}>
                        T{String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation controls */}
                <div className="flex justify-center items-center gap-8 mt-8 px-6">
                  <button
                    onClick={() => handleNavigate('prev')}
                    className="flex items-center font-medium transition-all duration-300 focus:outline-none text-secondary hover:text-secondary/80"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Previous
                  </button>

                  <span className="text-white/50 text-sm font-mono">
                    {activeMember + 1} / {teamMembers.length}
                  </span>

                  <button
                    onClick={() => handleNavigate('next')}
                    className="flex items-center font-medium transition-all duration-300 focus:outline-none text-secondary hover:text-secondary/80"
                  >
                    Next
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Auto-play status */}
                <div className="flex justify-center items-center gap-2 mt-4 text-xs text-white/50">
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-secondary' : 'bg-white/30'}`}
                    animate={isAutoPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>
                    {isAutoPlaying ? 'Auto-rotating team members' : 'Manual mode'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Single active member card */}
            <div className="lg:col-span-2">
              <div className="relative">
                <AnimatePresence mode="wait">
                  {teamMembers.map((member, index) => (
                    isCardVisible(index) && (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        className="w-full"
                      >
                        <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-3xl overflow-hidden border border-white/10 hover:border-secondary/40 transition-all duration-500 shadow-xl shadow-black/20">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                            {/* Profile Section */}
                            <div className="lg:col-span-1 p-8 lg:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/5 to-transparent">
                              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/50 flex items-center justify-center mb-6 text-4xl font-bold text-white transition-transform duration-500">
                                {member.name.charAt(0)}
                              </div>
                              
                              <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300">
                                {member.name}
                              </h3>
                              
                              <p className="text-secondary text-lg font-semibold mb-4">
                                {member.position}
                              </p>

{/* Experience and location */}
{member.yearsExperience && (
  <div className="flex flex-col items-center gap-3 text-sm text-white/60">
    {/* Experience centered */}
    <span className="whitespace-nowrap">{member.yearsExperience}+ years experience</span>
    
    {/* Location with dot */}
    {member.location && (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-secondary shadow-sm shadow-secondary/50 flex-shrink-0"></span>
        <span>{member.location}</span>
      </div>
    )}
  </div>
)}
                            </div>

                            {/* Content Section */}
                            <div className="lg:col-span-2 p-8 lg:p-12">
                              {/* Bio */}
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-white mb-4">Role</h4>
                                <p className="text-white/80 leading-relaxed text-base">
                                  {member.bio}
                                </p>
                              </div>

                              {/* Expandable Extended Bio */}
                              <AnimatePresence>
                                {expandedMember === index && member.expandedBio && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="mb-6"
                                  >
                                    <div className="border-t border-white/20 pt-6">
                                      <h4 className="text-secondary text-lg font-semibold mb-4">Extended Background</h4>
                                      <p className="text-white/80 leading-relaxed text-base">
                                        {member.expandedBio}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Expertise Tags */}
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-white mb-4">Expertise</h4>
                                <div className="flex flex-wrap gap-3">
                                  {member.expertise.map((skill, skillIndex) => (
                                    <motion.span 
                                      key={skillIndex}
                                      className="px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/40 text-sm font-medium transition-all duration-300 hover:bg-secondary/30 hover:scale-105"
                                      whileHover={{ y: -2 }}
                                    >
                                      {skill}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>

                              {/* Expand/Collapse button */}
                              {member.expandedBio && (
                                <div className="flex justify-end">
                                  <motion.button
                                    onClick={() => handleMemberExpand(index)}
                                    className="px-6 py-2 bg-white/10 hover:bg-secondary/20 border border-white/20 hover:border-secondary/40 rounded-full text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <span>{expandedMember === index ? 'Show Less' : 'Learn More'}</span>
                                    <motion.svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      animate={{ rotate: expandedMember === index ? 180 : 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                  </motion.button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2 + index * 0.1
      }
    })
  };

  return (
    <section ref={ref} className="section-solutions bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center section-content-spacing"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(176,255,116,0.4)'
            }}
          >
            Proven Results
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Numbers that demonstrate our commitment to delivering tangible business value
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={statVariants}
              className="group"
            >
              <div className="relative rounded-2xl p-8 text-center h-full transition-all duration-500 overflow-hidden
                bg-[linear-gradient(to_bottom,_#0A2A0A_0%,_#170A24_50%,_#12071A_100%)]
                border border-secondary/20 hover:border-secondary/40 group-hover:transform group-hover:scale-105">
                
                {/* Animated counter glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={hasAnimated ? { opacity: 1 } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    >
                      {achievement.number}
                    </motion.span>
                    <span className="text-secondary/80">{achievement.suffix}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3">
                    {achievement.label}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function MethodologySection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const steps = [
    {
      number: 1,
      title: 'Discovery & Alignment',
      description: 'We begin by understanding your current processes, pain points, and objectives through detailed consultations and process mapping.',
      focus: 'Business Analysis',
      insight: 'Deep understanding of current operations enables targeted automation solutions',
      keyBenefit: 'Ensures solution alignment with business goals'
    },
    {
      number: 2,
      title: 'Solution Design & Planning',
      description: 'We kick things off by aligning on objectives, expectations, and success criteria. Through stakeholder interviews, in-depth workshops, and data analysis, we map your current workflows.',
      focus: 'Strategic Planning',
      insight: 'Comprehensive planning reduces implementation risks and accelerates delivery',
      keyBenefit: 'Minimizes project scope creep and timeline delays'
    },
    {
      number: 3,
      title: 'Implementation & Integration',
      description: 'We deploy your solution in a phased approach, rigorously testing each component before going live. We ensure seamless integration with existing systems and workflows.',
      focus: 'Technical Excellence',
      insight: 'Phased deployment allows for iterative testing and refinement',
      keyBenefit: 'Reduces operational disruption during transition'
    },
    {
      number: 4,
      title: 'Training, Support & Optimization',
      description: 'Once live, we provide comprehensive training to your team and offer ongoing support. We continuously optimize the system, adapting to your evolving business needs.',
      focus: 'Continuous Improvement',
      insight: 'Ongoing optimization ensures long-term value and scalability',
      keyBenefit: 'Maximizes ROI and ensures future-ready operations'
    }
  ];

  // Auto-progression with user interaction awareness
  useEffect(() => {
    if (!isVisible || !isAutoPlaying || hasUserInteracted) return;

    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, isAutoPlaying, hasUserInteracted, steps.length]);

  // Resume auto-play after user inactivity
  useEffect(() => {
    if (hasUserInteracted) {
      const timer = setTimeout(() => {
        setHasUserInteracted(false);
        setIsAutoPlaying(true);
      }, 10000); // Resume after 10 seconds of inactivity
      return () => clearTimeout(timer);
    }
  }, [hasUserInteracted]);

  const handleStepChange = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    setHasUserInteracted(true);
  };

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
    <section ref={ref} className="section-benefits bg-dark-gray">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(176,255,116,0.4)'
            }}
          >
            Our Methodology
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A battle-tested approach focused on meaningful outcomes—no fluff, no wasted time or budget—just systems built to solve real business problems and drive measurable impact
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.button
                    key={step.number}
                    onClick={() => handleStepChange(index)}
                    className={`w-full text-left py-6 px-4 rounded-lg transition-all duration-300 relative group ${
                      activeStep === index 
                        ? 'bg-secondary/10 border border-secondary/30' 
                        : 'hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active step glow effect */}
                    {activeStep === index && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 flex-shrink-0 ${
                          activeStep === index 
                            ? 'bg-secondary text-black' 
                            : 'bg-white/10 text-white/70'
                        }`}
                        animate={activeStep === index ? {
                          boxShadow: [
                            '0 0 10px rgba(176,255,116,0.4)',
                            '0 0 20px rgba(176,255,116,0.7)',
                            '0 0 10px rgba(176,255,116,0.4)'
                          ]
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: activeStep === index ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        {step.number}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className={`font-semibold transition-colors duration-300 font-mono text-base ${
                          activeStep === index ? 'text-white' : 'text-white/70'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-secondary text-sm font-mono">{step.focus}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Step Detail */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl py-16 px-8 border border-secondary/20 relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent rounded-2xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-black font-bold text-lg">
                        {steps[activeStep].number}
                      </div>
                      <h3 
                        className="text-3xl font-bold text-white"
                        style={{
                          textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(176,255,116,0.4)'
                        }}
                      >
                        {steps[activeStep].title}
                      </h3>
                    </div>

                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      {steps[activeStep].description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                        <h4 className="text-secondary font-semibold mb-2">Strategic Insight:</h4>
                        <p className="text-white/80 text-sm leading-relaxed">{steps[activeStep].insight}</p>
                      </div>
                      
                      <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                        <h4 className="text-secondary font-semibold mb-2">Key Benefit:</h4>
                        <p className="text-white/80 text-sm leading-relaxed">{steps[activeStep].keyBenefit}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Создайте этот объект в начале TechnologyStackSection или в отдельном файле
const TECHNOLOGY_ICON_MAPPING: Record<string, string | null> = {
  // CRM & Project Management
  'Monday.com': '/icons/tech/monday-com.svg',
  'HubSpot': '/icons/tech/hubspot.svg',
  'Zoho': '/icons/tech/zoho.svg',
  'Pipedrive': '/icons/tech/pipedrive.svg',
  
  // Automation
  'Make': '/icons/tech/make-color.svg',
  'Zapier': '/icons/tech/zapier.svg',
  'n8n': '/icons/tech/N8N.Io_idQ-KxEpHW_1.svg',
  
  // Productivity & Collaboration
  'Google Workspace': '/icons/tech/google.svg',
  'Notion': '/icons/tech/notion-svgrepo-com.svg',
  'Miro': '/icons/tech/cdnlogo.com_miro.svg',
  
  // Finance & Payments
  'QuickBooks': '/icons/tech/cdnlogo.com_quickbooks.svg',
  'Bill.com': '/icons/tech/BILL.svg',
  'Chaser': '/icons/tech/chase.svg',
  'Stripe': '/icons/tech/companystripe.svg',
  'PayPal': '/icons/tech/paypal.svg',
  
  // Verification & Security
  'Plaid': '/icons/tech/cdnlogo.com_plaid.svg',
  'Veriff': '/icons/tech/veriff-seeklogo.svg',
  
  // Document Management
  'DocuSign': '/icons/tech/docusign-seeklogo.svg',
  'SignNow': '/icons/tech/signnow-seeklogo.svg',
  'eSignatures': null, // Заглушка с галочкой
  'Google Docs': '/icons/tech/google-docs.svg',
  
  // Forms & Data Collection
  'JotForm': '/icons/tech/cdnlogo.com_jotform.svg',
  'Typeform': '/icons/tech/typeform.svg',
  'Cognito': '/icons/tech/AWS Cognito.svg',
  'Google Forms': '/icons/tech/forms.svg',
  
  // AI
  'OpenAI': '/icons/tech/OpenAI_logo_2025_(symbol).svg',
  'Claude': '/icons/tech/Anthropic Ai.svg',
  'Deepseek': '/icons/tech/deepseek.svg',
  'Gemini': '/icons/tech/google-gemini-icon.svg',
  'Grok': '/icons/tech/grok-icon.svg',
  
  // Communications
  'Twilio': '/icons/tech/cdnlogo.com_twilio.svg',
  'AirCall': '/icons/tech/Aircall.svg',
  'Slack': '/icons/tech/slack-icon.svg',
  'Telegram': '/icons/tech/telegram-icon.svg',
  'OpenPhone': '/icons/tech/Open Phone.svg',
  
  // Database
  'Airtable': '/icons/tech/airtable.svg',
  'Google Sheets': '/icons/tech/icons8-google-spreadsheets.svg',
  'MySQL': '/icons/tech/mysql.svg',
  'PostgreSQL': '/icons/tech/postgresql.svg',
  
  // Specific Tools
  'BestPass': null, // Нет иконки
  'SuperDispatch': null, // Нет иконки
  'CentralDispatch': null, // Нет иконки
  
  // Tracking
  'Hubstaff': '/icons/tech/hubstaff_94356.svg'
};

// Обновленный компонент TechIcon
const TechIcon = ({ name }: { name: string }) => {
  const iconPath = TECHNOLOGY_ICON_MAPPING[name]; // Простое получение пути
  
  return (
    <div className="w-full h-full">
      {iconPath ? (
        <Image 
          src={iconPath} 
          alt={name}
          width={40}
          height={40}
          className="w-full h-full object-contain"
          style={{ filter: 'none' }}
          unoptimized
        />
      ) : (
        // Заглушка с галочкой для технологий без иконки
        <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-lg flex items-center justify-center border border-secondary/40">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-secondary"
          >
            <path 
              d="M20 6L9 17L4 12" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

// Individual Dock Icon Component with Apple Dock physics
interface DockIconProps {
  name: string;
  mouseX: MotionValue<number>;
  onClickAnimation: () => void;
}

// Обновленный компонент DockIcon с правильным hover
interface DockIconProps {
  name: string;
  mouseX: MotionValue<number>;
  onClickAnimation: () => void;
  onHover: (tech: Technology | null) => void; // Добавляем prop для hover
  technology: Technology; // Добавляем полную информацию о технологии
}

function DockIcon({ name, mouseX, onClickAnimation, onHover, technology }: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Calculate distance from mouse to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Apply magnification effect based on distance
  const DISTANCE = 100;
  const SCALE = 1.5;
  const NUDGE = 20;
  const SPRING_CONFIG = {
    stiffness: 300,
    damping: 30,
  };
  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);

  // Calculate horizontal nudge
  const x = useTransform(() => {
    const d = distance.get();
    if (d === -Infinity) {
      return 0;
    } else if (d < -DISTANCE || d > DISTANCE) {
      return Math.sign(d) * -1 * NUDGE;
    } else {
      return (-d / DISTANCE) * NUDGE * scale.get();
    }
  });

  // Apply spring physics to transformations
  const scaleSpring = useSpring(scale, SPRING_CONFIG);
  const xSpring = useSpring(x, SPRING_CONFIG);
  
  // Y animation for click effect
  const y = useMotionValue(0);

  const handleClick = () => {
    onClickAnimation();
    // Apple-style bounce animation on click
    y.set(0);
    y.set(-40);
    setTimeout(() => y.set(0), 150);
    setTimeout(() => y.set(-20), 300);
    setTimeout(() => y.set(0), 450);
  };

  // ✅ ИСПРАВЛЕНИЕ: Простое отслеживание hover
  const handleMouseEnter = () => {
    onHover(technology);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  return (
    <motion.button
      ref={ref}
      style={{
        x: xSpring,
        scale: scaleSpring,
        y: y,
        willChange: 'transform'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center justify-center origin-center focus:outline-none"
    >
      {/* Icon Container with Apple Dock glass effect */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-white/15 to-white/5 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-sm relative overflow-visible"
        transition={{ duration: 0.2 }}
      >
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-2xl opacity-60"></div>
        
        <div className="w-10 h-10 relative z-10">
          <TechIcon name={name} />
        </div>
      </motion.div>
    </motion.button>
  );
}

// Упрощенный компонент AppleDock
function AppleDock({ technologies }: { technologies: Technology[] }) {
  const mouseX = useMotionValue(Infinity);
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);

  const handleIconClick = (iconName: string) => {
    setClickedIcon(iconName);
    setTimeout(() => setClickedIcon(null), 1000);
  };

  // ✅ ИСПРАВЛЕНИЕ: Простая функция для обработки hover
  const handleIconHover = (tech: Technology | null) => {
    setHoveredTech(tech);
  };

  // ✅ ИСПРАВЛЕНИЕ: Убираем сложную логику handleMouseMove
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    setHoveredTech(null);
    mouseX.set(Infinity);
  };

  // Create duplicated technologies for infinite scroll - ensure minimum width
  const minRequiredTechs = 12; // Minimum number of technologies to fill the carousel
  let workingTechnologies = [...technologies];
  
  // If filtered technologies are too few, repeat them to fill the carousel
  while (workingTechnologies.length < minRequiredTechs) {
    workingTechnologies = [...workingTechnologies, ...technologies];
  }
  
  const duplicatedTechnologies = [...workingTechnologies, ...workingTechnologies, ...workingTechnologies, ...workingTechnologies];
  const iconWidth = 88;
  const singleLoopWidth = workingTechnologies.length * iconWidth;
  
  return (
    <motion.div
      className="relative bg-white/8 backdrop-blur-lg rounded-3xl py-16 px-8 border border-white/10 shadow-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)'
      }}
      layout
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Dock background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-3xl"></div>
      
      {/* Scrolling Icons container */}
      <div 
        className="relative z-10 overflow-hidden py-4"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex items-center space-x-4"
          animate={{
            x: [0, -singleLoopWidth]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: workingTechnologies.length * 2,
              ease: "linear",
            },
          }}
        >
          {duplicatedTechnologies.map((tech, index) => (
            <motion.div 
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 p-1"
              initial={{ opacity: 1, scale: 1 }}
            >
              <DockIcon
                name={tech.name}
                technology={tech}
                mouseX={mouseX}
                onClickAnimation={() => handleIconClick(tech.name)}
                onHover={handleIconHover}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Click effect overlay */}
      <AnimatePresence>
        {clickedIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-transparent to-transparent rounded-3xl"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Technology Info Display */}
      <div className="mt-8 text-center min-h-[60px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {hoveredTech ? (
            <motion.div
              key={hoveredTech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <h3 className="text-xl font-bold text-white">{hoveredTech.name}</h3>
              <p className="text-secondary font-medium">{hoveredTech.category}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/60 text-sm"
            >
              We continuously explore new tools, adopting only those that <br />prove their reliability, performance, and real business value through rigorous testing.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Updated Technology Stack Section with Apple Dock
function TechnologyStackSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Enhanced technology stack data with descriptions
  const technologies = [
    // CRM & Project Management
    { name: 'Monday.com', category: 'CRM & Project Management', description: 'Project management and team collaboration platform' },
    { name: 'HubSpot', category: 'CRM & Project Management', description: 'Comprehensive CRM and marketing automation' },
    { name: 'Zoho', category: 'CRM & Project Management', description: 'Integrated business software suite' },
    { name: 'Pipedrive', category: 'CRM & Project Management', description: 'Sales-focused CRM for pipeline management' },
    
    // Automation
    { name: 'Make', category: 'Automation', description: 'Visual automation platform for complex workflows' },
    { name: 'Zapier', category: 'Automation', description: 'Connect apps and automate workflows' },
    { name: 'n8n', category: 'Automation', description: 'Open-source workflow automation tool' },
    
    // Productivity & Collaboration
    { name: 'Google Workspace', category: 'Productivity & Collaboration', description: 'Cloud-based productivity and collaboration suite' },
    { name: 'Notion', category: 'Productivity & Collaboration', description: 'All-in-one workspace for notes and project management' },
    { name: 'Miro', category: 'Productivity & Collaboration', description: 'Online collaborative whiteboard platform' },
    
    // Finance & Payments
    { name: 'QuickBooks', category: 'Finance & Payments', description: 'Accounting software for small to medium businesses' },
    { name: 'Bill.com', category: 'Finance & Payments', description: 'Automated bill pay and invoice management' },
    { name: 'Chaser', category: 'Finance & Payments', description: 'Automated debt collection and payment reminders' },
    { name: 'Stripe', category: 'Finance & Payments', description: 'Online payment processing platform' },
    { name: 'PayPal', category: 'Finance & Payments', description: 'Digital payments and money transfers' },
    
    // Verification & Security
    { name: 'Plaid', category: 'Verification & Security', description: 'Financial data aggregation and verification' },
    { name: 'Veriff', category: 'Verification & Security', description: 'Identity verification and compliance' },
    
    // Document Management
    { name: 'DocuSign', category: 'Document Management', description: 'Electronic signature and document workflow' },
    { name: 'SignNow', category: 'Document Management', description: 'Digital document signing and management' },
    { name: 'eSignatures', category: 'Document Management', description: 'Electronic signature solutions' },
    { name: 'Google Docs', category: 'Document Management', description: 'Collaborative document creation and editing' },
    
    // Forms & Data Collection
    { name: 'JotForm', category: 'Forms & Data Collection', description: 'Online form builder and data collection' },
    { name: 'Typeform', category: 'Forms & Data Collection', description: 'Interactive forms and surveys' },
    { name: 'Cognito', category: 'Forms & Data Collection', description: 'Online forms and payment processing' },
    { name: 'Google Forms', category: 'Forms & Data Collection', description: 'Simple form creation and response collection' },
    
    // AI
    { name: 'OpenAI', category: 'AI', description: 'Advanced AI models for text and reasoning' },
    { name: 'Claude', category: 'AI', description: 'AI assistant for analysis and automation' },
    { name: 'Deepseek', category: 'AI', description: 'Advanced reasoning and code generation AI' },
    { name: 'Gemini', category: 'AI', description: 'Google\'s multimodal AI assistant' },
    { name: 'Grok', category: 'AI', description: 'Real-time AI with web access' },
    
    // Communications
    { name: 'Twilio', category: 'Communications', description: 'Programmable communications platform' },
    { name: 'AirCall', category: 'Communications', description: 'Cloud-based phone system for teams' },
    { name: 'Slack', category: 'Communications', description: 'Team collaboration and messaging' },
    { name: 'Telegram', category: 'Communications', description: 'Secure messaging and automation bots' },
    { name: 'OpenPhone', category: 'Communications', description: 'Business phone system with integrations' },
    
    // Database
    { name: 'Airtable', category: 'Database', description: 'Spreadsheet-database hybrid for project management' },
    { name: 'Google Sheets', category: 'Database', description: 'Cloud-based spreadsheet with automation' },
    { name: 'MySQL', category: 'Database', description: 'Relational database management system' },
    { name: 'PostgreSQL', category: 'Database', description: 'Advanced open-source relational database' },
    
    // Specific Tools
    { name: 'BestPass', category: 'Specific Tools', description: 'Toll management for commercial fleets' },
    { name: 'SuperDispatch', category: 'Specific Tools', description: 'Auto transport and logistics platform' },
    { name: 'CentralDispatch', category: 'Specific Tools', description: 'Vehicle shipping and transport marketplace' },
    
    // Tracking
    { name: 'Hubstaff', category: 'Tracking', description: 'Time tracking and workforce management' }
  ];

  const uniqueCategories = Array.from(new Set(technologies.map(tech => tech.category)));
  
  const filteredTechnologies = selectedCategories.length === 0 
    ? technologies 
    : technologies.filter(tech => selectedCategories.includes(tech.category));

  // Handle filter selection (multi-select)
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
  };

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

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2
      }
    }
  };

  const dockVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4
      }
    }
  };

  return (
    <section ref={ref} className="section-benefits bg-dark-gray">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(176,255,116,0.4)'
            }}
          >
            Our Technology Stack
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We build scalable automations on trusted, industry-leading platforms — tailored to your workflows and tech stack.
          </p>
        </motion.div>

        {/* Multi-Select Category Filters */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={filterVariants}
        >
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {uniqueCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategories.includes(category)
                    ? 'bg-secondary text-black shadow-lg shadow-secondary/30'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          {/* Clear Filters Button - removed underline */}
          {selectedCategories.length > 0 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <button
                onClick={clearFilters}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                Clear all filters ({selectedCategories.length} active)
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Apple Dock Container */}
        <motion.div
          className="relative overflow-visible flex justify-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={dockVariants}
        >
          <AppleDock technologies={filteredTechnologies} />
        </motion.div>

        {/* Active Filters Info */}
        {selectedCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-6"
          >
            <div className="inline-flex items-
            center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-secondary text-sm font-medium">
                {filteredTechnologies.length} tools filtered by {selectedCategories.join(', ')}
              </span>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}


function InteractiveApproachSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Business challenge-solution pairs
  const approachSlides = [
    {
      id: 'business-first',
      challenge: {
        title: 'Traditional Tech-First Approach',
        description: 'Most automation companies start with technology and try to fit it to business needs, leading to expensive solutions that miss the mark.',
        problems: ['Overengineered solutions', 'Poor business alignment', 'High implementation costs', 'User adoption issues']
      },
      solution: {
        title: 'Our Business-First Methodology',
        description: 'We start by deeply understanding your business operations, then design technology solutions that serve your specific needs.',
        benefits: ['Perfect business fit', 'Cost-effective implementation', 'High user adoption', 'Measurable ROI']
      }
    },
    {
      id: 'iterative-delivery',
      challenge: {
        title: 'Big Bang Implementation Risk',
        description: 'Large-scale automation projects often fail due to scope creep, changing requirements, and delayed feedback loops.',
        problems: ['Project scope creep', 'Late-stage discoveries', 'Extended timelines', 'Budget overruns']
      },
      solution: {
        title: 'Iterative Delivery Excellence',
        description: 'We deliver working solutions in phases, gathering feedback and refining continuously to ensure success.',
        benefits: ['Controlled scope', 'Early value delivery', 'Reduced risks', 'Continuous improvement']
      }
    },
    {
      id: 'scalable-architecture',
      challenge: {
        title: 'Short-Term Thinking',
        description: 'Many automation solutions work initially but break down as businesses grow, requiring expensive rebuilds.',
        problems: ['Limited scalability', 'Technical debt', 'Integration challenges', 'Costly migrations']
      },
      solution: {
        title: 'Future-Ready Architecture',
        description: 'Every solution we build is designed to scale with your business, from startup to enterprise.',
        benefits: ['Infinite scalability', 'Future-proof design', 'Seamless integrations', 'Long-term value']
      }
    }
  ];

  // Auto-progression
  useEffect(() => {
    if (!isVisible || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % approachSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isVisible, isAutoPlaying, approachSlides.length]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlide = approachSlides[activeSlide];

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(119,71,207,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(178,75,243,0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(119,71,207,0.3) 0%, transparent 70%)"
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
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}
            >
              Our Approach
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              How we deliver automation solutions that actually work for your business
            </p>
          </div>

          {/* Interactive Challenge-Solution Comparison */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[500px]"
              >
                {/* Challenge Side */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-red-900/20 via-[#170A24] to-[#12071A] rounded-3xl p-8 border border-red-500/30 h-full relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-3xl"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Traditional Approach</span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                        {currentSlide.challenge.title}
                      </h3>
                      
                      <p className="text-white/70 leading-relaxed mb-8">
                        {currentSlide.challenge.description}
                      </p>

                      <div className="space-y-3">
                        {currentSlide.challenge.problems.map((problem, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <span className="text-white/80 text-sm">{problem}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution Side */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#0A2A0A] via-[#170A24] to-[#12071A] rounded-3xl p-8 border border-secondary/30 h-full relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent rounded-3xl"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-4 h-4 rounded-full bg-secondary"></div>
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Architeq Approach</span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                        {currentSlide.solution.title}
                      </h3>
                      
                      <p className="text-white/70 leading-relaxed mb-8">
                        {currentSlide.solution.description}
                      </p>

                      <div className="space-y-3">
                        {currentSlide.solution.benefits.map((benefit, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-secondary"></div>
                            <span className="text-white/80 text-sm">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={() => handleSlideChange((activeSlide - 1 + approachSlides.length) % approachSlides.length)}
                className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-2">
                {approachSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSlide === index 
                        ? 'bg-primary shadow-lg shadow-primary/50' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleSlideChange((activeSlide + 1) % approachSlides.length)}
                className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Auto-play Indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: isAutoPlaying ? [0.3, 1, 0.3] : 0.6 }}
                  transition={{ duration: 1.5, repeat: isAutoPlaying ? Infinity : 0 }}
                />
                <span>{isAutoPlaying ? 'Auto-cycling approaches' : 'Manual navigation active'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '-10% 0px',
    triggerOnce: true
  });

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="section-cta bg-transparent relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full opacity-5 blur-[100px]"
        style={{ 
          transform: 'translate(0, 0)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full opacity-5 blur-[100px]"
        style={{ 
          transform: 'translate(0, 0)'
        }}
      />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={contentVariants}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}
            >
              Ready to Work Together?
            </h2>
          
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Let&apos;s discuss how our team can help transform your business operations<br />and unlock your company&apos;s full potential.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacts">
                <Button variant="secondary" size="lg">
                  See How It Works
                </Button>
              </Link>
              <Link href="/cases">
                <Button variant="secondary" size="lg">
                  View Our Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}