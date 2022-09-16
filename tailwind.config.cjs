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
        "primary-blue" : "#8abbff",
      },
      boxShadow: {
        "brutal" : "2px 2px 0px 1px #000000",
      }
    },
  },
  plugins: [],
}