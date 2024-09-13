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
        '3xl': '0px 0px 15px #88b4fc',
      }
    },
  },
};
export default config;
