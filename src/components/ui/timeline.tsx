"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { useDeviceDetection } from "@/lib/utils/device-detection";

// Контекст для передачи информации об активном шаге
const TimelineContext = createContext<{ activeStep: number; isMobile: boolean }>({
  activeStep: -1,
  isMobile: false,
});

export const useTimelineContext = () => useContext(TimelineContext);

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const { isMobile } = useDeviceDetection();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Отслеживаем активный шаг для мобильных устройств
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) {
      const stepProgress = latest * data.length;
      const currentStep = Math.floor(stepProgress);
      setActiveStep(currentStep);
    }
  });

  return (
    <div
      className="w-full bg-dark-gray font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="text-center section-content-spacing">
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(178,75,243,0.6), 0 0 60px rgba(255,255,255,0.3)'
              }}>
            Our Automation Flow:<br />From Discovery to Deployment
          </h2>
          <p className="text-light-gray text-lg md:text-xl max-w-3xl mx-auto opacity-90 font-mono">
            A sharp, proven framework — designed to deliver fast and integrate deep into your ops.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        <TimelineContext.Provider value={{ activeStep, isMobile }}>
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex justify-start ${isMobile ? 'pt-6 gap-4' : 'pt-10 md:pt-40 md:gap-10'}`}
            >
            <div className={`sticky flex flex-col md:flex-row z-40 items-center ${isMobile ? 'top-20' : 'top-40'} self-start max-w-xs lg:max-w-sm md:w-full`}>
              <div className={`${isMobile ? 'h-8 w-8' : 'h-10 w-10'} absolute ${isMobile ? 'left-2' : 'left-3 md:left-3'} rounded-full bg-dark-gray border border-primary/30 flex items-center justify-center`}>
                <motion.div 
                  className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} rounded-full bg-primary border border-primary/50`}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 8px rgba(178,75,243,1), 0 0 16px rgba(178,75,243,0.8)',
                      '0 0 12px rgba(178,75,243,1), 0 0 24px rgba(178,75,243,0.9)',
                      '0 0 8px rgba(178,75,243,1), 0 0 16px rgba(178,75,243,0.8)'
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <h3 className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white ${isMobile ? 'md:text-3xl' : ''}`}
                  style={{
                    textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(178,75,243,0.5)'
                  }}>
                {item.title}
              </h3>
            </div>

            <div className={`relative ${isMobile ? 'pl-12 pr-2' : 'pl-20 pr-4 md:pl-4'} w-full`}>
              <h3 className={`md:hidden block ${isMobile ? 'text-lg' : 'text-2xl'} mb-4 text-left font-bold text-white`}
                  style={{
                    textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(178,75,243,0.5)'
                  }}>
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        </TimelineContext.Provider>
        <div
          style={{
            height: height + "px",
          }}
          className={`absolute ${isMobile ? 'left-6' : 'md:left-8 left-8'} top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]`}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-secondary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};