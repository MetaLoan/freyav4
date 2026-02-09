import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

/**
 * Astra AI 设计主题
 * 
 * 设计风格：Celestial Elegance（天体优雅）
 * 深邃暗蓝紫背景 + 奶油金点缀 + 羊皮纸高亮卡片
 * 
 * 参考产品：Astra AI 占星应用
 * 
 * ┌─────────────────────────────────────┐
 * │ 色彩体系                            │
 * ├─────────────────────────────────────┤
 * │ 背景层：#1C1B2E → #252438 (深邃蓝紫) │
 * │ 表面层：#2D2C40 / rgba(45,44,64,0.7) │
 * │ 主色调：#E4D5A8 奶油金              │
 * │ 羊皮纸：#E8D5A0 高亮卡片背景        │
 * │ 正文色：#EDE7D9 暖白                │
 * │ 辅助色：#9A96A0 柔灰                │
 * │ 边框色：#3A3950 暗边框              │
 * └─────────────────────────────────────┘
 */

// ===== 设计 Token =====
const palette = {
  // --- 背景层 ---
  bgDeep:     '#25272E',  // 主背景（渐变起点）
  bgDeepEnd:  '#5E5E67',  // 主背景（渐变终点）
  bgSurface:  '#252438',  // 次级面板/导航栏
  bgCard:     '#2D2C40',  // 卡片背景
  bgCardAlpha:'rgba(45, 44, 64, 0.70)', // 半透明卡片（玻璃拟态）
  bgInput:    'rgba(35, 34, 55, 0.60)', // 输入框底色
  bgBottomBar:'#141420',  // 底部导航栏

  // --- 主色调（奶油金）---
  creamGold:     '#E4D5A8',  // CTA按钮/图标/标题强调
  creamGoldLight:'#EDE0BF',  // hover 高亮
  creamGoldDark: '#C9BA8A',  // pressed 按下

  // --- 羊皮纸（高亮卡片）---
  parchment:     '#E8D5A0',  // 羊皮纸卡片背景
  parchmentLight:'#F0E0B8',  // 羊皮纸浅色
  parchmentText: '#2A2520',  // 羊皮纸上的深色文字

  // --- 文字色 ---
  textPrimary:   '#FFFFFF',  // 主标题/正文（纯白）
  textSecondary: '#A8A8B0',  // 次级文字/标签（浅灰）
  textMuted:     '#7A7A82',  // 占位符/禁用文字（浅灰）
  textLink:      '#C8BFA0',  // 链接/可点击文字

  // --- 边框/分割线 ---
  border:        '#3A3950',  // 卡片/输入框边框
  borderLight:   '#4A4960',  // hover 边框
  divider:       '#7A7A82',  // 分割线（浅白色）

  // --- 功能色 ---
  success:  '#6ECF97',  // 成功
  warning:  '#E8B84D',  // 警告
  error:    '#E85D5D',  // 错误
  info:     '#6BA3CF',  // 信息
};

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,

    // ===== 暗色主题（默认） =====
    dark: {
      ...config.themes.dark,

      // 背景
      background:       palette.bgDeep,
      backgroundHover:  palette.bgSurface,
      backgroundPress:  palette.bgSurface,
      backgroundFocus:  palette.bgSurface,
      backgroundStrong: palette.bgCard,
      backgroundTransparent: palette.bgCardAlpha,

      // 文本
      color:            palette.textPrimary,
      colorHover:       palette.textPrimary,
      colorPress:       palette.textPrimary,
      colorFocus:       palette.textPrimary,
      colorTransparent: palette.textSecondary,

      // 边框
      borderColor:      palette.border,
      borderColorHover: palette.borderLight,
      borderColorFocus: palette.creamGold,
      borderColorPress: palette.border,

      // 占位符
      placeholderColor: palette.textMuted,

      // 阴影
      shadowColor:      'rgba(0, 0, 0, 0.3)',
      shadowColorHover: 'rgba(0, 0, 0, 0.4)',

      // 强调色映射
      blue1:    palette.bgDeep,
      blue2:    palette.bgSurface,
      blue3:    palette.bgCard,
      blue10:   palette.creamGold,
      blue11:   palette.creamGoldLight,
      blue12:   palette.textPrimary,

      orange10: palette.warning,
      orange11: palette.parchment,

      green10:  palette.success,
      red10:    palette.error,
    },

    // ===== 奶油金子主题（CTA 按钮/高亮元素） =====
    dark_creamGold: {
      ...config.themes.dark,
      background:       palette.creamGold,
      backgroundHover:  palette.creamGoldLight,
      backgroundPress:  palette.creamGoldDark,
      backgroundFocus:  palette.creamGoldLight,
      color:            palette.bgDeep,
      colorHover:       palette.bgDeep,
      colorPress:       '#0E0D1A',
      borderColor:      palette.creamGold,
    },

    // ===== 羊皮纸子主题（高亮内容卡片） =====
    dark_parchment: {
      ...config.themes.dark,
      background:       palette.parchment,
      backgroundHover:  palette.parchmentLight,
      backgroundPress:  palette.parchmentLight,
      color:            palette.parchmentText,
      colorHover:       palette.parchmentText,
      colorPress:       palette.parchmentText,
      borderColor:      palette.parchment,
    },

    // ===== 表面子主题（卡片/面板） =====
    dark_surface: {
      ...config.themes.dark,
      background:       palette.bgCard,
      backgroundHover:  palette.bgSurface,
      backgroundPress:  palette.bgSurface,
      color:            palette.textPrimary,
      colorTransparent: palette.textSecondary,
      borderColor:      palette.border,
      borderColorHover: palette.borderLight,
    },

    // ===== 玻璃拟态子主题（输入框/浮层） =====
    dark_glass: {
      ...config.themes.dark,
      background:       palette.bgInput,
      backgroundHover:  'rgba(45, 44, 64, 0.50)',
      backgroundFocus:  'rgba(45, 44, 64, 0.70)',
      color:            palette.textPrimary,
      placeholderColor: palette.textMuted,
      borderColor:      palette.border,
      borderColorFocus: palette.creamGold,
    },
  },

  fonts: {
    ...config.fonts,
    // 无衬线体 - 用于正文/UI（覆盖默认）
    body: {
      family: 'Roboto_400Regular, system-ui, sans-serif',
      size: config.fonts.body?.size || {},
      lineHeight: config.fonts.body?.lineHeight || {},
      weight: {
        ...config.fonts.body?.weight,
        4: '400', // regular
        5: '500', // medium
        6: '500',
        7: '700', // bold
      },
      letterSpacing: config.fonts.body?.letterSpacing || {},
      face: {
        400: { normal: 'Roboto_400Regular' },
        500: { normal: 'Roboto_500Medium' },
        700: { normal: 'Roboto_700Bold' },
      },
    },
    // 衬线体 - 用于大标题和羊皮纸卡片
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

    // 圆角
    radius: {
      ...config.tokens.radius,
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,   // 卡片圆角
      7: 28,   // 大按钮圆角
      8: 32,   // 药丸按钮
      true: 24,
    },

    // 自定义颜色 Token
    color: {
      ...config.tokens.color,

      // 奶油金
      creamGold:      palette.creamGold,
      creamGoldLight: palette.creamGoldLight,
      creamGoldDark:  palette.creamGoldDark,

      // 羊皮纸
      parchment:      palette.parchment,
      parchmentLight: palette.parchmentLight,
      parchmentText:  palette.parchmentText,

      // 背景
      bgDeep:         palette.bgDeep,
      bgSurface:      palette.bgSurface,
      bgCard:         palette.bgCard,
      bgBottomBar:    palette.bgBottomBar,

      // 文字
      textPrimary:    palette.textPrimary,
      textSecondary:  palette.textSecondary,
      textMuted:      palette.textMuted,
      textLink:       palette.textLink,

      // 边框
      border:         palette.border,
      borderLight:    palette.borderLight,
      divider:        palette.divider,

      // 功能色
      success:        palette.success,
      warning:        palette.warning,
      error:          palette.error,
      info:           palette.info,
    },
  },
});

export default appConfig;

// 导出 palette 供直接使用
export { palette };

export type Conf = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
