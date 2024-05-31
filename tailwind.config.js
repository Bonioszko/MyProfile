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
        'secondary-color': '#F8F6F4',
        'secondary-color-dark': '#38a3a5',
        'third-color': '#5AB2FF',
      },
    },
  },
  plugins: [],
}
