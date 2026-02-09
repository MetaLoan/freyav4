import { Platform } from 'react-native';
import { isTelegram, getTelegramWebApp } from './platform';

/**
 * Telegram Mini App SDK 工具类
 * 仅在 Web 环境下可用
 * 
 * 安全区域计算严格遵循 Telegram SDK 8.0+ 规范：
 * 总安全区域高度 = safeAreaInset.top + contentSafeAreaInset.top
 */
export interface TelegramSafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export class TelegramSDK {
  private static instance: TelegramSDK | null = null;
  private telegram: any = null;

  private constructor() {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      this.telegram = (window as any).Telegram?.WebApp;
    }
  }

  static getInstance(): TelegramSDK {
    if (!TelegramSDK.instance) {
      TelegramSDK.instance = new TelegramSDK();
    }
    return TelegramSDK.instance;
  }

  /**
   * 检查是否在 Telegram 环境中
   */
  isAvailable(): boolean {
    return !!this.telegram;
  }

  /**
   * 获取用户信息
   */
  getUser() {
    if (!this.isAvailable()) return null;
    return this.telegram.initDataUnsafe?.user;
  }

  /**
   * 获取启动参数
   */
  getInitData() {
    if (!this.isAvailable()) return null;
    return this.telegram.initDataUnsafe;
  }

  /**
   * 显示主按钮
   */
  showMainButton(text: string, onClick: () => void) {
    if (!this.isAvailable()) return;
    this.telegram.MainButton.setText(text);
    this.telegram.MainButton.onClick(onClick);
    this.telegram.MainButton.show();
  }

  /**
   * 隐藏主按钮
   */
  hideMainButton() {
    if (!this.isAvailable()) return;
    this.telegram.MainButton.hide();
  }

  /**
   * 显示返回按钮
   */
  showBackButton(onClick: () => void) {
    if (!this.isAvailable()) return;
    this.telegram.BackButton.onClick(onClick);
    this.telegram.BackButton.show();
  }

  /**
   * 隐藏返回按钮
   */
  hideBackButton() {
    if (!this.isAvailable()) return;
    this.telegram.BackButton.hide();
  }

  /**
   * 关闭 Mini App
   */
  close() {
    if (!this.isAvailable()) return;
    this.telegram.close();
  }

  /**
   * 发送数据到 Bot
   */
  sendData(data: string) {
    if (!this.isAvailable()) return;
    this.telegram.sendData(data);
  }

  /**
   * 设置主题参数
   */
  setThemeParams(params: any) {
    if (!this.isAvailable()) return;
    this.telegram.setHeaderColor(params.bg_color);
    this.telegram.setBackgroundColor(params.bg_color);
  }

  /**
   * 获取主题颜色
   */
  getThemeParams() {
    if (!this.isAvailable()) return null;
    return this.telegram.themeParams;
  }

  /**
   * 获取原始 Telegram WebApp 对象
   */
  getRaw() {
    return this.telegram;
  }

  /**
   * 获取 Telegram 安全区域顶部高度
   * 叠加 safeAreaInset.top + contentSafeAreaInset.top
   * 
   * @returns 总安全区域高度（px），非 TMA 环境返回 0
   */
  getSafeAreaTop(): number {
    if (!this.isAvailable()) return 0;

    const systemTop = this.telegram.safeAreaInset?.top ?? 0;
    const contentTop = this.telegram.contentSafeAreaInset?.top ?? 0;
    const platform = this.telegram.platform || 'unknown';
    const isFullscreen = !!this.telegram.isFullscreen;

    const totalTop = systemTop + contentTop;

    console.log(
      `📱 [${platform}] SDK Insets (FS:${isFullscreen}): system=${systemTop}px, content=${contentTop}px, total=${totalTop}px`
    );

    return totalTop;
  }

  /**
   * 获取 Telegram 安全区域底部高度
   * 
   * @returns 底部安全区域高度（px），非 TMA 环境返回 0
   */
  getSafeAreaBottom(): number {
    if (!this.isAvailable()) return 0;
    return this.telegram.safeAreaInset?.bottom ?? 0;
  }

  /**
   * 获取完整的 Telegram 安全区域 Insets
   */
  getSafeAreaInsets(): TelegramSafeAreaInsets {
    return {
      top: this.getSafeAreaTop(),
      bottom: this.getSafeAreaBottom(),
      left: 0,
      right: 0,
    };
  }

  /**
   * 将 Telegram 安全区域同步到 CSS 变量
   * 在 Web 端（TMA）环境下调用，确保 CSS 能读取到正确的安全区域值
   */
  syncSafeAreaToCSSVariables(): void {
    if (!this.isAvailable() || typeof document === 'undefined') return;

    const systemTop = this.telegram.safeAreaInset?.top ?? 0;
    const contentTop = this.telegram.contentSafeAreaInset?.top ?? 0;
    const totalTop = systemTop + contentTop;
    const bottom = this.telegram.safeAreaInset?.bottom ?? 0;

    const root = document.documentElement;
    root.style.setProperty('--telegram-safe-area-top', `${totalTop}px`);
    root.style.setProperty('--telegram-safe-area-bottom', `${bottom}px`);
    root.style.setProperty('--tg-safe-area-inset-top', `${systemTop}px`);
    root.style.setProperty('--tg-content-safe-area-inset-top', `${contentTop}px`);
  }
}

/**
 * 获取 Telegram 安全区域顶部高度（静态方法）
 * 叠加 safeAreaInset.top + contentSafeAreaInset.top
 */
export const getSafeAreaTop = (): number => {
  if (!isTelegram) return 0;
  const webApp = getTelegramWebApp();
  if (!webApp) return 0;

  const systemTop = webApp.safeAreaInset?.top ?? 0;
  const contentTop = webApp.contentSafeAreaInset?.top ?? 0;
  return systemTop + contentTop;
};

/**
 * 获取 Telegram 安全区域底部高度（静态方法）
 */
export const getSafeAreaBottom = (): number => {
  if (!isTelegram) return 0;
  const webApp = getTelegramWebApp();
  if (!webApp) return 0;
  return webApp.safeAreaInset?.bottom ?? 0;
};

/**
 * 获取完整的 Telegram 安全区域 Insets（静态方法）
 */
export const getTelegramSafeAreaInsets = (): TelegramSafeAreaInsets => {
  return {
    top: getSafeAreaTop(),
    bottom: getSafeAreaBottom(),
    left: 0,
    right: 0,
  };
};
