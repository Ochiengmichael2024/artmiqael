import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ECE8DE",
        surface: "#F7F5EF",
        "surface-raised": "#FFFFFF",
        ink: "#17140F",
        "ink-soft": "#736C5D",
        "ink-faint": "#A39C89",
        line: "#DBD5C6",
        "line-strong": "#C7C0AE",
        accent: "#8C5A2B",
        "accent-soft": "#EFE1CC",
        sage: "#57644F",
        "sage-soft": "#E1E5D8",
        danger: "#A3402F",
        "danger-soft": "#F3DCD4",
        black: {
          DEFAULT: "#16140F",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        lg: "26px",
        md: "16px",
        sm: "10px",
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "6.5": "1.625rem",
        "13": "3.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(23,20,15,0.04), 0 10px 30px -14px rgba(23,20,15,0.18)",
        lift: "0 2px 4px rgba(23,20,15,0.06), 0 20px 40px -18px rgba(23,20,15,0.28)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fadeUp .4s cubic-bezier(.2,.7,.3,1) both",
        shimmer: "shimmer 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
