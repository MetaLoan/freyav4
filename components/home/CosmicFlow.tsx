import React, { useState, useCallback } from 'react';
import { ScrollView, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent, View, Platform, UIManager } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { TripleMoon } from '@/components/TripleMoon';
import { ExpandableText } from '@/components/ExpandableText';
import { TransitEvent, GuidanceItem } from '@/src/types/domain';
import { R } from '@/src/config/responsive';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CosmicFlowProps = {
    transits: TransitEvent[];
    guidance: GuidanceItem[];
    onPress?: () => void;
};

const PAGE_PADDING = R.layout.pagePaddingH();

export function CosmicFlow({ transits, guidance, onPress }: CosmicFlowProps) {
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const ITEM_WIDTH = SCREEN_WIDTH * 0.9;
    const CARD_WIDTH = ITEM_WIDTH - PAGE_PADDING;
    const [activeIndex, setActiveIndex] = useState(0);

    if (!transits || transits.length === 0) return null;

    const displayTransits = transits.slice(0, 3);
    const displayGuidance = guidance.slice(0, 3);

    const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        setActiveIndex(index);
    }, []);

    const formatTimeRange = (start?: string, end?: string) => {
        if (!start) return '';
        const s = new Date(start);
        const e = end ? new Date(end) : null;
        const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        if (!e || s.toDateString() === e.toDateString()) {
            return s.toLocaleDateString('en-US', opts);
        }
        return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', opts)}`;
    };

    return (
        <YStack gap="$8">
            <XStack justifyContent="space-between" alignItems="center">
                <Text
                    color="$gold"
                    fontSize={10}
                    fontWeight="600"
                    letterSpacing={3}
                    textTransform="uppercase"
                >
                    Cosmic Flow
                </Text>

                <XStack gap="$4" alignItems="center">
                    <Text fontSize={10} color="$textMuted" letterSpacing={1}>
                        {formatTimeRange(displayTransits[activeIndex]?.startTime, displayTransits[activeIndex]?.endTime)}
                    </Text>
                    <TripleMoon size={30} activeIndex={activeIndex} />
                </XStack>
            </XStack>

            {/* Full-bleed paging ScrollView */}
            <View style={{ marginHorizontal: -PAGE_PADDING }}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingRight: SCREEN_WIDTH - ITEM_WIDTH }}
                >
                    {displayTransits.map((event, index) => {
                        const guide = displayGuidance[index];
                        const isRetrograde = event.type === 'retrograde';
                        const actionColor = guide?.type === 'do' ? '$success' : '$error';

                        return (
                            // Each page = full screen width, card centered inside
                            <View
                                key={event.id}
                                style={{
                                    width: ITEM_WIDTH,
                                    paddingLeft: PAGE_PADDING,
                                }}
                            >
                                <YStack
                                    width={CARD_WIDTH}
                                    onPress={onPress}
                                    gap="$8"
                                    opacity={index === activeIndex ? 1 : 0.15}
                                >
                                    {/* Title */}
                                    <Text
                                        fontFamily="$heading"
                                        fontSize={26}
                                        lineHeight={32}
                                        color="$color"
                                    >
                                        {event.title}
                                    </Text>

                                    {/* Description Container */}
                                    <YStack height={60} width="100%">
                                        <ExpandableText
                                            text={event.description}
                                            maxLines={3}
                                            width="70%"
                                            fontSize={12}
                                            color="$textSecondary"
                                            fontWeight="300"
                                            lineHeight={20}
                                            opacity={0.6}
                                        />
                                    </YStack>

                                    {/* Action/Guidance Badge (Simplified) */}
                                    <XStack gap="$3" alignItems="center">
                                        <YStack
                                            width={6}
                                            height={6}
                                            borderRadius="$pill"
                                            backgroundColor={actionColor}
                                        />
                                        <Text
                                            fontSize={11}
                                            fontWeight="600"
                                            color={actionColor}
                                            letterSpacing={2}
                                            textTransform="uppercase"
                                        >
                                            {guide ? guide.keyword : 'Focus'}
                                        </Text>
                                    </XStack>
                                </YStack>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </YStack>
    );
}
