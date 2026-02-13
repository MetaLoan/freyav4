import React, { useState } from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { palette } from '@/tamagui.config';

export interface UnderlineTabsProps {
    /** Array of tab labels */
    tabs: string[];
    /** Currently selected tab index */
    selectedIndex?: number;
    /** Called when a tab is selected */
    onSelect?: (index: number) => void;
}

/**
 * UnderlineTabs component
 * 
 * Minimal underline-style tab navigation.
 * Active tab has a gold underline and gold text.
 */
export function UnderlineTabs({
    tabs,
    selectedIndex: controlledIndex,
    onSelect,
}: UnderlineTabsProps) {
    const [internalIndex, setInternalIndex] = useState(0);
    const activeIndex = controlledIndex ?? internalIndex;

    const handleSelect = (index: number) => {
        if (controlledIndex === undefined) {
            setInternalIndex(index);
        }
        onSelect?.(index);
    };

    return (
        <XStack borderBottomWidth={1} borderColor="$border" gap="$4">
            {tabs.map((label, index) => {
                const isActive = index === activeIndex;
                return (
                    <YStack
                        key={label}
                        borderBottomWidth={isActive ? 2 : 0}
                        borderBottomColor="$gold"
                        paddingVertical="$2"
                        onPress={() => handleSelect(index)}
                        cursor="pointer"
                        style={isActive ? { borderBottomColor: palette.gold } : undefined}
                    >
                        <Text
                            color={isActive ? '$gold' : '$textMuted'}
                            fontWeight={isActive ? '600' : '400'}
                        >
                            {label}
                        </Text>
                    </YStack>
                );
            })}
        </XStack>
    );
}
