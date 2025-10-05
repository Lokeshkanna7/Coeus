/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // All your custom animations are now defined here
      keyframes: {
        // Blinking & Pulsing
        'blink': { '50%': { opacity: '0.2' } },
        'blink-slow': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'glow-pulse-slow': { '0%, 100%': { opacity: '0.1' }, '50%': { opacity: '0.2' } },
        'pulse-slow': { '0%, 100%': { opacity: '0.3', transform: 'scale(1)' }, '50%': { opacity: '0.6', transform: 'scale(1.02)' } },

        // Movement
        'float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg) scale(1.02)' },
          '66%': { transform: 'translateY(4px) rotate(-1deg) scale(0.98)' },
        },
        'bounce-very-slow': { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' } },

        // Rotational / Abstract
        'border-flow-slow': {
          '0%': { opacity: '0.2', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.4', transform: 'scale(1.01) rotate(180deg)' },
          '100%': { opacity: '0.2', transform: 'scale(1) rotate(360deg)' },
        },
        'orbit-slow': {
          '0%': { transform: 'rotate(0deg) translateX(90px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(90px) rotate(-360deg)' },
        },
        'shine-slow': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        // Link keyframes to animation classes
        'blink': 'blink 1.5s infinite',
        'blink-slow': 'blink-slow 2s ease-in-out infinite',
        'glow-pulse-slow': 'glowPulse-slow 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'bounce-very-slow': 'bounce-very-slow 4s ease-in-out infinite',
        'border-flow-slow': 'borderFlow-slow 8s linear infinite',
        'orbit-slow': 'orbit-slow 8s linear infinite',
        'shine-slow': 'shine-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

