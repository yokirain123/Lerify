import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // fixed!
  ],
  theme: {
    extend: {
      colors: {
        "accent-color": "var(--accent-color)",
        "inactive-text": "var(--inactive-text)",
        "bg-color": "var(--bg-color)",
      },
      dropShadow: {
        "3xl": "0px 0px 15px #88b4fc",
      },
    },
  },
  plugins: [nextui()],
};

export default config;