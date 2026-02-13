import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { Sparkles, AlertCircle, Clock, Moon } from '@tamagui/lucide-icons';
import { TransitEvent } from '@/src/types/domain';

export function TransitStrip({ transits, onPress }: { transits: TransitEvent[], onPress?: (event: TransitEvent) => void }) {
    if (!transits || transits.length === 0) return null;

    // Use top 3 by intensity if available
    const top3 = [...transits]
        .sort((a, b) => (b.intensity || 0) - (a.intensity || 0))
        .slice(0, 3);

    const formatTimeRange = (start?: string, end?: string) => {
        if (!start) return '';
        const s = new Date(start);
        const e = end ? new Date(end) : null;

        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        if (!e || s.toDateString() === e.toDateString()) {
            return s.toLocaleDateString('en-US', options);
        }
        return `${s.toLocaleDateString('en-US', options)} - ${e.toLocaleDateString('en-US', options)}`;
    };

    return (
        <YStack gap="$4">
            <XStack justifyContent="space-between" alignItems="center">
                <Text
                    color="$gold"
                    fontSize={10}
                    fontWeight="600"
                    letterSpacing={3}
                    textTransform="uppercase"
                >
                    Celestial Alignment
                </Text>
            </XStack>

            <YStack gap="$6">
                {top3.map((event, index) => {
                    const isRetrograde = event.type === 'retrograde';
                    return (
                        <YStack
                            key={event.id}
                            onPress={() => onPress && onPress(event)}
                            pressStyle={{ opacity: 0.7 }}
                            gap="$2"
                            alignItems="center"
                        >
                            <YStack width="100%" gap="$2" marginBottom={index < top3.length - 1 ? "$2" : 0}>
                                <XStack justifyContent="space-between" alignItems="flex-start">
                                    <XStack gap="$2" alignItems="center" flex={1}>
                                        {isRetrograde ? (
                                            <AlertCircle size={14} color="$error" />
                                        ) : (
                                            <Sparkles size={14} color="$gold" />
                                        )}
                                        <Text
                                            fontSize={16}
                                            fontWeight="600"
                                            color="$color"
                                            letterSpacing={-0.5}
                                        >
                                            {event.title}
                                        </Text>
                                    </XStack>
                                    <XStack gap="$1" alignItems="center" opacity={0.6}>
                                        <Clock size={10} color="$textMuted" />
                                        <Text fontSize={10} color="$textMuted" textTransform="uppercase">
                                            {formatTimeRange(event.startTime, event.endTime)}
                                        </Text>
                                    </XStack>
                                </XStack>

                                <Text fontSize={13} color="$textSecondary" lineHeight={20}>
                                    {event.description}
                                </Text>
                            </YStack>

                            {index < top3.length - 1 && (
                                <XStack justifyContent="center" width="100%" marginTop="$2">
                                    <Moon size={8} color="rgba(255,255,255,0.15)" strokeWidth={1} />
                                </XStack>
                            )}
                        </YStack>
                    );
                })}
            </YStack>
        </YStack>
    );
}
