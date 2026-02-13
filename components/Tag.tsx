import React from 'react';
import { XStack, Text } from 'tamagui';

export interface TagProps {
    label: string;
    /** Color for the border and optional text tint */
    color?: string;
    /** Text color override */
    textColor?: string;
    /** Font size, default 12 */
    fontSize?: number;
    /** Whether the tag is in active/selected state */
    active?: boolean;
    /** Called when tag is pressed */
    onPress?: () => void;
}

/**
 * Tag / Chip component
 * 
 * A pill-shaped label used for categories, aspects, and filters.
 * Follows the Minimalist Celestial aesthetic with thin borders.
 */
export function Tag({
    label,
    color = 'rgba(255, 255, 255, 0.3)',
    textColor = '$textSecondary',
    fontSize = 12,
    active = false,
    onPress,
}: TagProps) {
    return (
        <XStack
            borderWidth={1}
            borderColor={active ? '$gold' : color}
            backgroundColor={active ? 'rgba(212, 197, 163, 0.1)' : 'transparent'}
            paddingHorizontal="$3"
            paddingVertical="$1.5"
            borderRadius="$8"
            pressStyle={onPress ? { opacity: 0.7 } : undefined}
            onPress={onPress}
            cursor={onPress ? 'pointer' : undefined}
        >
            <Text
                fontSize={fontSize}
                color={active ? '$gold' : textColor}
            >
                {label}
            </Text>
        </XStack>
    );
}
