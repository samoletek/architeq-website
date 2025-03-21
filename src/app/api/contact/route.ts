import { NextRequest, NextResponse } from 'next/server';
import { submitToMonday } from '@/lib/services/monday-service';

export async function POST(req: NextRequest) {
  try {
    // Парсим данные из запроса
    const data = await req.json();
    
    // Базовая валидация
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Пожалуйста, заполните все обязательные поля.' },
        { status: 400 }
      );
    }
    
    // Форматирование телефона
    if (data.phone) {
      // Оставляем только цифры
      data.phone = data.phone.replace(/\D/g, '');
    }
    
    // Отправка данных в Monday.com
    const result = await submitToMonday(data);
    
    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.' },
      { status: 500 }
    );
  }
}