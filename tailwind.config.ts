import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1FA9FE",
          black: "#000000",
        },
      },
      fontFamily: {
        sans: ["Arial", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
