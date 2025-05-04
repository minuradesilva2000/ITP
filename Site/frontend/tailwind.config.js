/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pacific": ["Pacifico", "sans-serif"],
      },
    },
  },
  plugins: []  // Use an empty array if you have no extra Tailwind plugins
}

