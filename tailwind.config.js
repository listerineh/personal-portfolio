/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx", "./index.html"],
  theme: {
    extend: {
      width: {
        "1/9": "11.1111111%",
      },
      colors: {
        "custom-dark": {
          DEFAULT: "#141414",
          light: "#141414f2",
        },
        "custom-gray": {
          DEFAULT: "#121212",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
