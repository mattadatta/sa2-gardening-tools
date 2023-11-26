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
        'chao-swim': '#FFFF00',
        'chao-fly': '#DC4FFF',
        'chao-run': '#00FF00',
        'chao-power': '#FF0000',
        'chao-stamina': '#00FFFF',
        'chao-intelligence': '#FFFFFF',
        'chao-luck': '#AAAAAA',
      },
      fontFamily: {
        bitter: ['Bitter', 'sans-serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
        'crimson-pro': ['CrimsonPro', 'sans-serif'],
        pixelify: ['PixelifySans', 'sans-serif'],
        nunito: ['NunitoSans', 'sans-serif'],
        'source-code-pro': ['SourceCodePro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
