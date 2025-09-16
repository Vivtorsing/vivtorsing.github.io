/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'dark-text': '#E0E0E0',
        'pink-accent': '#FF69B4',
        'pink-light': '#FFC0CB',
        'pink-dark': '#C71585',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};