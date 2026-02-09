/**
 * 自适应设计示例组件
 * 
 * 展示如何在 Freya V4 中使用自适应设计系统
 */

import { YStack, XStack, Text, Button } from 'tamagui';
import { R } from '@/src/config/responsive';

/**
 * 示例 1：自适应卡片
 */
export function ResponsiveCard() {
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
        color="$color"
      >
        自适应标题
      </Text>
      
      <Text 
        fontSize={R.fontSize.base()}
        lineHeight={R.fontSize.base() * 1.5}
        color="$colorTransparent"
      >
        这是一段自适应的正文内容，会根据屏幕尺寸自动调整大小。
        间距、字体、圆角都会响应式变化。
      </Text>
      
      <Button
        height={R.button.md.height()}
        paddingHorizontal={R.button.md.paddingH()}
        fontSize={R.button.md.fontSize()}
        backgroundColor="$creamGold"
        color="$bgDeep"
        borderRadius={R.radius.pill()}
      >
        自适应按钮
      </Button>
    </YStack>
  );
}

/**
 * 示例 2：响应式布局（移动端垂直，桌面端水平）
 */
export function ResponsiveLayout() {
  const breakpoint = R.useBreakpoint();
  const isMobile = R.isMobile();
  
  // 根据屏幕大小切换布局方向
  const Container = isMobile ? YStack : XStack;
  
  return (
    <Container
      padding={R.layout.pagePaddingH()}
      gap={R.layout.cardGap()}
      maxWidth={R.layout.contentMaxWidth}
      alignSelf="center"
      width="100%"
    >
      <YStack 
        flex={1}
        padding={R.card.md.padding()}
        borderRadius={R.card.md.radius()}
        backgroundColor="$bgCard"
      >
        <Text 
          fontSize={R.fontSize.lg()}
          fontWeight="600"
          color="$creamGold"
          marginBottom={R.spacing.md()}
        >
          左侧内容
        </Text>
        <Text fontSize={R.fontSize.base()} color="$color">
          当前断点: {breakpoint}
        </Text>
      </YStack>
      
      <YStack 
        flex={1}
        padding={R.card.md.padding()}
        borderRadius={R.card.md.radius()}
        backgroundColor="$bgCard"
      >
        <Text 
          fontSize={R.fontSize.lg()}
          fontWeight="600"
          color="$creamGold"
          marginBottom={R.spacing.md()}
        >
          右侧内容
        </Text>
        <Text fontSize={R.fontSize.base()} color="$color">
          布局: {isMobile ? '垂直' : '水平'}
        </Text>
      </YStack>
    </Container>
  );
}

/**
 * 示例 3：自适应按钮组
 */
export function ResponsiveButtons() {
  const buttonSize = R.useResponsive({
    xs: 'sm' as const,
    sm: 'md' as const,
    lg: 'lg' as const,
  });
  
  const config = buttonSize === 'sm' ? R.button.sm : 
                 buttonSize === 'lg' ? R.button.lg : 
                 R.button.md;
  
  return (
    <XStack 
      gap={R.spacing.md()} 
      flexWrap="wrap"
      justifyContent="center"
    >
      <Button
        height={config.height()}
        paddingHorizontal={config.paddingH()}
        fontSize={config.fontSize()}
        backgroundColor="$creamGold"
        color="$bgDeep"
        borderRadius={R.radius.pill()}
      >
        主要操作
      </Button>
      
      <Button
        height={config.height()}
        paddingHorizontal={config.paddingH()}
        fontSize={config.fontSize()}
        backgroundColor="$bgCardAlpha"
        color="$color"
        borderRadius={R.radius.pill()}
      >
        次要操作
      </Button>
      
      <Button
        height={config.height()}
        paddingHorizontal={config.paddingH()}
        fontSize={config.fontSize()}
        backgroundColor="transparent"
        color="$creamGold"
        borderWidth={1}
        borderColor="$creamGold"
        borderRadius={R.radius.pill()}
      >
        取消
      </Button>
    </XStack>
  );
}

/**
 * 示例 4：自适应网格（根据屏幕大小显示不同列数）
 */
export function ResponsiveGrid({ items }: { items: Array<{ id: string; title: string }> }) {
  const columns = R.useResponsive({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
  });
  
  return (
    <YStack
      padding={R.layout.pagePaddingH()}
      gap={R.layout.cardGap()}
    >
      <Text 
        fontSize={R.fontSize.xl()} 
        fontWeight="600"
        color="$color"
        marginBottom={R.spacing.md()}
      >
        自适应网格 ({columns} 列)
      </Text>
      
      <XStack flexWrap="wrap" gap={R.spacing.md()}>
        {items.map(item => (
          <YStack 
            key={item.id}
            width={`${100 / columns - 1}%`}
            padding={R.card.sm.padding()}
            borderRadius={R.card.sm.radius()}
            backgroundColor="$bgCard"
            minHeight={R.scale(100)}
            justifyContent="center"
            alignItems="center"
          >
            <Text 
              fontSize={R.fontSize.base()}
              color="$color"
              textAlign="center"
            >
              {item.title}
            </Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
}

/**
 * 示例 5：自适应文字尺寸展示
 */
export function ResponsiveTypography() {
  return (
    <YStack
      padding={R.layout.pagePaddingH()}
      gap={R.spacing.lg()}
      backgroundColor="$bgSurface"
      borderRadius={R.radius.xl()}
    >
      <Text fontSize={R.fontSize.display()} color="$color" fontWeight="700">
        Display 40px
      </Text>
      
      <Text fontSize={R.fontSize.hero()} color="$color" fontWeight="700">
        Hero 36px
      </Text>
      
      <Text fontSize={R.fontSize.xxl()} color="$color" fontWeight="600">
        XXL 32px - 页面标题
      </Text>
      
      <Text fontSize={R.fontSize.xl()} color="$color" fontWeight="600">
        XL 24px - 区块标题
      </Text>
      
      <Text fontSize={R.fontSize.lg()} color="$color" fontWeight="500">
        LG 20px - 副标题
      </Text>
      
      <Text fontSize={R.fontSize.md()} color="$color">
        MD 17px - 强调文字
      </Text>
      
      <Text fontSize={R.fontSize.base()} color="$colorTransparent">
        Base 15px - 正文内容，这是默认的文字大小，用于大部分正文内容。
      </Text>
      
      <Text fontSize={R.fontSize.sm()} color="$textMuted">
        SM 13px - 辅助说明
      </Text>
      
      <Text fontSize={R.fontSize.xs()} color="$textMuted">
        XS 11px - 极小文字
      </Text>
    </YStack>
  );
}

/**
 * 示例 6：自适应间距展示
 */
export function ResponsiveSpacing() {
  const spacingSizes = [
    { key: 'xs', label: 'XS 4px', value: R.spacing.xs() },
    { key: 'sm', label: 'SM 8px', value: R.spacing.sm() },
    { key: 'md', label: 'MD 12px', value: R.spacing.md() },
    { key: 'base', label: 'Base 16px', value: R.spacing.base() },
    { key: 'lg', label: 'LG 20px', value: R.spacing.lg() },
    { key: 'xl', label: 'XL 24px', value: R.spacing.xl() },
    { key: 'xxl', label: 'XXL 32px', value: R.spacing.xxl() },
    { key: 'xxxl', label: 'XXXL 48px', value: R.spacing.xxxl() },
  ];
  
  return (
    <YStack
      padding={R.layout.pagePaddingH()}
      gap={R.spacing.md()}
      backgroundColor="$bgSurface"
      borderRadius={R.radius.xl()}
    >
      <Text fontSize={R.fontSize.xl()} color="$color" fontWeight="600">
        自适应间距
      </Text>
      
      {spacingSizes.map(({ key, label, value }) => (
        <XStack key={key} alignItems="center" gap={R.spacing.md()}>
          <YStack 
            width={value} 
            height={value}
            backgroundColor="$creamGold"
            borderRadius={R.radius.sm()}
          />
          <Text fontSize={R.fontSize.base()} color="$color">
            {label} = {value.toFixed(1)}px
          </Text>
        </XStack>
      ))}
    </YStack>
  );
}

/**
 * 示例 7：屏幕信息展示
 */
export function ScreenInfo() {
  const { width, height } = R.useScreenDimensions();
  const breakpoint = R.useBreakpoint();
  
  return (
    <YStack
      padding={R.card.md.padding()}
      borderRadius={R.card.md.radius()}
      backgroundColor="$bgCard"
      gap={R.spacing.sm()}
    >
      <Text fontSize={R.fontSize.lg()} color="$creamGold" fontWeight="600">
        屏幕信息
      </Text>
      
      <Text fontSize={R.fontSize.base()} color="$color">
        宽度: {width.toFixed(0)}px
      </Text>
      
      <Text fontSize={R.fontSize.base()} color="$color">
        高度: {height.toFixed(0)}px
      </Text>
      
      <Text fontSize={R.fontSize.base()} color="$color">
        断点: {breakpoint}
      </Text>
      
      <Text fontSize={R.fontSize.base()} color="$color">
        设备类型: {R.isMobile() ? '移动设备' : '平板/桌面'}
      </Text>
    </YStack>
  );
}
