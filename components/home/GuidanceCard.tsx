import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { CheckCircle, XCircle } from '@tamagui/lucide-icons';
import { GuidanceItem } from '@/src/types/domain';

export function GuidanceCard({ items, onPress }: { items: GuidanceItem[], onPress?: () => void }) {
    if (!items || items.length === 0) return null;

    // Take top 3
    const displayItems = items.slice(0, 3);

    return (
        <YStack gap="$6" onPress={onPress}>
            <XStack justifyContent="space-between" alignItems="center">
                <Text
                    color="$gold"
                    fontSize={10}
                    fontWeight="600"
                    letterSpacing={3}
                    textTransform="uppercase"
                >
                    Daily Counsel
                </Text>
            </XStack>

            <XStack gap="$3" height={160} justifyContent="space-between" width="100%">
                {displayItems.map((item) => {
                    const isDo = item.type === 'do';
                    return (
                        <YStack
                            key={item.id}
                            flex={1}
                            borderWidth={1}
                            borderColor="rgba(255,255,255,0.08)"
                            borderRadius="$2"
                            padding="$3"
                            justifyContent="space-between"
                            alignItems="center"
                            backgroundColor="rgba(255,255,255,0.02)"
                            pressStyle={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                borderColor: "$gold",
                                scale: 1.02
                            }}
                            animation="quick"
                        >
                            {/* Top Indicator */}
                            <YStack
                                width={32}
                                height={32}
                                borderRadius="$pill"
                                backgroundColor={isDo ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                {isDo ? (
                                    <CheckCircle size={16} color="$success" strokeWidth={2} />
                                ) : (
                                    <XCircle size={16} color="$error" strokeWidth={2} />
                                )}
                            </YStack>

                            {/* Vertical Line */}
                            <YStack flex={1} width={1} backgroundColor={isDo ? '$success' : '$error'} opacity={0.2} marginVertical="$3" />

                            {/* Bottom Text */}
                            <YStack alignItems="center" gap="$1" width="100%">
                                <Text
                                    fontSize={9}
                                    color={isDo ? '$success' : '$error'}
                                    fontWeight="700"
                                    textTransform="uppercase"
                                    letterSpacing={2}
                                    opacity={0.8}
                                >
                                    {isDo ? 'Focus' : 'Avoid'}
                                </Text>
                                <Text
                                    fontSize={12}
                                    fontWeight="600"
                                    color="$color"
                                    textAlign="center"
                                    lineHeight={16}
                                    marginTop="$1"
                                >
                                    {item.keyword}
                                </Text>
                            </YStack>
                        </YStack>
                    );
                })}
            </XStack>
        </YStack>
    );
}
