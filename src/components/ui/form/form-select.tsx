import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
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
      
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-dark-deeper border rounded-lg px-4 py-3 text-light appearance-none focus:outline-none focus:ring-2 transition-all duration-200 ${
            error 
              ? 'border-accent focus:ring-accent/30' 
              : 'border-light/10 focus:border-primary/50 focus:ring-primary/20'
          }`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-light-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="text-accent text-sm mt-1">{error}</p>
      )}
    </div>
  );
};