/**
 * Astra AI 设计系统 Token
 * 
 * 风格：Celestial Elegance（天体优雅）
 * 深邃暗蓝紫 + 奶油金 + 羊皮纸高亮卡
 * 
 * ╔═══════════════════════════════════════════╗
 * ║  背景层 #1C1B2E → #252438 → #2D2C40      ║
 * ║  主色调 奶油金 #E4D5A8                    ║
 * ║  高亮卡 羊皮纸 #E8D5A0                    ║
 * ║  正文   暖白 #EDE7D9                      ║
 * ║  辅助   柔灰 #9A96A0                      ║
 * ╚═══════════════════════════════════════════╝
 */

// ============================================================
// 调色板
// ============================================================

export const palette = {
  // --- 背景层 ---
  bgDeep:      '#1C1B2E',  // 主页面背景
  bgSurface:   '#252438',  // 二级面板/导航栏
  bgCard:      '#2D2C40',  // 卡片实色
  bgCardAlpha: 'rgba(45, 44, 64, 0.70)', // 玻璃卡片
  bgInput:     'rgba(35, 34, 55, 0.60)', // 输入框
  bgBottomBar: '#141420',  // 底栏

  // --- 奶油金 ---
  creamGold:      '#E4D5A8',  // 主色调 (CTA / 图标 / 标题)
  creamGoldLight: '#EDE0BF',  // hover
  creamGoldDark:  '#C9BA8A',  // pressed

  // --- 羊皮纸 ---
  parchment:      '#E8D5A0',  // 高亮卡背景
  parchmentLight: '#F0E0B8',
  parchmentText:  '#2A2520',  // 卡片上深色文字

  // --- 文字 ---
  textPrimary:   '#FFFFFF',  // 主文字 (纯白)
  textSecondary: '#A8A8B0',  // 次级文字 (浅灰)
  textMuted:     '#7A7A82',  // 占位/禁用 (浅灰)
  textLink:      '#C8BFA0',  // 链接

  // --- 边框 ---
  border:      '#3A3950',
  borderLight: '#4A4960',
  divider:     '#7A7A82',  // 分割线（浅白色）

  // --- 功能色 ---
  success: '#6ECF97',
  warning: '#E8B84D',
  error:   '#E85D5D',
  info:    '#6BA3CF',
} as const;

// ============================================================
// 间距 & 尺寸
// ============================================================

export const spacing = {
  /** 极小间距 4px */
  xs: 4,
  /** 小间距 8px */
  sm: 8,
  /** 中间距 12px */
  md: 12,
  /** 默认间距 16px */
  base: 16,
  /** 大间距 20px */
  lg: 20,
  /** 特大间距 24px */
  xl: 24,
  /** 超大间距 32px */
  xxl: 32,
  /** 巨大间距 48px */
  xxxl: 48,
} as const;

export const layout = {
  /** 页面水平内边距 */
  pagePaddingH: 20,
  /** 页面顶部内边距（不含安全区域） */
  pagePaddingT: 16,
  /** 卡片间距 */
  cardGap: 12,
  /** 底部导航高度 */
  bottomNavHeight: 60,
  /** 头部高度 */
  headerHeight: 56,
} as const;

// ============================================================
// 圆角
// ============================================================

export const radius = {
  /** 小圆角 8px */
  sm: 8,
  /** 中圆角 12px */
  md: 12,
  /** 默认圆角 16px */
  base: 16,
  /** 大圆角 20px - 问答卡片 */
  lg: 20,
  /** 特大圆角 24px - 内容卡片 */
  xl: 24,
  /** 药丸圆角 28px - CTA 按钮 */
  pill: 28,
  /** 全圆 9999px - 圆形头像 */
  full: 9999,
} as const;

// ============================================================
// 字体
// ============================================================

export const typography = {
  /** 衬线体 - 用于大标题/品牌元素 */
  serif: 'PlayfairDisplay',
  /** 无衬线体 - 用于正文/UI元素 */
  sans: 'Inter',

  /** 字号 */
  size: {
    /** 极小 11px */
    xs: 11,
    /** 小 13px */
    sm: 13,
    /** 默认 15px */
    base: 15,
    /** 中 17px */
    md: 17,
    /** 大 20px */
    lg: 20,
    /** 特大 24px */
    xl: 24,
    /** 超大 32px - 页面标题 */
    xxl: 32,
    /** 巨大 40px - Hero 标题 */
    hero: 40,
  },

  /** 字重 */
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  /** 行高 */
  lineHeight: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

// ============================================================
// 动效
// ============================================================

export const animation = {
  /** 快速过渡 150ms */
  fast: 150,
  /** 默认过渡 250ms */
  normal: 250,
  /** 慢速过渡 400ms */
  slow: 400,
  /** 弹性曲线 */
  spring: {
    damping: 15,
    mass: 1,
    stiffness: 150,
  },
} as const;

// ============================================================
// 阴影
// ============================================================

export const shadows = {
  /** 小阴影 - 卡片浮起 */
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  /** 中阴影 - 悬浮面板 */
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  /** 大阴影 - 弹窗/模态 */
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  /** 发光效果 - CTA 按钮 */
  glow: {
    shadowColor: '#E4D5A8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;
