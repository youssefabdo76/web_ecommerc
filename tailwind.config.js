/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'dark',
    'badge-women',
    'badge-men',
    'badge-kids',
    'glass-panel',
    'glass-nav',
    'drawer-backdrop',
    'product-card-img-wrapper',
    'whatsapp-glow'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        whatsapp: '#25D366',
        'whatsapp-dark': '#1FA651',
      }
    },
  },
  plugins: [],
}
