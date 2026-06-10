import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0ecff',
          100: '#e0d8ff',
          200: '#c4b4ff',
          300: '#a78bff',
          400: '#8b6fff',
          500: '#6c47ff',
          600: '#5533e0',
          700: '#4120c4',
          800: '#2f16a0',
          900: '#1e0d7a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
