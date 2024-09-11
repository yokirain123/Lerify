import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-color": "var(--accent-color)",
        "inactive-text": "var(--inactive-text)",
        "bg-color": "var(--bg-color)",
      },
      dropShadow: {
        'white': '0 35px 35px rgba(255, 255, 255, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
