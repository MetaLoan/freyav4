/**
 * 星盘页 - Chart Tab
 * 
 * 个人星盘、行星位置
 */

import { YStack, Text, ScrollView } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useHeaderSafeArea } from '@/hooks/useSafeArea';
import { GradientBackground } from '@/components/GradientBackground';
import { R } from '@/src/config/responsive';
import { NatalChart } from '@/components/chart/NatalChart';

export default function ChartScreen() {
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
            Birth Chart
          </Text>

          <Text
            fontSize={R.fontSize.base()}
            color="$textSecondary"
            lineHeight={R.fontSize.base() * 1.5}
          >
            Your cosmic blueprint based on the exact time and place of your birth.
          </Text>



          {/* Star Chart Visualization */}
          <YStack
            alignItems="center"
            justifyContent="center"
            paddingVertical={R.spacing.lg()}
          >
            <NatalChart />
          </YStack>

          {/* 行星位置 */}
          <YStack
            padding={R.card.md.padding()}
            borderRadius={R.card.md.radius()}
            backgroundColor="$bgCardAlpha"
            gap={R.spacing.md()}
          >
            <Text fontSize={R.fontSize.lg()} fontWeight="600" color="$color">
              Planetary Positions
            </Text>
            {[
              { planet: '☉ Sun', sign: 'Aquarius 20°' },
              { planet: '☽ Moon', sign: 'Pisces 15°' },
              { planet: '☿ Mercury', sign: 'Aquarius 8°' },
              { planet: '♀ Venus', sign: 'Aries 2°' },
              { planet: '♂ Mars', sign: 'Cancer 22°' },
            ].map((item) => (
              <YStack key={item.planet} flexDirection="row" justifyContent="space-between">
                <Text fontSize={R.fontSize.base()} color="$color">{item.planet}</Text>
                <Text fontSize={R.fontSize.base()} color="$creamGold">{item.sign}</Text>
              </YStack>
            ))}
          </YStack>

          {/* 底部留白 */}
          <YStack height={R.spacing.xl()} />
        </YStack>
      </ScrollView>
    </GradientBackground>
  );
}
