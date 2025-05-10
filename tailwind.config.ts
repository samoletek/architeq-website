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
        // Улучшенные тени с более сильным свечением
        'neon-glow': '0 0 10px rgba(119, 71, 207, 0.6), 0 0 30px rgba(119, 71, 207, 0.4)',
        'neon-glow-intense': '0 0 15px rgba(119, 71, 207, 0.7), 0 0 40px rgba(119, 71, 207, 0.5), 0 0 80px rgba(119, 71, 207, 0.2)',
        'neon-green-glow': '0 0 10px rgba(176, 255, 116, 0.6), 0 0 30px rgba(176, 255, 116, 0.4)',
        'neon-green-glow-intense': '0 0 15px rgba(176, 255, 116, 0.7), 0 0 40px rgba(176, 255, 116, 0.5), 0 0 80px rgba(176, 255, 116, 0.2)',
        'white-glow': '0 0 10px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
        'white-glow-intense': '0 0 15px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.2)',
        'accent-glow': '0 0 10px rgba(77, 173, 255, 0.6), 0 0 30px rgba(77, 173, 255, 0.4)',
      },
      // Добавляем текстовые тени для эффекта свечения текста
      textShadow: {
        'white': '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
        'white-soft': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 45px rgba(255, 255, 255, 0.2)',
        'green': '0 0 10px rgba(176, 255, 116, 0.8), 0 0 20px rgba(176, 255, 116, 0.6), 0 0 30px rgba(176, 255, 116, 0.4)',
        'green-soft': '0 0 5px rgba(176, 255, 116, 0.5), 0 0 15px rgba(176, 255, 116, 0.4), 0 0 30px rgba(176, 255, 116, 0.3), 0 0 45px rgba(176, 255, 116, 0.2)',
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
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      // Добавляем явную типизацию для textShadows
      const textShadows = theme('textShadow') as Record<string, string>;
      const utilities: Record<string, { textShadow: string }> = {};
      
      Object.entries(textShadows).forEach(([key, value]) => {
        utilities[`text-shadow-${key}`] = {
          textShadow: value as string,
        };
      });
      
      addUtilities(utilities);
    }),
  ],
}

export default config