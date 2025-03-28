"use client";

import { useState, useEffect } from 'react';
import { LoadingButton } from '@/components/ui/loading-button';
import CalendlyWidget from '@/components/ui/calendly-widget';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { motion } from 'framer-motion';
import { required, isEmail, isPhone, validateForm } from '@/lib/utils/validation';
import type { FormFields, FormErrors } from '@/lib/utils/validation';

// Типы для формы
interface ContactFormData extends FormFields {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  interest: string;
}

interface ContactFormState {
  isSubmitting: boolean;
  submitMessage: {type: string, text: string} | null;
  errors: FormErrors;
  touched: Record<string, boolean>;
}

// Варианты интересов
const interestOptions = [
  { value: 'General Inquiry', label: 'Общий запрос' },
  { value: 'Business Process Automation', label: 'Автоматизация бизнес-процессов' },
  { value: 'CRM Integration', label: 'Интеграция CRM' },
  { value: 'Industry-Specific Solution', label: 'Отраслевое решение' },
  { value: 'AI Solution', label: 'AI-решение' },
  { value: 'Documentation & Forms', label: 'Документация и формы' },
  { value: 'Financial System Integration', label: 'Интеграция финансовых систем' },
];

// Валидаторы для полей формы
const formValidators = {
  name: [required('Введите ваше имя')],
  email: [required('Введите ваш email'), isEmail('Введите корректный email')],
  message: [required('Сообщение обязательно для заполнения')],
  phone: [isPhone('Введите корректный номер телефона')],
};

export default function ContactsContent() {
  // Состояние формы
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: interestOptions[0].value,
  });
  
  // Состояние формы
  const [formState, setFormState] = useState<ContactFormState>({
    isSubmitting: false,
    submitMessage: null,
    errors: {},
    touched: {},
  });
  
  // Обработчик изменения полей формы
  const handleChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Обработчик события потери фокуса для маркировки поля как "тронутого"
  const handleBlur = (name: string) => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [name]: true
      }
    }));
  };
  
  // Функция валидации всей формы
  const validateContactForm = () => {
    const errors = validateForm(formData, formValidators);
    
    setFormState(prev => ({
      ...prev,
      errors,
      touched: {
        name: true,
        email: true,
        message: true,
        phone: true,
        company: true,
        interest: true
      }
    }));
    
    return Object.keys(errors).length === 0;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем валидность формы
    if (!validateContactForm()) {
      setFormState(prev => ({
        ...prev,
        submitMessage: {
          type: 'error',
          text: 'Пожалуйста, исправьте ошибки в форме перед отправкой.'
        }
      }));
      return;
    }
    
    // Начинаем отправку
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      submitMessage: null
    }));
    
    try {
      // Отправка данных на наш API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Успешная отправка
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          submitMessage: {
            type: 'success',
            text: 'Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.'
          }
        }));
        
        // Сброс формы
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          interest: interestOptions[0].value,
        });
        
        // Сброс состояний валидации
        setFormState(prev => ({
          ...prev,
          errors: {},
          touched: {}
        }));
      } else {
        // Ошибка отправки
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          submitMessage: {
            type: 'error',
            text: data.message || 'При отправке формы произошла ошибка. Пожалуйста, попробуйте позже.'
          }
        }));
      }
    } catch (error) {
      // Ошибка отправки
      console.error('Form submission error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitMessage: {
          type: 'error',
          text: 'При отправке формы произошла ошибка. Пожалуйста, попробуйте позже.'
        }
      }));
    }
  };
  
  // Сбрасываем сообщение об успешной отправке через некоторое время
  useEffect(() => {
    if (formState.submitMessage?.type === 'success') {
      const timer = setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          submitMessage: null
        }));
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [formState.submitMessage]);
  
  return (
    <>
      {/* Hero section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Связаться с нами</h1>
            <p className="text-xl text-light-gray mb-6">
              Свяжитесь с нашей командой, чтобы обсудить ваши потребности в автоматизации и как мы можем помочь оптимизировать ваши бизнес-процессы.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Отправить сообщение</h2>
              
              {/* Form status message */}
              {formState.submitMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 mb-6 rounded-lg ${
                    formState.submitMessage.type === 'success' 
                      ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-200 border border-red-500/30'
                  }`}
                >
                  {formState.submitMessage.text}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput
                    id="name"
                    name="name"
                    label="Ваше имя"
                    value={formData.name}
                    onChange={(e) => handleChange('name')(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Иван Иванов"
                    error={formState.errors.name || ''}
                    touched={!!formState.touched.name}
                    required
                    validators={formValidators.name}
                  />
                  
                  <FormInput
                    id="email"
                    name="email"
                    label="Email адрес"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email')(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="your@email.com"
                    error={formState.errors.email || ''}
                    touched={!!formState.touched.email}
                    required
                    validators={formValidators.email}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput
                    id="company"
                    name="company"
                    label="Название компании"
                    value={formData.company}
                    onChange={(e) => handleChange('company')(e.target.value)}
                    onBlur={() => handleBlur('company')}
                    placeholder="Ваша компания"
                  />
                  
                  <FormInput
                    id="phone"
                    name="phone"
                    label="Номер телефона"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone')(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="+7 (___) ___-__-__"
                    error={formState.errors.phone || ''}
                    touched={!!formState.touched.phone}
                    validators={formValidators.phone}
                  />
                </div>
                
                <div className="mb-4">
                  <FormSelect
                    id="interest"
                    name="interest"
                    label="Что вас интересует?"
                    value={formData.interest}
                    onChange={(e) => handleChange('interest')(e.target.value)}
                    options={interestOptions}
                  />
                </div>
                
                <div className="mb-6">
                  <FormInput
                    id="message"
                    name="message"
                    label="Ваше сообщение"
                    type="textarea"
                    value={formData.message}
                    onChange={(e) => handleChange('message')(e.target.value)}
                    onBlur={() => handleBlur('message')}
                    rows={5}
                    placeholder="Пожалуйста, поделитесь деталями вашего проекта или запроса, чтобы мы могли лучше подготовиться к звонку с вами!"
                    error={formState.errors.message || ''}
                    touched={!!formState.touched.message}
                    required
                    validators={formValidators.message}
                  />
                </div>
                
                <LoadingButton 
                  type="submit" 
                  isLoading={formState.isSubmitting}
                  loadingText="Отправка..."
                  className="w-full md:w-auto min-w-40"
                >
                  Отправить сообщение
                </LoadingButton>
              </form>
            </div>
            
            {/* Calendly Integration */}
            <div>
              {/* Embedded Calendly */}
              <div className="bg-dark-gray rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Бесплатная консультация</h3>
                <p className="text-light-gray mb-4">
                  Запланируйте 30-минутный звонок с нашим экспертом по автоматизации, чтобы обсудить ваши потребности и как мы можем помочь оптимизировать ваши бизнес-процессы.
                </p>
                <div className="mt-6 overflow-hidden rounded-lg border border-medium-gray">
                  <CalendlyWidget 
                    url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-username/30min"}
                    styles={{
                      height: "650px",
                      width: "100%"
                    }}
                    prefill={{
                      name: formData.name,
                      email: formData.email
                    }}
                  />
                </div>
                
                <p className="text-xs text-light-gray mt-2 text-center">
                  Работает на Calendly
                </p>
              </div>
              
              {/* Additional Contact Information */}
              <div className="bg-dark-gray rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Контактная информация</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-light-gray">hello@78.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Рабочие часы</h4>
                    <p className="text-light-gray">Мы работаем в разных часовых поясах</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Языки</h4>
                    <p className="text-light-gray">Английский, Украинский, Русский</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Как быстро вы можете внедрить решение?</h3>
              <p className="text-light-gray">Большинство наших решений по автоматизации можно внедрить в течение 2-4 недель, в зависимости от сложности. Мы предоставим подробный график во время нашей первоначальной консультации.</p>
            </motion.div>
            
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Работаете ли вы с клиентами из других стран?</h3>
              <p className="text-light-gray">Да, мы работаем с клиентами из США, Европы, Австралии и Японии. Наша команда работает в разных часовых поясах, чтобы обеспечить удобную поддержку.</p>
            </motion.div>
            
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Какая у вас модель ценообразования?</h3>
              <p className="text-light-gray">Наше ценообразование зависит от объема и сложности вашего проекта. Мы предлагаем как проекты с фиксированной ценой, так и ежемесячные платежи для постоянной поддержки и обслуживания.</p>
            </motion.div>
            
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Проводите ли вы обучение для нашей команды?</h3>
              <p className="text-light-gray">Абсолютно! Мы предоставляем комплексное обучение, чтобы ваша команда могла эффективно использовать и поддерживать автоматизированные системы, которые мы внедряем.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}