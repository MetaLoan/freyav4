# Freya V4 自适应设计系统

## 概述

Freya V4 采用完整的自适应设计系统，所有文字、组件、间距、边距等度量都遵循响应式原则，确保在不同屏幕尺寸上都有最佳的用户体验。

## 设计原则

### 1. 以移动优先
- 基准尺寸：iPhone 13/14 (375×812px)
- 从小屏向大屏扩展
- 确保小屏设备上的可用性

### 2. 三种缩放策略

#### 线性缩放 (`scale`)
- 用于：间距、布局宽度、图标大小
- 特点：完全按屏幕宽度比例缩放
- 适用场景：需要保持相对大小关系的元素

```typescript
import { R } from '@/config/responsive';

const spacing = R.scale(16); // 375px 屏: 16px, 750px 屏: 32px
```

#### 适度缩放 (`moderateScale`)
- 用于：字体大小、按钮高度、圆角
- 特点：在大屏上增长较慢，避免过大
- 适用场景：文字、组件尺寸

```typescript
const fontSize = R.moderateScale(16, 0.2); // 缩放因子 0.2
```

#### 垂直缩放 (`verticalScale`)
- 用于：垂直方向的间距、组件高度
- 特点：基于屏幕高度缩放
- 适用场景：需要考虑屏幕高度的场景

```typescript
const height = R.verticalScale(100);
```

### 3. 断点系统

| 断点 | 范围 | 设备类型 | 用途 |
|------|------|---------|------|
| `xs` | 320-374px | 小屏手机 (iPhone SE) | 紧凑布局 |
| `sm` | 375-479px | 标准手机 (iPhone 13/14) | 基准尺寸 |
| `md` | 480-767px | 大屏手机/平板竖屏 | 宽松布局 |
| `lg` | 768-1023px | 平板横屏 (iPad) | 多列布局 |
| `xl` | 1024px+ | 桌面/大屏 | 最大宽度限制 |

## 核心 API

### 断点判断

```typescript
import { R } from '@/config/responsive';

// 获取当前断点
const breakpoint = R.getBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// 判断断点
if (R.isMobile()) { /* < 768px */ }
if (R.isTabletOrDesktop()) { /* >= 768px */ }
if (R.isXs()) { /* < 375px */ }
```

### 响应式值选择

```typescript
import { R } from '@/config/responsive';

// 根据断点返回不同值
const padding = R.responsive({
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
});

// 可以省略某些断点（会向下查找最近的值）
const fontSize = R.responsive({
  xs: 14,
  sm: 16,
  lg: 20, // md 会使用 sm 的值 16
});
```

## 自适应系统

### 1. 间距系统

```typescript
import { R } from '@/config/responsive';

<YStack 
  padding={R.spacing.base()}      // 16px (自适应)
  marginHorizontal={R.spacing.lg()} // 20px (自适应)
  gap={R.spacing.md()}            // 12px (自适应)
>
  {/* ... */}
</YStack>

// 自定义间距
<View style={{ marginTop: R.spacing.custom(18) }} />
```

**间距规格：**
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `base`: 16px
- `lg`: 20px
- `xl`: 24px
- `xxl`: 32px
- `xxxl`: 48px

### 2. 字体系统

```typescript
import { R } from '@/config/responsive';

<Text fontSize={R.fontSize.base()}> // 15px (自适应)
  正文内容
</Text>

<Text fontSize={R.fontSize.xl()}>   // 24px (自适应)
  大标题
</Text>

// 自定义字体大小和缩放因子
<Text fontSize={R.fontSize.custom(18, 0.25)}>
  自定义文字
</Text>
```

**字体规格：**
- `xs`: 11px
- `sm`: 13px
- `base`: 15px
- `md`: 17px
- `lg`: 20px
- `xl`: 24px
- `xxl`: 32px
- `hero`: 36px
- `display`: 40px

### 3. 圆角系统

```typescript
import { R } from '@/config/responsive';

<YStack borderRadius={R.radius.base()}> // 16px (自适应)
  {/* ... */}
</YStack>

<Button borderRadius={R.radius.pill()}> // 28px (自适应)
  药丸按钮
</Button>
```

**圆角规格：**
- `sm`: 8px
- `md`: 12px
- `base`: 16px
- `lg`: 20px
- `xl`: 24px
- `pill`: 28px
- `full`: 9999px (完全圆形)

### 4. 布局系统

```typescript
import { R } from '@/config/responsive';

<YStack 
  paddingHorizontal={R.layout.pagePaddingH()} // 响应式页面边距
  paddingTop={R.layout.pagePaddingT()}        // 响应式顶部边距
  gap={R.layout.cardGap()}                    // 响应式卡片间距
>
  {/* ... */}
</YStack>

// 内容最大宽度（桌面端）
<YStack maxWidth={R.layout.contentMaxWidth} alignSelf="center">
  {/* 限制最大宽度 */}
</YStack>
```

**布局规格：**
- `pagePaddingH`: xs:16 / sm:20 / md:24 / lg:32 / xl:40
- `pagePaddingT`: xs:12 / sm:16 / md:20 / lg:24 / xl:24
- `cardGap`: xs:10 / sm:12 / md:14 / lg:16 / xl:16
- `bottomNavHeight`: xs:56 / sm:60 / md:64 / lg:72 / xl:80
- `headerHeight`: xs:48 / sm:56 / md:60 / lg:64 / xl:72
- `contentMaxWidth`: 1200px

### 5. 组件尺寸系统

#### 按钮

```typescript
import { R } from '@/config/responsive';

// 小按钮
<Button 
  height={R.button.sm.height()}
  paddingHorizontal={R.button.sm.paddingH()}
  fontSize={R.button.sm.fontSize()}
>
  小按钮
</Button>

// 中按钮（默认）
<Button 
  height={R.button.md.height()}
  paddingHorizontal={R.button.md.paddingH()}
  fontSize={R.button.md.fontSize()}
>
  中按钮
</Button>

// 大按钮
<Button 
  height={R.button.lg.height()}
  paddingHorizontal={R.button.lg.paddingH()}
  fontSize={R.button.lg.fontSize()}
>
  大按钮
</Button>
```

#### 输入框

```typescript
import { R } from '@/config/responsive';

<Input
  height={R.input.md.height()}
  paddingHorizontal={R.input.md.paddingH()}
  fontSize={R.input.md.fontSize()}
/>
```

#### 卡片

```typescript
import { R } from '@/config/responsive';

<YStack
  padding={R.card.md.padding()}
  borderRadius={R.card.md.radius()}
  backgroundColor="$bgCard"
>
  {/* 卡片内容 */}
</YStack>
```

## React Hooks

### useBreakpoint

监听屏幕尺寸变化，返回当前断点。

```typescript
import { R } from '@/config/responsive';

function MyComponent() {
  const breakpoint = R.useBreakpoint();
  
  return (
    <YStack>
      {breakpoint === 'xs' && <Text>小屏布局</Text>}
      {breakpoint === 'lg' && <Text>平板布局</Text>}
    </YStack>
  );
}
```

### useScreenDimensions

监听屏幕尺寸变化，返回宽高。

```typescript
import { R } from '@/config/responsive';

function MyComponent() {
  const { width, height } = R.useScreenDimensions();
  
  return <Text>屏幕尺寸: {width} × {height}</Text>;
}
```

### useResponsive

响应式值 Hook，自动响应断点变化。

```typescript
import { R } from '@/config/responsive';

function MyComponent() {
  const columns = R.useResponsive({
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });
  
  return <Grid columns={columns}>{/* ... */}</Grid>;
}
```

## 实战示例

### 示例 1：自适应卡片

```typescript
import { YStack, Text } from 'tamagui';
import { R } from '@/config/responsive';

function ResponsiveCard() {
  return (
    <YStack
      padding={R.card.md.padding()}
      borderRadius={R.card.md.radius()}
      backgroundColor="$bgCard"
      gap={R.spacing.md()}
    >
      <Text 
        fontSize={R.fontSize.xl()} 
        fontWeight="600"
      >
        自适应标题
      </Text>
      
      <Text 
        fontSize={R.fontSize.base()}
        lineHeight={R.fontSize.base() * 1.5}
      >
        这是一段自适应的正文内容，会根据屏幕尺寸自动调整大小。
      </Text>
    </YStack>
  );
}
```

### 示例 2：响应式布局

```typescript
import { YStack, XStack, Text } from 'tamagui';
import { R } from '@/config/responsive';

function ResponsiveLayout() {
  const breakpoint = R.useBreakpoint();
  const isMobile = R.isMobile();
  
  const Container = isMobile ? YStack : XStack;
  
  return (
    <Container
      padding={R.layout.pagePaddingH()}
      gap={R.layout.cardGap()}
      maxWidth={R.layout.contentMaxWidth}
      alignSelf="center"
    >
      <YStack flex={1}>
        <Text fontSize={R.fontSize.xl()}>左侧内容</Text>
      </YStack>
      
      <YStack flex={1}>
        <Text fontSize={R.fontSize.xl()}>右侧内容</Text>
      </YStack>
    </Container>
  );
}
```

### 示例 3：自适应按钮组

```typescript
import { XStack, Button } from 'tamagui';
import { R } from '@/config/responsive';

function ResponsiveButtons() {
  const buttonSize = R.useResponsive({
    xs: 'sm',
    sm: 'md',
    lg: 'lg',
  });
  
  const config = buttonSize === 'sm' ? R.button.sm : 
                 buttonSize === 'md' ? R.button.md : 
                 R.button.lg;
  
  return (
    <XStack gap={R.spacing.md()}>
      <Button
        height={config.height()}
        paddingHorizontal={config.paddingH()}
        fontSize={config.fontSize()}
      >
        按钮 1
      </Button>
      
      <Button
        height={config.height()}
        paddingHorizontal={config.paddingH()}
        fontSize={config.fontSize()}
      >
        按钮 2
      </Button>
    </XStack>
  );
}
```

### 示例 4：响应式列表

```typescript
import { YStack } from 'tamagui';
import { R } from '@/config/responsive';

function ResponsiveList() {
  const columns = R.useResponsive({
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });
  
  return (
    <YStack
      padding={R.layout.pagePaddingH()}
      gap={R.layout.cardGap()}
    >
      {/* 使用 FlexWrap 或 Grid 实现多列布局 */}
      {items.map(item => (
        <YStack 
          key={item.id}
          width={`${100 / columns}%`}
          padding={R.spacing.sm()}
        >
          {/* 列表项内容 */}
        </YStack>
      ))}
    </YStack>
  );
}
```

## 最佳实践

### 1. 始终使用自适应函数

❌ **不推荐：**
```typescript
<Text fontSize={16}>固定大小</Text>
<YStack padding={20}>固定间距</YStack>
```

✅ **推荐：**
```typescript
<Text fontSize={R.fontSize.base()}>自适应大小</Text>
<YStack padding={R.spacing.lg()}>自适应间距</YStack>
```

### 2. 使用响应式值选择器

❌ **不推荐：**
```typescript
const padding = isMobile ? 16 : 32;
```

✅ **推荐：**
```typescript
const padding = R.responsive({ xs: 16, lg: 32 });
```

### 3. 组件封装自适应逻辑

创建自适应组件，内部处理响应式逻辑：

```typescript
// components/ResponsiveCard.tsx
import { YStack, YStackProps } from 'tamagui';
import { R } from '@/config/responsive';

export function ResponsiveCard({ children, ...props }: YStackProps) {
  return (
    <YStack
      padding={R.card.md.padding()}
      borderRadius={R.card.md.radius()}
      backgroundColor="$bgCard"
      {...props}
    >
      {children}
    </YStack>
  );
}
```

### 4. 避免过度缩放

对于某些固定尺寸的元素（如图标、小按钮），可以选择不缩放或使用最小缩放因子：

```typescript
// 图标：不缩放
<Icon size={24} />

// 小按钮：最小缩放
<Button height={R.moderateScale(32, 0.1)} />
```

### 5. 测试多种屏幕尺寸

在开发时测试以下关键尺寸：
- iPhone SE (375×667px)
- iPhone 13/14 (375×812px)
- iPhone 14 Pro Max (430×932px)
- iPad (768×1024px)
- 桌面 (1920×1080px)

## 常见问题

### Q: 为什么字体要用适度缩放而不是线性缩放？

A: 完全线性缩放会导致在大屏上字体过大，小屏上字体过小。适度缩放使用平方根函数，在大屏上增长较慢，保持良好的可读性。

### Q: 什么时候用 scale，什么时候用 moderateScale？

A: 
- `scale`: 间距、布局宽度、需要保持比例的元素
- `moderateScale`: 字体、按钮高度、圆角、不需要完全成比例的元素

### Q: 如何处理 Telegram Mini App 的特殊尺寸？

A: Telegram Mini App 运行在 Web 环境，会自动使用 Web 的屏幕尺寸。响应式系统会根据实际可用宽度自动适配。

### Q: 性能如何？每次都计算会不会慢？

A: 这些计算函数非常轻量，性能开销可以忽略不计。如果确实需要优化，可以在组件级别缓存计算结果。

## 迁移指南

### 从固定尺寸迁移

1. **替换固定字体大小：**
```typescript
// 之前
<Text fontSize={16}>

// 之后
<Text fontSize={R.fontSize.base()}>
```

2. **替换固定间距：**
```typescript
// 之前
<YStack padding={20}>

// 之后
<YStack padding={R.spacing.lg()}>
```

3. **替换固定圆角：**
```typescript
// 之前
<YStack borderRadius={24}>

// 之后
<YStack borderRadius={R.radius.xl()}>
```

## 总结

Freya V4 的自适应设计系统提供了：
- 🎯 完整的断点系统
- 📐 三种灵活的缩放策略
- 📦 开箱即用的组件尺寸
- 🎨 统一的设计语言
- ⚡ 高性能的响应式 Hooks
- 🔧 灵活的自定义能力

使用这套系统，您可以确保应用在所有屏幕尺寸上都有最佳的用户体验。
