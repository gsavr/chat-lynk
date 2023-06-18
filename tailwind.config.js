/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/images/bg2.jpg')",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    height: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
