# 安全区域支持文档

## 概述

Freya V4 完整支持所有平台的安全区域适配：
- ✅ **iOS** - 系统安全区域（刘海屏、底部手势条等）
- ✅ **Android** - 系统安全区域（状态栏、导航栏、底部手势条等）
- ✅ **Telegram Mini App** - Telegram SDK 安全区域（系统 + 内容安全区）

## 平台差异

### iOS 安全区域

iOS 设备的安全区域包括：
- **顶部**：状态栏 + 刘海（iPhone X 及以后）
  - iPhone X/11/12/13/14/15: ~44-47px
  - iPhone 14 Pro Max: ~59px（动态岛）
- **底部**：底部手势条
  - 通常 ~34px
- **左右**：横屏时的安全边距

### Android 安全区域

Android 设备的安全区域包括：
- **顶部**：状态栏高度
  - 通常 ~24-32px（取决于设备）
- **底部**：导航栏或手势条
  - 导航栏：~48px
  - 手势条：~16-24px
- **左右**：横屏时的安全边距

### Telegram Mini App 安全区域

Telegram Mini App 的安全区域是**叠加值**：
```
总安全区域 = safeAreaInset.top + contentSafeAreaInset.top
```

- **`safeAreaInset.top`**：系统级安全区（iOS 刘海、Android 状态栏）
- **`contentSafeAreaInset.top`**：Telegram UI 占用的区域（悬浮按钮等）

## 实现原理

### 1. 使用 react-native-safe-area-context

项目使用 `react-native-safe-area-context` 库来获取原生平台的安全区域：

```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// iOS/Android 自动获取系统安全区域
const insets = useSafeAreaInsets();
// { top: 47, bottom: 34, left: 0, right: 0 } (示例)
```

### 2. 跨平台统一 Hook

`useSafeArea` Hook 自动根据平台返回正确的安全区域：

```typescript
export const useSafeArea = (): SafeAreaInsets => {
  const nativeInsets = useSafeAreaInsets(); // iOS/Android
  
  // Telegram 环境使用 Telegram SDK
  if (isTelegram) {
    return getTelegramSafeAreaInsets();
  }
  
  // iOS/Android 使用系统安全区域
  return nativeInsets;
};
```

## 使用方式

### 方式 1: 使用 Hook（推荐）

```typescript
import { useSafeAreaStyle } from '@/hooks/useSafeArea';

export default function MyScreen() {
  // 自动处理顶部和底部安全区域
  const safeArea = useSafeAreaStyle(['top', 'bottom']);
  
  return (
    <YStack {...safeArea}>
      <Text>内容在安全区域内</Text>
    </YStack>
  );
}
```

### 方式 2: 获取具体数值

```typescript
import { useSafeArea } from '@/hooks/useSafeArea';

export default function MyScreen() {
  const { top, bottom } = useSafeArea();
  
  return (
    <YStack paddingTop={top} paddingBottom={bottom}>
      <Text>内容在安全区域内</Text>
    </YStack>
  );
}
```

### 方式 3: 仅头部或底部

```typescript
import { useHeaderSafeArea, useBottomSafeArea } from '@/hooks/useSafeArea';

export default function MyScreen() {
  const headerTop = useHeaderSafeArea(); // 仅顶部
  const bottomPadding = useBottomSafeArea(); // 仅底部
  
  return (
    <>
      <YStack position="absolute" top={0} paddingTop={headerTop}>
        <Text>固定头部</Text>
      </YStack>
      
      <YStack position="absolute" bottom={0} paddingBottom={bottomPadding}>
        <Button>底部按钮</Button>
      </YStack>
    </>
  );
}
```

## 实际效果

### iOS 设备（iPhone 14 Pro）

```
┌─────────────────────────┐
│  [状态栏 + 动态岛]        │ ← top: ~59px
│                         │
│  应用内容区域            │
│                         │
│                         │
│  [底部手势条]            │ ← bottom: ~34px
└─────────────────────────┘
```

### Android 设备

```
┌─────────────────────────┐
│  [状态栏]                │ ← top: ~24-32px
│                         │
│  应用内容区域            │
│                         │
│                         │
│  [导航栏/手势条]         │ ← bottom: ~16-48px
└─────────────────────────┘
```

### Telegram Mini App（全屏模式）

```
┌─────────────────────────┐
│  [系统安全区]             │ ← safeAreaInset.top
│  [Telegram 悬浮按钮]      │ ← contentSafeAreaInset.top
│                         │
│  应用内容区域            │
│                         │
│                         │
│  [底部安全区]            │ ← safeAreaInset.bottom
└─────────────────────────┘
```

## 注意事项

### ✅ 最佳实践

1. **统一使用 Hook**：使用 `useSafeArea` 或 `useSafeAreaStyle`，不要硬编码数值
2. **SafeAreaProvider 已配置**：根布局已包裹 `SafeAreaProvider`，无需额外配置
3. **自动适配**：Hook 会自动根据平台返回正确的值

### ❌ 常见错误

1. **硬编码安全区数值**
   ```typescript
   // ❌ 错误
   <YStack paddingTop={44}>
   
   // ✅ 正确
   const safeArea = useSafeAreaStyle(['top']);
   <YStack {...safeArea}>
   ```

2. **忘记处理底部安全区**
   ```typescript
   // ❌ 错误（底部内容可能被遮挡）
   const safeArea = useSafeAreaStyle(['top']);
   
   // ✅ 正确
   const safeArea = useSafeAreaStyle(['top', 'bottom']);
   ```

3. **在 Telegram 环境使用原生安全区**
   ```typescript
   // ❌ 错误（Telegram 需要特殊处理）
   const insets = useSafeAreaInsets();
   
   // ✅ 正确（自动处理）
   const insets = useSafeArea();
   ```

## 调试技巧

### 查看当前安全区域值

```typescript
import { useSafeArea } from '@/hooks/useSafeArea';

export default function DebugScreen() {
  const insets = useSafeArea();
  
  console.log('安全区域:', insets);
  // iOS: { top: 47, bottom: 34, left: 0, right: 0 }
  // Android: { top: 24, bottom: 48, left: 0, right: 0 }
  // Telegram: { top: 91, bottom: 0, left: 0, right: 0 }
  
  return (
    <YStack>
      <Text>Top: {insets.top}px</Text>
      <Text>Bottom: {insets.bottom}px</Text>
    </YStack>
  );
}
```

### 可视化安全区域

```typescript
import { useSafeArea } from '@/hooks/useSafeArea';
import { YStack, Text } from 'tamagui';

export default function VisualDebugScreen() {
  const { top, bottom } = useSafeArea();
  
  return (
    <YStack flex={1}>
      {/* 顶部安全区域可视化 */}
      <YStack 
        height={top} 
        backgroundColor="rgba(255, 0, 0, 0.3)"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Top Safe Area: {top}px</Text>
      </YStack>
      
      {/* 内容区域 */}
      <YStack flex={1} backgroundColor="$background">
        <Text>内容区域</Text>
      </YStack>
      
      {/* 底部安全区域可视化 */}
      <YStack 
        height={bottom} 
        backgroundColor="rgba(0, 255, 0, 0.3)"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Bottom Safe Area: {bottom}px</Text>
      </YStack>
    </YStack>
  );
}
```

## 总结

- ✅ iOS/Android 安全区通过 `react-native-safe-area-context` 自动获取
- ✅ Telegram 安全区通过 Telegram SDK 获取（叠加系统+内容安全区）
- ✅ `useSafeArea` Hook 统一处理所有平台
- ✅ 无需手动配置，开箱即用
