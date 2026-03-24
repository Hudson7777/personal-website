/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monet sage light theme
        background: "#F5F7F5",      // Barely-there sage tint
        foreground: "#1C2B1E",      // Deep moss, warmer than pure black
        card: "#FFFFFF",
        "card-foreground": "#1C2B1E",

        // Monet sage accent — low saturation, muted, warm
        accent: "#8BA888",
        "accent-foreground": "#FFFFFF",

        // Secondary / Muted
        secondary: "#EEF3EE",
        "secondary-foreground": "#4A5E4C",
        muted: "#EEF3EE",
        "muted-foreground": "#6B7D6C",

        // Border and input
        border: "#DDE8DD",
        input: "#FFFFFF",
        ring: "#8BA888",

        // Destructive
        destructive: "#DC3545",
        "destructive-foreground": "#FFFFFF",

        // Sage tonal palette (for category accents etc.)
        sage: {
          50:  "#F2F7F2",
          100: "#E2EEE2",
          200: "#C4DCC4",
          300: "#9DC49D",
          400: "#8BA888",
          500: "#6E9070",
          600: "#567558",
          700: "#435C45",
          800: "#304330",
          900: "#1C2B1E",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      animation: {
        "fade-in":       "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-up":      "slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-down":    "slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-left": "slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in":      "scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-in":     "bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "float":         "float 5s ease-in-out infinite",
        "shimmer":       "shimmer 2s linear infinite",
        "glow-pulse":    "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        slideDown: {
          "0%":   { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)",     opacity: "1" },
        },
        slideInLeft: {
          "0%":   { transform: "translateX(-16px)", opacity: "0" },
          "100%": { transform: "translateX(0)",     opacity: "1" },
        },
        scaleIn: {
          "0%":   { transform: "scale(0.93)", opacity: "0" },
          "100%": { transform: "scale(1)",    opacity: "1" },
        },
        bounceIn: {
          "0%":   { transform: "scale(0.82)", opacity: "0" },
          "60%":  { transform: "scale(1.04)", opacity: "1" },
          "100%": { transform: "scale(1)",    opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(139,168,136,0)" },
          "50%":      { boxShadow: "0 0 0 10px rgba(139,168,136,0.1)" },
        },
      },
      spacing: {
        xs: "0.25rem", sm: "0.5rem", md: "1rem",
        lg: "1.5rem",  xl: "2rem",   "2xl": "3rem", "3xl": "4rem",
      },
      fontSize: {
        xs:   ["0.75rem",  { lineHeight: "1rem" }],
        sm:   ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem",     { lineHeight: "1.5rem" }],
        lg:   ["1.125rem", { lineHeight: "1.75rem" }],
        xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
        "2xl":["1.5rem",   { lineHeight: "2rem" }],
        "3xl":["1.875rem", { lineHeight: "2.25rem" }],
        "4xl":["2.25rem",  { lineHeight: "2.5rem" }],
        "5xl":["3rem",     { lineHeight: "1.1" }],
      },
      boxShadow: {
        sm:          "0 1px 3px rgba(28,43,30,0.06), 0 1px 2px rgba(28,43,30,0.04)",
        base:        "0 2px 8px rgba(28,43,30,0.07), 0 1px 3px rgba(28,43,30,0.04)",
        md:          "0 4px 16px rgba(28,43,30,0.08), 0 2px 6px rgba(28,43,30,0.04)",
        lg:          "0 8px 32px rgba(28,43,30,0.10), 0 4px 12px rgba(28,43,30,0.05)",
        xl:          "0 16px 50px rgba(28,43,30,0.12), 0 8px 20px rgba(28,43,30,0.06)",
        "accent":    "0 4px 20px rgba(139,168,136,0.30)",
        "accent-lg": "0 8px 40px rgba(139,168,136,0.22)",
        "card":      "0 2px 12px rgba(28,43,30,0.06), 0 1px 4px rgba(28,43,30,0.03)",
        "card-hover":"0 10px 36px rgba(28,43,30,0.11), 0 4px 14px rgba(28,43,30,0.06)",
      },
      transitionDuration: {
        fast:   "150ms",
        base:   "220ms",
        slow:   "350ms",
        slower: "500ms",
      },
    },
  },
  plugins: [],
}
