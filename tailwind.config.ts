// tailwind.config.ts
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Основные цвета
        'site-bg': '#121212',                // Основной фон (графитовый)
        'site-bg-deep': '#180033',           // Глубокий фиолетовый фон
        'footer-bg': '#1A0040',              // Темно-синий для футера
        'dark-purple': '#200040',            // Темно-пурпурный
        'medium-gray': '#333333',
        'light-gray': '#AAAAAA',
        
        primary: '#7747CF',                 // Фиолетовый
        secondary: '#B0FF74',               // Неоново-зеленый
        
        // Дополнительные акценты
        'accent-blue': '#4DADFF',
        'accent-coral': '#B0FF74',          // Заменен с #FF6B8B на зеленый
        'accent-teal': '#00F5D4',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
        heading: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        // Базовые тени
        'soft': '0 2px 10px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.15), 0 8px 30px rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 40px rgba(0, 0, 0, 0.2), 0 20px 60px rgba(0, 0, 0, 0.15)',
        
        // Неоновые тени
        'neon-glow': '0 0 10px rgba(119, 71, 207, 0.6), 0 0 30px rgba(119, 71, 207, 0.4)',
        'neon-glow-intense': '0 0 15px rgba(119, 71, 207, 0.7), 0 0 40px rgba(119, 71, 207, 0.5), 0 0 80px rgba(119, 71, 207, 0.2)',
        'neon-green-glow': '0 0 10px rgba(176, 255, 116, 0.6), 0 0 30px rgba(176, 255, 116, 0.4)',
        'neon-green-glow-intense': '0 0 15px rgba(176, 255, 116, 0.7), 0 0 40px rgba(176, 255, 116, 0.5), 0 0 80px rgba(176, 255, 116, 0.2)',
        'white-glow': '0 0 10px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
        'white-glow-intense': '0 0 15px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.2)',
        'accent-glow': '0 0 10px rgba(77, 173, 255, 0.6), 0 0 30px rgba(77, 173, 255, 0.4)',
        
        // Многослойные тени для ощущения глубины
        'depth-1': '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12)',
        'depth-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16)',
        'depth-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.22)',
        'depth-4': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2)',
        'depth-5': '0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)',
        
        // Разноцветные неоновые тени
        'neon-blue': '0 0 20px rgba(77, 173, 255, 0.7), 0 0 40px rgba(77, 173, 255, 0.4)',
        'neon-purple': '0 0 20px rgba(178, 75, 243, 0.7), 0 0 40px rgba(178, 75, 243, 0.4)',
        'neon-teal': '0 0 20px rgba(0, 245, 212, 0.7), 0 0 40px rgba(0, 245, 212, 0.4)',
      },
      // Добавляем текстовые тени для эффекта свечения текста
      textShadow: {
        'white': '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
        'white-soft': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 45px rgba(255, 255, 255, 0.2)',
        'green': '0 0 10px rgba(176, 255, 116, 0.8), 0 0 20px rgba(176, 255, 116, 0.6), 0 0 30px rgba(176, 255, 116, 0.4)',
        'green-soft': '0 0 5px rgba(176, 255, 116, 0.5), 0 0 15px rgba(176, 255, 116, 0.4), 0 0 30px rgba(176, 255, 116, 0.3), 0 0 45px rgba(176, 255, 116, 0.2)',
        'primary': '0 0 10px rgba(119, 71, 207, 0.8), 0 0 20px rgba(119, 71, 207, 0.6), 0 0 30px rgba(119, 71, 207, 0.4)',
        'blue': '0 0 10px rgba(77, 173, 255, 0.8), 0 0 20px rgba(77, 173, 255, 0.6), 0 0 30px rgba(77, 173, 255, 0.4)',
      },
      backgroundImage: {
        // Фоновые градиенты
        'main-gradient': 'linear-gradient(135deg, #121212 0%, #180033 100%)',
        'footer-gradient': 'linear-gradient(180deg, #180033 0%, #1A0040 100%)',
        
        // Акцентные градиенты - обновленные
        'primary-gradient': 'linear-gradient(135deg, #7747CF 0%, #4DADFF 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #B0FF74 0%, #00F5D4 100%)',
        
        // Текстовые градиенты
        'green-white-gradient': 'linear-gradient(90deg, #B0FF74 0%, #FFFFFF 100%)',
        'text-primary': 'linear-gradient(90deg, #7747CF 0%, #4DADFF 100%)',
        
        // Радиальные градиенты для эффектов свечения
        'radial-glow-primary': 'radial-gradient(circle, rgba(119, 71, 207, 0.7) 0%, rgba(119, 71, 207, 0) 70%)',
        'radial-glow-secondary': 'radial-gradient(circle, rgba(176, 255, 116, 0.7) 0%, rgba(176, 255, 116, 0) 70%)',
        'radial-glow-blue': 'radial-gradient(circle, rgba(77, 173, 255, 0.7) 0%, rgba(77, 173, 255, 0) 70%)',
        'radial-glow-white': 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)',
      },
      // Анимации для парения
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSmall: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'float-small': 'floatSmall 4s ease-in-out infinite',
        'float-small-slow': 'floatSmall 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      // Добавляем явную типизацию для textShadows
      const textShadows = theme('textShadow') as Record<string, string>;
      const utilities: Record<string, { textShadow: string }> = {};
      
      Object.entries(textShadows).forEach(([key, value]) => {
        utilities[`.text-shadow-${key}`] = {
          textShadow: value as string,
        };
      });
      
      addUtilities(utilities);
      
      // Добавляем утилиты для эффектов глубины
      addUtilities({
        '.perspective': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.transform-gpu': {
          transform: 'translateZ(0)',
        },
      });
    }),
  ],
}

export default config