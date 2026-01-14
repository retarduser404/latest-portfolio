/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#FFFFFF',
      // Semantic color system - Dark Minimal + Soft Neon Green
      primary: '#0B0F0E',      // Main background
      surface: '#0F1513',      // Card/section backgrounds
      border: '#1F2A26',       // Borders and dividers
      accent: '#00FF6A',       // ONLY accent color
      'text-primary': '#E6EDE9',    // Primary text
      'text-secondary': '#9AA5A0',  // Secondary text
      'text-muted': '#5F6B66',      // Muted/disabled text
      
      // Legacy support - all pointing to semantic colors
      gray: {
        100: '#E6EDE9',
        200: '#D1D5D0',
        300: '#B8BDB8',
        400: '#9AA5A0',
        500: '#7A8580',
        600: '#5F6B66',
        700: '#1F2A26',
        800: '#0F1513',
        900: '#0B0F0E',
      },
      dark: {
        900: '#0B0F0E',
        800: '#0F1513',
        700: '#1F2A26',
        600: '#2A3530',
      },
      neon: {
        lime: '#00FF6A',
      },
      green: {
        400: '#00FF6A',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      'focus-ring': '0 0 0 3px rgba(0, 255, 106, 0.1)',
    },
    backgroundImage: {
      'gradient-neon': 'linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(34, 255, 102, 0.05))',
      'gradient-dark': 'linear-gradient(to bottom, rgba(11, 15, 13, 1), rgba(18, 18, 18, 0.9))',
    },
    animation: {
      'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      'float': 'float 3s ease-in-out infinite',
      'slide-in': 'slide-in 0.6s ease-out',
      'fade-in': 'fade-in 0.6s ease-out',
    },
    keyframes: {
      'glow-pulse': {
        '0%, 100%': { boxShadow: '0 0 15px rgba(0, 255, 65, 0.4)' },
        '50%': { boxShadow: '0 0 30px rgba(0, 255, 65, 0.6)' },
      },
      'float': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      'slide-in': {
        '0%': { transform: 'translateX(-100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
  },
  plugins: [],
};
