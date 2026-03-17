/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ardea: {
          white: '#FAFAF8',
          bej: '#F5F0E8',
          gray: '#E8E4DF',
          'gray-mid': '#C4BDB5',
          brown: '#8B6F47',
          'brown-light': '#B8956A',
          cobalt: '#0047AB',
          'cobalt-light': '#1A6DD4',
          'cobalt-pale': '#EBF1FB',
          text: '#333333',
          'text-soft': '#666666',
          'text-muted': '#999999',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      transitionTimingFunction: {
        'slow': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'slow-zoom': {
          '0%':   { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
