// tailwind.config.ts
import type { Config } from 'tailwindcss'

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
        // Main colors
        'site-bg': '#121212',
        'dark-gray': '#1E1E1E',
        'medium-gray': '#333333',
        'light-gray': '#AAAAAA',
        primary: '#FF4500', // Lava orange
        'neon-blue': '#00C8FF',
        'neon-purple': '#FF00FF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
        heading: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'neon-glow': '0 0 5px rgba(255, 69, 0, 0.5), 0 0 20px rgba(255, 69, 0, 0.3)',
        'neon-blue-glow': '0 0 5px rgba(0, 200, 255, 0.5), 0 0 20px rgba(0, 200, 255, 0.3)',
        'neon-purple-glow': '0 0 5px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #FF4500 0%, #FF8C00 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #00C8FF 0%, #FF00FF 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1E1E1E 0%, #121212 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config