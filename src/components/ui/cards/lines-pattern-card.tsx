"use client";

import { cn } from '@/lib/utils/utils';
import { motion } from "framer-motion";

interface LinesPatternCardProps {
  children: React.ReactNode;
  className?: string;
  patternClassName?: string;
}

export function LinesPatternCard({ 
  children, 
  className,
  patternClassName
}: LinesPatternCardProps) {
  return (
    <motion.div
      className={cn(
        "border w-full rounded-xl overflow-hidden",
        "bg-transparent",
        "border-secondary/20",
        "p-3",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={cn(
        "size-full bg-repeat bg-[length:30px_30px]",
        "bg-lines-pattern-green",
        patternClassName
      )}>
        {children}
      </div>
    </motion.div>
  );
}

export function LinesPatternCardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("text-left p-4 md:p-6", className)} 
      {...props} 
    />
  );
}