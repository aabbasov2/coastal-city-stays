import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#dcf3ff',
          200: '#b3e7ff',
          300: '#66d2ff',
          400: '#1cb6ff',
          500: '#009deb',
          600: '#007bc7',
          700: '#0062a3',
          800: '#005287',
          900: '#003a61',
        },
        secondary: {
          50: '#f8f9fa',
          100: '#ebedf0',
          200: '#d3d7dc',
          300: '#a9b1bc',
          400: '#768394',
          500: '#5c697a',
          600: '#434d5b',
          700: '#363e49',
          800: '#2c333d',
          900: '#1f242b',
        },
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
