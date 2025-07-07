"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState, ReactNode, useEffect } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils/utils";

interface SimpleGlowCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  radius?: number;
  disableAnimations?: boolean;
}

/**
 * CardSpotlight - новый эффект с матрицей точек при наведении
 * Заменяет SimpleGlowCard с сохранением API
 */
const SimpleGlowCard: React.FC<SimpleGlowCardProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  onMouseEnter, 
  onMouseLeave,
  radius = 350,
  disableAnimations = false
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Проверка на мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleMouseEnterInternal = () => {
    if (!disableAnimations && !isMobile) {
      setIsHovering(true);
    }
    if (onMouseEnter) onMouseEnter();
  };
  
  const handleMouseLeaveInternal = () => {
    if (!disableAnimations && !isMobile) {
      setIsHovering(false);
    }
    if (onMouseLeave) onMouseLeave();
  };

  // Определяем цвета в зависимости от варианта
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          borderColor: 'border-secondary/20',
          backgroundColor: '#0A2A0A',
          spotlightColor: '#0A2A0A',
          backgroundGradient: 'bg-dark-gray',
          matrixColors: [
            [176, 255, 116], // secondary green
            [139, 255, 90],  // lighter green
          ]
        };
      default: // primary
        return {
          borderColor: 'border-primary/20',
          backgroundColor: '#170A24',
          spotlightColor: '#170A24',
          backgroundGradient: 'bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)]',
          matrixColors: [
            [178, 75, 243],  // primary purple
            [139, 92, 246],  // lighter purple
          ]
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-2xl border overflow-hidden transition-all duration-300",
        variantStyles.borderColor,
        variantStyles.backgroundGradient,
        className
      )}
      onMouseMove={!disableAnimations && !isMobile ? handleMouseMove : undefined}
      onMouseEnter={handleMouseEnterInternal}
      onMouseLeave={handleMouseLeaveInternal}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-2xl transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          backgroundColor: variantStyles.spotlightColor,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {!isMobile && !disableAnimations && (
            <CanvasRevealEffect
              containerClassName="bg-transparent absolute inset-0 pointer-events-none"
              colors={variantStyles.matrixColors}
              dotSize={3}
            />
          )}
        </motion.div>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SimpleGlowCard;