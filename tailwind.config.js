/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'mini-phone': '0px',
      'mini-tablet': '355px',
      'mini-tablet-lg': '380px',
      'phone': '435px',
      'small-phone': '510px',
      'phone-sm': '600px',
      'pho': '660px',
      'phone-base': '715px',
      'phone-lg': '785px',
      'phone-xl': '850px',
      'phone-2xl': '930px',
      'pho-tab': '960px',
      'tablet-sm': '1070px',
      'tablet-lg': '1110px',
      'tablet': '1152px',
      'laptop': '1200px',
      'laptop-lg': '1230px',
      'laptop-xl': '1280px',
      'des-lap': '1320px',
      'des-lap-lg': '1375px',
      'desk': '1400px',
      'desktop': '1440px',
      '1k': '1480px',
      '2k': '1520px',
      '3k': '1550px',
      '4k': '1600px',
      '6k': '1660px',
      '8k': '1750px',
      '12k': '1920px',
      '13k': '2100px',
      '14k': '2160px'
    },
    extend: {
      fontFamily: {
        "open-sans": "Open Sans",
        "dm-sans": "DM Sans",
        "afcad-flux": "Afacad Flux"
      }
    },
  },
  plugins: [],
}

