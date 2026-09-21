/**
 * Arogya Clinical Design Tokens
 * 
 * Production design system tokens formulated for clinical precision,
 * high contrast without visual fatigue, calm healthcare aesthetics,
 * and strict semantic clarity.
 */

export const designTokens = {
  colors: {
    // Neutral canvas & surfaces
    background: {
      canvas: "#f8fafc",      // Warm off-white / very light slate neutral
      surface: "#ffffff",     // Primary card & panel container
      subtle: "#f1f5f9",      // Secondary neutral background / table alternate
      muted: "#f8fafc",       // Muted background for disabled or subtle zones
      hover: "#f8fafc",       // Hover state for interactive rows
    },
    // High-readability clinical text hierarchy
    text: {
      primary: "#0f172a",     // Deep charcoal/navy for maximum contrast
      secondary: "#334155",   // Supporting clinical copy
      muted: "#64748b",       // Metadata, timestamps, helper annotations
      subtle: "#94a3b8",      // Inactive / placeholder text
      inverse: "#ffffff",     // High contrast text over solid accents
    },
    // Healthcare Accent: Restrained Teal / Deep Clinical Green
    brand: {
      primary: "#0f766e",     // Restrained healthcare teal (WCAG AAA compliant)
      primaryHover: "#115e59",// Darker teal on hover
      primaryLight: "#f0fdfa",// Light teal wash for badges & active states
      primaryBorder: "#99f6e4",
      primaryFocus: "#0d9488",
    },
    // Secondary Accent: Restrained Clinical Blue
    secondary: {
      blue: "#0284c7",        // Sky / clinical slate blue for external links & info
      blueLight: "#f0f9ff",
      blueBorder: "#bae6fd",
    },
    // Clinical Status & Safety Accents
    status: {
      draft: {
        bg: "#f1f5f9",
        text: "#475569",
        border: "#cbd5e1",
        dot: "#94a3b8",
        label: "Draft",
      },
      structured: {
        bg: "#f0fdfa",
        text: "#0f766e",
        border: "#99f6e4",
        dot: "#14b8a6",
        label: "AI Structured",
      },
      review: {
        bg: "#fffbeb",
        text: "#b45309",
        border: "#fde68a",
        dot: "#f59e0b",
        label: "Pending Review",
      },
      finalized: {
        bg: "#f0fdf4",
        text: "#15803d",
        border: "#bbf7d0",
        dot: "#22c55e",
        label: "Clinician Signed",
      },
      urgent: {
        bg: "#fef2f2",
        text: "#b91c1c",
        border: "#fecaca",
        dot: "#ef4444",
        label: "Critical Alert",
      },
    },
    // Neutral Borders
    border: {
      subtle: "#f1f5f9",
      default: "#e2e8f0",
      strong: "#cbd5e1",
      hover: "#94a3b8",
    },
  },

  // Typography Scale (Inter / system-ui stack)
  typography: {
    pageTitle: "text-2xl font-semibold tracking-tight text-slate-900",
    sectionTitle: "text-lg font-semibold text-slate-900 tracking-tight",
    subsectionTitle: "text-base font-medium text-slate-800",
    body: "text-sm text-slate-700 leading-relaxed",
    bodySmall: "text-xs text-slate-600 leading-normal",
    metadata: "text-xs font-medium text-slate-500",
    labels: "text-xs font-semibold uppercase tracking-wider text-slate-500",
    formLabel: "text-sm font-medium text-slate-700 mb-1.5 block",
    tableHeader: "text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/80 px-4 py-3 text-left border-b border-slate-200",
    tableCell: "text-sm text-slate-800 px-4 py-3.5 border-b border-slate-100",
    helperText: "text-xs text-slate-500 mt-1",
  },

  // Corner Radii (Medium, restrained - not excessively rounded or pill-shaped)
  radii: {
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    full: "9999px",
  },

  // Elevation & Shadows (Flat/restrained clinical containment)
  shadows: {
    xs: "0 1px 2px 0 rgba(15, 23, 42, 0.04)",
    sm: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
    md: "0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
    panel: "0 0 0 1px rgba(15, 23, 42, 0.06), 0 1px 3px 0 rgba(15, 23, 42, 0.05)",
  },
} as const;

export type DesignTokens = typeof designTokens;

