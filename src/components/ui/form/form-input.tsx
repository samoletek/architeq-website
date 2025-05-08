import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  error,
  className = '',
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label
        htmlFor={name}
        className="block text-light font-medium mb-2"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-dark-deeper border rounded-lg px-4 py-3 text-light placeholder-light-muted/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
          error 
            ? 'border-accent focus:ring-accent/30' 
            : 'border-light/10 focus:border-primary/50 focus:ring-primary/20'
        }`}
      />
      
      {error && (
        <p className="text-accent text-sm mt-1">{error}</p>
      )}
    </div>
  );
};