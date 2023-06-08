/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('../public/images/bg1.jpg')",
      },
    },
  },
  plugins: [],
};
