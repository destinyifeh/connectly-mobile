/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        app: {
          default: '#d4b300',
          dark: '#000000',
          light: 'var(--app-white)',
          defaultMuted: '#aa8f00',
          ghost: '#f3f3f4',
          link: '#0A84FF',
          darkGreen: '#556B2F',
          danger: '#D70909',
        },
      },
      fontFamily: {
        sans: ['Sans', 'Roboto'],
      },
    },
  },
  plugins: [],
};
