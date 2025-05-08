"use client";

import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils/utils'

// Defining style variants for the button
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80 active:scale-[0.98] shadow-neon-glow',
        secondary: 'bg-secondary text-site-bg hover:bg-secondary/90 active:bg-secondary/80 active:scale-[0.98] shadow-neon-green-glow',
        ghost: 'bg-transparent text-white border border-white hover:bg-white hover:bg-opacity-10 active:bg-opacity-20 active:scale-[0.98]',
        accent: 'bg-secondary-gradient text-site-bg hover:opacity-90 active:opacity-95 active:scale-[0.98]',
        // Новый вариант для кнопки Schedule a Call в хедере
        headerCta: 'bg-transparent text-white border-2 border-white ring-1 ring-white/30 hover:bg-secondary hover:border-secondary hover:text-site-bg hover:ring-0 active:scale-[0.98] transition-all duration-300',
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
    if (href) {
      return (
        <a 
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {props.children}
        </a>
      )
    }
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }