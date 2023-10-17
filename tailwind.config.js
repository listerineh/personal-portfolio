/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        fix: "32%",
      },
      fontFamily: {
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: "#e4e1fe",
          dark: "#18181b",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#121212",
        },
        primary: {
          DEFAULT: "#4e327d",
          dark: "#9269eb",
          variant: "#3d265f",
        },
        secondary: {
          DEFAULT: "#763fc3",
          dark: "#9269eb",
          variant: "#d0c9fc",
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
        "on-shawdow": {
          DEFAULT: "#FFFFFF",
          dark: "#000000",
        },
      },
    },
  },
  plugins: [],
};
