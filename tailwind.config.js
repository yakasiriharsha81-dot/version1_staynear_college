/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1677FF',
          hover: '#0f62d8',
          light: '#EEF6FF',
          dark: '#102A56',
        },
        navy: {
          DEFAULT: '#102A56',
          900: '#0B1C3B',
          800: '#102A56',
          700: '#16386E',
          600: '#1F4C91',
        },
        cyan: {
          DEFAULT: '#4CC9F0',
          light: '#E0F7FE',
        },
        success: {
          DEFAULT: '#22C55E',
          light: '#DCFCE7',
          dark: '#15803D',
        },
        surface: {
          DEFAULT: '#F8FBFF',
          card: '#FFFFFF',
          muted: '#F1F5F9',
        },
        brand: {
          50: '#EEF6FF',
          100: '#DBECFE',
          200: '#B9DBFE',
          300: '#84C0FD',
          400: '#469DFB',
          500: '#1677FF',
          600: '#0F62D8',
          700: '#0B4DB3',
          800: '#0E4091',
          900: '#102A56',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '18': '18px',
        '20': '20px',
        '24': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(16, 42, 86, 0.05)',
        'card': '0 10px 30px -4px rgba(16, 42, 86, 0.08)',
        'floating': '0 20px 40px -10px rgba(16, 42, 86, 0.12)',
        'elevated': '0 14px 34px -6px rgba(22, 119, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
