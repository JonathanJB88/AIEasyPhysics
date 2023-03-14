/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        footer: '0 -5px 5px -5px rgba(255, 255, 255, 0.45)',
      },
    },
  },
  plugins: [],
};
