import { YStack, YStackProps } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import { palette } from '@/tamagui.config';

/**
 * 渐变背景组件
 * 
 * Minimalist Celestial Theme:
 * 垂直渐变：从 "The Void" (深黑) 到 "Nebula Navy" (深紫蓝)
 */
export function GradientBackground({
  children,
  ...props
}: YStackProps) {

  // 使用新的 palette 颜色
  const colors = [palette.bgDeep, palette.bgDeepEnd] as const;

  if (Platform.OS === 'web') {
    // Web 使用 CSS 渐变
    return (
      <YStack
        flex={1}
        {...props}
        style={[
          {
            background: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
          },
          props.style as any,
        ]}
      >
        {children}
      </YStack>
    );
  }

  // 移动端使用 expo-linear-gradient
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <YStack flex={1} {...props}>
        {children}
      </YStack>
    </LinearGradient>
  );
}
