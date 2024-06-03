/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        'main-color': '#EFFFFD',
        'main-color-dark': '#22577a',
        'secondary-color': '#F9FAFB ',
        'secondary-color-dark': '#1a202c',
        'third-color': '#5AB2FF',
      },
    },
  },
  plugins: [],
}
