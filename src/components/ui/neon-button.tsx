"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function NeonButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [stage, setStage] = useState(0); // 0 - выключен, 1 - мерцает, 2 - горит

  useEffect(() => {
    // Последовательность включения
    const timers: NodeJS.Timeout[] = [];
    
    // Выключен 0.5 секунды
    timers.push(setTimeout(() => setStage(1), 500));
    // Мерцает 1.5 секунды  
    timers.push(setTimeout(() => setStage(2), 2000));
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <Link 
      href={href} 
      className={`
        inline-block px-8 py-4 rounded-lg font-bold text-lg
        border-2 transition-all duration-300
        ${stage === 0 ? 'border-gray-600 text-gray-600' : ''}
        ${stage === 1 ? 'neon-flicker' : ''}
        ${stage === 2 ? 'neon-on' : ''}
      `}
    >
      {children}
    </Link>
  );
}