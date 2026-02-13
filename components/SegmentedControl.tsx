import React, { useState } from 'react';
import { XStack, Button, Text } from 'tamagui';

export interface SegmentedControlProps {
    /** Array of segment labels */
    segments: string[];
    /** Currently selected segment index */
    selectedIndex?: number;
    /** Called when a segment is selected */
    onSelect?: (index: number) => void;
}

/**
 * SegmentedControl (Pill Style)
 * 
 * A pill-shaped segmented control for switching between views.
 * Active segment uses the gold theme, inactive segments are transparent.
 */
export function SegmentedControl({
    segments,
    selectedIndex: controlledIndex,
    onSelect,
}: SegmentedControlProps) {
    const [internalIndex, setInternalIndex] = useState(0);
    const activeIndex = controlledIndex ?? internalIndex;

    const handleSelect = (index: number) => {
        if (controlledIndex === undefined) {
            setInternalIndex(index);
        }
        onSelect?.(index);
    };

    return (
        <XStack
            backgroundColor="$bgSurface"
            padding={4}
            borderRadius="$4"
            borderWidth={1}
            borderColor="$border"
        >
            {segments.map((label, index) => {
                const isActive = index === activeIndex;
                return (
                    <Button
                        key={label}
                        flex={1}
                        theme={isActive ? 'dark_gold' : undefined}
                        backgroundColor={isActive ? undefined : 'transparent'}
                        size="$3"
                        borderRadius="$2"
                        chromeless={!isActive}
                        onPress={() => handleSelect(index)}
                        pressStyle={{ opacity: 0.8 }}
                    >
                        <Text
                            color={isActive ? '$bgDeep' : '$textMuted'}
                            fontWeight={isActive ? '600' : '400'}
                        >
                            {label}
                        </Text>
                    </Button>
                );
            })}
        </XStack>
    );
}
