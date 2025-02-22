/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9C93FF",    // Used in buttons, active tabs, chart fills
        secondary: "#6C63FF",  // Used for hover states and gradients
        energy: "#fca3b0",     // For energy bars
        peak: "#81E6D9",       // For peak power bars
        background: "#F0F4F8",
        card: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
