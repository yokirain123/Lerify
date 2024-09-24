import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  plugins: [nextui()],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
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
