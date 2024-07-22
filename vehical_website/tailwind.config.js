/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto Mono"],
    },
    extend: {
      transitionProperty: {
        'opacity': 'opacity',
        'transform': 'transform',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      colors: {
        // you can either spread `colors` to apply all the colors
        ...colors,
        // or add them one by one and name whatever you want
        amber: colors.amber,
        emerald: colors.emerald,
        neutral: colors.neutral
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
});
