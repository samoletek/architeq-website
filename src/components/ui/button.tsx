"use client";

import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils/utils'

// Defining style variants for the button
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus:outline-none focus:ring-0 active:outline-none ...",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white rounded-lg hover:bg-primary/90 active:bg-primary/80 active:scale-[0.98] shadow-neon-glow hover:shadow-neon-glow-intense focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        secondary: 'bg-secondary text-site-bg rounded-lg hover:bg-secondary/90 active:bg-secondary/80 active:scale-[0.98] shadow-neon-green-glow hover:shadow-neon-green-glow-intense focus:ring-2 focus:ring-offset-2 focus:ring-secondary',
        ghost: 'bg-transparent text-white border border-white rounded-lg hover:bg-white hover:bg-opacity-10 active:bg-opacity-20 active:scale-[0.98] focus:ring-2 focus:ring-offset-2',
        accent: 'bg-secondary-gradient text-site-bg rounded-lg hover:opacity-90 active:opacity-95 active:scale-[0.98] shadow-neon-green-glow hover:shadow-neon-green-glow-intense focus:ring-2 focus:ring-offset-2',
        // Обновленный вариант для кнопки Schedule a Call с эффектом свечения только текста
        headerCta: 'bg-transparent text-white hover:text-secondary active:scale-[0.98] transition-all duration-300',
      },
      size: {
        default: 'py-3 px-6 text-base',
        sm: 'py-2 px-4 text-sm',
        lg: 'py-4 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    // Специальный класс для текста кнопки headerCta
    const isHeaderCta = variant === 'headerCta';
    const textClass = isHeaderCta 
      ? 'text-shadow-white hover:text-shadow-green transition-all duration-300' 
      : '';
    
    if (href) {
      return (
        <a 
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          <span className={textClass}>{props.children}</span>
        </a>
      )
    }
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isHeaderCta ? (
          <span className={textClass}>{props.children}</span>
        ) : (
          props.children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }