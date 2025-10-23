import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "500px",
        "3xl": "1850px",
      },
      fontFamily: {
        rubik: ["var(--font-rubik)", "Luckiest Guy", "cursive"],
      },
      colors: {
        // Our custom color palette
        primary: "#1E90FF", // Blue for headings and important accents
        primaryLight: "#87CEEB", // Lighter blue for hover states or subtle highlights
        primaryDark: "#1565C0", // Darker blue for text or strong accents

        secondary: "#FFA726", // Orange for status indicators like "In Review"
        secondaryLight: "#FFD580", // Lighter orange for backgrounds or hover effects
        secondaryDark: "#FF8C00", // Darker orange for emphasis

        background: "#FFFFFF", // Main white background
        backgroundMuted: "#F8FAFC", // Slightly muted white for cards or sections

        textPrimary: "#1F2937", // Dark gray for primary text
        textSecondary: "#4B5563", // Lighter gray for secondary text
        textMuted: "#9CA3AF", // Muted gray for placeholder or less important text

        border: "#E5E7EB", // Light gray for borders
        shadow: "#0000001A", // Subtle shadow for cards and buttons (rgba with transparency)

        success: "#4CAF50", // Green for success states
        warning: "#FFB74D", // Orange-yellow for warnings
        error: "#F44336", // Red for errors or destructive actions
        info: "#29B6F6", // Cyan for informational highlights

        // Shadcn color palette
        // border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "snow-float": {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "0.8",
          },
          "50%": {
            transform: "translateY(-15px) rotate(180deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0) rotate(360deg)",
            opacity: "0.8",
          },
        },
        aurora: {
          "0%": {
            transform: "translateX(0) translateY(-5%)",
          },
          "50%": {
            transform: "translateX(0) translateY(0%)",
          },
          "100%": {
            transform: "translateX(0) translateY(-5%)",
          },
        },
        flash: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "snow-float": "snow-float 8s ease-in-out infinite",
        aurora: "aurora 30s ease-in-out infinite alternate",
        flash: "flash 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
