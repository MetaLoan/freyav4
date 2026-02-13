import React, { useRef, useEffect } from 'react';
import { Animated, Pressable } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Compass, Sparkles, User } from '@tamagui/lucide-icons';
import { useBottomSafeArea } from '@/hooks/useSafeArea';
import { R } from '@/src/config/responsive';
import { palette } from '@/tamagui.config';

/**
 * Custom Tab Bar
 * 
 * Minimalist Celestial Style:
 * Dark "Void" background + Gold Highlights + Thin wired borders
 */

// Tab Icons
const TAB_ICONS: Record<string, typeof Home> = {
  index: Home,
  explore: Compass,
  chart: Sparkles,
  profile: User,
};

// Tab Labels
const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  explore: 'Explore',
  chart: 'Chart',
  profile: 'Profile',
};

interface TabButtonProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
  IconComponent: any;
  accessibilityLabel?: string;
}

// Animated Tab Button Component
const TabButton = ({
  isFocused,
  onPress,
  onLongPress,
  label,
  IconComponent,
  accessibilityLabel
}: TabButtonProps) => {
  const iconSize = R.scale(22);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(isFocused ? 1 : 0.6)).current;

  // Animate opacity on focus change
  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: isFocused ? 1 : 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: R.scale(6),
      }}
    >
      <Animated.View style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
        alignItems: 'center',
        gap: 4
      }}>
        <IconComponent
          size={iconSize}
          color={isFocused ? palette.gold : palette.muted}
          strokeWidth={isFocused ? 2.5 : 2} // Thicker when active
        />
        <Text
          fontSize={R.fontSize.xs()}
          color={isFocused ? '$gold' : '$textMuted'}
          fontWeight={isFocused ? '600' : '400'}
          letterSpacing={isFocused ? 0.5 : 0}
        >
          {label}
        </Text>

        {/* Active Indicator Dot */}
        {isFocused && (
          <YStack
            width={4}
            height={4}
            borderRadius={2}
            backgroundColor="$gold"
            position="absolute"
            bottom={-8}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const bottomSafe = useBottomSafeArea();
  const tabBarHeight = R.scale(56);

  return (
    <YStack
      // Minimalist Celestial Theme Background
      backgroundColor="$bgBottomBar"
      borderTopWidth={1}
      borderTopColor="$border"
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

          // Identify icon component
          const routeName = route.name;
          const IconComponent = TAB_ICONS[routeName] || Home;
          const label = TAB_LABELS[routeName] || routeName;

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
            <TabButton
              key={route.key}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              label={label}
              IconComponent={IconComponent}
              accessibilityLabel={options.tabBarAccessibilityLabel}
            />
          );
        })}
      </XStack>
    </YStack>
  );
}
