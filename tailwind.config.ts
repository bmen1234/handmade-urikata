import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary navy (replaces green — all existing class refs auto-update)
          green: '#1A2744',
          'green-dark': '#0D1830',
          'green-light': '#EEF1F8',
          // Gold accent
          gold: '#C49A3C',
          'gold-dark': '#9E7820',
          'gold-light': '#FBF6EA',
          'gold-mid': '#E8D49A',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'Hiragino Mincho ProN', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
