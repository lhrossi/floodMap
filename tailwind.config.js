/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        appearFromBottom: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0.9,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        appearFromLeft: {
          '0%': {
            transform: 'translateX(-50px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'appear-from-bottom': 'appearFromBottom 0.3s ease-out',
        'appear-from-left': 'appearFromLeft 0.3s ease-out',
      },
      screens: {
        mobile: '300px',
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
    },
  },
  plugins: [],
};
