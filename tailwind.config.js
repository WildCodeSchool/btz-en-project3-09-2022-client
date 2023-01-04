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
        bleu: "#0F23E4",
        vert: "#96CD32",
        bleu_leger: "#E5F1FB",
      },
    },
  },
  plugins: [],
};
