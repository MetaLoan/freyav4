import React from 'react';
import { XStack, YStack, Text, Button } from 'tamagui';
import { ArrowRight, Lock, Activity } from '@tamagui/lucide-icons';
import { Tag } from './Tag';

export type ReportCardVariant = 'brief' | 'detailed' | 'locked';

export interface ReportCardProps {
    /** Card title */
    title: string;
    /** Card body text */
    body: string;
    /** Card variant determines the visual style */
    variant: ReportCardVariant;
    /** Optional label for the card badge (e.g. "Free") */
    badge?: string;
    /** Tags to show at the bottom (for 'detailed' variant) */
    tags?: string[];
    /** Icon element to show next to the title (for 'detailed' variant) */
    icon?: React.ReactNode;
    /** CTA text for the brief variant */
    ctaText?: string;
    /** Called when CTA or card is pressed */
    onPress?: () => void;
    /** Called when unlock button is pressed (locked variant) */
    onUnlock?: () => void;
}

/**
 * ReportCard component
 * 
 * Three visual states for astrology report content:
 * - brief: Free preview with CTA link
 * - detailed: Full content with tags
 * - locked: Blurred content with unlock overlay
 */
export function ReportCard({
    title,
    body,
    variant,
    badge,
    tags = [],
    icon,
    ctaText = 'Read Analysis',
    onPress,
    onUnlock,
}: ReportCardProps) {
    if (variant === 'brief') {
        return (
            <YStack
                theme="dark_wired"
                borderWidth={1}
                borderColor="$borderColor"
                padding="$4"
                borderRadius="$4"
                gap="$2"
                pressStyle={onPress ? { opacity: 0.8 } : undefined}
                onPress={onPress}
            >
                <XStack justifyContent="space-between" alignItems="center">
                    <Text fontFamily="$heading" fontSize={18} color="$gold">{title}</Text>
                    {badge && (
                        <Text fontSize={10} color="$textMuted" textTransform="uppercase">{badge}</Text>
                    )}
                </XStack>
                <Text color="$textSecondary" fontSize={14} numberOfLines={2}>
                    {body}
                </Text>
                <XStack alignItems="center" gap="$1" opacity={0.8}>
                    <Text color="$gold" fontSize={12} fontWeight="600">{ctaText}</Text>
                    <ArrowRight size={12} color="$gold" />
                </XStack>
            </YStack>
        );
    }

    if (variant === 'detailed') {
        return (
            <YStack
                theme="dark_glass"
                borderWidth={1}
                borderColor="$borderColor"
                padding="$4"
                borderRadius="$4"
                gap="$3"
            >
                <XStack gap="$2" alignItems="center">
                    {icon || <Activity size={14} color="$gold" />}
                    <Text fontFamily="$heading" fontSize={18}>{title}</Text>
                </XStack>
                <Text color="$textSecondary" fontSize={14} lineHeight={22}>
                    {body}
                </Text>
                {tags.length > 0 && (
                    <XStack gap="$2" flexWrap="wrap">
                        {tags.map(t => (
                            <Tag key={t} label={t} fontSize={10} />
                        ))}
                    </XStack>
                )}
            </YStack>
        );
    }

    // variant === 'locked'
    return (
        <YStack
            theme="dark_wired"
            borderWidth={1}
            borderColor="$border"
            padding="$4"
            borderRadius="$4"
            gap="$2"
            overflow="hidden"
        >
            <XStack justifyContent="space-between" alignItems="center">
                <Text fontFamily="$heading" fontSize={18} color="$textMuted">{title}</Text>
                <Lock size={14} color="$textMuted" />
            </XStack>

            {/* Blurred Content Simulation */}
            <YStack opacity={0.3} gap="$1">
                <YStack height={12} width="100%" backgroundColor="$textMuted" borderRadius={2} />
                <YStack height={12} width="90%" backgroundColor="$textMuted" borderRadius={2} />
                <YStack height={12} width="60%" backgroundColor="$textMuted" borderRadius={2} />
            </YStack>

            {/* Unlock CTA Overlay */}
            <YStack
                position="absolute"
                top={0} left={0} right={0} bottom={0}
                alignItems="center"
                justifyContent="center"
                backgroundColor="rgba(13,11,20,0.6)"
            >
                <Button
                    theme="dark_gold"
                    size="$3"
                    icon={Lock}
                    onPress={onUnlock}
                >
                    <Text color="$bgDeep" fontWeight="600">Unlock Full Report</Text>
                </Button>
            </YStack>
        </YStack>
    );
}
