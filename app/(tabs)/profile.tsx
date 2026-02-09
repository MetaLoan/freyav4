/**
 * 个人中心 - Profile Tab
 * 
 * 用户信息、设置
 */

import { YStack, XStack, Text, ScrollView, Button } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useHeaderSafeArea } from '@/hooks/useSafeArea';
import { GradientBackground } from '@/components/GradientBackground';
import { R } from '@/src/config/responsive';

export default function ProfileScreen() {
  const headerTop = useHeaderSafeArea();

  return (
    <GradientBackground flex={1}>
      <StatusBar style="light" />

      {/* 顶部安全区 */}
      <YStack height={headerTop} />

      {/* 内容区域 */}
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack
          paddingHorizontal={R.layout.pagePaddingH()}
          paddingTop={R.layout.pagePaddingT()}
          gap={R.spacing.lg()}
        >
          <Text
            fontSize={R.fontSize.xl()}
            fontFamily="$heading"
            color="$color"
            fontWeight="600"
          >
            Profile
          </Text>

          {/* 用户信息卡片 */}
          <YStack
            padding={R.card.md.padding()}
            borderRadius={R.card.md.radius()}
            backgroundColor="$bgCardAlpha"
            alignItems="center"
            gap={R.spacing.md()}
          >
            {/* 头像占位 */}
            <YStack
              width={R.scale(80)}
              height={R.scale(80)}
              borderRadius={R.scale(40)}
              backgroundColor="$bgCard"
              alignItems="center"
              justifyContent="center"
              borderWidth={2}
              borderColor="$creamGold"
            >
              <Text fontSize={R.fontSize.xxl()} color="$creamGold">S</Text>
            </YStack>

            <Text fontSize={R.fontSize.lg()} fontWeight="600" color="$color">
              Sara Johnson
            </Text>
            <Text fontSize={R.fontSize.sm()} color="$textSecondary">
              ♓ Pisces  ·  Feb 28, 1995
            </Text>
          </YStack>

          {/* 设置菜单 */}
          {['Birth Details', 'Notifications', 'Appearance', 'Language', 'About'].map((item) => (
            <YStack
              key={item}
              padding={R.card.md.padding()}
              borderRadius={R.card.md.radius()}
              backgroundColor="$bgCardAlpha"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize={R.fontSize.base()} color="$color">
                {item}
              </Text>
              <Text fontSize={R.fontSize.base()} color="$textMuted">
                ›
              </Text>
            </YStack>
          ))}

          {/* 登出按钮 */}
          <Button
            height={R.button.md.height()}
            backgroundColor="transparent"
            borderRadius={R.radius.pill()}
            borderWidth={1}
            borderColor="$border"
            hoverStyle={{ backgroundColor: 'transparent' }}
            pressStyle={{ backgroundColor: '$bgCard', scale: 0.98 }}
          >
            <Text
              fontSize={R.button.md.fontSize()}
              color="$error"
              fontWeight="500"
            >
              Log Out
            </Text>
          </Button>

          {/* 底部留白 */}
          <YStack height={R.spacing.xl()} />
        </YStack>
      </ScrollView>
    </GradientBackground>
  );
}
