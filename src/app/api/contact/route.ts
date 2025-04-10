// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { submitToMonday, FormData } from '@/lib/services/monday-service';

// Валидаторы для полей формы
const validators = {
  name: (value: string) => value.trim().length > 0,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: (value: string) => value.trim().length > 0,
  phone: () => true, // Полностью необязательное поле - всегда проходит валидацию
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
    /\b(?:buy|cheap|free|offer|order|sell)\b.*\b(?:viagra|cialis|pills|crypto|forex|casino|bet|xxx)\b/i, // Комбинации спам-слов
    /\b(?:casino|poker|bet|gambling|lottery)\b/i, // Игорная тематика
    /\b(?:bitcoin|forex|invest|earn money)\b.*\b(?:fast|quick|easy|guaranteed)\b/i, // Финансовые схемы
  ];

  // Объединяем все текстовые поля для проверки
  const textToCheck = `${data.name} ${data.email} ${data.message} ${data.company || ''}`.toLowerCase();
  
  return spamPatterns.some(pattern => pattern.test(textToCheck));
}

// Добавляем защиту от флуда (rate limiting)
const ipRequests = new Map<string, { count: number, timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestLimit = 5; // Максимальное количество запросов
  const timeWindow = 60000; // Временное окно (1 минута)
  
  const prevRequest = ipRequests.get(ip);
  
  if (!prevRequest) {
    // Первый запрос с этого IP
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }
  
  // Проверяем, истекло ли время с последнего запроса
  if (now - prevRequest.timestamp > timeWindow) {
    // Сбрасываем счетчик, если прошло больше timeWindow
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }
  
  // Если в рамках временного окна, увеличиваем счетчик
  const newCount = prevRequest.count + 1;
  ipRequests.set(ip, { count: newCount, timestamp: prevRequest.timestamp });
  
  // Проверяем, не превышен ли лимит
  return newCount > requestLimit;
}

// Функция для валидации формы
function validateForm(data: ContactFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // Проверяем каждое поле формы
  for (const [field, validator] of Object.entries(validators)) {
    // TypeScript требует явного приведения типа
    const fieldValue = data[field as keyof ContactFormData] || '';
    
    if (!validator(fieldValue.toString())) {
      errors[field] = `The ${field} field is invalid`;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Безопасно извлекаем IP-адрес из запроса
function getClientIp(req: NextRequest): string {
  // Пытаемся получить реальный IP из заголовков прокси
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // X-Forwarded-For может содержать список IP, разделенных запятыми
    const ips = forwardedFor.split(',');
    return ips[0].trim();
  }
  
  // Пробуем различные заголовки для определения IP
  const realIp = req.headers.get('x-real-ip');
  const cfIp = req.headers.get('cf-connecting-ip'); // Cloudflare
  const trueClientIp = req.headers.get('true-client-ip');
  
  // Возвращаем первый найденный IP или запасной вариант
  return realIp || cfIp || trueClientIp || '0.0.0.0';
}

// Обработчик POST запроса
export async function POST(req: NextRequest) {
  try {
    console.log('Received contact form submission');
    
    // Проверка на слишком частые запросы
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }
    
    // Парсим данные из запроса
    let data: ContactFormData;
    try {
      data = await req.json() as ContactFormData;
      console.log('Received form data:', {
        name: data.name ? '✓' : '✗',
        email: data.email ? '✓' : '✗',
        message: data.message ? `(${data.message.length} chars)` : '✗',
        phone: data.phone ? '✓' : '✗',
        company: data.company ? '✓' : '✗',
        interest: data.interest || 'none'
      });
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request format' 
        },
        { status: 400 }
      );
    }
    
    // Валидация обязательных полей
    const validation = validateForm(data);
    if (!validation.isValid) {
      console.warn('Form validation failed:', validation.errors);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check the form for errors',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }
    
    // Проверка на спам
    if (containsSpam(data)) {
      console.warn('Spam detected in submission');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Your message was detected as spam. Please remove any promotional content.' 
        },
        { status: 400 }
      );
    }
    
    // Форматирование телефона
    if (data.phone) {
      data.phone = data.phone.replace(/[^\d\+\-\(\)\s]/g, '');
    }
    
    // Санитизация данных для предотвращения XSS
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
    
    console.log('Sending sanitized data to Monday service');
    
    // Отправка данных в Monday.com
    try {
      const result = await submitToMonday(formData);
      
      if (result.success) {
        console.log('Form submission successful:', result.message);
        return NextResponse.json(
          { 
            success: true, 
            message: result.message || 'Your message has been sent successfully!' 
          },
          { status: 200 }
        );
      } else {
        console.warn('Form submission failed:', result.message);
        return NextResponse.json(
          { 
            success: false, 
            message: result.message || 'Failed to submit your message. Please try again later.' 
          },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error('Error submitting to Monday service:', error);
      
      // Возвращаем более информативную ошибку
      const errorMessage = error instanceof Error 
        ? `Error: ${error.message}` 
        : 'An unexpected error occurred';
        
      return NextResponse.json(
        { 
          success: false, 
          message: 'Internal server error. Our team has been notified.',
          error: errorMessage
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // Обработка неожиданных ошибок
    console.error('Unexpected error in contact form handler:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}