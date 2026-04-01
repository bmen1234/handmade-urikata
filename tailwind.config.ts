import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { green: '#1D9E75', 'green-dark': '#0F6E56', 'green-light': '#E1F5EE' }
      }
    }
  },
  plugins: []
}
export default config
