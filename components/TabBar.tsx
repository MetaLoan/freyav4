/**
 * 自定义底部导航栏
 * 
 * Celestial Elegance 风格，暗色背景 + 奶油金高亮
 * 支持安全区域适配（iOS 底部手势条 / Android 导航栏）
 */

import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { Pressable } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Compass, Sparkles, User } from '@tamagui/lucide-icons';
import { useBottomSafeArea } from '@/hooks/useSafeArea';
import { R } from '@/src/config/responsive';

// Tab 图标映射
const TAB_ICONS: Record<string, typeof Home> = {
  index: Home,
  explore: Compass,
  chart: Sparkles,
  profile: User,
};

// Tab 标签映射
const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  explore: 'Explore',
  chart: 'Chart',
  profile: 'Profile',
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const bottomSafe = useBottomSafeArea();
  const iconSize = R.scale(22);
  const tabBarHeight = R.scale(56);

  return (
    <YStack
      backgroundColor="#141420"
      borderTopWidth={1}
      borderTopColor="rgba(58, 57, 80, 0.6)"
      paddingBottom={bottomSafe}
    >
      <XStack
        height={tabBarHeight}
        alignItems="center"
        justifyContent="space-around"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const IconComponent = TAB_ICONS[route.name] || Home;
          const label = TAB_LABELS[route.name] || route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: R.scale(6),
              }}
            >
              <YStack alignItems="center" gap={R.scale(3)}>
                <IconComponent
                  size={iconSize}
                  color={isFocused ? '#E4D5A8' : '#7A7A82'}
                />
                <Text
                  fontSize={R.fontSize.xs()}
                  color={isFocused ? '$creamGold' : '$textMuted'}
                  fontWeight={isFocused ? '600' : '400'}
                >
                  {label}
                </Text>
              </YStack>
            </Pressable>
          );
        })}
      </XStack>
    </YStack>
  );
}
