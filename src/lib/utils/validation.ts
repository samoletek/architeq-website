// src/lib/utils/validation.ts
// Утилиты валидации форм
import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Типы ошибок валидации
 */
export type ValidationError = string | null;

/**
 * Тип валидатора
 */
export type Validator = (value: string) => ValidationError;

/**
 * Проверяет, что поле не пустое
 */
export const required = (errorMessage: string = 'This field must be filled'): Validator => {
  return (value: string): ValidationError => {
    return value.trim() ? null : errorMessage;
  };
};

/**
 * Проверяет, что поле имеет минимальную длину
 */
export const minLength = (min: number, errorMessage?: string): Validator => {
  return (value: string): ValidationError => {
    return value.length >= min ? null : (errorMessage || `Min lenght - ${min} symbols`);
  };
};

/**
 * Проверяет, что поле имеет максимальную длину
 */
export const maxLength = (max: number, errorMessage?: string): Validator => {
  return (value: string): ValidationError => {
    return value.length <= max ? null : (errorMessage || `Max lenght - ${max} symbols`);
  };
};

/**
 * Проверяет, что строка является действительным email
 */
export const isEmail = (errorMessage: string = 'Enter a valid email'): Validator => {
  return (value: string): ValidationError => {
    // Базовая проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : errorMessage;
  };
};

/**
 * Проверяет, что строка является действительным телефонным номером
 * Использует libphonenumber-js для валидации
 * Разрешает пустое значение (необязательное поле)
 */
export const isPhone = (errorMessage: string = 'Enter a valid phone number'): Validator => {
  return (value: string): ValidationError => {
    // Если поле пустое, считаем его валидным (необязательное поле)
    if (!value || value.trim() === '') {
      return null;
    }
    
    try {
      // Пытаемся распарсить номер
      const phoneNumber = parsePhoneNumberFromString(value);
      
      // Если номер распарсился и валиден, возвращаем null (нет ошибки)
      if (phoneNumber && phoneNumber.isValid()) {
        return null;
      }
      
      return errorMessage;
    } catch {
      // В случае ошибки библиотеки, используем запасной вариант
      // Убираем все нецифровые символы для проверки
      const digitsOnly = value.replace(/\D/g, '');
      
      // Проверяем, что осталось хотя бы 7 цифр (минимальная длина телефона)
      return digitsOnly.length >= 7 ? null : errorMessage;
    }
  };
};

/**
 * Проверяет значение с помощью пользовательской функции
 */
export const custom = (validationFn: (value: string) => boolean, errorMessage: string): Validator => {
  return (value: string): ValidationError => {
    return validationFn(value) ? null : errorMessage;
  };
};

/**
 * Форматирует номер телефона во время ввода (например, для маски)
 */
export const formatPhone = (value: string): string => {
  // Убираем все нецифровые символы
  const digitsOnly = value.replace(/\D/g, '');
  
  // Форматируем как (XXX) XXX-XXXX для US/CA номеров
  if (digitsOnly.length <= 3) {
    return digitsOnly;
  } else if (digitsOnly.length <= 6) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
  } else {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
  }
};

/**
 * Функция для валидации поля с несколькими валидаторами
 */
export const validateField = (value: string, validators: Validator[]): ValidationError => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
};

/**
 * Интерфейс для объекта формы
 */
export interface FormFields {
  [key: string]: string;
}

/**
 * Интерфейс для объекта ошибок формы
 */
export interface FormErrors {
  [key: string]: ValidationError;
}

/**
 * Типы валидаторов для полей формы
 */
export interface FieldValidators {
  [key: string]: Validator[];
}

/**
 * Валидирует всю форму и возвращает объект с ошибками
 */
export const validateForm = (formData: FormFields, validators: FieldValidators): FormErrors => {
  const errors: FormErrors = {};
  
  Object.keys(validators).forEach(fieldName => {
    const value = formData[fieldName] || '';
    const fieldValidators = validators[fieldName];
    const error = validateField(value, fieldValidators);
    
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * Проверяет, есть ли ошибки в форме
 */
export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== null);
};