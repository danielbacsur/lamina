/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh))",
    }),
    minHeight: (theme) => ({
      0: "0",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh))",
    }),
    extend: {
      height: {
        screen: "calc(var(--vh))",
      },
      minHeight: {
        screen: "calc(var(--vh))",
      },
      fontFamily: {
        playfair: ["Cormorant Garamond", "serif"],
        cormorant: ["Playfair Display", "serif"],
      },
      colors: {
        brand: "#E14D2A",
        "brand-hover": "#d2401d"
      },
    },
  },
  plugins: [],
};
