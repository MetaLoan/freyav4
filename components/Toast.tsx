import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { CheckCircle, AlertCircle, Star, Info } from '@tamagui/lucide-icons';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
    /** Toast title */
    title: string;
    /** Toast description / subtitle */
    message?: string;
    /** Visual variant */
    variant?: ToastVariant;
    /** Custom icon to override the default */
    icon?: React.ReactNode;
}

const variantConfig: Record<ToastVariant, {
    borderColor: string;
    iconColor: string;
    Icon: React.ComponentType<any>;
}> = {
    success: {
        borderColor: 'rgba(150, 224, 179, 0.3)',
        iconColor: '#96E0B3',
        Icon: CheckCircle,
    },
    error: {
        borderColor: 'rgba(224, 150, 150, 0.3)',
        iconColor: '#E09696',
        Icon: AlertCircle,
    },
    info: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        iconColor: '#96BCE0',
        Icon: Info,
    },
    warning: {
        borderColor: 'rgba(224, 199, 150, 0.3)',
        iconColor: '#E0C796',
        Icon: Star,
    },
};

/**
 * Toast notification component
 * 
 * Glassmorphic notification banners for in-app feedback.
 * Supports success, error, info, and warning variants.
 */
export function Toast({
    title,
    message,
    variant = 'info',
    icon,
}: ToastProps) {
    const config = variantConfig[variant];
    const IconComponent = config.Icon;

    return (
        <XStack
            backgroundColor="rgba(0, 0, 0, 0.5)"
            paddingHorizontal="$4"
            paddingVertical="$3"
            borderRadius="$4"
            borderWidth={1}
            borderColor={config.borderColor}
            alignItems="center"
            gap="$3"
        >
            {icon || <IconComponent size={18} color={config.iconColor} />}
            <YStack flex={1}>
                <Text color="$color" fontSize={14} fontWeight="500">{title}</Text>
                {message && (
                    <Text color="$textMuted" fontSize={12}>{message}</Text>
                )}
            </YStack>
        </XStack>
    );
}
