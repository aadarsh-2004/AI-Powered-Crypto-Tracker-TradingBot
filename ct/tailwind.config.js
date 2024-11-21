/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: "#39ff14",
        darkBg: "#0f172a",
        cardBg: "rgba(255, 255, 255, 0.1)",
        cardHover: "rgba(255, 255, 255, 0.2)",
      },
      boxShadow: {
        neon: "0 0 10px orange, 0 0 20px orange",
      },
    },
  },
  plugins: [],
}