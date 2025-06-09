// src/lib/utils/common.ts
"use client";

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