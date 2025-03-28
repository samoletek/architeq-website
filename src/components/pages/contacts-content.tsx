"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CalendlyWidget from '@/components/ui/calendly-widget';

export default function ContactsContent() {
  // Состояние формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'General Inquiry',
  });
  
  // Состояния валидации
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Состояние отправки и сообщения
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: string, text: string} | null>(null);
  
  // Варианты интересов
  const interestOptions = [
    'General Inquiry',
    'Business Process Automation',
    'CRM Integration',
    'Industry-Specific Solution',
    'AI Solution',
    'Documentation & Forms',
    'Financial System Integration',
  ];
  
  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Если поле было помечено как "тронутое", выполняем валидацию при изменении
    if (touched[name]) {
      validateField(name, value);
    }
  };
  
  // Обработчик события потери фокуса для валидации
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Помечаем поле как "тронутое"
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Валидируем поле
    validateField(name, value);
  };
  
  // Функция валидации отдельного поля
  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Name required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (!value.trim()) {
          errorMessage = 'The message is obligatory for filling in';
        }
        break;
      case 'phone':
        if (value.trim() && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)) {
          errorMessage = 'Please enter the correct phone number';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return !errorMessage;
  };
  
  // Функция валидации всей формы
  const validateForm = () => {
    const nameValid = validateField('name', formData.name);
    const emailValid = validateField('email', formData.email);
    const messageValid = validateField('message', formData.message);
    const phoneValid = validateField('phone', formData.phone);
    
    // Помечаем все поля как "тронутые"
    setTouched({
      name: true,
      email: true,
      message: true,
      phone: true,
      company: true,
      interest: true
    });
    
    return nameValid && emailValid && messageValid && phoneValid;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем валидность формы
    if (!validateForm()) {
      setSubmitMessage({
        type: 'error',
        text: 'Please correct any errors on the form before submitting.'
      });
      return;
    }
    
    // Начинаем отправку
    setIsSubmitting(true);
    setSubmitMessage(null);
    
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
        setSubmitMessage({
          type: 'success',
          text: 'Thank you! Your message has been successfully sent. We will contact you shortly.'
        });
        
        // Сброс формы
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          interest: 'General Inquiry',
        });
        
        // Сброс состояний валидации
        setErrors({});
        setTouched({});
      } else {
        // Ошибка отправки
        setSubmitMessage({
          type: 'error',
          text: data.message || 'An error occurred while submitting the form. Please try again later.'
        });
      }
    } catch (error) {
      // Ошибка отправки
      console.error('Form submission error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'An error occurred while submitting the form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Сбрасываем сообщение об успешной отправке через некоторое время
  useEffect(() => {
    if (submitMessage?.type === 'success') {
      const timer = setTimeout(() => {
        setSubmitMessage(null);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);
  
  return (
    <>
      {/* Hero section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-light-gray mb-6">
              Get in touch with our team to discuss your automation needs and how we can help streamline your business processes.
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
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {/* Form status message */}
              {submitMessage && (
                <div 
                  className={`p-4 mb-6 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-200 border border-red-500/30'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-dark-gray border ${
                        errors.name && touched.name ? 'border-red-500' : 'border-medium-gray'
                      } rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                      placeholder="John Doe"
                      required
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-dark-gray border ${
                        errors.email && touched.email ? 'border-red-500' : 'border-medium-gray'
                      } rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-dark-gray border ${
                        errors.phone && touched.phone ? 'border-red-500' : 'border-medium-gray'
                      } rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                      placeholder="+1 (123) 456-7890"
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="interest" className="block text-sm font-medium mb-2">
                    What are you interested in?
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    {interestOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full bg-dark-gray border ${
                      errors.message && touched.message ? 'border-red-500' : 'border-medium-gray'
                    } rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                    placeholder="Please share the details of your project or inquiry so we can better prepare for the call with you!"
                    required
                  />
                  {errors.message && touched.message && (
                    <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-40"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </Button>
              </form>
            </div>
            
            {/* Calendly Integration */}
            <div>
              {/* Embedded Calendly */}
              <div className="bg-dark-gray rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Book a Free Consultation</h3>
                <p className="text-light-gray mb-4">
                  Schedule a 30-minute call with our automation expert to discuss your needs and how we can help streamline your business processes.
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
                    <p className="text-light-gray">We operate across multiple time zones</p>
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
            <div className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors">
              <h3 className="text-xl font-semibold mb-2">How quickly can you implement a solution?</h3>
              <p className="text-light-gray">Most of our automation solutions can be implemented within 2-4 weeks, depending on complexity. We&apos;ll provide a detailed timeline during our initial consultation.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors">
              <h3 className="text-xl font-semibold mb-2">Do you work with clients internationally?</h3>
              <p className="text-light-gray">Yes, we work with clients across the US, Europe, Australia, and Japan. Our team operates across multiple time zones to provide convenient support.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors">
              <h3 className="text-xl font-semibold mb-2">What is your pricing model?</h3>
              <p className="text-light-gray">Our pricing depends on the scope and complexity of your project. We offer both fixed-price projects and monthly retainers for ongoing support and maintenance.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6 hover:bg-medium-gray/80 transition-colors">
              <h3 className="text-xl font-semibold mb-2">Do you provide training for our team?</h3>
              <p className="text-light-gray">Absolutely! We provide comprehensive training to ensure your team can effectively use and maintain the automated systems we implement.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}