/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
