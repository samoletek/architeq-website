"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CalendlyWidget from '@/components/ui/calendly-widget';

export default function ContactsPage() {
  // Состояние формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'General Inquiry',
  });
  
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
  };
  
// Обработчик отправки формы
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка обязательных полей
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, заполните все обязательные поля.'
      });
      return;
    }
    
    // Начинаем отправку
    setIsSubmitting(true);
    
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
          text: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
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
      } else {
        // Ошибка отправки
        setSubmitMessage({
          type: 'error',
          text: data.message || 'Произошла ошибка. Пожалуйста, попробуйте позже.'
        });
      }
    } catch (error) {
      // Ошибка отправки
      console.error('Form submission error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
                      ? 'bg-green-500/20 text-green-200' 
                      : 'bg-red-500/20 text-red-200'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
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
                      className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      placeholder="John Doe"
                      required
                    />
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
                      className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      placeholder="your@email.com"
                      required
                    />
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
                      className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      placeholder="+1 (123) 456-7890"
                    />
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
                    rows={5}
                    className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 px-4 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
            
            {/* Calendly Integration */}
            <div>
                {/* Embedded Calendly */}
                <div className="bg-dark-gray rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Book a Free Consultation</h3>
                <p className="text-light-gray mb-4">
                    Schedule a 30-minute call with our automation experts to discuss your needs and how we can help streamline your business processes.
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
                    <p className="text-light-gray">Monday to Friday, 9:00 AM - 6:00 PM</p>
                    <p className="text-light-gray">We operate across multiple time zones</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Languages</h4>
                    <p className="text-light-gray">English, Spanish, German, Japanese</p>
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
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How quickly can you implement a solution?</h3>
              <p className="text-light-gray">Most of our automation solutions can be implemented within 2-4 weeks, depending on complexity. We&apos;ll provide a detailed timeline during our initial consultation.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Do you work with clients internationally?</h3>
              <p className="text-light-gray">Yes, we work with clients across the US, Europe, Australia, and Japan. Our team operates across multiple time zones to provide convenient support.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">What is your pricing model?</h3>
              <p className="text-light-gray">Our pricing depends on the scope and complexity of your project. We offer both fixed-price projects and monthly retainers for ongoing support and maintenance.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Do you provide training for our team?</h3>
              <p className="text-light-gray">Absolutely! We provide comprehensive training to ensure your team can effectively use and maintain the automated systems we implement.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}