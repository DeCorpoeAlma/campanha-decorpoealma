/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'galano-alt': ['"Galano Grotesque Alt"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
