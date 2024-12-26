/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1A1A2E',
        navy: '#16213E',
        midnight: '#0F3460'
      }
    }
  },
  darkMode: 'class', // Enable dark mode using a class
  plugins: []
};
