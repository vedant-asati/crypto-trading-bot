/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}", // Include all files in the 'pages' directory
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files in the 'components' directory
    "./layouts/**/*.{js,jsx,ts,tsx}", // Optionally include a 'layouts' directory if you have one
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
