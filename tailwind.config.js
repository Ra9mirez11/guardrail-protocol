/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#08090C',
          card: '#0F1117',
          border: '#1B1F2B',
          neon: '#00FFA3',
          warn: '#FFB800',
          danger: '#FF3B5C',
          subtle: '#8C94A6'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      }
    },
  },
  plugins: [],
}
