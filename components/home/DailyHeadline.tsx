import React from 'react';
import { YStack, Text, XStack } from 'tamagui';
import { Moon } from '@tamagui/lucide-icons';

export interface DailyHeadlineProps {
    headline: string;
    score: number;
    sign: string;
    onPress?: () => void;
}

export function DailyHeadline({ headline, score, sign, onPress }: DailyHeadlineProps) {
    return (
        <YStack
            gap="$6"
            onPress={onPress}
            pressStyle={{ opacity: 0.8 }}
            paddingVertical="$4"
        >
            {/* Top Section: The Maxim */}
            <YStack>
                <Text
                    color="$gold"
                    fontSize={10}
                    letterSpacing={4}
                    textTransform="uppercase"
                    fontWeight="600"
                    marginBottom="$2"
                >
                    The Message
                </Text>
                <Text
                    fontFamily="$heading"
                    fontSize={48}
                    lineHeight={54}
                    color="$color"
                    letterSpacing={-1}
                >
                    {headline}
                </Text>
            </YStack>

            {/* Inner Separator: Moon SVG */}
            <XStack justifyContent="center" marginTop="$2">
                <Moon size={10} color="rgba(255,255,255,0.15)" strokeWidth={1} />
            </XStack>

            {/* Bottom Section: Sign & Score Info */}
            <XStack
                justifyContent="space-between"
                alignItems="flex-end"
                paddingTop="$2"
            >
                <YStack gap="$1">
                    <Text
                        fontSize={14}
                        fontWeight="600"
                        color="$textSecondary"
                        letterSpacing={1}
                    >
                        {sign}
                    </Text>
                    <Text
                        fontSize={10}
                        color="$textMuted"
                        textTransform="uppercase"
                        letterSpacing={2}
                    >
                        Pisces Season
                    </Text>
                </YStack>

                <XStack alignItems="baseline" gap="$2">
                    <Text
                        fontFamily="$heading"
                        fontSize={72}
                        lineHeight={72}
                        color="$gold"
                        letterSpacing={-4}
                    >
                        {score}
                    </Text>
                    <YStack>
                        <Text
                            fontSize={10}
                            fontWeight="700"
                            color="$textMuted"
                            textTransform="uppercase"
                            letterSpacing={2}
                        >
                            Energy
                        </Text>
                        <Text
                            fontSize={10}
                            color="$textMuted"
                            textTransform="uppercase"
                            letterSpacing={1}
                            opacity={0.5}
                        >
                            Score
                        </Text>
                    </YStack>
                </XStack>
            </XStack>
        </YStack>
    );
}
