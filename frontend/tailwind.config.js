/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#D4A017', light: '#F59E0B', dark: '#92701F' },
        heritage: { dark: '#0A0A0F', card: '#12121A', border: '#1E1E2E' },
        sand: '#C8B88A'
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
