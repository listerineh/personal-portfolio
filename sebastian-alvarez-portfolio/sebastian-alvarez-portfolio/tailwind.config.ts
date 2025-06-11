import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6347', // Tomato
          dark: '#E5533D',   // Darker Tomato
        },
        secondary: {
          DEFAULT: '#4682B4', // SteelBlue
          light: '#5A9BDC',  // Lighter SteelBlue
        },
        accent: {
          DEFAULT: '#32CD32', // LimeGreen
        },
        background: {
          light: '#F0F4F8', // Light grayish blue
          DEFAULT: '#FFFFFF', // White
          dark: '#1A202C',   // Dark gray for dark backgrounds
        },
        text: {
          DEFAULT: '#333333', // Dark gray for text
          light: '#FFFFFF',   // White for text on dark backgrounds
          muted: '#666666',  // Muted gray for less important text
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
