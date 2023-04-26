/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      dark_grey: '#141414',
      white: '#ffffff',
      main_bg_color: '#181823',
      text_white: '#d6d6d6',
      outline_dark: "#808080",
      text_grey: '#b1b1b1',      
      button_pressed_color: '#475266',
      button_accent_color: '#5121e5',
      input_text_color: '#b6b6b6',
      apps_bg_color: '#1f1f2b',
      apps_bg_pressed: '#3a3a45',
      text_blue: "#609bff",
      text_pink: "#e95d90",
      text_teal: "#14cee3",
    },
    extend: {},
  },
  plugins: [],
}

