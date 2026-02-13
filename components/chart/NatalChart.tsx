import React from 'react';
import { Dimensions } from 'react-native';
import { YStack } from 'tamagui';
import Svg, { Circle, Line, Text as SvgText, G, Path } from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_SIZE = SCREEN_WIDTH - 40; // Full width minus padding
const CENTER = CHART_SIZE / 2;
const RADIUS = CENTER - 20;

const ZODIAC_SIGNS = [
    { symbol: '♈', name: 'Aries', color: '#E53935' },
    { symbol: '♉', name: 'Taurus', color: '#43A047' },
    { symbol: '♊', name: 'Gemini', color: '#FDD835' },
    { symbol: '♋', name: 'Cancer', color: '#90CAF9' },
    { symbol: '♌', name: 'Leo', color: '#FFB300' },
    { symbol: '♍', name: 'Virgo', color: '#8D6E63' },
    { symbol: '♎', name: 'Libra', color: '#F48FB1' },
    { symbol: '♏', name: 'Scorpio', color: '#D32F2F' },
    { symbol: '♐', name: 'Sagittarius', color: '#5E35B1' },
    { symbol: '♑', name: 'Capricorn', color: '#6D4C41' },
    { symbol: '♒', name: 'Aquarius', color: '#039BE5' },
    { symbol: '♓', name: 'Pisces', color: '#00ACC1' },
];

export function NatalChart() {
    return (
        <YStack alignItems="center" justifyContent="center" width={CHART_SIZE} height={CHART_SIZE}>
            <Svg width={CHART_SIZE} height={CHART_SIZE}>
                {/* 1. Outer Ring (Zodiac Background) */}
                <Circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="rgba(255,255,255,0.1)" strokeWidth="40" fill="none" />

                {/* 2. Inner Ring (House Boundary) */}
                <Circle cx={CENTER} cy={CENTER} r={RADIUS - 40} stroke="rgba(212, 197, 163, 0.5)" strokeWidth="1" fill="none" />

                {/* 3. Center Hub */}
                <Circle cx={CENTER} cy={CENTER} r={40} fill="rgba(255,255,255,0.05)" />
                <Circle cx={CENTER} cy={CENTER} r={4} fill="#D4C5A3" />

                {/* 4. Zodiac Sectors & Signs */}
                {ZODIAC_SIGNS.map((sign, index) => {
                    const angleStep = 360 / 12;
                    const angle = index * angleStep;
                    const rotation = angle - 90; // Start at top (12 o'clock is usually MC, but standard zodiac starts Aries at 9 o'clock / Ascendant. Let's just draw circle for now)

                    // Convert polar to cartesian for line end
                    const rad = (rotation * Math.PI) / 180;
                    const x = CENTER + (RADIUS - 20) * Math.cos(rad);
                    const y = CENTER + (RADIUS - 20) * Math.sin(rad);

                    // Text position (middle of the sign sector)
                    const textAngle = rotation + (angleStep / 2);
                    const textRad = (textAngle * Math.PI) / 180;
                    const textX = CENTER + RADIUS * Math.cos(textRad);
                    const textY = CENTER + RADIUS * Math.sin(textRad);

                    // Line position (Cusp)
                    const lineRad = (rotation * Math.PI) / 180;
                    const lineX1 = CENTER + (RADIUS - 40) * Math.cos(lineRad);
                    const lineY1 = CENTER + (RADIUS - 40) * Math.sin(lineRad);
                    const lineX2 = CENTER + (RADIUS + 20) * Math.cos(lineRad);
                    const lineY2 = CENTER + (RADIUS + 20) * Math.sin(lineRad);

                    return (
                        <G key={sign.name}>
                            {/* Divider Lines */}
                            <Line
                                x1={lineX1}
                                y1={lineY1}
                                x2={lineX2}
                                y2={lineY2}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="1"
                            />

                            {/* Sign Symbol */}
                            <SvgText
                                x={textX}
                                y={textY + 5} // Adjustment for visual centering
                                fill="#D4C5A3"
                                fontSize="20"
                                fontWeight="bold"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                rotation={textAngle + 90} // Rotate text to be upright relative to center
                                origin={`${textX}, ${textY}`}
                            >
                                {sign.symbol}
                            </SvgText>

                            {/* House Lines to Center (Simplified) */}
                            <Line
                                x1={CENTER}
                                y1={CENTER}
                                x2={lineX1}
                                y2={lineY1}
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="1"
                            />
                        </G>
                    );
                })}

                {/* Decoration: Ascendant / Descendant Horizon Line */}
                <Line
                    x1={CENTER - RADIUS}
                    y1={CENTER}
                    x2={CENTER + RADIUS}
                    y2={CENTER}
                    stroke="#D4C5A3"
                    strokeWidth="2"
                    strokeOpacity={0.8}
                />
            </Svg>
        </YStack>
    );
}
