/** @type {import('tailwindcss').Config} */
export default {
  content: [],//"./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#7e00ff",
          10: "#a800ff",
          30: "#d800ff",
          60: "#d300ff",
        },
        zinc: "#101010",
      },
    },
  },
  plugins: [],
}

