import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

/**
 * Freya V2 Design Theme
 * 
 * Aesthetic: Minimalist Celestial (极简天体)
 * Style: High Contrast, Thin Lines, Deep Space, Elegant Typography
 * 
 * Palette:
 * - Background: Deep Void (#0D0B14) to Nebula Navy (#1A192B)
 * - Text: Sharp White (#FFFFFF) & Starlight Silver (#BFBFCC)
 * - Accent: Pale Gold (#D4C5A3) - Reduced saturation for elegance
 * - Structural: Wired Frames (1px borders), No Fill
 */

// ===== Design Patterns =====
// 1. "The Void": Use bgDeep for main screens. No gradients unless subtle nebula effects.
// 2. "Starlight": Gold is ONLY for key actions (buttons) or active states.
// 3. "Structure": Use borderStrong for cards instead of fills.

const palette = {
  // --- Deep Space Backgrounds ---
  bgDeep: '#1A1825',  // Lighter deep void
  bgDeepEnd: '#3E3B54',  // Lighter nebula gradient end
  bgSurface: '#15141F',  // Panels / Lists
  bgCard: '#1C1B26',  // Cards (Subtle fill)
  bgCardAlpha: 'rgba(28, 27, 38, 0.60)', // Glass / Overlay
  bgInput: 'rgba(255, 255, 255, 0.03)', // Subtle input bg
  bgBottomBar: '#08070C',  // Deepest black for stability

  // --- Celestial Accents ---
  // A cooler, desaturated gold for elegance, not gaudiness
  gold: '#D4C5A3',
  goldLight: '#EBE1C9',
  goldDark: '#8C7F60',

  // --- Sharp Contrast ---
  sharpWhite: '#FFFFFF',  // Primary Text / Active Icons
  silver: '#BFBFCC',  // Secondary Text
  muted: '#60606B',  // Disabled / Placeholders

  // --- Structural Lines ---
  border: 'rgba(255, 255, 255, 0.1)',  // Subtle structural lines (dividers)
  borderStrong: 'rgba(255, 255, 255, 0.3)',  // Active borders (card outlines)
  divider: 'rgba(255, 255, 255, 0.08)',

  // --- Functional ---
  success: '#96E0B3',
  warning: '#E0C796',
  error: '#E09696',
  info: '#96BCE0',
};

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,

    // ===== Base Dark Theme (The Void) =====
    // Default theme for the entire app
    dark: {
      key: 'dark',
      // Backgrounds: Deep and largely void-like
      background: palette.bgDeep,
      backgroundHover: palette.bgSurface,
      backgroundPress: palette.bgSurface,
      backgroundFocus: palette.bgSurface,
      backgroundStrong: palette.bgCard,
      backgroundTransparent: 'transparent',

      // Text: High contrast white on black
      color: palette.sharpWhite,
      colorHover: palette.sharpWhite,
      colorPress: palette.goldLight,
      colorFocus: palette.sharpWhite,
      colorTransparent: palette.silver,

      // Borders: Thin, subtle lines define structure
      borderColor: palette.border,
      borderColorHover: palette.borderStrong,
      borderColorFocus: palette.gold,
      borderColorPress: palette.gold,

      // Placeholders
      placeholderColor: palette.muted,

      // Shadows: Minimal or None (Flat design preference)
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowColorHover: 'rgba(0,0,0,0.7)',
    },

    // ===== Wired Theme (For Cards/Sections) =====
    // High contrast borders, transparent backgrounds. 
    // "Wireframe" look typical of star charts.
    dark_wired: {
      parent: 'dark',
      background: 'transparent',
      backgroundHover: 'rgba(255,255,255,0.03)',
      backgroundPress: 'rgba(255,255,255,0.05)',

      // Explicitly set all border states to ensure priority
      borderColor: palette.borderStrong,
      borderColorHover: palette.gold,
      borderColorPress: palette.gold,
      borderColorFocus: palette.gold,

      color: palette.sharpWhite,
    },

    // ===== Gold Accent Theme (Important CTAs) =====
    dark_gold: {
      parent: 'dark',
      background: palette.gold,
      backgroundHover: palette.goldLight,
      backgroundPress: palette.goldDark,
      color: palette.bgDeep, // Dark text on Gold bg
      borderColor: palette.gold,
    },

    // ===== Glass Theme (Overlays/Modals) =====
    dark_glass: {
      parent: 'dark',
      background: palette.bgCardAlpha,
      borderColor: 'rgba(255,255,255,0.1)',
      color: palette.sharpWhite,
      shadowColor: 'rgba(0,0,0,0.5)',
    },
  },

  fonts: {
    ...config.fonts,
    // Sans-serif: Clean, modern, legible (Roboto or Inter)
    body: {
      family: 'Roboto_400Regular, system-ui, sans-serif',
      size: config.fonts.body?.size || {},
      lineHeight: config.fonts.body?.lineHeight || {},
      weight: {
        ...config.fonts.body?.weight,
        4: '400',
        5: '500',
        6: '500',
        7: '700',
      },
      letterSpacing: config.fonts.body?.letterSpacing || {},
      face: {
        400: { normal: 'Roboto_400Regular' },
        500: { normal: 'Roboto_500Medium' },
        700: { normal: 'Roboto_700Bold' },
      },
    },
    // Serif: Elegant, editorial, mystical (Playfair Display)
    heading: {
      family: 'PlayfairDisplay_400Regular, Georgia, serif',
      size: config.fonts.body?.size || {},
      lineHeight: config.fonts.body?.lineHeight || {},
      weight: config.fonts.body?.weight || {},
      letterSpacing: config.fonts.body?.letterSpacing || {},
      face: {
        400: { normal: 'PlayfairDisplay_400Regular' },
        700: { normal: 'PlayfairDisplay_700Bold' },
      },
    },
  },

  tokens: {
    ...config.tokens,

    radius: {
      ...config.tokens.radius,
      0: 0,
      1: 2,  // Sharper corners for minimalist look
      2: 4,
      3: 8,
      4: 12, // Standard Card Radius
      5: 16,
      true: 8,
    },

    color: {
      ...config.tokens.color,

      // Core Palette
      bgDeep: palette.bgDeep,
      bgCardAlpha: palette.bgCardAlpha,


      textPrimary: palette.sharpWhite,
      textSecondary: palette.silver,
      textMuted: palette.muted,

      gold: palette.gold,
      creamGold: palette.gold,
      silver: palette.silver,

      border: palette.border,
      borderStrong: palette.borderStrong,

      success: palette.success,
      error: palette.error,
    },
  },
});

export default appConfig;

// Export palette for raw usage if needed
export { palette };

export type Conf = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf { }
}
