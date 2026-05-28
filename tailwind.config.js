/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Основные шрифты из твоего проекта
        kyivsans: ['KyivSans', 'sans-serif'],
        bonanova: ['BonaNova', 'serif'],
        lexend: ['Lexend', 'sans-serif'],
        
        // Запасные варианты
        sans: ['KyivSans', 'system-ui', 'sans-serif'],
        serif: ['BonaNova', 'Georgia', 'serif'],
      },
      fontWeight: {
        // Если используешь переменные шрифты (variable fonts)
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      animation: {
          'fade-in-up': 'fadeInUp 0.8s ease-out',
          'pulse-cart': 'pulseCart 0.5s ease',
          'stamp': 'stamp 0.4s ease-out',
          'steam-1': 'steam 3s infinite',
          'steam-2': 'steam 3s infinite 0.5s',
          'steam-3': 'steam 3s infinite 1s',
          'ripple': 'ripple 0.6s linear',
          'float-point': 'floatPoint 5s infinite ease-in-out',
          'float-up': 'float-up 5s linear infinite',
      },
      keyframes: {
          fadeInUp: {
              '0%': { opacity: '0', transform: 'translateY(40px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
              'float-up': {
                  '0%': { transform: 'translateY(0) scale(1)', opacity: '0.3' },
                  '100%': { transform: 'translateY(-100vh) scale(0.5)', opacity: '0' },
              }
          },
          pulseCart: {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.3)' },
          },
          stamp: {
              '0%': { transform: 'scale(0) rotate(-20deg)', opacity: '0' },
              '60%': { transform: 'scale(1.2) rotate(5deg)', opacity: '1' },
              '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          },
          steam: {
              '0%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
              '100%': { transform: 'translateY(-30px) scale(1.5)', opacity: '0' },
          },
          ripple: {
              '0%': { transform: 'scale(0)', opacity: '1' },
              '100%': { transform: 'scale(20)', opacity: '0' },
          },
          floatPoint: {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.3' },
          '25%': { transform: 'translate(10px, -15px)', opacity: '0.8' },
          '50%': { transform: 'translate(-8px, -25px)', opacity: '0.4' },
          '75%': { transform: 'translate(-12px, -10px)', opacity: '0.7' },
        }
      },
    },
  },
  plugins: [],
}