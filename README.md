# Freya V4 - 多平台开发框架

基于 Expo (React Native) 的多平台开发框架，支持：
- 🌐 **Web** (Telegram Mini App)
- 📱 **iOS**
- 🤖 **Android**

## 技术栈

- **Expo** ~52.0.0
- **React Native** 0.76.5
- **TypeScript** 5.3.3
- **Expo Router** ~4.0.0 (文件路由)
- **Tamagui** ~1.120.0 (高性能 UI 框架)
- **react-native-safe-area-context** ~4.12.0 (安全区域支持)

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 启动开发服务器（所有平台）
npm start

# 仅 Web (Telegram Mini App)
npm run web

# 仅 iOS
npm run ios

# 仅 Android
npm run android
```

### 构建

```bash
# 构建 Web 版本（用于 Telegram Mini App）
npm run build:web

# 构建 iOS（需要 EAS）
npm run build:ios

# 构建 Android（需要 EAS）
npm run build:android
```

## Telegram Mini App 集成

项目已集成 Telegram Mini App SDK，在 Web 环境下自动检测并使用。

### 使用 Telegram SDK

```typescript
import { TelegramSDK } from '@/utils/telegram';

const telegram = TelegramSDK.getInstance();

if (telegram.isAvailable()) {
  const user = telegram.getUser();
  console.log('Telegram 用户:', user);
}
```

### 部署到 Telegram

1. 构建 Web 版本：`npm run build:web`
2. 将 `web-build` 目录部署到服务器
3. 在 BotFather 中设置 Web App URL

## 安全区域支持

项目已完整实现**跨平台安全区域支持**，自动适配所有平台：

### 支持的平台

- ✅ **iOS** - 系统安全区域（刘海屏、底部手势条等）
- ✅ **Android** - 系统安全区域（状态栏、导航栏、底部手势条等）
- ✅ **Telegram Mini App** - Telegram SDK 安全区域（系统 + 内容安全区）

### 核心实现

使用 `react-native-safe-area-context` 获取 iOS/Android 系统安全区域，Telegram 环境使用 Telegram SDK：

```typescript
// iOS/Android: 自动获取系统安全区域
// Telegram: 叠加 safeAreaInset.top + contentSafeAreaInset.top
const { top, bottom } = useSafeArea();
```

### 使用安全区域 Hook

```typescript
import { useSafeArea, useSafeAreaStyle } from '@/hooks/useSafeArea';

// 方式1: 获取具体数值
const { top, bottom } = useSafeArea();
<YStack paddingTop={top} paddingBottom={bottom}>
  {/* 内容 */}
</YStack>

// 方式2: 直接展开样式对象（推荐）
const safeArea = useSafeAreaStyle(['top', 'bottom']);
<YStack {...safeArea}>
  {/* 内容 */}
</YStack>

// 方式3: 仅头部安全区域
const headerTop = useHeaderSafeArea();
<YStack position="absolute" top={0} paddingTop={headerTop}>
  {/* 固定头部 */}
</YStack>
```

### 安全区域特性

- ✅ **自动检测平台**：iOS/Android/Telegram 自动适配
- ✅ **iOS 支持**：刘海屏、动态岛、底部手势条
- ✅ **Android 支持**：状态栏、导航栏、手势条
- ✅ **Telegram 支持**：叠加系统安全区和内容安全区
- ✅ **监听变化**：Telegram 环境自动监听安全区域变化
- ✅ **同步 CSS 变量**：Telegram 环境同步到 `--telegram-safe-area-top`
- ✅ **统一 API**：所有平台使用相同的 Hook

详细文档请参考：[doc/SAFE-AREA.md](./doc/SAFE-AREA.md)

## 项目结构

```
freyav4/
├── app/                  # Expo Router 路由目录
│   ├── _layout.tsx      # 根布局（已集成 SafeAreaProvider）
│   ├── index.tsx        # 首页
│   └── telegram.html    # Telegram Mini App HTML 模板
├── providers/            # 提供者组件
│   └── TamaguiProvider.tsx  # Tamagui 主题提供者
├── hooks/                # React Hooks
│   └── useSafeArea.ts    # 安全区域 Hook
├── components/           # 可复用组件
├── utils/                # 工具函数
│   ├── telegram.ts       # Telegram SDK 封装
│   └── platform.ts       # 平台检测工具
├── assets/               # 静态资源
├── tamagui.config.ts     # Tamagui 主题配置
├── app.json              # Expo 配置
└── package.json          # 依赖配置
```

## 设计规范

项目遵循 Freya V3 的"神秘奢华"暗色设计风格：
- 主背景: #0D0B0A ~ #1A1614
- 金色主调: #C49A6C → #D4A574
- 正文白: #F5F0EB

## Tamagui UI 框架

项目已集成 Tamagui，提供高性能的跨平台 UI 组件。

### 使用 Tamagui 组件

```typescript
import { YStack, XStack, Button, Text, H2 } from 'tamagui';

export function MyComponent() {
  return (
    <YStack space="$4" padding="$4">
      <H2 color="$goldSecondary">标题</H2>
      <Button backgroundColor="$goldPrimary" borderRadius="$4">
        按钮
      </Button>
    </YStack>
  );
}
```

### 主题颜色

- `$background` - 主背景 (#0D0B0A)
- `$goldPrimary` - 金色主调 (#C49A6C)
- `$goldSecondary` - 金色次调 (#D4A574)
- `$color` - 正文白 (#F5F0EB)
- `$colorTransparent` - 辅助灰 (#8A8480)

## 开发说明

- 使用 TypeScript 进行类型检查
- 使用 Expo Router 进行文件路由
- 使用 Tamagui 进行 UI 开发
- 支持热重载和快速刷新
- 跨平台代码共享，平台特定代码使用 `Platform.OS` 判断
- 完整的安全区域支持（iOS/Android/Telegram）
