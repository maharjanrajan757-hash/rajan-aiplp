import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        rosegold: {
          50: "#fff8f6",
          100: "#fdece7",
          200: "#f9d6ce",
          300: "#f0ad9e",
          400: "#df816f",
          500: "#c96150",
          600: "#ad493a",
          700: "#8f392e",
          800: "#743127",
          900: "#602c25"
        },
        champagne: "#f7efe8",
        ink: "#282220"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(93, 49, 39, 0.12)",
        glow: "0 18px 50px rgba(201, 97, 80, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
