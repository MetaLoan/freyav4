import { YStack, YStackProps } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';

/**
 * 渐变背景组件
 * 从 #25272E 到 #5E5E67 的垂直渐变
 */
export function GradientBackground({ 
  children, 
  ...props 
}: YStackProps) {
  
  if (Platform.OS === 'web') {
    // Web 使用 CSS 渐变
    return (
      <YStack
        flex={1}
        {...props}
        style={[
          {
            background: 'linear-gradient(180deg, #25272E 0%, #5E5E67 100%)',
          },
          props.style,
        ]}
      >
        {children}
      </YStack>
    );
  }
  
  // 移动端使用 expo-linear-gradient
  return (
    <LinearGradient
      colors={['#25272E', '#5E5E67']}
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
