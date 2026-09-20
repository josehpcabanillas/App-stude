/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // Primary indigo
          700: '#4338ca', // Deep indigo
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        electric: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb', // Secondary electric blue
          700: '#1d4ed8',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        },
        appText: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        }
      },
      borderRadius: {
        'card': '1.25rem', // 20px
        'button': '1rem',  // 16px
        'input': '0.875rem' // 14px
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(15, 23, 42, 0.05), 0 4px 20px -4px rgba(15, 23, 42, 0.04)',
        'elevated': '0 8px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'glow-primary': '0 0 20px -3px rgba(79, 70, 229, 0.35)',
        'glow-green': '0 0 20px -3px rgba(16, 185, 129, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
