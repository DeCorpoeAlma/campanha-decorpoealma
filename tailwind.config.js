/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF8200',
        'dark-blue': '#1D428A',
        'light-blue': '#00A9E0',
      },
      fontFamily: {
        'galano-alt': ['"Galano Grotesque Alt"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
