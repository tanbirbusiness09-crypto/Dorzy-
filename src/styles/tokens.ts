/**
 * KHAYYAT Design Tokens System
 * Saudi Arabian Bespoke Men's Tailoring Marketplace
 * Step 02 Architecture
 */

export const tokens = {
  colors: {
    // Primary Brand: Deep Charcoal
    charcoal: {
      900: '#121316', // Near black / dominant surface
      800: '#1B1C22',
      700: '#24262E',
      600: '#343742',
    },
    // Secondary Canvas: Warm Ivory / Off-White
    ivory: {
      50: '#FFFFFF',
      100: '#FAF9F6', // Primary canvas background
      200: '#F5F3EF', // Muted surface
      300: '#EDEAE4',
      400: '#E6E2DB', // Hairline borders
    },
    // Accent: Refined Champagne Gold (Subtle, never garish)
    gold: {
      light: '#FBF8F3',
      subtle: '#EFE8DD',
      border: '#DFD5C4',
      accent: '#C5A880', // Primary Champagne Gold
      hover: '#B8935A',
      dark: '#916F3E',
      deep: '#6F5229',
    },
    // Supporting Neutral Grays
    gray: {
      soft: '#F5F3EF',
      medium: '#E6E2DB',
      dark: '#65625D',
      muted: '#8E8B85',
      lightBorder: '#D4D0C7',
    },
    // Semantic States (accessible WCAG AA contrast)
    semantic: {
      success: {
        text: '#1E5638',
        bg: '#F2F7F4',
        border: '#CDE3D5',
        solid: '#2E7D32',
      },
      warning: {
        text: '#8A5814',
        bg: '#FBF6EE',
        border: '#ECD8B6',
        solid: '#ED6C02',
      },
      error: {
        text: '#B42318',
        bg: '#FEF3F2',
        border: '#FECDCA',
        solid: '#D32F2F',
      },
      info: {
        text: '#175CD3',
        bg: '#EFF8FF',
        border: '#B2DDFF',
        solid: '#0288D1',
      },
    },
  },

  // Spacing Scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120)
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    30: '120px',
  },

  // Restrained Radius System
  radius: {
    sm: '4px', // Inputs, minor badges
    md: '8px', // Buttons, cards, popovers
    lg: '12px', // Marketplace cards, modals
    xl: '16px', // Drawers, hero blocks
    pill: '9999px', // Small tags, search bar
  },

  // Minimal Shadow System (Subtle, non-glow)
  shadows: {
    sm: '0 1px 2px 0 rgba(18, 19, 22, 0.04)',
    md: '0 4px 12px -2px rgba(18, 19, 22, 0.06), 0 2px 4px -2px rgba(18, 19, 22, 0.03)',
    lg: '0 12px 24px -4px rgba(18, 19, 22, 0.08), 0 4px 8px -2px rgba(18, 19, 22, 0.04)',
  },

  // Typography Hierarchy
  typography: {
    display: {
      size: '2.5rem', // 40px
      lineHeight: '1.2',
      weight: '700',
    },
    h1: {
      size: '2rem', // 32px
      lineHeight: '1.25',
      weight: '700',
    },
    h2: {
      size: '1.5rem', // 24px
      lineHeight: '1.3',
      weight: '600',
    },
    h3: {
      size: '1.25rem', // 20px
      lineHeight: '1.4',
      weight: '600',
    },
    h4: {
      size: '1rem', // 16px
      lineHeight: '1.4',
      weight: '600',
    },
    bodyLarge: {
      size: '1.125rem', // 18px
      lineHeight: '1.6',
      weight: '400',
    },
    body: {
      size: '0.9375rem', // 15px
      lineHeight: '1.6',
      weight: '400',
    },
    bodySmall: {
      size: '0.8125rem', // 13px
      lineHeight: '1.5',
      weight: '400',
    },
    caption: {
      size: '0.6875rem', // 11px
      lineHeight: '1.4',
      weight: '500',
    },
  },
} as const;
