import React from 'react';
import { XStack, YStack, Text } from 'tamagui';

export interface ProgressBarProps {
    /** Label text shown on the left */
    label: string;
    /** Progress value from 0 to 100 */
    value: number;
    /** Color of the filled bar, default '$gold' */
    color?: string;
    /** Whether to show the percentage label */
    showValue?: boolean;
    /** Height of the bar in px, default 4 */
    height?: number;
    /** Opacity of the filled bar, default 0.8 */
    fillOpacity?: number;
}

/**
 * ProgressBar component
 * 
 * A minimal, thin progress bar with label and percentage.
 * Used for energy levels, compatibility scores, etc.
 */
export function ProgressBar({
    label,
    value,
    color = '$gold',
    showValue = true,
    height = 4,
    fillOpacity = 0.8,
}: ProgressBarProps) {
    const clampedValue = Math.min(100, Math.max(0, value));
    // Determine value text color: gold for high values, muted for low
    const valueColor = clampedValue >= 50 ? '$gold' : '$textMuted';

    return (
        <YStack gap="$1">
            <XStack justifyContent="space-between">
                <Text fontSize={12} color="$textSecondary">{label}</Text>
                {showValue && (
                    <Text fontSize={12} color={valueColor}>{clampedValue}%</Text>
                )}
            </XStack>
            <XStack
                height={height}
                backgroundColor="rgba(255,255,255,0.1)"
                borderRadius={height / 2}
                overflow="hidden"
            >
                <YStack
                    width={`${clampedValue}%`}
                    height="100%"
                    backgroundColor={color}
                    opacity={fillOpacity}
                />
            </XStack>
        </YStack>
    );
}
