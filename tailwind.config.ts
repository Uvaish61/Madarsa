import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        "green-50": "var(--green-50)",
        "green-100": "var(--green-100)",
        "green-500": "var(--green-500)",
        "green-600": "var(--green-600)",
        "green-700": "var(--green-700)",
        "green-800": "var(--green-800)",
        gold: "var(--gold)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        urdu: ["var(--font-urdu)", "serif"],
      },
      boxShadow: {
        soft: "var(--shadow)",
        "soft-sm": "var(--shadow-sm)",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-9px)" },
        },
        floatY2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(7px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        aurora: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(4%,-3%) scale(1.08)" },
          "66%": { transform: "translate(-3%,4%) scale(0.96)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        pulseSoft: "pulseSoft 2s infinite",
        floatY: "floatY 8s ease-in-out infinite",
        floatY2: "floatY2 6s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
        aurora: "aurora 15s ease-in-out infinite",
        shine: "shine 6.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;