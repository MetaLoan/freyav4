import React, { useState } from 'react';
import { ScrollView, Switch } from 'react-native';
import { YStack, XStack, Text, Button, Input, Separator } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import {
    Atom,
    Moon,
    Sun,
    ArrowRight,
    Activity,
    Search,
    Bell,
    Menu,
    Lock,
} from '@tamagui/lucide-icons';

// Public Components
import { GradientBackground } from '@/components/GradientBackground';
import { BottomSheet } from '@/components/BottomSheet';
import { Tag } from '@/components/Tag';
import { ProgressBar } from '@/components/ProgressBar';
import { SegmentedControl } from '@/components/SegmentedControl';
import { UnderlineTabs } from '@/components/UnderlineTabs';
import { ReportCard } from '@/components/ReportCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Toast } from '@/components/Toast';

// Hooks & Config
import { useHeaderSafeArea } from '@/hooks/useSafeArea';
import { R } from '@/src/config/responsive';
import { palette } from '@/tamagui.config';

/**
 * Design System Playground
 * 
 * A dedicated page to validate the "Minimalist Celestial" (Co-Star style) aesthetic.
 * All components below are imported from @/components/ for reuse across the app.
 */
export default function DesignSystemScreen() {
    const headerTop = useHeaderSafeArea();
    const [switchVal, setSwitchVal] = useState(true);
    const [showSheet, setShowSheet] = useState(false);

    return (
        <GradientBackground flex={1}>
            <StatusBar style="light" />

            <ScrollView
                contentContainerStyle={{
                    paddingTop: headerTop,
                    paddingBottom: 100
                }}
                showsVerticalScrollIndicator={false}
            >
                <YStack paddingHorizontal={R.layout.pagePaddingH()} gap="$6">

                    {/* Header */}
                    <YStack gap="$2" marginTop="$4">
                        <Text fontFamily="$heading" fontSize={32} color="$color">
                            Design System
                        </Text>
                        <Text color="$textSecondary" fontSize={14} letterSpacing={1}>
                            MINIMALIST CELESTIAL
                        </Text>
                    </YStack>

                    <Separator borderColor="$border" />

                    {/* 1. Typography Section */}
                    <Section title="Typography">
                        <YStack gap="$4">
                            <TypeSpec label="Heading (Serif)" font="$heading" size={32} text="The Moon in Pisces" />
                            <TypeSpec label="Subheading (Serif)" font="$heading" size={24} text="Cosmic Alignment" />
                            <TypeSpec label="Body (Sans)" font="$body" size={16} text="The universe is not outside of you. Look inside yourself; everything that you want, you already are." />
                            <TypeSpec label="Caption (Sans)" font="$body" size={12} text="PLANETARY MOVEMENT · 2024" color="$textSecondary" spacing={1} uppercase />

                            <XStack gap="$4" marginTop="$2">
                                <Text fontFamily="$heading" fontSize={48} color="$gold">Aa</Text>
                                <Text fontFamily="$body" fontSize={48} color="$color" fontWeight="300">Aa</Text>
                                <Text fontFamily="$body" fontSize={48} color="$color" fontWeight="bold">Aa</Text>
                            </XStack>
                        </YStack>
                    </Section>

                    {/* 2. Buttons Section */}
                    <Section title="Buttons & Interactions">
                        <YStack gap="$4">
                            {/* Primary Action (Gold) */}
                            <XStack gap="$4" alignItems="center">
                                <Button
                                    theme="dark_gold"
                                    size="$4"
                                    borderRadius="$8"
                                    pressStyle={{ opacity: 0.8 }}
                                >
                                    <Text color="$bgDeep" fontWeight="600">Connect Wallet</Text>
                                </Button>
                                <Text color="$textSecondary" fontSize={12}>Primary (Gold)</Text>
                            </XStack>

                            {/* Secondary (Outline/wired) */}
                            <XStack gap="$4" alignItems="center">
                                <Button
                                    theme="dark_wired"
                                    size="$4"
                                    borderRadius="$8"
                                    borderWidth={1}
                                    borderColor="$borderStrong"
                                >
                                    <Text color="$color">View Chart</Text>
                                </Button>
                                <Text color="$textSecondary" fontSize={12}>Secondary (Wired)</Text>
                            </XStack>

                            {/* Icon Buttons */}
                            <XStack gap="$4">
                                <Button theme="dark_wired" size="$3" circular icon={Bell} />
                                <Button theme="dark_gold" size="$3" circular icon={ArrowRight} />
                                <Button theme="dark_glass" size="$3" circular icon={Menu} />
                            </XStack>
                        </YStack>
                    </Section>

                    {/* 3. Cards Section */}
                    <Section title="Cards & Surfaces">
                        <YStack gap="$4">
                            {/* Wired Card */}
                            <YStack
                                theme="dark_wired"
                                borderWidth={1}
                                borderColor="$borderColor"
                                padding="$4"
                                borderRadius="$4"
                                gap="$2"
                            >
                                <XStack justifyContent="space-between">
                                    <Text fontFamily="$heading" fontSize={18}>Wired Card</Text>
                                    <Atom size={16} color="$gold" />
                                </XStack>
                                <Text color="$textSecondary" fontSize={14} lineHeight={20}>
                                    Transparent background with sharp borders. Used for data blocks and lists.
                                </Text>
                            </YStack>

                            {/* Surface/Filled Card */}
                            <YStack
                                backgroundColor="$bgCard"
                                padding="$4"
                                borderRadius="$4"
                                gap="$2"
                            >
                                <XStack justifyContent="space-between">
                                    <Text fontFamily="$heading" fontSize={18}>Surface Card</Text>
                                    <Moon size={16} color="$textSecondary" />
                                </XStack>
                                <Text color="$textSecondary" fontSize={14} lineHeight={20}>
                                    Subtle background fill. Used for emphasizing content sections.
                                </Text>
                            </YStack>

                            {/* Glass Card */}
                            <YStack
                                theme="dark_glass"
                                padding="$4"
                                borderRadius="$4"
                                borderWidth={1}
                                borderColor="$borderColor"
                                gap="$2"
                            >
                                <XStack justifyContent="space-between">
                                    <Text fontFamily="$heading" fontSize={18}>Glass Card</Text>
                                    <Sun size={16} color="$gold" />
                                </XStack>
                                <Text color="$textSecondary" fontSize={14} lineHeight={20}>
                                    Semi-transparent overlay. Used for modals or floating elements.
                                </Text>
                            </YStack>
                        </YStack>
                    </Section>

                    {/* 4. Controls & Inputs */}
                    <Section title="Controls">
                        <YStack gap="$4">
                            {/* Search Input */}
                            <XStack
                                backgroundColor="rgba(255,255,255,0.05)"
                                borderRadius="$8"
                                paddingHorizontal="$3"
                                height={44}
                                alignItems="center"
                                borderWidth={1}
                                borderColor="rgba(255,255,255,0.1)"
                            >
                                <Search size={16} color="$textMuted" />
                                <Input
                                    flex={1}
                                    unstyled
                                    backgroundColor="transparent"
                                    borderWidth={0}
                                    outlineWidth={0}
                                    paddingHorizontal={0}
                                    placeholder="Search user..."
                                    placeholderTextColor="$textMuted"
                                    color="$color"
                                    fontSize={14}
                                    focusStyle={{
                                        borderWidth: 0,
                                        outlineWidth: 0,
                                        borderColor: 'transparent'
                                    }}
                                    hoverStyle={{
                                        borderWidth: 0,
                                        borderColor: 'transparent'
                                    }}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        boxShadow: 'none',
                                        background: 'transparent',
                                    } as any}
                                />
                            </XStack>

                            {/* Toggles */}
                            <XStack justifyContent="space-between" alignItems="center">
                                <Text fontSize={16}>Notifications</Text>
                                <Switch
                                    value={switchVal}
                                    onValueChange={setSwitchVal}
                                    trackColor={{ false: '#2A2935', true: palette.gold }}
                                    thumbColor={switchVal ? '#0D0B14' : '#BFBFCC'}
                                />
                            </XStack>

                            {/* Tags — Now using public component */}
                            <XStack gap="$2" flexWrap="wrap">
                                {['Retrograde', 'Full Moon', 'Transit'].map(tag => (
                                    <Tag key={tag} label={tag} />
                                ))}
                            </XStack>
                        </YStack>
                    </Section>

                    {/* 5. Special Aesthetic Elements */}
                    <Section title="Aesthetic Elements">
                        <XStack justifyContent="space-around" padding="$4" alignItems="center">
                            {/* Thin lines */}
                            <YStack alignItems="center" gap="$2">
                                <YStack width={1} height={60} backgroundColor="$gold" opacity={0.5} />
                                <Text fontSize={10} color="$gold" letterSpacing={2}>AXIS</Text>
                            </YStack>

                            {/* Circle outline */}
                            <YStack
                                width={80}
                                height={80}
                                borderRadius={40}
                                borderWidth={1}
                                borderColor="rgba(255,255,255,0.2)"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <YStack width={60} height={60} borderRadius={30} borderWidth={1} borderColor="$gold" opacity={0.3} />
                            </YStack>

                            {/* Dots */}
                            <XStack gap="$2">
                                {[1, 0.5, 0.2].map((op, i) => (
                                    <YStack key={i} width={4} height={4} borderRadius={2} backgroundColor="$color" opacity={op} />
                                ))}
                            </XStack>
                        </XStack>
                    </Section>

                    {/* 6. Tabs & Segments — Now using public components */}
                    <Section title="Tabs & Segments">
                        <YStack gap="$4">
                            <UnderlineTabs tabs={['Overview', 'Transits', 'Natal']} />
                            <SegmentedControl segments={['Daily', 'Weekly', 'Monthly']} />
                        </YStack>
                    </Section>

                    {/* 7. Report Cards — Now using public component */}
                    <Section title="Report States">
                        <YStack gap="$4">
                            <ReportCard
                                variant="brief"
                                title="Career Insight"
                                body="Mercury is entering your tenth house of career and public image today. Expect clear communication..."
                                badge="Free"
                                ctaText="Read Analysis"
                            />
                            <ReportCard
                                variant="detailed"
                                title="Love & Relationships"
                                body={`Venus trine Mars creates a harmonious flow between your desires and your actions. If you've been waiting to make a move, the energy supports bold but graceful steps.\n\nExisting relationships deepen through shared activities. Single? Look for connections in places of learning or travel.`}
                                tags={['Venus', 'Mars', 'Trine']}
                            />
                            <ReportCard
                                variant="locked"
                                title="Wealth Forecast"
                                body=""
                            />
                        </YStack>
                    </Section>

                    {/* 8. Loading & Progress — Now using public components */}
                    <Section title="Loading & Progress">
                        <YStack gap="$6">
                            <XStack gap="$8" alignItems="center" justifyContent="center">
                                <LoadingSpinner variant="spin" label="ANALYZING" />
                                <LoadingSpinner variant="pulse" label="CONNECTING" />
                            </XStack>

                            <YStack gap="$3">
                                <ProgressBar label="Daily Energy" value={84} color="$gold" />
                                <ProgressBar label="Social Battery" value={32} color="$silver" fillOpacity={0.5} />
                            </YStack>
                        </YStack>
                    </Section>

                    {/* 9. Feedback & Alerts — Now using public component */}
                    <Section title="Feedback & Alerts">
                        <YStack gap="$4">
                            <Toast
                                variant="success"
                                title="Reading Complete"
                                message="Your astral chart has been updated."
                            />
                            <Toast
                                variant="warning"
                                title="New Insight Available"
                                message="Mercury is in retrograde."
                            />
                            <Toast
                                variant="error"
                                title="Connection Failed"
                                message="Please check your internet."
                            />
                        </YStack>
                    </Section>

                    {/* 10. Modals & Sheets */}
                    <Section title="Modals & Sheets">
                        <YStack gap="$4">
                            <Button
                                theme="dark_wired"
                                onPress={() => setShowSheet(true)}
                            >
                                <Text color="$color">Open Bottom Sheet</Text>
                            </Button>

                            <BottomSheet
                                open={showSheet}
                                onOpenChange={setShowSheet}
                                snapPoints={[60, 40]}
                                headerIcon={<Atom size={80} color="$gold" strokeWidth={0.8} />}
                                footer={
                                    <Button theme="dark_gold" size="$4" onPress={() => setShowSheet(false)}>
                                        <Text color="$bgDeep" fontWeight="600">Acknowledge</Text>
                                    </Button>
                                }
                            >
                                <YStack gap="$4" alignItems="center">
                                    <Text fontFamily="$heading" fontSize={24} lineHeight={32} color="$color" textAlign="center">
                                        Celestial Insight
                                    </Text>
                                    <Text fontFamily="$body" fontSize={16} lineHeight={26} color="$textSecondary" textAlign="center">
                                        The alignment of the stars suggests a time of introspection.
                                        Your ruling planet is enhancing your intuitive capabilities.
                                    </Text>
                                </YStack>
                            </BottomSheet>
                        </YStack>
                    </Section>

                </YStack>
            </ScrollView>
        </GradientBackground>
    );
}

// ---- Page-local helpers (not shared) ----

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <YStack gap="$4">
            <XStack alignItems="center" gap="$2">
                <Activity size={12} color="$gold" />
                <Text
                    color="$textMuted"
                    fontSize={12}
                    textTransform="uppercase"
                    letterSpacing={1.5}
                    fontWeight="600"
                >
                    {title}
                </Text>
                <Separator flex={1} borderColor="$border" opacity={0.5} />
            </XStack>
            {children}
        </YStack>
    );
}

function TypeSpec({ label, font, size, text, color = "$color", spacing = 0, uppercase = false }: any) {
    return (
        <YStack gap="$1">
            <Text color="$textMuted" fontSize={10}>{label} — {size}px</Text>
            <Text
                fontFamily={font}
                fontSize={size}
                color={color}
                lineHeight={size * 1.3}
                letterSpacing={spacing}
                textTransform={uppercase ? 'uppercase' : 'none'}
            >
                {text}
            </Text>
        </YStack>
    );
}
