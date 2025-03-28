// src/lib/services/monday-service.ts

/**
 * Тип данных для формы контактов
 */
export interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  interest: string;
  [key: string]: string; // Для дополнительных полей
}

/**
 * Тип данных для результата отправки в Monday.com
 */
export interface MondayResponse {
  success: boolean;
  message: string;
  itemId?: string;
}

/**
 * Тип для API ответа Monday.com
 */
interface MondayApiResponse {
  data?: Record<string, unknown>;
  errors?: Array<{ message: string }>;
}

/**
 * Тип для элемента доски Monday.com
 */
interface MondayBoardItem {
  id: string;
  name: string;
  column_values: Array<{
    id: string;
    title: string;
    text: string;
    value: string;
  }>;
}

/**
 * Проверяет наличие всех необходимых переменных окружения
 */
function checkEnvironmentVariables(): { valid: boolean; missing: string[] } {
  const requiredVars = [
    'NEXT_PUBLIC_MONDAY_API_KEY',
    'NEXT_PUBLIC_MONDAY_BOARD_ID',
    'NEXT_PUBLIC_MONDAY_NAME_COLUMN_ID',
    'NEXT_PUBLIC_MONDAY_EMAIL_COLUMN_ID',
    'NEXT_PUBLIC_MONDAY_MESSAGE_COLUMN_ID'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  return {
    valid: missingVars.length === 0,
    missing: missingVars
  };
}

/**
 * Отправляет запрос к API Monday.com
 */
async function sendMondayRequest(query: string, variables?: Record<string, unknown>): Promise<MondayApiResponse> {
  const apiKey = process.env.NEXT_PUBLIC_MONDAY_API_KEY;
  
  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey as string
      },
      body: JSON.stringify({ 
        query,
        variables
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Monday API request failed:', error);
    throw error;
  }
}

/**
 * Проверяет существование элемента с данным email
 * Используется для предотвращения дублирования
 */
async function checkExistingContact(email: string): Promise<string | null> {
  try {
    const boardId = process.env.NEXT_PUBLIC_MONDAY_BOARD_ID;
    const emailColumnId = process.env.NEXT_PUBLIC_MONDAY_EMAIL_COLUMN_ID;
    
    // Если отсутствуют необходимые переменные окружения, пропускаем проверку
    if (!boardId || !emailColumnId) return null;
    
    const query = `
      query GetItemsByEmail($boardId: ID!, $columnId: String!, $email: String!) {
        items_by_column_values(
          board_id: $boardId,
          column_id: $columnId,
          column_value: $email
        ) {
          id
          name
        }
      }
    `;
    
    const variables = {
      boardId,
      columnId: emailColumnId,
      email
    };
    
    const response = await sendMondayRequest(query, variables);
    
    if (response.data?.items_by_column_values && Array.isArray(response.data.items_by_column_values) && response.data.items_by_column_values.length > 0) {
      return (response.data.items_by_column_values[0] as { id: string }).id;
    }
    
    return null;
  } catch (error) {
    console.error('Error checking for existing contact:', error);
    return null; // В случае ошибки продолжаем с созданием нового элемента
  }
}

/**
 * Отправляет данные формы в Monday.com
 */
export async function submitToMonday(formData: FormData): Promise<MondayResponse> {
  try {
    // Проверяем наличие необходимых переменных окружения
    const envCheck = checkEnvironmentVariables();
    if (!envCheck.valid) {
      console.error('Missing environment variables:', envCheck.missing);
      return { 
        success: false, 
        message: 'Server configuration error. Please contact support.' 
      };
    }
    
    // Получаем значения из переменных окружения
    const boardId = process.env.NEXT_PUBLIC_MONDAY_BOARD_ID;
    
    // ID колонок из переменных окружения
    const nameColumnId = process.env.NEXT_PUBLIC_MONDAY_NAME_COLUMN_ID;
    const emailColumnId = process.env.NEXT_PUBLIC_MONDAY_EMAIL_COLUMN_ID;
    const companyColumnId = process.env.NEXT_PUBLIC_MONDAY_COMPANY_COLUMN_ID;
    const phoneColumnId = process.env.NEXT_PUBLIC_MONDAY_PHONE_COLUMN_ID;
    const messageColumnId = process.env.NEXT_PUBLIC_MONDAY_MESSAGE_COLUMN_ID;
    const interestColumnId = process.env.NEXT_PUBLIC_MONDAY_INTEREST_COLUMN_ID;
    
    // Проверяем обязательные поля формы
    if (!formData.name || !formData.email || !formData.message) {
      console.error('Missing required form fields');
      return {
        success: false,
        message: 'Please fill all required fields.'
      };
    }
    
    // Проверяем, существует ли уже контакт с таким email
    const existingItemId = await checkExistingContact(formData.email);
    
    // Подготавливаем данные для колонок
    const columnValues: Record<string, unknown> = {};
    
    if (nameColumnId) columnValues[nameColumnId] = formData.name;
    if (emailColumnId) columnValues[emailColumnId] = { email: formData.email, text: formData.email };
    if (companyColumnId && formData.company) columnValues[companyColumnId] = formData.company;
    
    if (phoneColumnId && formData.phone) {
      // Определяем код страны для телефона (по умолчанию US)
      const countryCode = formData.phone.startsWith('+') ? 
        formData.phone.substring(1, 3) : 'US';
      
      columnValues[phoneColumnId] = { 
        phone: formData.phone, 
        countryShortName: countryCode === '1' ? 'US' : countryCode 
      };
    }
    
    if (messageColumnId) columnValues[messageColumnId] = formData.message;
    
    if (interestColumnId && formData.interest) {
      try {
        columnValues[interestColumnId] = { labels: [formData.interest] };
      } catch {
        // Если формат не поддерживается, используем простое текстовое поле
        columnValues[interestColumnId] = formData.interest;
      }
    }
    
    // Обрабатываем имя элемента для безопасного включения в запрос
    const itemName = `${formData.name.replace(/["\\]/g, '')}`;
    
    let response;
    
    if (existingItemId) {
      // Обновляем существующий элемент
      const mutation = `
        mutation UpdateItem($itemId: ID!, $columnValues: JSON!) {
          change_multiple_column_values (
            item_id: $itemId,
            board_id: ${boardId},
            column_values: $columnValues
          ) {
            id
          }
        }
      `;
      
      const variables = {
        itemId: existingItemId,
        columnValues: JSON.stringify(columnValues)
      };
      
      console.log('Updating existing item in Monday.com:', existingItemId);
      response = await sendMondayRequest(mutation, variables);
      
      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors[0].message);
      }
      
      if (response.data && response.data.change_multiple_column_values) {
        return {
          success: true,
          message: 'Thank you! Your information has been updated.',
          itemId: existingItemId
        };
      }
    } else {
      // Создаем новый элемент
      const mutation = `
        mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
          create_item (
            board_id: $boardId,
            item_name: $itemName,
            column_values: $columnValues
          ) {
            id
          }
        }
      `;
      
      const variables = {
        boardId,
        itemName,
        columnValues: JSON.stringify(columnValues)
      };
      
      console.log('Creating new item in Monday.com');
      response = await sendMondayRequest(mutation, variables);
      
      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors[0].message);
      }
      
      if (response.data && response.data.create_item && (response.data.create_item as { id: string }).id) {
        return {
          success: true,
          message: 'Thank you! Your message has been submitted successfully.',
          itemId: (response.data.create_item as { id: string }).id
        };
      }
    }
    
    // Если мы дошли до этого места, что-то пошло не так
    console.error('Unexpected Monday.com API response:', response);
    return {
      success: false,
      message: 'Error submitting form. Please try again later.'
    };
    
  } catch (error) {
    console.error('Error submitting to Monday.com:', error);
    
    // Проверяем, является ли ошибка сетевой
    if (error instanceof Error && error.message.includes('network')) {
      return {
        success: false,
        message: 'Network error. Please check your internet connection and try again.'
      };
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
}

/**
 * Создает запрос для получения элементов с доски
 */
export async function getBoardItems(
  boardId: string = process.env.NEXT_PUBLIC_MONDAY_BOARD_ID || '', 
  limit: number = 100
): Promise<MondayBoardItem[]> {
  try {
    const query = `
      query GetBoardItems($boardId: ID!, $limit: Int) {
        boards(ids: [$boardId]) {
          items(limit: $limit) {
            id
            name
            column_values {
              id
              title
              text
              value
            }
          }
        }
      }
    `;

    const variables = {
      boardId,
      limit
    };

    const response = await sendMondayRequest(query, variables);
    
    if (response.errors && response.errors.length > 0) {
      throw new Error(response.errors[0].message);
    }
    
    if (response.data?.boards && Array.isArray(response.data.boards) && response.data.boards.length > 0) {
      return (response.data.boards[0] as { items: MondayBoardItem[] }).items || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching board items:', error);
    return [];
  }
}