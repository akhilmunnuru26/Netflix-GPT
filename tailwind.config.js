/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
    colors: {
      
      'netflix-gray': '#333333',
      'netflix-text-color':'#eee'
      
    },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}