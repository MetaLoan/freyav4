import React, { useState } from 'react';
import { Sheet, SheetProps, YStack, H4, Text, XStack } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import { R } from '@/src/config/responsive';

export interface BottomSheetProps extends SheetProps {
    title?: string;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
    snapPoints?: number[];
    headerIcon?: React.ReactNode;
    footer?: React.ReactNode;
}

/**
 * BottomSheet Component
 * 
 * Reusable slide-up sheet component adhering to the "Minimalist Celestial" theme.
 * Uses Tamagui Sheet for smooth animations and gesture support.
 * 
 * Features:
 * - Backdrop blur
 * - "Wired" handle indicator
 * - Dark, glass-like background
 * - Full width & bottom alignment support
 */
export function BottomSheet({
    title,
    trigger,
    children,
    snapPoints = [85, 50, 25],
    headerIcon,
    footer,
    ...props
}: BottomSheetProps) {
    const [position, setPosition] = useState(0);

    return (
        <Sheet
            // Disable scroll locking to prevent layout shifts (scrollbar jump) on Web
            forceRemoveScrollEnabled={false}
            modal={true}
            open={props.open}
            onOpenChange={props.onOpenChange}
            snapPoints={snapPoints}
            dismissOnSnapToBottom
            position={position}
            onPositionChange={setPosition}
            zIndex={100_000}
            animation="medium"
            {...props}
        >
            <Sheet.Overlay
                animation="medium"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor="rgba(0,0,0,0.5)"
                // @ts-ignore - web only style
                style={{ backdropFilter: 'blur(4px)' }}
            />

            <Sheet.Handle
                backgroundColor="$borderStrong"
                height={4}
                width={40}
                opacity={0.5}
                marginTop="$3"
                marginBottom="$1"
            />

            <Sheet.Frame
                flex={1}
                width="100%"
                padding="$4"
                backgroundColor="$bgCard"
                borderTopLeftRadius="$6"
                borderTopRightRadius="$6"
                borderWidth={1}
                borderColor="$border"
                borderBottomWidth={0}
            >
                {/* Header Section: Title/Close + Icon below */}
                <YStack gap="$4" paddingBottom="$2">

                    {/* 1. Top Row: Title + Close Button */}
                    <XStack alignItems="center" justifyContent="space-between">
                        {title ? (
                            <Text
                                fontFamily="$heading"
                                fontSize="$6"
                                color="$color"
                            >
                                {title}
                            </Text>
                        ) : <YStack />}

                        {/* Close Button */}
                        <XStack onPress={() => props.onOpenChange?.(false)} hitSlop={10}>
                            <X size={24} color="$textMuted" />
                        </XStack>
                    </XStack>

                    {/* 2. Theme LOGO / Icon - Below title now */}
                    {headerIcon && (
                        <YStack alignItems="center" justifyContent="center" paddingVertical="$2">
                            {headerIcon}
                        </YStack>
                    )}
                </YStack>

                {/* Content Area - Scrollable if needed, otherwise takes flex */}
                <YStack flex={1}>
                    {children}
                </YStack>

                {/* Footer Section - Pinned to bottom */}
                {footer && (
                    <YStack marginTop="auto" paddingTop="$4">
                        {footer}
                    </YStack>
                )}

            </Sheet.Frame>
        </Sheet>
    );
}
