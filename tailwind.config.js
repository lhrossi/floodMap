/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        appearFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: 0.9 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        'appear-from-bottom': 'appearFromBottom 0.3s ease-out',
      },
      screens: {
        mobile: '300px',
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px'
      },
    },
  },
  plugins: [],
}