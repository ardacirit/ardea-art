/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // İznik palette — porcelain ground, cobalt underglaze, turquoise and
        // coral accents. Named after the materials, not the hue.
        porcelain: '#FBFAF7',
        bone: '#F4F0E7',
        line: '#E6E1D7',
        ink: '#1C1B18',
        smoke: '#57544B',
        faint: '#9A958B',
        cobalt: {
          pale: '#EDF2FB',
          light: '#3565C0',
          DEFAULT: '#16418C',
          deep: '#0D2B63',
        },
        turquoise: {
          pale: '#E9F4F5',
          DEFAULT: '#137E86',
        },
        coral: {
          pale: '#F9EEEC',
          DEFAULT: '#B23A2C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        kicker: '0.28em',
      },
      maxWidth: {
        site: '80rem',
        prose: '42rem',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 9s cubic-bezier(0.2, 0.6, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
