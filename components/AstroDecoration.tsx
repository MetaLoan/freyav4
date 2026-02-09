/**
 * 占星装饰组件
 * 
 * 包含月亮、行星和云朵的装饰性图案
 * 使用奶油金色勾勒，营造神秘的占星氛围
 */

import { YStack } from 'tamagui';
import Svg, { Path, Circle, Line, G } from 'react-native-svg';
import { R, getScreenWidth } from '@/src/config/responsive';

export function AstroDecoration() {
  const width = Math.min(getScreenWidth() * 0.8, 400);
  const height = width * 0.6;
  const strokeColor = '#E4D5A8'; // 奶油金色
  const strokeWidth = 2;

  return (
    <YStack width={width} height={height} alignItems="center" justifyContent="center">
      <Svg width={width} height={height} viewBox="0 0 400 240">
        {/* 左侧云朵群 */}
        <G opacity={0.8}>
          {/* 第一朵云 */}
          <Path
            d="M 30 80 Q 25 70, 35 65 Q 40 60, 50 62 Q 60 55, 70 60 Q 80 58, 85 68 Q 90 75, 82 82 Q 75 88, 65 85 Q 55 90, 45 86 Q 35 88, 30 80 Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* 第二朵云（较小） */}
          <Path
            d="M 15 120 Q 12 115, 18 112 Q 22 108, 30 110 Q 38 105, 45 109 Q 52 107, 55 114 Q 58 120, 52 125 Q 47 128, 40 126 Q 33 130, 26 127 Q 20 129, 15 120 Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* 第三朵云（最小） */}
          <Path
            d="M 10 160 Q 8 156, 13 154 Q 16 151, 22 152 Q 28 148, 33 151 Q 38 150, 40 155 Q 42 160, 38 163 Q 34 165, 29 164 Q 24 167, 19 165 Q 15 166, 10 160 Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        </G>

        {/* 右侧云朵群 */}
        <G opacity={0.8}>
          {/* 第一朵云（大） */}
          <Path
            d="M 320 100 Q 315 90, 325 85 Q 330 80, 340 82 Q 350 75, 360 80 Q 370 78, 375 88 Q 380 95, 372 102 Q 365 108, 355 105 Q 345 110, 335 106 Q 325 108, 320 100 Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* 第二朵云（中） */}
          <Path
            d="M 340 150 Q 337 143, 344 140 Q 348 136, 356 138 Q 364 133, 371 137 Q 378 135, 381 142 Q 384 148, 378 153 Q 373 156, 366 154 Q 359 158, 352 155 Q 346 157, 340 150 Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* 第三朵云（小） */}
          <Path
            d="M 360 190 Q 358 185, 363 183 Q 366 180, 372 181 Q 378 177, 383 180 Q 388 179, 390 184 Q 392 189, 388 192 Q 384 194, 379 193 Q 374 196, 369 194 Q 365 195, 360 190 Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        </G>

        {/* 中央月亮和行星组合 */}
        <G transform="translate(200, 120)">
          {/* 背景圆（行星轨道圈） */}
          <Circle
            cx={0}
            cy={0}
            r={50}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.3}
          />

          {/* 月亮（新月形状） */}
          <G transform="translate(-15, 0)">
            {/* 外轮廓 */}
            <Path
              d="M -20 -25 Q -10 -30, 0 -25 Q 10 -20, 15 -10 Q 18 0, 15 10 Q 10 20, 0 25 Q -10 30, -20 25 Q -12 20, -8 10 Q -6 0, -8 -10 Q -12 -20, -20 -25 Z"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill={strokeColor}
              fillOpacity={0.3}
            />
            
            {/* 月亮纹理线条 */}
            <Line x1={-15} y1={-15} x2={-15} y2={-5} stroke={strokeColor} strokeWidth={1} opacity={0.6} />
            <Line x1={-12} y1={-8} x2={-12} y2={2} stroke={strokeColor} strokeWidth={1} opacity={0.6} />
            <Line x1={-9} y1={-12} x2={-9} y2={-2} stroke={strokeColor} strokeWidth={1} opacity={0.6} />
            <Line x1={-16} y1={5} x2={-16} y2={15} stroke={strokeColor} strokeWidth={1} opacity={0.6} />
            <Line x1={-13} y1={8} x2={-13} y2={18} stroke={strokeColor} strokeWidth={1} opacity={0.6} />
          </G>

          {/* 轨道线 - 上方 */}
          <Line
            x1={-5}
            y1={-50}
            x2={-5}
            y2={-65}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          
          {/* 上方行星 */}
          <Circle
            cx={-5}
            cy={-75}
            r={8}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* 行星光环 */}
          <Path
            d="M -15 -75 Q -13 -80, -5 -80 Q 3 -80, 5 -75 Q 3 -70, -5 -70 Q -13 -70, -15 -75"
            stroke={strokeColor}
            strokeWidth={1.5}
            fill="none"
          />

          {/* 轨道线 - 下方 */}
          <Line
            x1={5}
            y1={50}
            x2={5}
            y2={65}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          
          {/* 下方小行星 */}
          <Circle
            cx={5}
            cy={75}
            r={6}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* 小行星陨石坑 */}
          <Circle cx={3} cy={73} r={1.5} fill={strokeColor} opacity={0.5} />
          <Circle cx={7} cy={76} r={1} fill={strokeColor} opacity={0.5} />
        </G>

        {/* 装饰性星星 */}
        <G opacity={0.6}>
          {/* 左上星星 */}
          <G transform="translate(80, 40)">
            <Line x1={-3} y1={0} x2={3} y2={0} stroke={strokeColor} strokeWidth={1.5} />
            <Line x1={0} y1={-3} x2={0} y2={3} stroke={strokeColor} strokeWidth={1.5} />
          </G>
          
          {/* 右上星星 */}
          <G transform="translate(310, 50)">
            <Line x1={-2} y1={0} x2={2} y2={0} stroke={strokeColor} strokeWidth={1.5} />
            <Line x1={0} y1={-2} x2={0} y2={2} stroke={strokeColor} strokeWidth={1.5} />
          </G>
          
          {/* 左下星星 */}
          <G transform="translate(60, 200)">
            <Line x1={-2} y1={0} x2={2} y2={0} stroke={strokeColor} strokeWidth={1.5} />
            <Line x1={0} y1={-2} x2={0} y2={2} stroke={strokeColor} strokeWidth={1.5} />
          </G>
          
          {/* 右下星星 */}
          <G transform="translate(350, 210)">
            <Line x1={-3} y1={0} x2={3} y2={0} stroke={strokeColor} strokeWidth={1.5} />
            <Line x1={0} y1={-3} x2={0} y2={3} stroke={strokeColor} strokeWidth={1.5} />
          </G>
        </G>
      </Svg>
    </YStack>
  );
}
