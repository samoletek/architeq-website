// src/components/ui/loading-button.tsx
"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';

interface LoadingButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  href?: string;
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    children, 
    isLoading = false, 
    loadingText = "Loading...",
    className,
    disabled,
    variant,
    size,
    href,
    ...props 
  }, ref) => {
    // Анимация для индикатора загрузки
    const spinnerVariants = {
      spin: {
        rotate: 360
      }
    };
    
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        className={cn(
          isLoading ? "opacity-90 cursor-wait" : "",
          className
        )}
        href={href}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <motion.svg
              className="mr-2 h-4 w-4"
              variants={spinnerVariants}
              animate="spin"
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </motion.svg>
            {loadingText}
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';