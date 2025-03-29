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
  { value: 'General Inquiry', label: 'General Inquiry' },
  { value: 'Business Process Automation', label: 'Business Process Automation' },
  { value: 'CRM Integration', label: 'CRM Integration' },
  { value: 'Industry-Specific Solution', label: 'Industry-Specific Solution' },
  { value: 'AI Solution', label: 'AI Solution' },
  { value: 'Documentation & Forms', label: 'Documentation & Forms' },
  { value: 'Financial System Integration', label: 'Financial System Integration' },
];

// Валидаторы для полей формы
const formValidators = {
  name: [required('Enter your name')],
  email: [required('Enter your email'), isEmail('Enter a valid email')],
  message: [required('Message is required')],
  phone: [isPhone('Enter a valid phone number')],
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
          text: 'Please correct the errors in the form before submitting.'
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
            text: 'Thank you! Your message has been sent successfully. We will contact you shortly.'
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
            text: data.message || 'An error occurred while submitting the form. Please try again later.'
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
          text: 'An error occurred while submitting the form. Please try again later.'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-light-gray mb-6">
              Get in touch with us today to discuss your automation needs and how we can help optimize your business processes.
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
              <h2 className="text-2xl font-bold mb-6">Send Message</h2>
              
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
                    label="Your Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name')(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="John Doe"
                    error={formState.errors.name || ''}
                    touched={!!formState.touched.name}
                    required
                    validators={formValidators.name}
                  />
                  
                  <FormInput
                    id="email"
                    name="email"
                    label="Email Address"
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
                    label="Company Name"
                    value={formData.company}
                    onChange={(e) => handleChange('company')(e.target.value)}
                    onBlur={() => handleBlur('company')}
                    placeholder="Your Company"
                  />
                  
                  <FormInput
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone')(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="+1 (___) ___-____"
                    error={formState.errors.phone || ''}
                    touched={!!formState.touched.phone}
                    validators={formValidators.phone}
                  />
                </div>
                
                <div className="mb-4">
                  <FormSelect
                    id="interest"
                    name="interest"
                    label="What Are You Interested In?"
                    value={formData.interest}
                    onChange={(e) => handleChange('interest')(e.target.value)}
                    options={interestOptions}
                  />
                </div>
                
                <div className="mb-6">
                  <FormInput
                    id="message"
                    name="message"
                    label="Your Message"
                    type="textarea"
                    value={formData.message}
                    onChange={(e) => handleChange('message')(e.target.value)}
                    onBlur={() => handleBlur('message')}
                    rows={5}
                    placeholder="Please share details about your project or inquiry so we can better prepare for our call with you!"
                    error={formState.errors.message || ''}
                    touched={!!formState.touched.message}
                    required
                    validators={formValidators.message}
                  />
                </div>
                
                <LoadingButton 
                  type="submit" 
                  isLoading={formState.isSubmitting}
                  loadingText="Sending..."
                  className="w-full md:w-auto min-w-40"
                >
                  Send Message
                </LoadingButton>
              </form>
            </div>
            
            {/* Calendly Integration */}
            <div>
              {/* Embedded Calendly */}
              <div className="bg-dark-gray rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Free Consultation</h3>
                <p className="text-light-gray mb-4">
                  Schedule a 30-minute call with our automation expert to discuss your needs and how we can help optimize your business processes.
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
                  Powered by Calendly
                </p>
              </div>
              
              {/* Additional Contact Information */}
              <div className="bg-dark-gray rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-light-gray">hello@78.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Working Hours</h4>
                    <p className="text-light-gray">We work across different time zones</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Languages</h4>
                    <p className="text-light-gray">English, Ukrainian, Russian</p>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">How quickly can you implement a solution?</h3>
              <p className="text-light-gray">Most of our automation solutions can be implemented within 2-4 weeks, depending on complexity. We'll provide a detailed timeline during our initial consultation.</p>
            </motion.div>
            
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Which countries are your clients from?</h3>
              <p className="text-light-gray">We work with clients from the USA, Europe, Australia, and Japan. Our team operates across different time zones to provide convenient support for your business.</p>
            </motion.div>
            
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">What is your pricing model?</h3>
              <p className="text-light-gray">Our pricing depends on the scope and complexity of your project. We offer both fixed-price projects and monthly payments for ongoing support and maintenance.</p>
            </motion.div>
            
            <motion.div 
              className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Do you provide training for our team?</h3>
              <p className="text-light-gray">Absolutely! We provide comprehensive training to ensure your team can effectively use and maintain the automated systems we implement.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}