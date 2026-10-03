import type { Config } from "tailwindcss";

// Colour tokens come straight from the blueprint design system (section 11).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1F7A4D", dark: "#14352A", soft: "#E3F1EA" },
        gold: "#C8962B",
        info: { DEFAULT: "#25549E", soft: "#E6EDF8" },
        warning: { DEFAULT: "#A8650B", soft: "#FBF0DD" },
        danger: { DEFAULT: "#B3402A", soft: "#FAE9E5" },
        canvas: "#F5F7F6",
        surface: "#FFFFFF",
        ink: { DEFAULT: "#16231D", muted: "#5B6B63" },
        line: "#DDE4E0",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      fontSize: { base: ["14px", "20px"] },
      borderRadius: { control: "8px", card: "12px" },
      boxShadow: {
        card: "0 1px 2px rgba(20,53,42,0.06)",
        pop: "0 8px 24px rgba(20,53,42,0.16)",
      },
      spacing: { sidebar: "248px", "sidebar-collapsed": "64px", topbar: "56px" },
      maxWidth: { content: "1440px" },
    },
  },
  plugins: [],
};

export default config;
