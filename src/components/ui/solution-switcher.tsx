// src/components/ui/solution-switcher.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { Icon, IconName } from './icons/icon';
import { useDeviceDetection } from '@/lib/utils/device-detection';

export interface SolutionTab {
  id: string;
  label: string;
  description: string;
  icon: IconName;
  disabled?: boolean;
}

interface SolutionSwitcherProps {
  tabs: SolutionTab[];
  defaultTab?: string;
  className?: string;
  onTabChange?: (tab: SolutionTab) => void;
  variant?: 'default' | 'pills' | 'minimal';
  iconSize?: 'sm' | 'md' | 'lg';
  tabsScrollable?: boolean;
  showDescription?: boolean;
}

export function SolutionSwitcher({
  tabs,
  defaultTab,
  className,
  onTabChange,
  variant = 'default',
  iconSize = 'md',
  tabsScrollable = true,
  showDescription = true
}: SolutionSwitcherProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { isMobile, isTablet } = useDeviceDetection();
  
  // Адаптивный интерфейс
  const isMobileView = isMobile || isTablet;
  
  // Получение активного таба
  const getActiveTab = useCallback(() => {
    return tabs.find(tab => tab.id === activeTab) || tabs[0];
  }, [activeTab, tabs]);

  // Обработчик смены таба
  const handleTabChange = useCallback((tab: SolutionTab) => {
    if (tab.disabled) return;
    
    setActiveTab(tab.id);
    setAnimationComplete(false);
    
    if (onTabChange) {
      onTabChange(tab);
    }
  }, [onTabChange]);
  
  // Размер иконки в зависимости от параметра
  const iconSizeClass = {
    'sm': 'h-4 w-4',
    'md': 'h-5 w-5',
    'lg': 'h-6 w-6'
  }[iconSize] || 'h-5 w-5';
  
  // Установка активного таба при загрузке
  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, activeTab]);
  
  // Функция для рендеринга содержимого вкладки
  const renderTabContent = (tab: SolutionTab) => {
    if (!showDescription) return null;
    
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: animationComplete ? 1 : 0, 
            y: animationComplete ? 0 : 10 
          }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => setAnimationComplete(true)}
          className={`${activeTab === tab.id ? "block" : "hidden"}`}
        >
          <p className="text-light-gray">{tab.description}</p>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Выбор мобильной или десктопной версии в зависимости от размера экрана
  if (isMobileView) {
    return (
      <div className={cn("flex flex-col", className)}>
        {/* Мобильная версия - дропдаун */}
        <div className="relative mb-6">
          <select
            value={activeTab}
            onChange={(e) => {
              const selectedTab = tabs.find(tab => tab.id === e.target.value);
              if (selectedTab) handleTabChange(selectedTab);
            }}
            className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:ring-1 focus:ring-primary focus:border-primary"
          >
            {tabs.map((tab) => (
              <option 
                key={tab.id} 
                value={tab.id}
                disabled={tab.disabled}
              >
                {tab.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon name={getActiveTab().icon} className={cn(iconSizeClass, "text-primary")} />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Содержимое активной вкладки */}
        {renderTabContent(getActiveTab())}
      </div>
    );
  }

  // Десктопная версия
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Стили для разных вариантов вкладок */}
      <div className={cn(
        tabsScrollable ? "flex overflow-x-auto space-x-1 pb-2 scrollbar-hide" : "flex flex-wrap",
        variant === 'default' && "border-b border-medium-gray",
        variant === 'pills' && "bg-dark-gray rounded-lg p-1",
        variant === 'minimal' && "mb-4"
      )}>
        {tabs.map((tab) => {
          // Определяем классы для разных вариантов вкладок
          const tabClasses = cn(
            "flex items-center px-6 py-4 transition-all duration-300 focus:outline-none whitespace-nowrap",
            
            // Базовый вариант
            variant === 'default' && cn(
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary -mb-[2px]"
                : "text-light-gray hover:text-white"
            ),
            
            // Вариант с таблетками
            variant === 'pills' && cn(
              "rounded-lg mx-1 first:ml-0 last:mr-0",
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-light-gray hover:bg-medium-gray/30 hover:text-white"
            ),
            
            // Минималистичный вариант
            variant === 'minimal' && cn(
              activeTab === tab.id
                ? "text-primary font-medium"
                : "text-light-gray hover:text-white"
            ),
            
            // Отключенное состояние
            tab.disabled && "opacity-50 cursor-not-allowed hover:text-light-gray"
          );
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={tabClasses}
              disabled={tab.disabled}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <Icon name={tab.icon} className={cn("mr-2", iconSizeClass)} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Содержимое активной вкладки */}
      <div className="mt-4">
        {renderTabContent(getActiveTab())}
      </div>
    </div>
  );
}