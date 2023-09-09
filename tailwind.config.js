/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "var(--step--2)",
        sm: "var(--step--1)",
        base: "var(--step-0)",
        xl: "var(--step-1)",
        "2xl": "var(--step-2)",
        "3xl": "var(--step-3)",
        "4xl": "var(--step-4)",
        "5xl": "var(--step-5)",
      },
      colors: {
        purple:{
          50:'#f3f1ff',
          text2:'#ebe5ff',
          200:'#d9ceff',
          300:'#bea6ff',
          400:'#9f75ff',
          500:'#843dff',
          600:'#7916ff',
          700:'#6b04fd',
          text:'#5a03d5',
          900:'#4b05ad',
          950:'#2c0076'
        }
        
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
}

