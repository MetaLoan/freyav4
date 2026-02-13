import React from 'react';
import Svg, { Path, Circle, SvgProps } from 'react-native-svg';
import { useTheme } from 'tamagui';

interface TripleMoonProps extends SvgProps {
    size?: number;
    color?: string;
    activeIndex?: number; // 0: Waxing, 1: Full, 2: Waning
}

export function TripleMoon({ size = 36, color, activeIndex, ...props }: TripleMoonProps) {
    const theme = useTheme();
    const mutedColor = theme.textMuted?.get() || '#666';
    const activeColor = theme.gold?.get() || '#D4C5A3';

    const height = size / 3;

    const getPhaseColor = (index: number) => {
        if (activeIndex === undefined) return color || mutedColor;
        return activeIndex === index ? activeColor : mutedColor;
    };

    const getPhaseOpacity = (index: number) => {
        if (activeIndex === undefined) return 1;
        return activeIndex === index ? 1 : 0.3;
    };

    return (
        <Svg width={size} height={height} viewBox="0 0 36 12" {...props}>
            {/* Waxing Crescent */}
            <Path
                d="M 6 2 A 4 4 0 1 0 6 10 A 3 3 0 1 1 6 2"
                stroke={getPhaseColor(0)}
                strokeWidth={activeIndex === 0 ? 1.5 : 1}
                fill={activeIndex === 0 ? getPhaseColor(0) : "none"}
                fillOpacity={0.2}
                opacity={getPhaseOpacity(0)}
            />
            {/* Full Moon */}
            <Circle
                cx={18}
                cy={6}
                r={3.5}
                stroke={getPhaseColor(1)}
                strokeWidth={activeIndex === 1 ? 1.5 : 1}
                fill={activeIndex === 1 ? getPhaseColor(1) : "none"}
                fillOpacity={0.2}
                opacity={getPhaseOpacity(1)}
            />
            {/* Waning Crescent */}
            <Path
                d="M 30 2 A 4 4 0 1 1 30 10 A 3 3 0 1 0 30 2"
                stroke={getPhaseColor(2)}
                strokeWidth={activeIndex === 2 ? 1.5 : 1}
                fill={activeIndex === 2 ? getPhaseColor(2) : "none"}
                fillOpacity={0.2}
                opacity={getPhaseOpacity(2)}
            />
        </Svg>
    );
}
