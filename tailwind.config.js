/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./imports/ui/**/*.{js,jsx,ts,tsx}",
    "./client/*.html",
    "./client/*.tsx",
  ],
  theme: {
    extend: {
      zIndex: {
        450: "450",
      },
      colors: {
        "tgtg": "#00615f"
      }
    },
  },
  plugins: [],
};
