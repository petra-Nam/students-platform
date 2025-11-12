/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}", // Add this line
    "./src/views/**/*.{vue,js,ts,jsx,tsx}", // Add this line
    "./src/pages/**/*.{vue,js,ts,jsx,tsx}", // Add this line
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#3490dc',
          green: '#38c172',
          darkBlue: '#1a6fb0', 
          darkGreen: '#2da15a',
        },
        custom: {
          lightBlue: '#e6f2ff',
          lightGreen: '#e8f5e9',
          textDark: '#2d3748',
          textLight: '#718096',
          grayLight: '#f7fafc',
          grayBorder: '#e2e8f0',
        }
      },
      fontFamily: {
        'sans': ['Roboto', 'Open Sans', 'system-ui', 'sans-serif'],
        'heading': ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}