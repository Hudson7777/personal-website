/**
 * Design System - Theme Configuration
 * 
 * Color Scheme: Deep Blue + Emerald Green
 * This file contains all design system constants
 */

export const colors = {
  // Primary - Emerald Green palette
  primary: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },

  // Accent - Emerald Green (light-theme variant)
  accent: "#059669",
  accentLight: "#D1FAE5",
  accentDark: "#047857",

  // Background - Light Theme
  background: "#F8FAFC",
  card: "#FFFFFF",
  elevated: "#F1F5F9",

  // Text
  foreground: "#1E293B",
  muted: "#64748B",
  mutedLight: "#94A3B8",

  // Borders
  border: "#E2E8F0",
  borderDark: "#CBD5E1",

  // Status
  success: "#059669",
  warning: "#D97706",
  error: "#DC2626",
  info: "#2563EB",
} as const

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
} as const

export const borderRadius = {
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
} as const

export const transitions = {
  fast: "150ms",
  base: "200ms",
  slow: "300ms",
} as const

export const animations = {
  fadeIn: "fadeIn 0.3s ease-in-out",
  slideUp: "slideUp 0.4s ease-out",
  slideDown: "slideDown 0.4s ease-out",
  scaleIn: "scaleIn 0.3s ease-out",
} as const

export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
  base: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
  md: "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)",
  lg: "0 8px 30px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)",
  xl: "0 16px 50px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.06)",
  accent: "0 4px 20px rgba(5, 150, 105, 0.25)",
  card: "0 2px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03)",
} as const

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
    loose: "2",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const

export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

export const zIndex = {
  hide: "-1",
  auto: "auto",
  base: "0",
  dropdown: "1000",
  sticky: "1020",
  fixed: "1030",
  backdrop: "1040",
  offcanvas: "1050",
  modal: "1060",
  popover: "1070",
  tooltip: "1080",
} as const

export const theme = {
  colors,
  spacing,
  borderRadius,
  transitions,
  animations,
  shadows,
  typography,
  breakpoints,
  zIndex,
} as const

export type Theme = typeof theme
