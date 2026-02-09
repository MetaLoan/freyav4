# 自适应设计系统 - 快速入门

## 5 分钟上手指南

### 1. 导入 R 工具

```typescript
import { R } from '@/config/responsive';
```

### 2. 替换所有固定尺寸

#### ❌ 之前（固定尺寸）

```typescript
<YStack padding={20} gap={12}>
  <Text fontSize={16}>标题</Text>
  <Text fontSize={14}>正文</Text>
  <Button height={44} paddingHorizontal={24} fontSize={15}>
    按钮
  </Button>
</YStack>
```

#### ✅ 现在（自适应）

```typescript
<YStack padding={R.spacing.lg()} gap={R.spacing.md()}>
  <Text fontSize={R.fontSize.base()}>标题</Text>
  <Text fontSize={R.fontSize.sm()}>正文</Text>
  <Button 
    height={R.button.md.height()} 
    paddingHorizontal={R.button.md.paddingH()}
    fontSize={R.button.md.fontSize()}
  >
    按钮
  </Button>
</YStack>
```

### 3. 常用场景速查表

| 场景 | 代码 |
|------|------|
| 页面外边距 | `padding={R.layout.pagePaddingH()}` |
| 卡片间距 | `gap={R.layout.cardGap()}` |
| 标题文字 | `fontSize={R.fontSize.xl()}` |
| 正文文字 | `fontSize={R.fontSize.base()}` |
| 小文字 | `fontSize={R.fontSize.sm()}` |
| 卡片圆角 | `borderRadius={R.radius.xl()}` |
| 按钮圆角 | `borderRadius={R.radius.pill()}` |
| 小间距 | `gap={R.spacing.sm()}` |
| 默认间距 | `gap={R.spacing.base()}` |
| 大间距 | `gap={R.spacing.lg()}` |

### 4. 响应式布局

```typescript
// 移动端垂直，桌面端水平
function MyComponent() {
  const isMobile = R.isMobile();
  const Container = isMobile ? YStack : XStack;
  
  return (
    <Container gap={R.spacing.lg()}>
      <YStack flex={1}>{/* 左侧 */}</YStack>
      <YStack flex={1}>{/* 右侧 */}</YStack>
    </Container>
  );
}
```

### 5. 根据断点返回不同值

```typescript
const columns = R.responsive({
  xs: 1,    // 小屏 1 列
  sm: 2,    // 标准屏 2 列
  md: 3,    // 大屏 3 列
  lg: 4,    // 平板 4 列
});
```

## 完整示例

```typescript
import { YStack, XStack, Text, Button } from 'tamagui';
import { R } from '@/config/responsive';

export function ProductCard() {
  const isMobile = R.isMobile();
  
  return (
    <YStack
      padding={R.card.md.padding()}
      borderRadius={R.card.md.radius()}
      backgroundColor="$bgCard"
      gap={R.spacing.md()}
      maxWidth={isMobile ? '100%' : R.layout.contentMaxWidth}
    >
      {/* 标题 */}
      <Text 
        fontSize={R.fontSize.xl()} 
        fontWeight="600"
        color="$creamGold"
      >
        产品名称
      </Text>
      
      {/* 描述 */}
      <Text 
        fontSize={R.fontSize.base()}
        lineHeight={R.fontSize.base() * 1.5}
        color="$colorTransparent"
      >
        这是产品描述文字，会根据屏幕尺寸自动调整大小。
      </Text>
      
      {/* 按钮组 */}
      <XStack gap={R.spacing.md()} flexWrap="wrap">
        <Button
          flex={isMobile ? 1 : undefined}
          height={R.button.md.height()}
          paddingHorizontal={R.button.md.paddingH()}
          fontSize={R.button.md.fontSize()}
          backgroundColor="$creamGold"
          borderRadius={R.radius.pill()}
        >
          立即购买
        </Button>
        
        <Button
          flex={isMobile ? 1 : undefined}
          height={R.button.md.height()}
          paddingHorizontal={R.button.md.paddingH()}
          fontSize={R.button.md.fontSize()}
          backgroundColor="$bgCardAlpha"
          borderRadius={R.radius.pill()}
        >
          了解更多
        </Button>
      </XStack>
    </YStack>
  );
}
```

## 记住这 3 点

1. **永远不要写死尺寸** - 使用 `R.xxx()` 函数
2. **移动优先思维** - 基准尺寸是 375px iPhone
3. **测试多种尺寸** - 至少测试小屏手机和大屏设备

## 下一步

- 📖 阅读完整文档：[RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md)
- 🎨 查看设计规范：[design.ts](../src/config/design.ts)
- 💡 参考示例组件：[ResponsiveExample.tsx](../components/ResponsiveExample.tsx)

---

**提示：** 所有现有组件都应该逐步迁移到使用自适应设计系统，确保在不同设备上都有最佳体验。
