// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { submitToMonday, FormData } from '@/lib/services/monday-service';

// Валидаторы для полей формы
const validators = {
  name: (value: string) => value.trim().length > 0,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: (value: string) => value.trim().length > 0,
  phone: (value: string) => !value || /^\+?[0-9\-\(\)\s]+$/.test(value),
  company: () => true, // Необязательное поле
  interest: () => true, // Необязательное поле
};

// Типы для данных формы внутри этого файла
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  interest?: string;
}

// Функция для проверки наличия спама в сообщении
function containsSpam(data: ContactFormData): boolean {
  // Простая проверка на наличие спам-ссылок
  const spamPatterns = [
    /\b(?:https?:\/\/|www\.)[^\s]+\b/i,  // URL
    /\b(?:buy|cheap|free|offer|price|discount|order|sell)\b.*\b(?:viagra|cialis|pills|crypto|forex|casino|bet|xxx)\b/i, // Комбинации спам-слов
    /\b(?:casino|poker|bet|gambling|lottery)\b/i, // Игорные темы
    /\b(?:bitcoin|crypto|forex|invest|earn money)\b.*\b(?:fast|quick|easy|guaranteed)\b/i, // Финансовые схемы
  ];

  // Объединяем все текстовые поля для проверки
  const textToCheck = `${data.name} ${data.email} ${data.message} ${data.company || ''}`.toLowerCase();
  
  return spamPatterns.some(pattern => pattern.test(textToCheck));
}

// Добавляем защиту от флуда (rate limiting)
const ipRequests = new Map<string, { count: number, timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = 5; // Максимальное количество запросов
  const window = 60 * 1000; // Временное окно (1 минута)
  
  // Получаем текущие данные для IP или инициализируем
  const requestData = ipRequests.get(ip) || { count: 0, timestamp: now };
  
  // Очищаем счетчик, если временное окно истекло
  if (now - requestData.timestamp > window) {
    requestData.count = 1;
    requestData.timestamp = now;
  } else {
    requestData.count += 1;
  }
  
  // Сохраняем обновленные данные
  ipRequests.set(ip, requestData);
  
  // Проверяем, превышен ли лимит
  return requestData.count > limit;
}

// Обработчик POST запроса
export async function POST(req: NextRequest) {
  try {
    // Получаем IP для rate limiting (используем только заголовки)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Проверяем лимит запросов
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }
    
    // Парсим данные из запроса
    const data = await req.json() as ContactFormData;
    
    // Валидация обязательных полей
    const validationErrors: Record<string, string> = {};
    
    for (const [field, validator] of Object.entries(validators)) {
      // @ts-ignore - Динамический доступ к полям
      if (!validator(data[field])) {
        validationErrors[field] = `Invalid ${field}`;
      }
    }
    
    // Если есть ошибки валидации, возвращаем их
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validationErrors 
        },
        { status: 400 }
      );
    }
    
    // Проверка на спам
    if (containsSpam(data)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Your message contains content that appears to be spam.' 
        },
        { status: 400 }
      );
    }
    
    // Форматирование телефона (оставляем только цифры, "+", "-", "(", ")")
    if (data.phone) {
      data.phone = data.phone.replace(/[^\d\+\-\(\)\s]/g, '');
    }
    
    // Дезинфекция данных для предотвращения XSS атак
    const sanitizeText = (text: string): string => {
      return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    
    // Подготавливаем данные для monday-service
    const formData: FormData = {
      name: sanitizeText(data.name),
      email: sanitizeText(data.email),
      message: sanitizeText(data.message),
      company: data.company ? sanitizeText(data.company) : '',
      phone: data.phone || '',
      interest: data.interest ? sanitizeText(data.interest) : '',
    };
    
    // Отправка данных в Monday.com
    const result = await submitToMonday(formData);
    
    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      // Логируем ошибку для отладки
      console.error('Monday service error:', result.message);
      
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}