/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-red" : "#ff8554",
        "primary-purple" : "#c68aff",
        "primary-green" : "#8affdc",
        "primary-blue" : "#8abbff" 
      },
    },
  },
  plugins: [],
}