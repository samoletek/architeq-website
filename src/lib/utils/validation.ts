// src/lib/utils/validation.ts
// Утилиты валидации форм

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
export const required = (errorMessage: string = 'Это поле обязательно к заполнению'): Validator => {
  return (value: string): ValidationError => {
    return value.trim() ? null : errorMessage;
  };
};

/**
 * Проверяет, что поле имеет минимальную длину
 */
export const minLength = (min: number, errorMessage?: string): Validator => {
  return (value: string): ValidationError => {
    return value.length >= min ? null : (errorMessage || `Минимальная длина - ${min} символов`);
  };
};

/**
 * Проверяет, что поле имеет максимальную длину
 */
export const maxLength = (max: number, errorMessage?: string): Validator => {
  return (value: string): ValidationError => {
    return value.length <= max ? null : (errorMessage || `Максимальная длина - ${max} символов`);
  };
};

/**
 * Проверяет, что строка является действительным email
 */
export const isEmail = (errorMessage: string = 'Введите корректный email'): Validator => {
  return (value: string): ValidationError => {
    // Базовая проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : errorMessage;
  };
};

/**
 * Проверяет, что строка является действительным телефонным номером
 */
export const isPhone = (errorMessage: string = 'Введите корректный номер телефона'): Validator => {
  return (value: string): ValidationError => {
    // Убираем все нецифровые символы для проверки
    const digitsOnly = value.replace(/\D/g, '');
    // Проверяем, что осталось хотя бы 10 цифр (минимальная длина телефона)
    return digitsOnly.length >= 10 ? null : errorMessage;
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
