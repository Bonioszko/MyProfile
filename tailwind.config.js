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
        'secondary-color': '#F8F6F4',
        'third-color': '#5AB2FF',
      },
    },
  },
  plugins: [],
}
