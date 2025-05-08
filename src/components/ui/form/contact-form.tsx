import React, { useState } from 'react';
import { FormInput } from './form-input';
import { FormSelect } from './form-select';
import { FormTextarea } from './form-textarea';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

export const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.interest) {
      newErrors.interest = 'Please select an area of interest';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Здесь будет код для отправки формы
      // Например, fetch('/api/contact', { method: 'POST', body: JSON.stringify(formState) })
      
      // Симуляция отправки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormState({
        name: '',
        email: '',
        company: '',
        phone: '',
        interest: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ form: 'There was an error submitting the form. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const interestOptions = [
    { value: '', label: 'Select an option', disabled: true },
    { value: 'workflow-automation', label: 'Workflow Automation' },
    { value: 'crm-integration', label: 'CRM Integration' },
    { value: 'boxed-solutions', label: 'Boxed Solutions' },
    { value: 'ai-solutions', label: 'AI-Powered Solutions' },
    { value: 'document-automation', label: 'Document Automation' },
    { value: 'finance-automation', label: 'Finance Automation' },
    { value: 'other', label: 'Other' },
  ];
  
  // Если форма успешно отправлена, показываем сообщение об успехе
  if (submitSuccess) {
    return (
      <div className="bg-dark-deeper border border-secondary/30 p-8 rounded-xl">
        <div className="text-secondary text-5xl mb-6">✓</div>
        <h3 className="text-2xl font-bold text-light mb-4">Thank You!</h3>
        <p className="text-light-muted">
          Your message has been sent successfully. We'll get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="mt-6 bg-dark text-light border border-secondary/50 py-2 px-6 rounded-lg hover:bg-secondary hover:text-dark transition-colors duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Your Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          error={errors.name}
        />
        
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
          error={errors.email}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Company"
          name="company"
          value={formState.company}
          onChange={handleChange}
          placeholder="Your company"
        />
        
        <FormInput
          label="Phone (optional)"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder="+1 (123) 456-7890"
        />
      </div>
      
      <FormSelect
        label="Area of Interest"
        name="interest"
        value={formState.interest}
        onChange={handleChange}
        options={interestOptions}
        error={errors.interest}
      />
      
      <FormTextarea
        label="Your Message"
        name="message"
        value={formState.message}
        onChange={handleChange}
        placeholder="Tell us about your project and how we can help"
        rows={5}
        required
        error={errors.message}
      />
      
      {errors.form && (
        <div className="text-accent text-sm mt-4">{errors.form}</div>
      )}
      
      <div className="mt-8">
        <GlowEffect color="primary">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-primary to-blue-accent text-light font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-glow ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </GlowEffect>
      </div>
    </form>
  );
};