interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  interest: string;
}

export async function submitToMonday(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    // Получаем API ключ и ID доски из переменных окружения
    const apiKey = process.env.NEXT_PUBLIC_MONDAY_API_KEY;
    const boardId = process.env.NEXT_PUBLIC_MONDAY_BOARD_ID;
    
    // ID колонок из переменных окружения
    const nameColumnId = process.env.NEXT_PUBLIC_MONDAY_NAME_COLUMN_ID;
    const emailColumnId = process.env.NEXT_PUBLIC_MONDAY_EMAIL_COLUMN_ID;
    const companyColumnId = process.env.NEXT_PUBLIC_MONDAY_COMPANY_COLUMN_ID;
    const phoneColumnId = process.env.NEXT_PUBLIC_MONDAY_PHONE_COLUMN_ID;
    const messageColumnId = process.env.NEXT_PUBLIC_MONDAY_MESSAGE_COLUMN_ID;
    const interestColumnId = process.env.NEXT_PUBLIC_MONDAY_INTEREST_COLUMN_ID;
    
    // Проверяем наличие необходимых переменных окружения
    if (!apiKey || !boardId) {
      console.error('Missing API key or board ID');
      return { 
        success: false, 
        message: 'Server configuration error. Please contact support.' 
      };
    }
    
    // Проверка обязательных полей формы
    if (!formData.name || !formData.email || !formData.message) {
      console.error('Missing required form fields');
      return {
        success: false,
        message: 'Please fill all required fields.'
      };
    }
    
    // Подготавливаем данные для колонок
    const columnValues: Record<string, unknown> = {};
    
    if (nameColumnId) columnValues[nameColumnId] = formData.name;
    if (emailColumnId) columnValues[emailColumnId] = { email: formData.email, text: formData.email };
    if (companyColumnId) columnValues[companyColumnId] = formData.company || '';
    if (phoneColumnId && formData.phone) columnValues[phoneColumnId] = { phone: formData.phone, countryShortName: 'US' };
    if (messageColumnId) columnValues[messageColumnId] = formData.message;
    if (interestColumnId) columnValues[interestColumnId] = { label: formData.interest };
    
    // Обрабатываем имя элемента для безопасного включения в запрос
    const itemName = `Contact from ${formData.name.replace(/["\\]/g, '')}`;
    
    // Формируем мутацию GraphQL
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
    
    // Переменные для мутации
    const variables = {
      boardId: boardId,
      itemName: itemName,
      columnValues: JSON.stringify(columnValues)
    };
    
    console.log('Sending request to Monday.com:', { mutation, variables });
    
    // Отправляем данные в Monday.com
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({ 
        query: mutation,
        variables: variables
      })
    });
    
    // Проверяем HTTP статус
    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} ${response.statusText}`);
      return {
        success: false,
        message: `Server error (${response.status}). Please try again later.`
      };
    }
    
    const responseData = await response.json();
    console.log('Monday.com API response:', responseData);
    
    // Проверяем успешность запроса
    if (responseData.errors && responseData.errors.length > 0) {
      const errorMessage = responseData.errors[0].message || 'Unknown error';
      console.error('Monday.com API error:', errorMessage, responseData.errors);
      return {
        success: false,
        message: `Error submitting form: ${errorMessage}`
      };
    }
    
    if (responseData.data && responseData.data.create_item && responseData.data.create_item.id) {
      console.log('Successfully created item with ID:', responseData.data.create_item.id);
      return {
        success: true,
        message: 'Thank you! Your message has been submitted successfully.'
      };
    } else {
      console.error('Unexpected response format:', responseData);
      return {
        success: false,
        message: 'Error submitting form. Please try again later.'
      };
    }
  } catch (error) {
    console.error('Error submitting to Monday.com:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
}