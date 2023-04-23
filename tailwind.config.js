/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F0F0F0",
          dark: "#000000",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#121212",
        },
        primary: {
          DEFAULT: "#6200EE",
          dark: "#BB86FC",
          variant: "#3700B3",
        },
        secondary: {
          DEFAULT: "#03DAC6",
          dark: "#03DAC6",
          variant: "#018786",
        },
        error: {
          DEFAULT: "#B00020",
          dark: "#CF6679",
        },
        "on-background": {
          DEFAULT: "#000000",
          dark: "#FFFFFF",
        },
        "on-surface": {
          DEFAULT: "#000000",
          dark: "#FFFFFF",
        },
        "on-primary": {
          DEFAULT: "#FFFFFF",
          dark: "#000000",
        },
        "on-secondary": {
          DEFAULT: "#000000",
          dark: "#FFFFFF",
        },
        "on-error": {
          DEFAULT: "#FFFFFF",
          dark: "#00000",
        },
        shadow: {
          DEFAULT: "#C5C5C5",
          dark: "#696969",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
