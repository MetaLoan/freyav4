import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { ProgressBar } from '@/components/ProgressBar';
import { DimensionScore } from '@/src/types/domain';

export function FiveDimRadar({ data }: { data: DimensionScore[] }) {
    if (!data || data.length === 0) return null;

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
                    Cosmic Influences
                </Text>
            </XStack>

            <YStack gap="$3">
                {data.map((dim) => (
                    <ProgressBar
                        key={dim.category}
                        label={dim.category}
                        value={dim.score || 0}
                        color={dim.score > 70 ? '$gold' : dim.score > 40 ? '$silver' : '$textMuted'}
                        showValue
                        fillOpacity={dim.score > 70 ? 1.0 : 0.8}
                    />
                ))}
            </YStack>
        </YStack>
    );
}
