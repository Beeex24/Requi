import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // カワイイパステルカラーパレット
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        secondary: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#ffccc7',
          300: '#fda4a0',
          400: '#fa7970',
          500: '#f15950',
          600: '#de3730',
          700: '#bb2a26',
          800: '#9b2422',
          900: '#812321',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        pastel: {
          pink: '#FFE5EC',
          purple: '#E8D5FF',
          blue: '#D5E8FF',
          mint: '#D5FFE8',
          yellow: '#FFF8D5',
          peach: '#FFE8D5',
        },
        kawaii: {
          sakura: '#FFB7C5',
          lavender: '#C8B6FF',
          sky: '#B6E0FF',
          mint: '#B6FFE0',
          lemon: '#FFEB99',
          coral: '#FFB299',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans JP',
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Meiryo',
          'sans-serif'
        ],
        display: [
          'Plus Jakarta Sans',
          'Noto Sans JP',
          'sans-serif'
        ],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.95)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'kawaii-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'pastel-gradient': 'linear-gradient(135deg, #FFE5EC 0%, #E8D5FF 50%, #D5E8FF 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FFB7C5 0%, #FFB299 100%)',
      },
      boxShadow: {
        'kawaii': '0 4px 6px -1px rgba(255, 183, 197, 0.3), 0 2px 4px -1px rgba(255, 183, 197, 0.2)',
        'kawaii-lg': '0 10px 15px -3px rgba(255, 183, 197, 0.3), 0 4px 6px -2px rgba(255, 183, 197, 0.2)',
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'kawaii': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config