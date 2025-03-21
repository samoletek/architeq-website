import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}