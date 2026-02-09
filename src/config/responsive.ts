/**
 * Freya V4 自适应设计系统
 * 
 * 基于屏幕尺寸的响应式设计规范
 * 所有文字、组件、间距、边距等度量都遵循自适应原则
 * 
 * ╔═══════════════════════════════════════════╗
 * ║  设备断点                                 ║
 * ║  - xs: 320-374px  (小屏手机)             ║
 * ║  - sm: 375-479px  (中屏手机，基准)       ║
 * ║  - md: 480-767px  (大屏手机/平板竖屏)    ║
 * ║  - lg: 768-1023px (平板横屏)             ║
 * ║  - xl: 1024px+    (桌面/大屏)            ║
 * ╚═══════════════════════════════════════════╝
 */

import { Dimensions, Platform } from 'react-native';

// ============================================================
// 响应式断点
// ============================================================

export const breakpoints = {
  xs: 320,   // 小屏手机（iPhone SE）
  sm: 375,   // 标准手机（iPhone 13/14 - 基准尺寸）
  md: 480,   // 大屏手机/小平板
  lg: 768,   // 平板（iPad）
  xl: 1024,  // 桌面/大屏
} as const;

// ============================================================
// 屏幕信息获取
// ============================================================

export function getScreenDimensions() {
  const { width, height } = Dimensions.get('window');
  return { width, height };
}

export function getScreenWidth(): number {
  return Dimensions.get('window').width;
}

export function getScreenHeight(): number {
  return Dimensions.get('window').height;
}

// ============================================================
// 断点判断
// ============================================================

export function getBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
  const width = getScreenWidth();
  
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  return 'xl';
}

export function isXs() { return getScreenWidth() < breakpoints.sm; }
export function isSm() { return getScreenWidth() >= breakpoints.sm && getScreenWidth() < breakpoints.md; }
export function isMd() { return getScreenWidth() >= breakpoints.md && getScreenWidth() < breakpoints.lg; }
export function isLg() { return getScreenWidth() >= breakpoints.lg && getScreenWidth() < breakpoints.xl; }
export function isXl() { return getScreenWidth() >= breakpoints.xl; }

// 是否为移动设备（< 768px）
export function isMobile() { return getScreenWidth() < breakpoints.lg; }
// 是否为平板/桌面（>= 768px）
export function isTabletOrDesktop() { return getScreenWidth() >= breakpoints.lg; }

// ============================================================
// 自适应缩放函数
// ============================================================

/**
 * 基于屏幕宽度的线性缩放
 * 以 375px (iPhone 13/14) 为基准尺寸
 * 
 * @param size 基准尺寸（375px 屏幕下的像素值）
 * @param base 基准屏幕宽度，默认 375
 * @returns 缩放后的尺寸
 * 
 * @example
 * scale(16) // 在 375px 屏幕返回 16，在 750px 屏幕返回 32
 */
export function scale(size: number, base: number = breakpoints.sm): number {
  const width = getScreenWidth();
  return Math.round((width / base) * size);
}

/**
 * 适度缩放（平方根缩放）
 * 用于字体、组件高度等不需要完全线性缩放的场景
 * 在大屏上增长较慢，小屏上减小较慢
 * 
 * @param size 基准尺寸
 * @param factor 缩放因子 (0-1)，默认 0.5，越大缩放幅度越大
 * @returns 适度缩放后的尺寸
 * 
 * @example
 * moderateScale(16, 0.3) // 字体大小适度缩放
 */
export function moderateScale(size: number, factor: number = 0.5): number {
  const width = getScreenWidth();
  const baseWidth = breakpoints.sm;
  const scaleFactor = (width / baseWidth - 1) * factor + 1;
  return Math.round(size * scaleFactor);
}

/**
 * 垂直缩放（基于屏幕高度）
 * 用于垂直方向的间距、组件高度
 * 
 * @param size 基准尺寸
 * @param base 基准屏幕高度，默认 812 (iPhone 13/14)
 * @returns 垂直缩放后的尺寸
 */
export function verticalScale(size: number, base: number = 812): number {
  const height = getScreenHeight();
  return Math.round((height / base) * size);
}

/**
 * 响应式值选择器
 * 根据当前断点返回对应的值
 * 
 * @param values 各断点对应的值
 * @returns 当前断点的值
 * 
 * @example
 * responsive({ xs: 12, sm: 14, md: 16, lg: 18, xl: 20 })
 */
export function responsive<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}): T {
  const breakpoint = getBreakpoint();
  
  // 如果当前断点有值，返回
  if (values[breakpoint] !== undefined) {
    return values[breakpoint]!;
  }
  
  // 向下查找最近的断点值
  const breakpointOrder: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  for (let i = currentIndex - 1; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp]!;
    }
  }
  
  // 如果没有找到，返回第一个有值的
  for (const bp of breakpointOrder) {
    if (values[bp] !== undefined) {
      return values[bp]!;
    }
  }
  
  throw new Error('responsive: no value provided');
}

// ============================================================
// 自适应间距系统
// ============================================================

/**
 * 自适应间距（基于 scale）
 */
export const spacing = {
  /** 极小间距 4px */
  xs: () => scale(4),
  /** 小间距 8px */
  sm: () => scale(8),
  /** 中间距 12px */
  md: () => scale(12),
  /** 默认间距 16px */
  base: () => scale(16),
  /** 大间距 20px */
  lg: () => scale(20),
  /** 特大间距 24px */
  xl: () => scale(24),
  /** 超大间距 32px */
  xxl: () => scale(32),
  /** 巨大间距 48px */
  xxxl: () => scale(48),
  
  /** 自定义间距 */
  custom: (size: number) => scale(size),
} as const;

// ============================================================
// 自适应字体系统
// ============================================================

/**
 * 自适应字体大小（使用适度缩放）
 * 字体缩放因子为 0.2，避免在大屏上字体过大
 */
export const fontSize = {
  /** 极小 11px */
  xs: () => moderateScale(11, 0.2),
  /** 小 13px */
  sm: () => moderateScale(13, 0.2),
  /** 默认 15px */
  base: () => moderateScale(15, 0.2),
  /** 中 17px */
  md: () => moderateScale(17, 0.2),
  /** 大 20px */
  lg: () => moderateScale(20, 0.25),
  /** 特大 24px */
  xl: () => moderateScale(24, 0.25),
  /** 超大 32px - 页面标题 */
  xxl: () => moderateScale(32, 0.3),
  /** 巨大 36px - Hero 标题 */
  hero: () => moderateScale(36, 0.3),
  /** 超巨大 40px */
  display: () => moderateScale(40, 0.35),
  
  /** 自定义字体大小 */
  custom: (size: number, factor?: number) => moderateScale(size, factor),
} as const;

// ============================================================
// 自适应圆角系统
// ============================================================

/**
 * 自适应圆角（使用适度缩放）
 */
export const radius = {
  /** 小圆角 8px */
  sm: () => moderateScale(8, 0.2),
  /** 中圆角 12px */
  md: () => moderateScale(12, 0.2),
  /** 默认圆角 16px */
  base: () => moderateScale(16, 0.2),
  /** 大圆角 20px */
  lg: () => moderateScale(20, 0.2),
  /** 特大圆角 24px */
  xl: () => moderateScale(24, 0.2),
  /** 药丸圆角 28px */
  pill: () => moderateScale(28, 0.2),
  /** 全圆 9999px */
  full: 9999,
  
  /** 自定义圆角 */
  custom: (size: number) => moderateScale(size, 0.2),
} as const;

// ============================================================
// 自适应布局尺寸
// ============================================================

/**
 * 自适应布局尺寸
 */
export const layout = {
  /** 页面水平内边距 */
  pagePaddingH: () => responsive({ xs: 16, sm: 20, md: 24, lg: 32, xl: 40 }),
  
  /** 页面顶部内边距 */
  pagePaddingT: () => responsive({ xs: 12, sm: 16, md: 20, lg: 24, xl: 24 }),
  
  /** 卡片间距 */
  cardGap: () => responsive({ xs: 10, sm: 12, md: 14, lg: 16, xl: 16 }),
  
  /** 底部导航高度 */
  bottomNavHeight: () => responsive({ xs: 56, sm: 60, md: 64, lg: 72, xl: 80 }),
  
  /** 头部高度 */
  headerHeight: () => responsive({ xs: 48, sm: 56, md: 60, lg: 64, xl: 72 }),
  
  /** 内容最大宽度（桌面端） */
  contentMaxWidth: 1200,
  
  /** 自定义布局尺寸 */
  custom: (sizes: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }) => responsive(sizes),
} as const;

// ============================================================
// 自适应组件尺寸
// ============================================================

/**
 * 自适应按钮尺寸
 */
export const button = {
  /** 小按钮 */
  sm: {
    height: () => moderateScale(32, 0.2),
    paddingH: () => moderateScale(16, 0.2),
    fontSize: () => fontSize.sm(),
  },
  /** 中按钮（默认） */
  md: {
    height: () => moderateScale(40, 0.2),
    paddingH: () => moderateScale(20, 0.2),
    fontSize: () => fontSize.base(),
  },
  /** 大按钮 */
  lg: {
    height: () => moderateScale(48, 0.2),
    paddingH: () => moderateScale(24, 0.2),
    fontSize: () => fontSize.md(),
  },
  /** 特大按钮 */
  xl: {
    height: () => moderateScale(56, 0.2),
    paddingH: () => moderateScale(32, 0.2),
    fontSize: () => fontSize.lg(),
  },
} as const;

/**
 * 自适应输入框尺寸
 */
export const input = {
  /** 小输入框 */
  sm: {
    height: () => moderateScale(36, 0.2),
    paddingH: () => moderateScale(12, 0.2),
    fontSize: () => fontSize.sm(),
  },
  /** 中输入框（默认） */
  md: {
    height: () => moderateScale(44, 0.2),
    paddingH: () => moderateScale(16, 0.2),
    fontSize: () => fontSize.base(),
  },
  /** 大输入框 */
  lg: {
    height: () => moderateScale(52, 0.2),
    paddingH: () => moderateScale(20, 0.2),
    fontSize: () => fontSize.md(),
  },
} as const;

/**
 * 自适应卡片尺寸
 */
export const card = {
  /** 小卡片 */
  sm: {
    padding: () => moderateScale(12, 0.2),
    radius: () => radius.md(),
  },
  /** 中卡片（默认） */
  md: {
    padding: () => moderateScale(16, 0.2),
    radius: () => radius.lg(),
  },
  /** 大卡片 */
  lg: {
    padding: () => moderateScale(24, 0.2),
    radius: () => radius.xl(),
  },
} as const;

// ============================================================
// React Hook：监听屏幕尺寸变化
// ============================================================

import { useEffect, useState } from 'react';

/**
 * 监听屏幕尺寸变化的 Hook
 * 
 * @returns 当前断点
 * 
 * @example
 * const breakpoint = useBreakpoint();
 * if (breakpoint === 'xs') { ... }
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>(getBreakpoint());

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setBreakpoint(getBreakpoint());
    });

    return () => subscription?.remove();
  }, []);

  return breakpoint;
}

/**
 * 监听屏幕尺寸的 Hook
 * 
 * @returns 屏幕宽高
 */
export function useScreenDimensions() {
  const [dimensions, setDimensions] = useState(getScreenDimensions());

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
}

/**
 * 响应式值 Hook
 * 
 * @param values 各断点对应的值
 * @returns 当前断点的值
 * 
 * @example
 * const padding = useResponsive({ xs: 12, sm: 16, lg: 24 });
 */
export function useResponsive<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}): T {
  const breakpoint = useBreakpoint();
  
  // 实现与 responsive 函数相同的逻辑
  if (values[breakpoint] !== undefined) {
    return values[breakpoint]!;
  }
  
  const breakpointOrder: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  for (let i = currentIndex - 1; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp]!;
    }
  }
  
  for (const bp of breakpointOrder) {
    if (values[bp] !== undefined) {
      return values[bp]!;
    }
  }
  
  throw new Error('useResponsive: no value provided');
}

// ============================================================
// 导出所有工具
// ============================================================

export const R = {
  // 断点
  breakpoints,
  getBreakpoint,
  isXs,
  isSm,
  isMd,
  isLg,
  isXl,
  isMobile,
  isTabletOrDesktop,
  
  // 缩放函数
  scale,
  moderateScale,
  verticalScale,
  responsive,
  
  // 自适应系统
  spacing,
  fontSize,
  radius,
  layout,
  button,
  input,
  card,
  
  // Hooks
  useBreakpoint,
  useScreenDimensions,
  useResponsive,
} as const;
