/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          yellow: '#fef08a',
          lightYellow: '#fef9c3',
          sunshine: '#fde047',
          softGold: '#facc15',
          cream: '#fffdf0',
          butter: '#fefce8',
          paleLemon: '#fffbeb',
          softWhite: '#ffffff',
          warmAmber: '#d97706',
          textDark: '#78350f',
        },
      },
      fontFamily: {
        cursive: ['"Dancing Script"', '"Caveat"', 'cursive'],
        handwriting: ['"Caveat"', 'cursive'],
        serifRomantic: ['"Playfair Display"', 'serif'],
        sans: ['"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)', filter: 'drop-shadow(0 0 16px rgba(253,224,71,0.65))' },
          '50%': { opacity: '1', transform: 'scale(1.08)', filter: 'drop-shadow(0 0 28px rgba(250,204,21,0.95))' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0.8) rotate(0deg)', opacity: '0.4' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
        },
        gentleWiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        flameFlicker: {
          '0%, 100%': { transform: 'scale(1) skewX(-2deg)', filter: 'drop-shadow(0 -2px 6px #f59e0b)' },
          '50%': { transform: 'scale(1.15) skewX(3deg)', filter: 'drop-shadow(0 -4px 12px #ef4444)' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        sparkle: 'sparkle 2.5s ease-in-out infinite',
        gentleWiggle: 'gentleWiggle 2.5s ease-in-out infinite',
        flameFlicker: 'flameFlicker 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
