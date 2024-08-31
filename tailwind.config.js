/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        18: "repeat(18, minmax(0, 1fr))",
      },
      gridRow: {
        "start-17": "grid-row-start: 17",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff6337",
          "primary-content": "#ffffff",
          secondary: "#1d4ed8",
          "secondary-content": "#ffffff",
          accent: "#8922da",
          "accent-content": "#ffffff",
          neutral: "#161616",
          "neutral-content": "#ffffff",
          "base-100": "#0a0a0a",
          "base-200": "#070707",
          "base-300": "#050505",
          "base-content": "#c7c7c7",
          info: "#2d83f5",
          "info-content": "#000000",
          success: "#059669",
          "success-content": "#000000",
          warning: "#facc15",
          "warning-content": "#000000",
          error: "#b91c1c",
          "error-content": "#ffffff",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
};
