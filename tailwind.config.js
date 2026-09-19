/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['Inter', 'sans-serif'],
      },
      colors: {
        // Fixed brand colors (from the SP Consultants logo)
        teal: '#156082',
        navy: '#1F4E79',
        // Theme-aware semantic colors, driven by CSS variables
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        line: 'var(--line)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
      },
      borderColor: {
        DEFAULT: 'var(--line)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'grid-pan': 'grid-pan 8s linear infinite',
      },
    },
  },
  plugins: [],
}
