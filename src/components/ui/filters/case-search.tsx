import React, { useState } from 'react';
import { Icon } from '@/components/ui/icons/icon';

interface CaseSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CaseSearch: React.FC<CaseSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search case studies...',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
    >
      <div className={`flex items-center rounded-md border transition-all duration-300 
        ${isFocused 
          ? 'border-primary bg-dark-deeper shadow-glow-xs' 
          : 'border-gray-700 bg-dark hover:border-primary/50'
        }`}
      >
        <Icon 
          name="search" 
          className={`ml-4 text-light-muted w-5 h-5 transition-colors ${isFocused ? 'text-primary' : ''}`} 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-2 bg-transparent text-white placeholder-light-muted focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="mr-4 text-light-muted hover:text-white transition-colors"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CaseSearch;