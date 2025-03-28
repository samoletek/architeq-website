// src/components/ui/form-select.tsx
"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  touched?: boolean;
  className?: string;
}

export function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  required = false,
  error,
  touched = false,
  className
}: FormSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showError = error && touched;
  
  // Обработчики фокуса
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium mb-2 flex items-center gap-1">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "w-full bg-dark-gray border rounded-lg py-3 px-4 text-white appearance-none",
            "transition-all duration-300 focus:outline-none",
            isFocused ? "border-primary ring-1 ring-primary/30" : showError ? "border-red-500" : "border-medium-gray",
            "hover:border-light-gray focus:border-primary",
            className
          )}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-colors ${isFocused ? 'text-primary' : 'text-light-gray'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-red-400 text-sm overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}