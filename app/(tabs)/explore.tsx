/**
 * 探索页 - Explore Tab
 * 
 * 发现占星内容、文章、塔罗等
 */

import { YStack, Text, ScrollView } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useHeaderSafeArea } from '@/hooks/useSafeArea';
import { GradientBackground } from '@/components/GradientBackground';
import { R } from '@/src/config/responsive';

export default function ExploreScreen() {
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
            Explore
          </Text>

          <Text
            fontSize={R.fontSize.base()}
            color="$textSecondary"
            lineHeight={R.fontSize.base() * 1.5}
          >
            Discover celestial wisdom, tarot readings, and cosmic insights.
          </Text>

          {/* 占位卡片 */}
          {['Zodiac Signs', 'Tarot Reading', 'Compatibility', 'Moon Phases'].map((title) => (
            <YStack
              key={title}
              padding={R.card.md.padding()}
              borderRadius={R.card.md.radius()}
              backgroundColor="$bgCardAlpha"
              gap={R.spacing.sm()}
            >
              <Text fontSize={R.fontSize.lg()} fontWeight="600" color="$color">
                {title}
              </Text>
              <Text fontSize={R.fontSize.sm()} color="$textSecondary">
                Tap to explore more
              </Text>
            </YStack>
          ))}

          {/* 底部留白 */}
          <YStack height={R.spacing.xl()} />
        </YStack>
      </ScrollView>
    </GradientBackground>
  );
}
