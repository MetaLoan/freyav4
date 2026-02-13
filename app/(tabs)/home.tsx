import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Pressable } from 'react-native';
import { YStack, XStack, Text, Separator } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { Atom, Settings2, AlertCircle, Moon } from '@tamagui/lucide-icons';

// Components
import { GradientBackground } from '@/components/GradientBackground';
import { BottomSheet } from '@/components/BottomSheet';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Domain Components
import { DailyHeadline } from '@/components/home/DailyHeadline';
import { FiveDimRadar } from '@/components/home/FiveDimRadar';
import { CosmicFlow } from '@/components/home/CosmicFlow';

// Data & Services
import { getDailyHoroscope } from '@/src/services/astrology';
import { DailyHoroscope } from '@/src/types/domain';
import { useHeaderSafeArea } from '@/hooks/useSafeArea';
import { R } from '@/src/config/responsive';

// Contexts
import { useTimeSelector } from '@/contexts/TimeSelectorContext';
import { useUser } from '@/contexts/UserContext';
import { TimeUnit } from '@/components/CircularTimeSelector';

type SheetType = 'insight' | 'dimensions' | 'transits' | null;

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDisplayTime(date: Date, unit: TimeUnit): string {
  switch (unit) {
    case 'Hour': return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:00`;
    case 'Day': return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    case 'Week': return `Week of ${MONTH_SHORT[date.getMonth()]} ${date.getDate()}`;
    case 'Month': return `${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`;
    case 'Year': return `${date.getFullYear()}`;
  }
}

export default function HomeScreen() {
  const headerTop = useHeaderSafeArea();
  const { selectedTime, timeUnit, openSelector } = useTimeSelector();
  const { birthData } = useUser();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<DailyHoroscope | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Bottom Sheet State
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDailyHoroscope(birthData, selectedTime);
      setData(result);
    } catch (err) {
      console.error("Home Fetch Error:", err);
      setError("Failed to align with the stars. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTime, birthData]);

  const renderSheetContent = () => {
    if (!data) return null;

    switch (activeSheet) {
      case 'insight':
        return (
          <YStack gap="$4">
            <Text fontFamily="$heading" fontSize={24} color="$gold">Daily Insight</Text>
            <Text fontSize={16} lineHeight={26} color="$textSecondary">
              {data.aiAnalysis.general}
            </Text>
            <Separator borderColor="$border" />
            <Text fontFamily="$heading" fontSize={20} color="$textMuted" marginTop="$2">Love & Connection</Text>
            <Text fontSize={16} lineHeight={26} color="$textSecondary">
              {data.aiAnalysis.love}
            </Text>
            <Text fontFamily="$heading" fontSize={20} color="$textMuted" marginTop="$2">Career & Purpose</Text>
            <Text fontSize={16} lineHeight={26} color="$textSecondary">
              {data.aiAnalysis.career}
            </Text>
          </YStack>
        );
      case 'dimensions':
        return (
          <YStack gap="$4">
            <Text fontFamily="$heading" fontSize={24} color="$gold">Energy Dimensions</Text>
            <Text fontSize={14} color="$textMuted">
              Your energy levels fluctuate with planetary movements. Use this guide to plan your day efficiently.
            </Text>
            {data.dimensions.map((dim, index) => (
              <YStack key={dim.category} gap="$1" paddingVertical="$2" alignSelf="center" width="100%">
                <XStack justifyContent="space-between">
                  <Text fontSize={16} fontWeight="600" color="$color">{dim.category}</Text>
                  <Text fontSize={16} color={dim.score > 70 ? '$gold' : '$textMuted'}>{dim.score}%</Text>
                </XStack>
                <Text fontSize={12} color="$textSecondary">
                  {dim.label} · Trend: {dim.trend === 'up' ? 'Rising ↗' : dim.trend === 'down' ? 'Falling ↘' : 'Stable →'}
                </Text>
                {index < data.dimensions.length - 1 && (
                  <XStack justifyContent="center" marginTop="$4" marginBottom="$2">
                    <Moon size={8} color="rgba(255,255,255,0.15)" strokeWidth={1} />
                  </XStack>
                )}
              </YStack>
            ))}
          </YStack>
        );
      case 'transits':
        return (
          <YStack gap="$4">
            <Text fontFamily="$heading" fontSize={24} color="$gold">Cosmic Events</Text>
            {data.transits.map(transit => (
              <YStack key={transit.id} theme="dark_wired" padding="$4" borderWidth={1} borderColor="$border" borderRadius="$4" gap="$2">
                <Text fontSize={18} fontFamily="$heading" color="$color">{transit.title}</Text>
                <Text fontSize={14} color="$textSecondary">{transit.description}</Text>
                <YStack backgroundColor="rgba(255,255,255,0.05)" padding="$3" borderRadius="$2" marginTop="$2">
                  <XStack gap="$2" alignItems="center" marginBottom="$1">
                    <Atom size={12} color="$gold" />
                    <Text fontSize={10} color="$gold" textTransform="uppercase" letterSpacing={1}>Personal Impact</Text>
                  </XStack>
                  <Text fontSize={14} color="$textSecondary" fontStyle="italic">
                    "{transit.impact}"
                  </Text>
                </YStack>
              </YStack>
            ))}
          </YStack>
        );
      default:
        return null;
    }
  };

  return (
    <GradientBackground flex={1}>
      <StatusBar style="light" />

      <YStack paddingTop={headerTop} paddingBottom="$2" paddingHorizontal={R.layout.pagePaddingH()}>
        <XStack justifyContent="space-between" alignItems="center" height={44}>
          <Text
            fontSize={R.fontSize.md()}
            color="$creamGold"
            fontWeight="600"
          >
            Hi Sara
          </Text>

          <Pressable onPress={openSelector}>
            <XStack
              alignItems="center"
              gap={R.spacing.sm()}
              backgroundColor="rgba(45,44,64,0.50)"
              paddingHorizontal={R.spacing.md()}
              paddingVertical={R.spacing.xs()}
              borderRadius={R.radius.pill()}
              borderWidth={1}
              borderColor="rgba(255, 255, 255, 0.1)"
            >
              <Settings2 size={14} color="#E4D5A8" />
              <Text fontSize={12} color="$creamGold" fontWeight="500">
                {formatDisplayTime(selectedTime, timeUnit)}
              </Text>
            </XStack>
          </Pressable>
        </XStack>
      </YStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: R.layout.pagePaddingH() }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#D4C5A3" />
        }
      >
        {loading && !refreshing ? (
          <YStack height={500} justifyContent="center" alignItems="center" gap="$4">
            <LoadingSpinner variant="spin" size={40} />
            <Text color="$textMuted" fontSize={12} letterSpacing={2}>ALIGNING STARS...</Text>
          </YStack>
        ) : error ? (
          <YStack height={400} justifyContent="center" alignItems="center" gap="$4">
            <AlertCircle size={40} color="$error" opacity={0.7} />
            <Text color="$textMuted" textAlign="center">{error}</Text>
            <Pressable onPress={onRefresh}>
              <Text color="$gold" textDecorationLine="underline">Try Again</Text>
            </Pressable>
          </YStack>
        ) : data ? (
          <YStack gap="$10" marginTop="$4">
            {/* 1. Headline & Score */}
            <DailyHeadline
              headline={data.headline}
              score={data.overallScore}
              sign={data.sign}
              onPress={() => setActiveSheet('insight')}
            />

            <Separator borderColor="rgba(255,255,255,0.04)" />

            {/* 2. Dimensions */}
            <YStack onPress={() => setActiveSheet('dimensions')}>
              <FiveDimRadar data={data.dimensions} />
            </YStack>

            <Separator borderColor="rgba(255,255,255,0.04)" />

            {/* 3. Cosmic Flow (Cause & Effect) */}
            <CosmicFlow
              transits={data.transits}
              guidance={data.guidance}
              onPress={() => setActiveSheet('insight')}
            />



            {/* Footer */}
            <YStack alignItems="center" paddingVertical="$8" opacity={0.2}>
              <Atom size={32} color="$textMuted" />
              <Text marginTop="$4" fontSize={10} color="$textMuted" letterSpacing={2} textTransform="uppercase">The Stars Know</Text>
            </YStack>
          </YStack>
        ) : null}
      </ScrollView>

      <BottomSheet
        open={!!activeSheet}
        onOpenChange={(open: boolean) => !open && setActiveSheet(null)}
        snapPoints={[65, 85]}
      >
        {renderSheetContent()}
      </BottomSheet>
    </GradientBackground>
  );
}
