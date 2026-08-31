/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#362b25',
        secondary: '#8e634e',
        accent: '#b78c64',
        tertiary: '#d3a896',
        background: '#f8f6f5',
        gray: {
          light: '#cbcbcd',
          DEFAULT: '#9d9898',
        },
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
};
