# Components 目录

此目录用于存放可复用的 Tamagui 组件。

## 设计规范

所有组件应遵循 Freya V3 的"神秘奢华"设计风格：

- **大圆角**: 使用 `borderRadius="$4"` (20px) 或 `$5` (24px)
- **金色渐变**: 使用 `$goldPrimary` 和 `$goldSecondary` 颜色
- **卡片背景**: 使用 `$backgroundStrong` (80% 透明度)
- **文本颜色**: 主文本 `$color`，次要文本 `$colorTransparent`

## 示例组件

可以参考以下组件结构：

```typescript
import { YStack, XStack, Text } from 'tamagui';

export function MyCard({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      backgroundColor="$backgroundStrong"
      borderRadius="$4"
      padding="$4"
      space="$3"
    >
      {children}
    </YStack>
  );
}
```
