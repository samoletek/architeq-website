export interface GradientConfig {
    type: 'linear' | 'radial';
    direction?: string;
    colors: string[];
    stops?: number[];
  }
  
  export const generateGradient = (config: GradientConfig): string => {
    const { type, direction = '45deg', colors, stops } = config;
  
    if (type === 'linear') {
      let gradient = `linear-gradient(${direction}, `;
      
      colors.forEach((color, index) => {
        gradient += `${color}`;
        if (stops && stops[index] !== undefined) {
          gradient += ` ${stops[index]}%`;
        }
        if (index < colors.length - 1) {
          gradient += ', ';
        }
      });
      
      gradient += ')';
      return gradient;
    }
  
    if (type === 'radial') {
      let gradient = `radial-gradient(circle, `;
      
      colors.forEach((color, index) => {
        gradient += `${color}`;
        if (stops && stops[index] !== undefined) {
          gradient += ` ${stops[index]}%`;
        }
        if (index < colors.length - 1) {
          gradient += ', ';
        }
      });
      
      gradient += ')';
      return gradient;
    }
  
    return '';
  };
  
  // Предопределенные градиенты
  export const predefinedGradients = {
    primaryGlow: {
      type: 'radial' as const,
      colors: ['#B24BF3', 'transparent'],
      stops: [0, 70],
    },
    purpleBlue: {
      type: 'linear' as const,
      direction: '135deg',
      colors: ['#B24BF3', '#4A9DFF'],
    },
    blueGreen: {
      type: 'linear' as const,
      direction: '135deg',
      colors: ['#4A9DFF', '#B0FF74'],
    },
    rosePurple: {
      type: 'linear' as const,
      direction: '135deg',
      colors: ['#FF5C87', '#B24BF3'],
    },
    darkGradient: {
      type: 'linear' as const,
      direction: '135deg',
      colors: ['#121212', '#180033'],
    },
  };