"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceDetection } from '@/lib/utils/device-detection';
import { cn } from '@/lib/utils/utils';

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
  const { isMobile } = useDeviceDetection();

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

      // Check if navigation should be visible (only in this section and only on desktop)
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // More strict bounds - navigation visible only when section takes significant screen space
      const isInSection = sectionRect.top < windowHeight * 0.3 && sectionRect.bottom > windowHeight * 0.7;
      
      if (!isMobile && isInSection && !showNavigation) {
        setShowNavigation(true);
        // Start delay timer for navigation appearance
        setTimeout(() => {
          setNavigationDelayComplete(true);
        }, 1500);
      } else if ((isMobile || !isInSection) && showNavigation) {
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
  }, [showNavigation, isMobile]);

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
          
          {/* Navigation Menu - Fixed position, centered vertically - ТОЛЬКО ДЕСКТОП */}
          {!isMobile && (
            <AnimatePresence>
              {showNavigation && navigationDelayComplete && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="fixed right-8 lg:right-16 xl:right-32 z-30"
                  style={{ 
                    top: '35%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <div className="bg-dark-gray/80 backdrop-blur-sm rounded-lg p-2 lg:p-3 border border-white/10">
                    <div className="space-y-1 lg:space-y-2">
                      {steps.map((step, index) => (
                        <div 
                          key={index}
                          onClick={() => scrollToStep(index)}
                          className={`
                            text-xs transition-all duration-300 cursor-pointer py-1 lg:py-1.5 px-1.5 lg:px-2 rounded-md hover:bg-white/5
                            ${index === activeStep 
                              ? 'text-purple-400 font-medium bg-purple-400/10' 
                              : (index < activeStep ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-400')
                            }
                          `}
                        >
                          {index + 1}. {step.title.split('.')[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Улучшенная прогресс линия с плавной стрелкой */}
          <motion.div 
            className="absolute left-1/2 top-0 transform -translate-x-0.5 z-[5]" 
            style={{ 
              height: '100%',
              transformOrigin: 'top'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Единая светящаяся линия */}
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1"
              animate={{ 
                height: `${scrollProgress * 100}%`,
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                background: `
                  linear-gradient(180deg, 
                    rgba(178, 75, 243, 0.6) 0%, 
                    rgba(178, 75, 243, 0.8) 30%, 
                    rgba(178, 75, 243, 1) 70%, 
                    rgba(168, 85, 247, 1) 100%
                  )`,
                borderRadius: '0.5px',
                boxShadow: `
                  0 0 8px rgba(178, 75, 243, 1),
                  0 0 16px rgba(178, 75, 243, 0.8),
                  0 0 24px rgba(178, 75, 243, 0.6),
                  0 0 32px rgba(178, 75, 243, 0.4)
                `
              }}
            />

            {/* Многослойная аура для объема */}
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6"
              animate={{ 
                height: `${scrollProgress * 100}%`,
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                background: 'radial-gradient(ellipse 100% 95% at 50% 50%, rgba(178, 75, 243, 0.4) 0%, rgba(178, 75, 243, 0.2) 50%, rgba(178, 75, 243, 0.5) 100%)',
                borderRadius: '50% 50% 60% 60% / 30% 30% 70% 70%',
                filter: 'blur(8px)',
              }}
            />
            
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16"
              animate={{ 
                height: `${scrollProgress * 100}%`,
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                background: 'radial-gradient(ellipse 100% 90% at 50% 50%, rgba(178, 75, 243, 0.25) 0%, rgba(178, 75, 243, 0.08) 50%, rgba(178, 75, 243, 0.3) 100%)',
                borderRadius: '50% 50% 70% 70% / 20% 20% 80% 80%',
                filter: 'blur(15px)',
              }}
            />
            
            {/* Стрелка на конце линии с плавным движением */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2"
              animate={{ 
                top: `${scrollProgress * 100}%`,
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Стрелка - основная форма */}
              <motion.div 
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '12px solid rgba(178, 75, 243, 1)',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 8px rgba(178, 75, 243, 1)) drop-shadow(0 0 16px rgba(178, 75, 243, 0.8))',
                    'drop-shadow(0 0 12px rgba(178, 75, 243, 1)) drop-shadow(0 0 24px rgba(178, 75, 243, 0.9))',
                    'drop-shadow(0 0 8px rgba(178, 75, 243, 1)) drop-shadow(0 0 16px rgba(178, 75, 243, 0.8))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Стрелка - свечение */}
              <motion.div 
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'radial-gradient(circle, rgba(178, 75, 243, 0.6) 0%, rgba(178, 75, 243, 0.3) 40%, transparent 70%)',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  filter: 'blur(4px)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Стрелка - дополнительное свечение */}
              <motion.div 
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'radial-gradient(circle, rgba(178, 75, 243, 0.4) 0%, rgba(178, 75, 243, 0.2) 30%, transparent 60%)',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  filter: 'blur(8px)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Steps Container - Normal scroll */}
          <div 
            ref={stepsContainerRef}
            className="relative z-20 space-y-14"
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              const isFuture = index > activeStep;
              
              // Плавное изменение прозрачности для всех состояний с более мягкими переходами
              let targetOpacity = 0.4; // future steps - увеличили минимальную прозрачность
              if (isCompleted) targetOpacity = 0.8; // completed steps - увеличили прозрачность
              if (isActive) targetOpacity = 1;
              
              return (
                <motion.div 
                  key={index}
                  data-step={index}
                  className="relative flex items-center justify-center min-h-[60vh]"
                  animate={{ 
                    opacity: targetOpacity,
                    scale: isActive ? 1 : 0.98,
                    y: isFuture ? 20 : 0
                  }}
                  transition={{ 
                    duration: 1.2, // Увеличили общую длительность
                    ease: [0.25, 0.1, 0.25, 1],
                    opacity: { duration: 1.5, ease: [0.4, 0, 0.2, 1] }, // Более медленная и плавная анимация прозрачности
                    scale: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
                    y: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                >
                  {/* Content Card */}
                  <div className={cn(
                    "w-full",
                    isMobile ? "max-w-2xl px-4" : "max-w-3xl px-8"
                  )}>
                    <motion.div 
                      className={cn(
                        "rounded-2xl transition-all duration-700",
                        isMobile ? "p-3" : "p-8 lg:p-10",
                        isActive
                          ? 'bg-gradient-to-br from-purple-500/12 to-purple-600/4 border border-purple-500/30'
                          : (isCompleted 
                            ? 'bg-gradient-to-br from-gray-600/15 to-gray-700/5 border border-gray-600/25'
                            : 'bg-gradient-to-br from-white/2 to-white/0 border border-white/5'
                          )
                      )}
                      style={{
                        backdropFilter: 'blur(25px)',
                        WebkitBackdropFilter: 'blur(25px)',
                        animation: 'float 4s ease-in-out infinite',
                        animationDelay: `${index * 0.6}s`,
                      }}
                      animate={{
                        boxShadow: isActive 
                          ? '0 8px 30px rgba(178, 75, 243, 0.2), inset 0 1px 0 rgba(178, 75, 243, 0.1), 0 0 20px rgba(178, 75, 243, 0.15)'
                          : isCompleted
                            ? '0 5px 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(156, 163, 175, 0.05)'
                            : '0 3px 15px rgba(0, 0, 0, 0.05)',
                        y: isActive ? -8 : (isFuture ? 8 : 0),
                        scale: isActive ? 1.02 : (isFuture ? 0.98 : 1),
                        borderColor: isActive 
                          ? 'rgba(168, 85, 247, 0.3)'
                          : isCompleted 
                            ? 'rgba(156, 163, 175, 0.25)'
                            : 'rgba(255, 255, 255, 0.05)'
                      }}
                      transition={{ 
                        duration: 1.2, // Увеличили длительность для всех анимаций карточки
                        ease: [0.25, 0.1, 0.25, 1],
                        boxShadow: { duration: 1.5, ease: [0.4, 0, 0.2, 1] }, // Более плавный переход тени
                        y: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
                        scale: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
                        borderColor: { duration: 1.5, ease: [0.4, 0, 0.2, 1] } // Более плавный переход границы
                      }}
                    >
                      <motion.h3 
                        className={cn(
                          "font-bold mb-4 lg:mb-6 transition-all duration-700",
                          isMobile ? "text-xl" : "text-2xl lg:text-3xl",
                          isActive 
                            ? 'text-white' 
                            : (isCompleted ? 'text-gray-300' : 'text-gray-400')
                        )}
                        animate={{
                          textShadow: isActive 
                            ? '0 0 15px rgba(178, 75, 243, 0.6), 0 0 30px rgba(178, 75, 243, 0.3)'
                            : '0 0 0px rgba(178, 75, 243, 0.0)'
                        }}
                        transition={{ duration: 0.7 }}
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p 
                        className={cn(
                          "leading-relaxed transition-colors duration-700",
                          isMobile ? "text-sm" : "text-base lg:text-lg xl:text-xl",
                          isActive 
                            ? 'text-light-gray' 
                            : (isCompleted ? 'text-gray-400' : 'text-gray-500')
                        )}
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