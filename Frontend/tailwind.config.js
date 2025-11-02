/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#007bff', // Main header blue
        'secondary-blue': '#0056b3', // Darker blue for some elements
        'background-light': '#f0f5f9', // Light grey/blue background
        'accent-yellow': '#ffc107', // Search button yellow
        'accent-purple': '#6f42c1', // For some interactive elements/tabs
        'light-purple': '#e0d9ed', // Lighter purple for search bar background
        'text-dark': '#343a40', // Dark text
        'text-muted': '#6c757d', // Muted text
      },
      fontFamily: {
        merriweathers: ['Merriweather', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}