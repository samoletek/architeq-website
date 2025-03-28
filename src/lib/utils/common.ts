// src/lib/utils/common.ts
"use client";

/**
 * Форматирует дату в читаемый формат
 * @param date - Дата для форматирования
 * @param locale - Локаль для форматирования (по умолчанию 'en-US')
 * @returns Отформатированная строка даты
 */
export function formatDate(date: Date | string, locale: string = 'en-US'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  /**
   * Создает слаг из строки (для URL)
   * @param text - Строка для преобразования
   * @returns Слаг (URL-friendly строка)
   */
  export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Заменяем пробелы на дефисы
      .replace(/&/g, '-and-')     // Заменяем & на 'and'
      .replace(/[^\w\-]+/g, '')   // Удаляем все не-слова
      .replace(/\-\-+/g, '-')     // Заменяем множественные дефисы на один
      .replace(/^-+/, '')         // Обрезаем начальные дефисы
      .replace(/-+$/, '');        // Обрезаем конечные дефисы
  }
  
  /**
   * Сокращает текст до заданной длины
   * @param text - Текст для сокращения
   * @param maxLength - Максимальная длина (по умолчанию 100)
   * @returns Сокращенный текст
   */
  export function truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    
    // Находим последний пробел перед maxLength
    const lastSpace = text.lastIndexOf(' ', maxLength);
    
    // Если пробел не найден, просто обрезаем по maxLength
    if (lastSpace === -1) return text.substring(0, maxLength) + '...';
    
    // Иначе обрезаем по последнему пробелу
    return text.substring(0, lastSpace) + '...';
  }
  
  /**
   * Генерирует уникальный ID
   * @returns Уникальный ID
   */
  export function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
  
  /**
   * Группирует массив объектов по ключу
   * @param array - Массив объектов
   * @param key - Ключ для группировки
   * @returns Сгруппированные объекты
   */
  export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((result, item) => {
      const groupKey = String(item[key]);
      
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      result[groupKey].push(item);
      return result;
    }, {} as Record<string, T[]>);
  }
  
  /**
   * Управляет локальным хранилищем
   */
  export const storage = {
    /**
     * Сохраняет данные в localStorage
     */
    set<T>(key: string, value: T): void {
      if (typeof window === 'undefined') return;
      
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
      }
    },
    
    /**
     * Получает данные из localStorage
     */
    get<T>(key: string, defaultValue: T): T {
      if (typeof window === 'undefined') return defaultValue;
      
      try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : defaultValue;
      } catch (error) {
        console.error(`Error reading from localStorage: ${error}`);
        return defaultValue;
      }
    },
    
    /**
     * Удаляет данные из localStorage
     */
    remove(key: string): void {
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing from localStorage: ${error}`);
      }
    },
    
    /**
     * Очищает все данные в localStorage
     */
    clear(): void {
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.clear();
      } catch (error) {
        console.error(`Error clearing localStorage: ${error}`);
      }
    }
  };
  
  /**
   * Hook для управления недавно просмотренными элементами
   * @param key - Ключ для хранения в localStorage
   * @param maxItems - Максимальное количество элементов для хранения
   * @returns Объект с методами для работы с недавно просмотренными элементами
   */
  export function createRecentlyViewedManager<T extends { id: string }>(
    key: string,
    maxItems: number = 5
  ) {
    return {
      /**
       * Добавляет элемент в список недавно просмотренных
       */
      addItem(item: T): void {
        const recentItems = storage.get<T[]>(key, []);
        
        // Удаляем элемент, если он уже есть в списке
        const filteredItems = recentItems.filter(existingItem => existingItem.id !== item.id);
        
        // Добавляем элемент в начало списка
        const newItems = [item, ...filteredItems];
        
        // Ограничиваем количество элементов
        if (newItems.length > maxItems) {
          newItems.length = maxItems;
        }
        
        storage.set(key, newItems);
      },
      
      /**
       * Получает список недавно просмотренных элементов
       */
      getItems(): T[] {
        return storage.get<T[]>(key, []);
      },
      
      /**
       * Очищает список недавно просмотренных элементов
       */
      clearItems(): void {
        storage.remove(key);
      }
    };
  }
  
  /**
   * Функция для форматирования телефонного номера
   * @param phone - Телефонный номер
   * @param format - Формат (например, 'US', 'RU', etc.)
   * @returns Отформатированный телефонный номер
   */
  export function formatPhoneNumber(phone: string, format: string = 'US'): string {
    // Оставляем только цифры
    const digits = phone.replace(/\D/g, '');
    
    if (format === 'US') {
      // Формат: (XXX) XXX-XXXX
      if (digits.length === 10) {
        return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
      }
      // Формат с кодом страны: +1 (XXX) XXX-XXXX
      if (digits.length === 11 && digits.startsWith('1')) {
        return `+1 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7)}`;
      }
    } else if (format === 'RU') {
      // Формат: +7 (XXX) XXX-XX-XX
      if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
        return `+7 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9)}`;
      }
    }
    
    // Если формат не определен, возвращаем исходную строку
    return phone;
  }
  
  /**
   * Функция для форматирования чисел (например, для цен)
   * @param number - Число для форматирования
   * @param locale - Локаль для форматирования
   * @param options - Дополнительные опции форматирования
   * @returns Отформатированное число
   */
  export function formatNumber(
    number: number,
    locale: string = 'en-US',
    options: Intl.NumberFormatOptions = {}
  ): string {
    return new Intl.NumberFormat(locale, options).format(number);
  }
  
  /**
   * Функция для форматирования валюты
   * @param amount - Сумма
   * @param currency - Код валюты (например, 'USD', 'EUR')
   * @param locale - Локаль для форматирования
   * @returns Отформатированная сумма с символом валюты
   */
  export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
  ): string {
    return formatNumber(amount, locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }