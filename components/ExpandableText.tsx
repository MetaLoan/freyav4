import React, { useState, useCallback, useEffect } from 'react';
import { LayoutChangeEvent, View, ViewStyle, TextStyle } from 'react-native';
import { Text, TextProps } from 'tamagui';

interface ExpandableTextProps extends TextProps {
    text: string;
    maxLines?: number;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
    width?: number | string;
}

export function ExpandableText({
    text,
    maxLines = 3,
    textStyle,
    containerStyle,
    width = "100%",
    ...props
}: ExpandableTextProps) {
    const [measuredLines, setMeasuredLines] = useState<string[]>([]);
    const [isMeasured, setIsMeasured] = useState(false);

    // Reset when text changes
    useEffect(() => {
        setIsMeasured(false);
        setMeasuredLines([]);
    }, [text]);

    const onTextLayout = useCallback((e: any) => {
        if (isMeasured) return;

        const lines = e.nativeEvent.lines;
        const textLines = lines.map((l: any) => l.text);
        setMeasuredLines(textLines);
        setIsMeasured(true);
    }, [isMeasured]);

    // Construct the truncated content
    const getDisplayedContent = () => {
        if (!isMeasured) return text; // Fallback

        if (measuredLines.length <= maxLines) {
            return text;
        }

        // Combine the full lines before the last one
        const visibleLines = measuredLines.slice(0, maxLines - 1);
        const lastLine = measuredLines[maxLines - 1];

        // Truncate the last line to make room for "... More"
        // Rough estimate: we need about 15-20% of the line width or ~15 chars
        // A safer bet is 15 chars approx.
        const truncatedLastLine = lastLine.slice(0, -18);

        return (
            <>
                {visibleLines.join('')}
                {truncatedLastLine}...
                <Text
                    color="$gold"
                    fontWeight="700"
                    pressStyle={{ opacity: 0.7 }}
                    suppressHighlighting
                >
                    More
                </Text>
            </>
        );
    };

    return (
        <View style={[{ width: width as any }, containerStyle]}>
            {/* Hidden measuring text - renders full text to detect lines */}
            <Text
                {...props}
                style={[textStyle, { position: 'absolute', opacity: 0, zIndex: -1 }]}
                onTextLayout={onTextLayout}
            >
                {text}
            </Text>

            {/* Visible text */}
            <Text
                {...props}
                style={textStyle}
                // Use standard truncation while measuring (fallback)
                numberOfLines={!isMeasured ? maxLines : undefined}
            >
                {getDisplayedContent()}
            </Text>
        </View>
    );
}
