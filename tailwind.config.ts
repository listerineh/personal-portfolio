import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin'; // Import plugin

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-outfit)', 'sans-serif'],
        headline: ['var(--font-unbounded)', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'color-mix(in srgb, var(--background) calc(<alpha-value> * 100%), transparent)',
        foreground: 'color-mix(in srgb, var(--foreground) calc(<alpha-value> * 100%), transparent)',
        card: {
          DEFAULT: 'color-mix(in srgb, var(--card) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--card-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        popover: {
          DEFAULT: 'color-mix(in srgb, var(--popover) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--popover-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        primary: {
          DEFAULT: 'color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--primary-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        secondary: {
          DEFAULT: 'color-mix(in srgb, var(--secondary) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--secondary-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        muted: {
          DEFAULT: 'color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--muted-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        accent: {
          DEFAULT: 'color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--accent-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        destructive: {
          DEFAULT: 'color-mix(in srgb, var(--destructive) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--destructive-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        border: 'color-mix(in srgb, var(--border) calc(<alpha-value> * 100%), transparent)',
        input: 'color-mix(in srgb, var(--input) calc(<alpha-value> * 100%), transparent)',
        ring: 'color-mix(in srgb, var(--ring) calc(<alpha-value> * 100%), transparent)',
        chart: {
          '1': 'color-mix(in srgb, var(--chart-1) calc(<alpha-value> * 100%), transparent)',
          '2': 'color-mix(in srgb, var(--chart-2) calc(<alpha-value> * 100%), transparent)',
          '3': 'color-mix(in srgb, var(--chart-3) calc(<alpha-value> * 100%), transparent)',
          '4': 'color-mix(in srgb, var(--chart-4) calc(<alpha-value> * 100%), transparent)',
          '5': 'color-mix(in srgb, var(--chart-5) calc(<alpha-value> * 100%), transparent)',
        },
        sidebar: {
          DEFAULT: 'color-mix(in srgb, var(--sidebar-background) calc(<alpha-value> * 100%), transparent)',
          foreground: 'color-mix(in srgb, var(--sidebar-foreground) calc(<alpha-value> * 100%), transparent)',
          primary: 'color-mix(in srgb, var(--sidebar-primary) calc(<alpha-value> * 100%), transparent)',
          'primary-foreground': 'color-mix(in srgb, var(--sidebar-primary-foreground) calc(<alpha-value> * 100%), transparent)',
          accent: 'color-mix(in srgb, var(--sidebar-accent) calc(<alpha-value> * 100%), transparent)',
          'accent-foreground': 'color-mix(in srgb, var(--sidebar-accent-foreground) calc(<alpha-value> * 100%), transparent)',
          border: 'color-mix(in srgb, var(--sidebar-border) calc(<alpha-value> * 100%), transparent)',
          ring: 'color-mix(in srgb, var(--sidebar-ring) calc(<alpha-value> * 100%), transparent)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.animation-delay-100': { animationDelay: '100ms' },
        '.animation-delay-200': { animationDelay: '200ms' },
        '.animation-delay-300': { animationDelay: '300ms' },
        '.animation-delay-400': { animationDelay: '400ms' },
        '.animation-delay-500': { animationDelay: '500ms' },
        '.animation-delay-700': { animationDelay: '700ms' },
        '.animation-delay-1000': { animationDelay: '1000ms' },
      };
      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
