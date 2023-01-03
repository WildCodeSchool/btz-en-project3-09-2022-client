/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bleu: "#0f23E4",
        vert: "#96CD32",
        lightBlue: "#B1D4F2",
      },
    },
  },
  plugins: [],
};
