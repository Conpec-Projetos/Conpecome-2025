import { Pixelify_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ['var(--font-pixelify)'],
        poppins: ['var(--font-poppins)'],
        'Pixelify-Sans': ['Pixelify-Sans'],
        'Poppins-bold': ['Poppins-bold'],
        'Poppins-extrabold': ['Poppins-extrabold'],
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: "#D95B08",
      },
      
    },
  },
  plugins: [],
} satisfies Config;

export default config;
