import React from 'react';
import { Animated, Easing } from 'react-native';
import { YStack, Text } from 'tamagui';
import { Activity, Sparkles } from '@tamagui/lucide-icons';
import { palette } from '@/tamagui.config';

export interface LoadingSpinnerProps {
    /** Label text below the spinner */
    label?: string;
    /** Size of the icon, default 24 */
    size?: number;
    /** Color of the icon, default palette.gold */
    color?: string;
    /** Variant: 'spin' for rotation, 'pulse' for breathing */
    variant?: 'spin' | 'pulse';
}

/**
 * LoadingSpinner component
 * 
 * Animated loading indicators following the Minimalist Celestial aesthetic.
 * - 'spin' variant: Continuous rotation (Activity icon)
 * - 'pulse' variant: Breathing fade effect (Sparkles icon)
 */
export function LoadingSpinner({
    label,
    size = 24,
    color,
    variant = 'spin',
}: LoadingSpinnerProps) {
    if (variant === 'spin') {
        return (
            <YStack alignItems="center" gap="$2">
                <SpinningIcon size={size} color={color || palette.gold} />
                {label && <Text fontSize={10} color="$textMuted">{label}</Text>}
            </YStack>
        );
    }

    return (
        <YStack alignItems="center" gap="$2">
            <PulsingIcon size={size} color={color || palette.silver} />
            {label && <Text fontSize={10} color="$textMuted">{label}</Text>}
        </YStack>
    );
}

// Internal animated components

function SpinningIcon({ size, color }: { size: number; color: string }) {
    const spinValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate }] }}>
            <Activity size={size} color={color} />
        </Animated.View>
    );
}

function PulsingIcon({ size, color }: { size: number; color: string }) {
    const fadeValue = React.useRef(new Animated.Value(0.4)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeValue, {
                    toValue: 0.4,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeValue }}>
            <Sparkles size={size} color={color} />
        </Animated.View>
    );
}
