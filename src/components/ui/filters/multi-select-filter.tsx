import React, { useState, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { GlowEffect } from '@/components/ui/animations/glow-effect';

interface MultiSelectOption {
  id: string;
  name: string;
}

interface MultiSelectFilterProps {
  label: string;
  options: MultiSelectOption[];
  selectedOptions: string[];
  placeholder?: string;
  onChange: (selected: string[]) => void;
}

export const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  label,
  options,
  selectedOptions,
  placeholder = 'Select options',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Закрытие выпадающего меню при клике вне компонента
  useClickOutside(dropdownRef, () => setIsOpen(false));
  
  // Обработчики событий
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (optionId: string) => {
    const newSelected = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    
    onChange(newSelected);
  };
  
  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map(option => option.id));
    }
  };
  
  // Отображение выбранных опций
  const selectedText = selectedOptions.length === 0
    ? placeholder
    : selectedOptions.length === 1
      ? options.find(option => option.id === selectedOptions[0])?.name
      : `${selectedOptions.length} selected`;
  
  return (
    <div className="multi-select-filter" ref={dropdownRef}>
      <label className="multi-select-label">{label}</label>
      
      <GlowEffect color="primary" intensity={0.7}>
        <div
          className={`multi-select-header ${isOpen ? 'active' : ''}`}
          onClick={toggleDropdown}
        >
          <span className="selected-text">{selectedText}</span>
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
      </GlowEffect>
      
      {isOpen && (
        <div className="multi-select-dropdown backdrop-blur-md bg-dark-deeper/70 border border-primary/20">
          <div className="select-all-option hover:bg-primary/10 transition-all duration-300" onClick={handleSelectAll}>
            <input
              type="checkbox"
              checked={
                selectedOptions.length > 0 &&
                selectedOptions.length === options.length
              }
              readOnly
              className="accent-primary"
            />
            <span>All {options.length > 0 && `(${options.length})`}</span>
          </div>
          
          <div className="multi-select-options">
            {options.map((option) => (
              <div
                key={option.id}
                className={`multi-select-option hover:bg-primary/10 transition-all duration-300 ${
                  selectedOptions.includes(option.id) ? 'selected bg-primary/20' : ''
                }`}
                onClick={() => handleOptionClick(option.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.id)}
                  readOnly
                  className="accent-primary"
                />
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};