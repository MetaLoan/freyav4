import { YStack, YStackProps } from 'tamagui';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useState } from 'react';

/**
 * 羊皮纸卡片 - 带手撕纸张效果的不规则边缘
 * 
 * 左右两侧有明显锯齿，上下边缘微小起伏
 * 支持 iOS / Android / Web
 */
export function ParchmentCard({ 
  children, 
  rotate = '-1deg',
  ...props 
}: YStackProps & { rotate?: string }) {
  
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  
  // 生成手撕纸张边缘的 Path
  const getTearEdgePath = (w: number, h: number) => {
    const sideDepth = Math.min(w, h) * 0.04; // 左右锯齿深度 4%
    const topBottomDepth = Math.min(w, h) * 0.008; // 上下起伏深度 0.8%（很微小）
    const sideSteps = 12; // 左右每边的锯齿数量
    const topBottomSteps = 20; // 上下每边的起伏数量（多一些更平滑）
    
    let path = '';
    
    // 顶边（从左到右，微小起伏）
    path += `M ${sideDepth * 1.5},${topBottomDepth} `;
    for (let i = 0; i <= topBottomSteps; i++) {
      const x = (w / topBottomSteps) * i;
      const y = i % 2 === 0 ? topBottomDepth * 0.5 : topBottomDepth * 1.5;
      path += `L ${x},${y} `;
    }
    
    // 右边（从上到下，明显锯齿）
    for (let i = 0; i <= sideSteps; i++) {
      const x = i % 2 === 0 ? w - sideDepth * 0.5 : w - sideDepth * 2.5;
      const y = (h / sideSteps) * i;
      path += `L ${x},${y} `;
    }
    
    // 底边（从右到左，微小起伏）
    for (let i = topBottomSteps; i >= 0; i--) {
      const x = (w / topBottomSteps) * i;
      const y = i % 2 === 0 ? h - topBottomDepth * 0.5 : h - topBottomDepth * 1.5;
      path += `L ${x},${y} `;
    }
    
    // 左边（从下到上，明显锯齿）
    for (let i = sideSteps; i >= 0; i--) {
      const x = i % 2 === 0 ? sideDepth * 0.5 : sideDepth * 2.5;
      const y = (h / sideSteps) * i;
      path += `L ${x},${y} `;
    }
    
    path += 'Z';
    return path;
  };
  
  return (
    <View 
      style={{ transform: [{ rotate }] }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setContentSize({ width, height });
      }}
    >
      <YStack
        theme="dark_parchment"
        position="relative"
        {...props}
      >
        {/* SVG 背景层 - 直接绘制锯齿形状 */}
        {contentSize.width > 0 && contentSize.height > 0 && (
          <Svg 
            width={contentSize.width} 
            height={contentSize.height}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          >
            <Path
              d={getTearEdgePath(contentSize.width, contentSize.height)}
              fill="#E8D5A0"
            />
          </Svg>
        )}
        
        {/* 实际内容 */}
        <YStack 
          padding={24}
          alignItems="center"
        >
          {children}
        </YStack>
      </YStack>
    </View>
  );
}
