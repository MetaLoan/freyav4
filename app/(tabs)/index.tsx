/**
 * 首页 - Home Tab
 * 
 * 今日运势概览、个性化问候
 * 右上角弧形时间选择器（全屏浮层）
 */

import React from 'react';
import { Pressable } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { ScrollView } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { Settings2 } from '@tamagui/lucide-icons';
import { useHeaderSafeArea } from '@/hooks/useSafeArea';
import { GradientBackground } from '@/components/GradientBackground';
import { useTimeSelector } from '@/contexts/TimeSelectorContext';
import { TimeUnit } from '@/components/CircularTimeSelector';
import { R } from '@/src/config/responsive';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDisplayTime(date: Date, unit: TimeUnit): string {
  switch (unit) {
    case 'Hour':  return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:00`;
    case 'Day':   return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    case 'Week':  return `Week of ${MONTH_SHORT[date.getMonth()]} ${date.getDate()}`;
    case 'Month': return `${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`;
    case 'Year':  return `${date.getFullYear()}`;
  }
}

export default function HomeScreen() {
  const headerTop = useHeaderSafeArea();
  const { selectedTime, timeUnit, openSelector } = useTimeSelector();

  return (
    <GradientBackground flex={1}>
      <StatusBar style="light" />

      {/* 顶部安全区 */}
      <YStack height={headerTop} />

      {/* 顶部栏：问候 + 时间触发器 */}
      <XStack
        paddingHorizontal={R.layout.pagePaddingH()}
        paddingTop={R.spacing.sm()}
        paddingBottom={R.spacing.md()}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          fontSize={R.fontSize.md()}
          color="$creamGold"
          fontWeight="600"
        >
          Hi Sara
        </Text>

        {/* 时间选择触发器 */}
        <Pressable onPress={openSelector}>
          <XStack
            alignItems="center"
            gap={R.spacing.sm()}
            backgroundColor="rgba(45,44,64,0.50)"
            paddingHorizontal={R.spacing.md()}
            paddingVertical={R.spacing.xs()}
            borderRadius={R.radius.pill()}
          >
            <Settings2 size={R.scale(14)} color="#E4D5A8" />
            <Text fontSize={R.fontSize.xs()} color="$creamGold" fontWeight="500">
              {formatDisplayTime(selectedTime, timeUnit)}
            </Text>
          </XStack>
        </Pressable>
      </XStack>

      {/* 内容区域 */}
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack
          paddingHorizontal={R.layout.pagePaddingH()}
          paddingTop={R.spacing.xs()}
          gap={R.spacing.lg()}
        >
          {/* 大标题 */}
          <Text
            fontSize={R.fontSize.xxl()}
            lineHeight={R.fontSize.xxl() * 1.2}
            fontFamily="$heading"
            color="$color"
          >
            the Moon is in{'\n'}Pisces today.
          </Text>

          {/* 今日运势描述 */}
          <Text
            fontSize={R.fontSize.base()}
            lineHeight={R.fontSize.base() * 1.6}
            color="$textSecondary"
          >
            Today the Moon aligns with Neptune in your sign, enhancing your intuition and emotional sensitivity. Trust your feelings and pay attention to your dreams.
          </Text>

          {/* 日常运势卡片 */}
          <YStack
            padding={R.card.md.padding()}
            borderRadius={R.card.md.radius()}
            backgroundColor="$bgCardAlpha"
            gap={R.spacing.md()}
          >
            <Text fontSize={R.fontSize.lg()} fontWeight="600" color="$color">
              Daily Horoscope
            </Text>
            <Text fontSize={R.fontSize.base()} color="$textSecondary" lineHeight={R.fontSize.base() * 1.5}>
              The stars suggest a day of reflection and creativity. Your ruling planet Neptune brings inspiration through unexpected channels.
            </Text>
          </YStack>

          <YStack
            padding={R.card.md.padding()}
            borderRadius={R.card.md.radius()}
            backgroundColor="$bgCardAlpha"
            gap={R.spacing.md()}
          >
            <Text fontSize={R.fontSize.lg()} fontWeight="600" color="$color">
              Lucky Elements
            </Text>
            <Text fontSize={R.fontSize.base()} color="$textSecondary">
              Color: Sea Green  ·  Number: 7  ·  Time: 3:00 PM
            </Text>
          </YStack>

          {/* 底部留白 */}
          <YStack height={R.spacing.xl()} />
        </YStack>
      </ScrollView>
    </GradientBackground>
  );
}
