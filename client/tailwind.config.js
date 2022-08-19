/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        grey:{
          0:"#ffffff",
          100:"#f2f6f9",
          200:"#f7f7f7",
          300:"#bdbdbd",
          400:"#838385",
        }
      }
    },
  },
  plugins: [],
}
