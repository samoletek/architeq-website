"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Align on Scope. Kick Things Off",
    description: "We start by signing an NDA and holding a kickoff meeting to clarify your objectives and expectations. This ensures that we are fully aligned on your needs, priorities, and timelines from the very beginning."
  },
  {
    title: "Understand Your Reality", 
    description: "We dive deep into understanding your business operations through stakeholder interviews and process discovery. We observe your current workflows, uncover inefficiencies, and identify where automation can add the most value."
  },
  {
    title: "Map the Process. Spot the Gaps",
    description: "We document your existing business processes in detail, mapping every step, role, and decision point. This step helps us highlight pain points, overlaps, and areas where automation can be implemented effectively."
  },
  {
    title: "Design the Future Flow",
    description: "Based on our analysis, we design a custom solution that will optimize your processes. We define what your future workflows should look like and ensure that the solution is tailored to meet your specific needs, with an emphasis on improving efficiency and reducing complexity."
  },
  {
    title: "Plan the Rollout. Set the Timeline",
    description: "We create a detailed implementation plan, including the specific steps, timelines, and resources required to get the solution up and running. Our team sets clear milestones to ensure timely delivery and success at each stage of the project."
  },
  {
    title: "Implement, Test, Iterate",
    description: "We deploy the solution, ensuring minimal disruption to your daily operations. During this phase, we rigorously test the system to ensure everything functions as expected. If necessary, we make adjustments and improvements before the full-scale launch."
  },
  {
    title: "Data Migration & System Integration",
    description: "After the solution has been tested and confirmed, we migrate your existing data and integrate the new system with your other tools. This ensures smooth data transfer, seamless workflows, and full compatibility with your existing infrastructure."
  },
  {
    title: "Train the Team. Support the Growth",
    description: "Once the solution is live, we provide comprehensive training to ensure your team can fully leverage the new system. We offer ongoing support to address any challenges and make adjustments as your business continues to evolve."
  }
];

export default function EnhancedProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);
  const [navigationDelayComplete, setNavigationDelayComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  // Manual step navigation
  const scrollToStep = (stepIndex: number) => {
    const stepElements = document.querySelectorAll('[data-step]');
    const targetElement = stepElements[stepIndex];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!stepsContainerRef.current || !sectionRef.current) return;

      // Check if navigation should be visible (only in this section)
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // More strict bounds - navigation visible only when section takes significant screen space
      const isInSection = sectionRect.top < windowHeight * 0.3 && sectionRect.bottom > windowHeight * 0.7;
      
      if (isInSection && !showNavigation) {
        setShowNavigation(true);
        // Start delay timer for navigation appearance
        setTimeout(() => {
          setNavigationDelayComplete(true);
        }, 1500);
      } else if (!isInSection && showNavigation) {
        setShowNavigation(false);
        setNavigationDelayComplete(false);
      }

      const stepElements = stepsContainerRef.current.querySelectorAll('[data-step]');
      const centerPoint = windowHeight / 2;

      let newActiveStep = 0;
      let minDistance = Infinity;

      // Find the step closest to center of screen
      stepElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(elementCenter - centerPoint);

        // Only consider elements that are in the upper half or center of screen
        if (distanceFromCenter < minDistance && rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.1) {
          minDistance = distanceFromCenter;
          newActiveStep = index;
        }
      });

      setActiveStep(newActiveStep);

      // Calculate progress for line animation - more stable calculation
      if (stepElements.length > 0) {
        const firstStep = stepElements[0].getBoundingClientRect();
        const lastStep = stepElements[stepElements.length - 1].getBoundingClientRect();
        
        // Use more stable bounds checking
        if (firstStep.top < windowHeight && lastStep.bottom > 0) {
          const totalHeight = lastStep.bottom - firstStep.top;
          const scrolled = Math.max(0, centerPoint - firstStep.top);
          const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
          setScrollProgress(progress);
        }
      }
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial call
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showNavigation]);

  return (
    <section 
      ref={sectionRef}
      className="section-benefits bg-dark-gray relative"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center section-content-spacing">
          <h2 className="section-title-large font-bold section-title-spacing-large">
            Our Automation Flow:<br />From Discovery to Deployment
          </h2>
          <p className="section-subtitle-large text-light-gray max-w-3xl mx-auto mb-12">
            A sharp, proven framework — designed to deliver fast<br />and integrate deep into your ops.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          
          {/* Navigation Menu - Fixed position, only visible in section with delay */}
          <AnimatePresence>
            {showNavigation && navigationDelayComplete && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed right-40 top-1/2 transform -translate-y-1/2 z-30"
              >
                <div className="bg-dark-gray/80 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="space-y-2">
                    {steps.map((step, index) => (
                      <div 
                        key={index}
                        onClick={() => scrollToStep(index)}
                        className={`
                          text-xs transition-all duration-300 cursor-pointer py-1.5 px-2 rounded-md hover:bg-white/5
                          ${index === activeStep 
                            ? 'text-purple-400 font-medium bg-purple-400/10' 
                            : (index < activeStep ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-400')
                          }
                        `}
                      >
                        {index + 1}. {step.title}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Line - Behind everything with blur and glow effects */}
          <div className="absolute left-1/2 top-0 transform -translate-x-0.5 z-[-10]" style={{ height: '100%' }}>
            {/* Background line */}
            <div className="w-1.5 bg-gray-700/20 h-full" />
            
            {/* Blur effect at start of line */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-16 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(178, 75, 243, 0.5) 0%, rgba(178, 75, 243, 0.3) 50%, transparent 100%)',
                filter: 'blur(10px)',
              }}
            />
            
            {/* Active progress line with adaptive brightness */}
            <motion.div 
              className="absolute top-0 left-0 w-1.5 overflow-hidden"
              animate={{ 
                height: `${scrollProgress * 100}%`,
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {/* Main gradient line with dynamic opacity based on active step */}
              <motion.div
                className="w-full h-full relative"
                style={{
                  background: 'linear-gradient(180deg, #B24BF3 0%, #8B5CF6 50%, #7C3AED 100%)',
                  boxShadow: `
                    0 0 15px rgba(178, 75, 243, 0.8),
                    0 0 30px rgba(178, 75, 243, 0.5),
                    0 0 45px rgba(178, 75, 243, 0.3)
                  `,
                }}
              />
              
              {/* Blur effect at start of progress */}
              <div 
                className="absolute top-0 left-0 w-full h-16"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(178, 75, 243, 0.8) 100%)',
                  filter: 'blur(8px)'
                }}
              />
              
              {/* Enhanced glow effect at end - illuminates the card */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(178, 75, 243, 0.6) 0%, rgba(178, 75, 243, 0.3) 40%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
              
              {/* Blur effect at end */}
              <div 
                className="absolute bottom-0 left-0 w-full h-16"
                style={{
                  background: 'linear-gradient(180deg, rgba(178, 75, 243, 0.8) 0%, transparent 100%)',
                  filter: 'blur(8px)'
                }}
              />
            </motion.div>
            
            {/* Fading line for completed steps */}
            <motion.div 
              className="absolute top-0 left-0 w-1.5 bg-gray-600/40"
              animate={{ 
                height: `${activeStep > 0 ? (activeStep / steps.length) * 100 : 0}%`,
                opacity: activeStep > 0 ? 0.4 : 0
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Steps Container - Normal scroll */}
          <div 
            ref={stepsContainerRef}
            className="relative z-30 space-y-14"
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              
              let opacity = 0.4; // future steps
              if (isCompleted) opacity = 0.6;
              if (isActive) opacity = 1;
              
              return (
                <motion.div 
                  key={index}
                  data-step={index}
                  className="relative flex items-center justify-center min-h-[60vh]"
                  animate={{ opacity }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Content Card */}
                  <div className="w-full max-w-4xl">
                    <motion.div 
                      className={`
                        rounded-2xl p-10 transition-all duration-700
                        ${isActive
                          ? 'bg-gradient-to-br from-purple-500/12 to-purple-600/4 border border-purple-500/25'
                          : (isCompleted 
                            ? 'bg-gradient-to-br from-gray-600/15 to-gray-700/5 border border-gray-600/20'
                            : 'bg-gradient-to-br from-white/2 to-white/0 border border-white/5'
                          )
                        }
                      `}
                      style={{
                        backdropFilter: 'blur(25px)',
                        WebkitBackdropFilter: 'blur(25px)',
                        animation: 'float 4s ease-in-out infinite',
                        animationDelay: `${index * 0.6}s`
                      }}
                      animate={{
                        boxShadow: isActive 
                          ? [
                              '0 10px 40px rgba(178, 75, 243, 0.15), inset 0 1px 0 rgba(178, 75, 243, 0.1)',
                              '0 15px 50px rgba(178, 75, 243, 0.25), inset 0 1px 0 rgba(178, 75, 243, 0.2)',
                              '0 10px 40px rgba(178, 75, 243, 0.15), inset 0 1px 0 rgba(178, 75, 243, 0.1)'
                            ]
                          : isCompleted
                            ? '0 5px 20px rgba(0, 0, 0, 0.1)'
                            : '0 3px 15px rgba(0, 0, 0, 0.05)',
                        y: isActive ? -8 : 0,
                        scale: isActive ? 1.02 : 1
                      }}
                      transition={{ 
                        boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        background: { duration: 0.7 },
                        y: { duration: 0.6, ease: "easeOut" },
                        scale: { duration: 0.6, ease: "easeOut" }
                      }}
                    >
                      <motion.h3 
                        className={`
                          text-3xl font-bold mb-6 transition-all duration-700
                          ${isActive 
                            ? 'text-white' 
                            : (isCompleted ? 'text-gray-300' : 'text-gray-400')
                          }
                        `}
                        animate={{
                          textShadow: isActive 
                            ? '0 0 12px rgba(178, 75, 243, 0.4)'
                            : '0 0 0px rgba(178, 75, 243, 0.0)'
                        }}
                        transition={{ duration: 0.7 }}
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p 
                        className={`
                          leading-relaxed text-xl transition-colors duration-700
                          ${isActive 
                            ? 'text-light-gray' 
                            : (isCompleted ? 'text-gray-400' : 'text-gray-500')
                          }
                        `}
                      >
                        {step.description}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}