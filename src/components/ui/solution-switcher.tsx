// src/components/ui/solution-switcher.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { Icon } from './icons/icon';

interface SolutionTab {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface SolutionSwitcherProps {
  tabs: SolutionTab[];
  defaultTab?: string;
  className?: string;
  onTabChange?: (tab: SolutionTab) => void;
}

export default function SolutionSwitcher({
  tabs,
  defaultTab,
  className,
  onTabChange
}: SolutionSwitcherProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем размер экрана при монтировании и ресайзе
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Проверяем размер при монтировании
    checkScreenSize();
    
    // Добавляем обработчик ресайза
    window.addEventListener('resize', checkScreenSize);
    
    // Очищаем обработчик при размонтировании
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleTabChange = (tab: SolutionTab) => {
    setActiveTab(tab.id);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Функция для рендеринга содержимого вкладки
  const renderTabContent = (tab: SolutionTab) => (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: activeTab === tab.id ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`${activeTab === tab.id ? "block" : "hidden"}`}
    >
      <p className="text-light-gray">{tab.description}</p>
    </motion.div>
  );

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Мобильная версия - дропдаун */}
      {isMobile && (
        <div className="relative mb-6">
          <select
            value={activeTab}
            onChange={(e) => {
              const selectedTab = tabs.find(tab => tab.id === e.target.value);
              if (selectedTab) handleTabChange(selectedTab);
            }}
            className="w-full bg-dark-gray border border-medium-gray rounded-lg py-3 px-4 text-white appearance-none"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Десктопная версия - табы */}
      {!isMobile && (
        <div className="flex flex-wrap mb-8 border-b border-medium-gray overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={cn(
                "flex items-center px-6 py-4 transition-all duration-300 focus:outline-none whitespace-nowrap",
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary -mb-[2px]"
                  : "text-light-gray hover:text-white"
              )}
            >
              <Icon name={tab.icon as any} className="mr-2 h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Содержимое активной вкладки */}
      <div className="mt-4">
        {tabs.map(renderTabContent)}
      </div>
    </div>
  );
}