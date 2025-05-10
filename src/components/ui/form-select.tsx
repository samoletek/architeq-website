// src/components/ui/form-select.tsx
"use client";

import { useState, useEffect, forwardRef } from 'react';
import { cn } from '@/lib/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { ValidationError, Validator } from '@/lib/utils/validation';
import { validateField } from '@/lib/utils/validation';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  touched?: boolean;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  validators?: Validator[];
  onValidate?: (isValid: boolean, error: ValidationError) => void;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({
  id,
  name,
  label,
  value = '',
  options,
  required = false,
  error,
  touched = false,
  className,
  selectClassName,
  labelClassName,
  errorClassName,
  validators = [],
  onChange,
  onBlur,
  onValidate,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState<ValidationError>(error || null);
  const [isTouched, setIsTouched] = useState(touched);
  const [innerValue, setInnerValue] = useState(value);
  
  // Обновляем внутреннее состояние при изменении внешнего value
  useEffect(() => {
    setInnerValue(value);
  }, [value]);
  
  // Обновляем внутреннее состояние ошибки при изменении внешней ошибки
  useEffect(() => {
    setLocalError(error || null);
  }, [error]);
  
  // Обновляем внутреннее состояние touched при изменении внешнего touched
  useEffect(() => {
    setIsTouched(touched);
  }, [touched]);
  
  // Определяем, показывать ли ошибку
  const showError = Boolean(localError && isTouched);
  
  // Обработчики фокуса
  const handleFocus = () => setIsFocused(true);
  
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    setIsTouched(true);
    
    // Валидация при потере фокуса, если есть валидаторы
    if (validators.length > 0) {
      const error = validateField(e.target.value, validators);
      setLocalError(error);
      
      // Вызываем колбэк onValidate, если он предоставлен
      if (onValidate) {
        onValidate(error === null, error);
      }
    }
    
    // Вызываем родительский onBlur, если он предоставлен
    if (onBlur) {
      onBlur(e);
    }
  };
  
  // Обработчик изменения значения
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setInnerValue(newValue);
    
    // Если поле было тронуто, валидируем при изменении
    if (isTouched && validators.length > 0) {
      const error = validateField(newValue, validators);
      setLocalError(error);
      
      // Вызываем колбэк onValidate, если он предоставлен
      if (onValidate) {
        onValidate(error === null, error);
      }
    }
    
    // Вызываем родительский onChange, если он предоставлен
    if (onChange) {
      onChange(e);
    }
  };
  
  return (
    <div className={cn("w-full", className)}>
      <label 
        htmlFor={id} 
        className={cn(
          "text-sm font-medium mb-2 flex items-center gap-1",
          labelClassName
        )}
      >
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      
      <div className="relative">
        <select
          id={id}
          name={name}
          value={innerValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "w-full bg-dark-gray border rounded-lg py-3 px-4 text-white appearance-none",
            "transition-all duration-300 focus:outline-none",
            isFocused ? "border-primary ring-1 ring-primary/30" : showError ? "border-red-500" : "border-medium-gray",
            "hover:border-light-gray focus:border-primary",
            selectClassName
          )}
          required={required}
          ref={ref}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? `${id}-error` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={cn(
              "h-5 w-5 transition-colors",
              isFocused ? "text-primary" : "text-light-gray"
            )}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
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
            className={cn("mt-1 text-red-400 text-sm overflow-hidden", errorClassName)}
            id={`${id}-error`}
            aria-live="polite"
          >
            {localError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

FormSelect.displayName = 'FormSelect';