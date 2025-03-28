// src/components/ui/form-input.tsx
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  className?: string;
  rows?: number;
}

export function FormInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  touched = false,
  className,
  rows
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Определяем, показывать ли ошибку
  useEffect(() => {
    setShowError(Boolean(error && touched));
  }, [error, touched]);
  
  // Обработчики фокуса
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Общие классы для input и textarea
  const inputClasses = cn(
    "w-full bg-dark-gray border rounded-lg py-3 px-4 text-white placeholder-light-gray/50",
    "transition-all duration-300 focus:outline-none",
    isFocused ? "border-primary ring-1 ring-primary/30" : showError ? "border-red-500" : "border-medium-gray",
    "hover:border-light-gray focus:border-primary",
    className
  );
  
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium mb-2 flex items-center gap-1">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rows || 5}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
        />
      )}
      
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