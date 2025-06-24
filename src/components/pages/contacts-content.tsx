"use client";

import { useState, useEffect, useRef } from 'react';
import { LoadingButton } from '@/components/ui/loading-button';
import { Button } from '@/components/ui/button';
import CalendlyWidget from '@/components/ui/calendly-widget';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { motion } from 'framer-motion';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
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

// Тип для FAQ
interface ContactFAQ {
  question: string;
  answer: string;
}

// Данные FAQ для контактной страницы
const contactFaqs: ContactFAQ[] = [
  {
    question: "How quickly can you implement a solution?",
    answer: "Most of our automation solutions can be implemented within 2-4 weeks, depending on complexity. We start with a discovery phase to understand your needs, then design and deploy your custom solution with full testing and training included."
  },
  {
    question: "Which countries are your clients from?",
    answer: "We work with clients globally, including USA, Europe, Australia, and Japan. Our team operates across different time zones to provide convenient support. We've successfully delivered projects for companies ranging from startups to enterprise-level organizations."
  },
  {
    question: "What is your pricing model?",
    answer: "Our pricing is transparent and tailored to your needs. We offer both fixed-price projects for defined scopes and flexible monthly retainers for ongoing support. Every project starts with a free consultation to provide you with a detailed proposal and timeline."
  },
  {
    question: "Do you provide training for our team?",
    answer: "Absolutely! Comprehensive training is included with every implementation. We provide hands-on training sessions, detailed documentation, and ongoing support to ensure your team can effectively use and maintain the automated systems we build for you."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We work across various industries including professional services, e-commerce, healthcare, finance, and manufacturing. Our automation solutions are customized to meet the specific regulatory requirements and workflows of your industry."
  },
  {
    question: "Do you offer ongoing support after implementation?",
    answer: "Yes, we provide comprehensive post-implementation support including system monitoring, regular updates, troubleshooting, and feature enhancements. Our support packages are designed to ensure your automation continues to deliver value as your business grows."
  }
];

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
  phone: [isPhone('Enter a valid phone number')], // Поле необязательное, валидатор допускает пустые значения
};

// Интерактивная FAQ секция для контактной страницы
function ContactFAQSection() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simple intersection observer for animations only
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Auto-carousel
  useEffect(() => {
    const autoInterval = setInterval(() => {
      setActiveQuestion(prev => (prev + 1) % contactFaqs.length);
    }, 5000);

    return () => clearInterval(autoInterval);
  }, []);

  const handleQuestionClick = (index: number) => {
    setActiveQuestion(index);
  };

  // Function for calculating card position and transformation
  const getCardTransform = (index: number) => {
    const diff = index - activeQuestion;
    let normalizedDiff = diff;
    
    if (diff > contactFaqs.length / 2) {
      normalizedDiff = diff - contactFaqs.length;
    } else if (diff < -contactFaqs.length / 2) {
      normalizedDiff = diff + contactFaqs.length;
    }
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateY(0%) scale(1) rotateX(0deg)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (normalizedDiff === -1) {
      return {
        transform: 'translateY(-65%) scale(0.85) rotateX(8deg)',
        opacity: 0.65,
        zIndex: 5,
      };
    } else if (normalizedDiff === 1) {
      return {
        transform: 'translateY(65%) scale(0.85) rotateX(-8deg)',
        opacity: 0.65,
        zIndex: 5,
      };
    } else {
      return {
        transform: normalizedDiff < 0 
          ? 'translateY(-140%) scale(0.7) rotateX(20deg)'
          : 'translateY(140%) scale(0.7) rotateX(-20deg)',
        opacity: 0,
        zIndex: 1,
      };
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.05
      }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-dark-gray relative overflow-hidden py-16"
      style={{ minHeight: '100vh' }}
    >
      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Frequently Asked Questions
          </h2>
          <p className="text-light-gray text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Get answers to common questions about our automation services and process
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center h-full">
            
            <div className="lg:col-span-1 flex justify-center">
              <div className="w-full">
                <div className="space-y-2">
                  {contactFaqs.map((faq, index) => (
                    <motion.button
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      variants={navVariants}
                      onClick={() => handleQuestionClick(index)}
                      className={`
                        w-full text-left p-4 rounded-lg transition-all duration-300 border text-sm
                        ${activeQuestion === index
                          ? 'bg-primary/10 border-primary/30 text-white shadow-lg'
                          : 'bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 transition-all duration-300
                          ${activeQuestion === index
                            ? 'bg-primary text-white'
                            : 'bg-white/10 text-white/60'
                          }
                        `}>
                          {index + 1}
                        </div>
                        <span className="font-medium">
                          {faq.question}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="relative w-full" style={{ height: '400px' }}>
                <div className="relative h-full perspective-1000">
                  {contactFaqs.map((faq, index) => {
                    const transform = getCardTransform(index);
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute w-full"
                        style={{
                          top: '50%',
                          transform: 'translateY(-50%)',
                          height: '300px',
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden'
                        }}
                        animate={transform}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                          type: "tween"
                        }}
                      >
                        {activeQuestion === index && (
                          <motion.div
                            className="absolute -inset-6 bg-gradient-to-br from-[#2A1A3E] via-[#1F0F2E] to-[#1A0B26] rounded-2xl -z-10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1
                            }}
                            transition={{
                              opacity: { duration: 0.4 },
                              scale: { duration: 0.4 }
                            }}
                            style={{
                              boxShadow: '0 0 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(119, 71, 207, 0.25)'
                            }}
                          />
                        )}
                        
                        <div className="bg-gradient-to-br from-[#2A1A3E] via-[#1F0F2E] to-[#1A0B26] backdrop-blur-sm 
                          rounded-2xl p-8 md:p-10 h-full transition-all duration-500 flex flex-col"
                          style={{ justifyContent: 'space-between', paddingTop: '3rem', paddingBottom: '3rem' }}>
                          
                          <div className="flex-1">
                            <motion.h3 
                              className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-white"
                              style={{
                                textShadow: activeQuestion === index 
                                  ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)' 
                                  : 'none'
                              }}
                            >
                              {faq.question}
                            </motion.h3>

                            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>

                          {activeQuestion === index && (
                            <motion.div
                              className="mt-8 pt-6 border-t border-primary/20"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-secondary text-sm font-medium">
                                  <div className="w-2 h-2 rounded-full bg-secondary mr-3 animate-pulse"></div>
                                  Ready to get started?
                                </div>
                                <button 
                                  onClick={() => {
                                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
                                >
                                  Contact us now →
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-20">
                  {contactFaqs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeQuestion === index 
                          ? 'bg-secondary shadow-lg' 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    // Специальная обработка для телефона - форматирование по мере ввода
    if (name === 'phone' && value) {
      try {
        // Попытка распарсить телефонный номер
        const phoneNumber = parsePhoneNumberFromString(value);
        
        // Если номер валидный, используем его отформатированную версию
        if (phoneNumber && phoneNumber.isValid()) {
          // Форматируем номер в международном формате
          value = phoneNumber.formatInternational();
        }
      } catch (err) {
        // Если произошла ошибка при парсинге, просто используем исходное значение
        console.log('Phone parsing error:', err);
      }
    }
    
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
    
    // Если есть ошибка на телефоне, но поле пустое, удаляем ошибку
    // Это дополнительная защита, чтобы поле точно считалось необязательным
    if (errors.phone && (!formData.phone || formData.phone.trim() === '')) {
      delete errors.phone;
    }
    
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
    
    // Проверяем только обязательные поля
    return !errors.name && !errors.email && !errors.message;
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
      <section className="section-hero bg-dark-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div data-animate="fade-up">
              <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing"
                  style={{
                    textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(178,75,243,0.5)'
                  }}>
                Get in Touch
              </h1>
              <p className="hero-subtitle text-light-gray max-w-3xl mx-auto section-subtitle-medium section-button-spacing">
                Ready to transform your business operations? Let&apos;s discuss how our automation solutions can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center button-gap-large">
                <Button variant="secondary" size="lg" href="#contact-form">
                  Start Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Calendly */}
      <section className="pt-2 pb-48 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form & Info */}
            <div>
              <h2 className="section-title-medium font-bold section-title-spacing pb-12">Send Message</h2>
              
              {/* Form status message */}
              {formState.submitMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-6 mb-6 rounded-lg ${
                    formState.submitMessage.type === 'success' 
                      ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-200 border border-red-500/30'
                  }`}
                >
                  {formState.submitMessage.text}
                </motion.div>
              )}
              
              <form id="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
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
                
                <div className="mb-10">
                  <FormSelect
                    id="interest"
                    name="interest"
                    label="What Are You Interested In?"
                    value={formData.interest}
                    onChange={(e) => handleChange('interest')(e.target.value)}
                    options={interestOptions}
                  />
                </div>
                
                <div className="mb-10">
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
              
              {/* Contact Information */}
              <div className="mt-29">
                <div className="bg-[#12071A]/80 rounded-lg p-11 space-y-12">
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-light-gray">hi@architeq.io</p>
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
            
            {/* Calendly Widget - увеличен размер */}
            <div>
              <div className="bg-[#12071A]/80 rounded-lg p-10">
                <h3 className="section-title-small mb-6 ">Schedule a Call</h3>
                <p className="text-light-gray mb-4">
                  Schedule a 30-minute call with our founder.
                </p>
                <div className="mt-10 overflow-hidden rounded-lg border border-medium-gray">
                  <CalendlyWidget 
                    url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-username/30min"}
                    styles={{
                      height: "750px",
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
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive FAQ Section */}
      <ContactFAQSection />
    </>
  );
}