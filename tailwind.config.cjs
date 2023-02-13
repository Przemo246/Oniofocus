/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#f7b239',
        'dark-gray': '#333',
        'light-gray': '#f1f1f1',
        'light-gray-1': '#e5e5e5',
      },
    },
    fontFamily: {
      manrope: 'Manrope, sans-serif',
    },
    boxShadow: {
      'box-shadow': 'rgb(225 225 225) 0px 6px 0px',
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require('daisyui')],
}
