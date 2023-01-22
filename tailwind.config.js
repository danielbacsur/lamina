/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "calc(var(--vh))",
      },
      minHeight: {
        screen: "calc(var(--vh))",
      },
      maxHeight: {
        screen: "calc(var(--vh))",
      },
      width: {
        screen: "calc(var(--vw))",
      },
      minWidth: {
        screen: "calc(var(--vw))",
      },
      maxWidth: {
        screen: "calc(var(--vw))",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        // cormorant: ["Cormorant Garamond", "serif"],
      },
      colors: {
        'brand': {
          '50': 'rgb(243, 239, 255)',
          '100': 'rgb(225, 217, 255)',
          '200': 'rgb(206, 190, 255)',
          '300': 'rgb(188, 162, 255)',
          '400': 'rgb(169, 135, 255)',
          '500': 'rgb(151, 107, 255)',
          '600': 'rgb(132, 80, 255)',
          '700': 'rgb(114, 52, 255)',
          '800': 'rgb(95, 25, 255)',
          '900': 'rgb(77, 0, 255)'
        },
      },
    },
  },
  plugins: []
};
