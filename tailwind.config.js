const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.zinc,
      },
      fontFamily: {
        pixelify: ['PixelifySans', 'sans-serif'],
        nunito: ['NunitoSans', 'sans-serif'],
        'source-code-pro': ['SourceCodePro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
