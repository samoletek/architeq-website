import React from 'react';

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 4,
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
      
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
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