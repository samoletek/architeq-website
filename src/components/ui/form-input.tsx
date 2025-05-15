// src/components/ui/form-input.tsx
"use client";

import { useState, useEffect, forwardRef } from 'react';
import { cn } from '@/lib/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { ValidationError, Validator } from '@/lib/utils/validation';
import { validateField } from '@/lib/utils/validation';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  rows?: number;
  validators?: Validator[];
  onValidate?: (isValid: boolean, error: ValidationError) => void;
}

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(({
  id,
  name,
  label,
  type = 'text',
  value = '',
  placeholder,
  required = false,
  error,
  touched = false,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  rows = 5,
  validators = [],
  onChange,
  onBlur,
  onValidate,
  ...props
}, ref) => {
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
  const handleFocus = () => {
    // Можем просто оставить пустым или добавить другую логику в будущем
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsTouched(true);
    
    // Валидация при потере фокуса, если есть валидаторы
    if (validators.length > 0) {
      const error = validateField(e.target.value.toString(), validators);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  
  // Стили с фиолетовым свечением
  const inputClasses = cn(
    "w-full bg-[#12071A]/80 border rounded-lg py-3 px-4 text-white placeholder-light-gray/50",
    "transition-all duration-300 focus:outline-none",
    showError ? "border-red-500" : "border-medium-gray",
    "hover:shadow-neon-glow focus:shadow-neon-glow-intense",
    inputClassName
  );
  
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
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={innerValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rows}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={innerValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
          ref={ref as React.RefObject<HTMLInputElement>}
          {...props}
        />
      )}
      
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

FormInput.displayName = 'FormInput';