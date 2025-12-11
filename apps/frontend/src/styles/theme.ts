/**
 * Design System - Theme Configuration
 * 
 * Color Scheme: Deep Blue + Emerald Green
 * This file contains all design system constants
 */

export const colors = {
  // Primary - Deep Blue
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c3d66",
  },

  // Accent - Emerald Green
  accent: "#10b981",
  accentLight: "#d1fae5",
  accentDark: "#059669",

  // Background
  background: "#0f172a",
  card: "#1e293b",
  elevated: "#334155",

  // Text
  foreground: "#f1f5f9",
  muted: "#cbd5e1",
  mutedDark: "#475569",

  // Borders
  border: "#334155",
  borderLight: "#475569",

  // Status
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
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
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  accent: "0 0 20px rgba(16, 185, 129, 0.2)",
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
