/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "sans-serif": "var(--font-sans-serif)",
    },
    fontWeight: {
      light: 100,
      normal: 300,
      bold: 500,
    },
  },
  plugins: [],
};
