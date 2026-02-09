/**
 * 全屏弧形时间选择器
 * 
 * 仿物理轮盘效果，日期沿弧形排列
 * 圆心在屏幕左侧外部，选中项在屏幕中央偏左
 * 支持手势滑动、惯性衰减和自动吸附
 * 
 * 参考设计：城市选择器圆弧滚轮
 */

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  Dimensions,
  StyleSheet,
  Easing,
} from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { X } from '@tamagui/lucide-icons';
import { R } from '@/src/config/responsive';
import { useHeaderSafeArea } from '@/hooks/useSafeArea';

// ============================================================
// 类型定义
// ============================================================

export type TimeUnit = 'Hour' | 'Day' | 'Week' | 'Month' | 'Year';

export interface CircularTimeSelectorProps {
  visible: boolean;
  selectedTime: Date;
  timeUnit: TimeUnit;
  onTimeChange: (time: Date) => void;
  onTimeUnitChange: (unit: TimeUnit) => void;
  onClose: () => void;
}

// ============================================================
// 常量
// ============================================================

const TIME_UNITS: TimeUnit[] = ['Hour', 'Day', 'Week', 'Month', 'Year'];
const ITEM_COUNT = 61;
const CENTER_INDEX = 30;
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 轮盘物理参数
const ITEM_SPACING = 58;        // 项间距 px
const ARC_SHIFT = 90;           // 弧形最大水平偏移
const MAX_ROTATION = 22;        // 边缘最大旋转角度
const VISIBLE_RANGE = ITEM_SPACING * 7; // 可见范围
const DECELERATION = 0.993;     // 惯性衰减

// ============================================================
// 工具函数
// ============================================================

function offsetDate(base: Date, unit: TimeUnit, offset: number): Date {
  const d = new Date(base);
  switch (unit) {
    case 'Hour':  d.setHours(d.getHours() + offset); break;
    case 'Day':   d.setDate(d.getDate() + offset); break;
    case 'Week':  d.setDate(d.getDate() + offset * 7); break;
    case 'Month': d.setMonth(d.getMonth() + offset); break;
    case 'Year':  d.setFullYear(d.getFullYear() + offset); break;
  }
  return d;
}

function formatLabel(date: Date, unit: TimeUnit): string {
  switch (unit) {
    case 'Hour':  return `${date.getHours().toString().padStart(2, '0')}:00`;
    case 'Day':   return date.getDate().toString();
    case 'Week': {
      const s = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date.getTime() - s.getTime()) / 864e5);
      return `W${Math.ceil((days + s.getDay() + 1) / 7)}`;
    }
    case 'Month': return MONTH_SHORT[date.getMonth()];
    case 'Year':  return date.getFullYear().toString();
  }
}

function formatSub(date: Date, unit: TimeUnit): string {
  switch (unit) {
    case 'Hour':  return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}`;
    case 'Day':   return `${MONTH_SHORT[date.getMonth()]}`; // 移除年份
    case 'Week': {
      const sw = new Date(date);
      const day = sw.getDay();
      sw.setDate(sw.getDate() - day + (day === 0 ? -6 : 1));
      const ew = new Date(sw);
      ew.setDate(sw.getDate() + 6);
      return `${MONTH_SHORT[sw.getMonth()]}${sw.getDate()}-${MONTH_SHORT[ew.getMonth()]}${ew.getDate()}`;
    }
    case 'Month': return '';
    case 'Year':  return '';
  }
}

function isSameUnit(a: Date, b: Date, unit: TimeUnit): boolean {
  switch (unit) {
    case 'Hour':  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() && a.getHours() === b.getHours();
    case 'Day':   return a.toDateString() === b.toDateString();
    case 'Week': {
      const ws = (d: Date) => { const dd = new Date(d); const dy = dd.getDay(); dd.setDate(dd.getDate() - dy + (dy === 0 ? -6 : 1)); dd.setHours(0,0,0,0); return dd.getTime(); };
      return ws(a) === ws(b);
    }
    case 'Month': return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
    case 'Year':  return a.getFullYear() === b.getFullYear();
  }
}

interface WheelItem {
  date: Date;
  label: string;
  sub: string;
  isToday: boolean;
}

function generateItems(baseTime: Date, unit: TimeUnit): WheelItem[] {
  const now = new Date();
  const items: WheelItem[] = [];
  for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
    const date = offsetDate(baseTime, unit, i);
    items.push({
      date,
      label: formatLabel(date, unit),
      sub: formatSub(date, unit),
      isToday: isSameUnit(date, now, unit),
    });
  }
  return items;
}

// ============================================================
// 主组件
// ============================================================

export function CircularTimeSelector({
  visible,
  selectedTime,
  timeUnit,
  onTimeChange,
  onTimeUnitChange,
  onClose,
}: CircularTimeSelectorProps) {
  const { width: SW, height: SH } = Dimensions.get('window');
  const headerSafe = useHeaderSafeArea();

  // 动画值
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const wheelOffset = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(0.9)).current;
  const wheelFade = useRef(new Animated.Value(1)).current;

  // 状态
  const [isVisible, setIsVisible] = useState(false);
  const [internalUnit, setInternalUnit] = useState(timeUnit);
  const currentOffsetRef = useRef(0);
  const startOffsetRef = useRef(0);
  const isAnimatingUnit = useRef(false);

  // 生成时间列表
  const items = useMemo(
    () => generateItems(selectedTime, internalUnit),
    [selectedTime, internalUnit],
  );

  // 监听 wheelOffset
  useEffect(() => {
    const id = wheelOffset.addListener(({ value }) => {
      currentOffsetRef.current = value;
    });
    return () => wheelOffset.removeListener(id);
  }, []);

  // 打开/关闭动画
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setInternalUnit(timeUnit);
      wheelOffset.setValue(0);
      currentOffsetRef.current = 0;
      Animated.parallel([
        Animated.timing(overlayOpacity, { toValue: 1, duration: 400, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
        Animated.spring(contentScale, { toValue: 1, useNativeDriver: true, damping: 22, stiffness: 130, mass: 0.8 }),
      ]).start();
    } else if (isVisible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.timing(contentScale, { toValue: 0.9, duration: 280, useNativeDriver: true }),
      ]).start(() => setIsVisible(false));
    }
  }, [visible]);

  // 吸附到最近的项
  const snapToNearest = useCallback(() => {
    const v = currentOffsetRef.current;
    const idx = Math.round(-v / ITEM_SPACING) + CENTER_INDEX;
    const clamped = Math.max(0, Math.min(ITEM_COUNT - 1, idx));
    const snapTo = -(clamped - CENTER_INDEX) * ITEM_SPACING;
    Animated.spring(wheelOffset, {
      toValue: snapTo,
      useNativeDriver: false,
      damping: 28,
      stiffness: 220,
    }).start();
  }, []);

  // 手势
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 8,
        onPanResponderGrant: () => {
          wheelOffset.stopAnimation();
          startOffsetRef.current = currentOffsetRef.current;
        },
        onPanResponderMove: (_, { dy }) => {
          wheelOffset.setValue(startOffsetRef.current + dy);
        },
        onPanResponderRelease: (_, { vy }) => {
          const v = Math.max(-4, Math.min(4, vy));
          Animated.decay(wheelOffset, {
            velocity: v,
            deceleration: DECELERATION,
            useNativeDriver: false,
          }).start(({ finished }) => {
            if (finished) snapToNearest();
          });
        },
      }),
    [snapToNearest],
  );

  // 关闭并回传选中值
  const handleClose = useCallback(() => {
    const v = currentOffsetRef.current;
    const idx = Math.round(-v / ITEM_SPACING) + CENTER_INDEX;
    const clamped = Math.max(0, Math.min(ITEM_COUNT - 1, idx));
    if (items[clamped]) onTimeChange(items[clamped].date);
    if (internalUnit !== timeUnit) onTimeUnitChange(internalUnit);
    onClose();
  }, [items, internalUnit, timeUnit, onTimeChange, onTimeUnitChange, onClose]);

  // 切换粒度
  const handleUnitChange = useCallback((u: TimeUnit) => {
    if (u === internalUnit) return;
    
    // 立即停止当前所有动画并重置状态，确保响应点击
    wheelOffset.stopAnimation();
    isAnimatingUnit.current = true;
    
    // 获取当前选中的日期
    const currentV = currentOffsetRef.current;
    const currentIdx = Math.round(-currentV / ITEM_SPACING) + CENTER_INDEX;
    const currentClamped = Math.max(0, Math.min(ITEM_COUNT - 1, currentIdx));
    
    // 缩短滚出动画时间 (280ms -> 150ms)，提高响应速度
    const direction = Math.random() > 0.5 ? 1 : -1;
    const exitOffset = currentV + direction * ITEM_SPACING * 6;
    
    Animated.timing(wheelOffset, {
      toValue: exitOffset,
      duration: 150,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      // 切换粒度并重新生成列表
      setInternalUnit(u);
      
      // 从另一侧进入
      const enterOffset = -direction * ITEM_SPACING * 6;
      wheelOffset.setValue(enterOffset);
      currentOffsetRef.current = enterOffset;
      
      // 平滑滚动回中心位置
      Animated.spring(wheelOffset, {
        toValue: 0,
        useNativeDriver: false,
        damping: 20, // 降低阻尼，让回弹更干脆
        stiffness: 200, // 增加刚度
        mass: 0.8,
      }).start(() => {
        currentOffsetRef.current = 0;
        isAnimatingUnit.current = false;
      });
    });
  }, [internalUnit, items, selectedTime]);

  // 点击某项 → 吸附过去
  const handleItemTap = useCallback((i: number) => {
    const snapTo = -(i - CENTER_INDEX) * ITEM_SPACING;
    Animated.spring(wheelOffset, {
      toValue: snapTo,
      useNativeDriver: false,
      damping: 25,
      stiffness: 200,
    }).start();
  }, []);

  if (!isVisible) return null;

  // 轮盘锚点（文字中心项位置）
  const anchorX = SW * 0.1;
  const anchorY = SH * 0.46 - 20;

  // 统一圆弧参数 - 文字和装饰弧线同心
  // textArcR: 文字项沿此半径圆弧排列
  // circleCX/CY: 统一圆心（屏幕左侧远处）
  const textArcR = SW * 1.6;
  const circleCX = anchorX - textArcR;
  const circleCY = anchorY;

  // SVG 装饰弧（同心圆，半径更大）
  const svgR1 = textArcR + R.scale(100); // 外圈
  const svgR2 = textArcR + R.scale(30);  // 内圈

  // 圆弧方程: dx(dy) = sqrt(R² - dy²) - R
  const arcDx = (dy: number) =>
    Math.sqrt(Math.max(0, textArcR * textArcR - dy * dy)) - textArcR;
  // 圆弧切线角(deg): θ(dy) = arcsin(dy / R)
  const arcAngle = (dy: number) =>
    Math.asin(Math.min(Math.max(dy / textArcR, -1), 1)) * (180 / Math.PI);

  return (
    <YStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      // @ts-ignore - web: fixed position
      style={{ position: 'fixed', overflow: 'hidden', touchAction: 'none' }}
      zIndex={99999}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      >
        {/* 点击背景关闭 */}
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

      {/* ===== SVG 装饰弧线（与文字弧同心） ===== */}
      <Svg
        width={SW}
        height={SH}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <SvgCircle
          cx={circleCX}
          cy={circleCY}
          r={svgR1}
          stroke="rgba(228,213,168,0.06)"
          strokeWidth={1.5}
          fill="none"
        />
        <SvgCircle
          cx={circleCX}
          cy={circleCY}
          r={svgR2}
          stroke="rgba(228,213,168,0.035)"
          strokeWidth={1}
          fill="none"
        />
      </Svg>

      {/* ===== 轮盘区域 ===== */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { 
            transform: [{ scale: contentScale }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {items.map((item, i) => {
          const center = -(i - CENTER_INDEX) * ITEM_SPACING;

          const translateY = wheelOffset.interpolate({
            inputRange: [center - VISIBLE_RANGE, center, center + VISIBLE_RANGE],
            outputRange: [-VISIBLE_RANGE, 0, VISIBLE_RANGE],
            extrapolate: 'clamp',
          });

          // 使用真实圆弧方程计算水平偏移和旋转角（11 个采样点）
          const SAMPLES = 11;
          const txIn: number[] = [];
          const txOut: number[] = [];
          const rotIn: number[] = [];
          const rotOut: string[] = [];
          for (let s = 0; s < SAMPLES; s++) {
            const t = -1 + (2 * s) / (SAMPLES - 1); // -1 → +1
            const dy = VISIBLE_RANGE * t;
            txIn.push(center + VISIBLE_RANGE * t);
            txOut.push(arcDx(dy));
            rotIn.push(center + VISIBLE_RANGE * t);
            rotOut.push(`${arcAngle(dy)}deg`);
          }

          const translateX = wheelOffset.interpolate({
            inputRange: txIn,
            outputRange: txOut,
            extrapolate: 'clamp',
          });

          const scale = wheelOffset.interpolate({
            inputRange: [center - VISIBLE_RANGE, center, center + VISIBLE_RANGE],
            outputRange: [0.38, 1, 0.38],
            extrapolate: 'clamp',
          });

          const opacity = wheelOffset.interpolate({
            inputRange: [
              center - VISIBLE_RANGE,
              center - VISIBLE_RANGE * 0.65,
              center,
              center + VISIBLE_RANGE * 0.65,
              center + VISIBLE_RANGE,
            ],
            outputRange: [0, 0.3, 1, 0.3, 0],
            extrapolate: 'clamp',
          });

          // 沿圆弧切线方向旋转（基于真实 arcsin）
          const rotateZ = wheelOffset.interpolate({
            inputRange: rotIn,
            outputRange: rotOut,
            extrapolate: 'clamp',
          });

          // 子标签透明度（只在中心位置显示）
          const subOpacity = wheelOffset.interpolate({
            inputRange: [center - ITEM_SPACING, center, center + ITEM_SPACING],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          // 文字颜色插值（中心高亮为奶油金）
          const textColor = wheelOffset.interpolate({
            inputRange: [center - ITEM_SPACING * 0.8, center, center + ITEM_SPACING * 0.8],
            outputRange: ['#FFFFFF', '#E4D5A8', '#FFFFFF'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`${internalUnit}-${item.date.getTime()}`}
              style={{
                position: 'absolute',
                left: anchorX,
                top: anchorY,
                transform: [
                  { translateX },
                  { translateY },
                  { rotate: rotateZ },
                  { scale },
                ],
                opacity,
                // @ts-ignore web: transform-origin
                transformOrigin: 'left center',
              }}
            >
              <Pressable onPress={() => handleItemTap(i)}>
                <XStack alignItems="center" gap={R.spacing.sm()}>
                  <Animated.Text
                    style={{
                      fontFamily: 'PlayfairDisplay_400Regular',
                      fontSize: R.moderateScale(34, 0.3),
                      fontWeight: '400',
                      color: textColor,
                      // @ts-ignore
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Animated.Text>
                  {item.sub ? (
                    <Animated.Text
                      style={{
                        fontSize: R.fontSize.xs(),
                        color: '#A8A8B0',
                        opacity: subOpacity,
                        marginTop: 8, // 对齐大字底部
                      }}
                    >
                      {item.sub}
                    </Animated.Text>
                  ) : null}
                </XStack>
              </Pressable>
            </Animated.View>
          );
        })}
      </Animated.View>

      {/* ===== 选中指示线 ===== */}
      <YStack
        position="absolute"
        left={anchorX - 15}
        top={anchorY + R.moderateScale(34, 0.3) + 6}
        width={SW * 0.45}
        height={1}
        backgroundColor="rgba(228,213,168,0.12)"
        pointerEvents="none"
      />

      {/* ===== 年份信息 (放在选中线右侧) ===== */}
      <Animated.View
        style={{
          position: 'absolute',
          left: anchorX - 15 + SW * 0.45 + 12, // 线条右侧 + 间距
          top: anchorY + R.moderateScale(34, 0.3) + 6 - R.fontSize.xs() * 0.5, // 核心修正：线条 top + (线条 height/2) - (文字 fontSize/2)
          opacity: wheelOffset.interpolate({
            inputRange: [-ITEM_SPACING * 2, 0, ITEM_SPACING * 2],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          })
        }}
        pointerEvents="none"
      >
        <Text
          fontSize={R.fontSize.xs()}
          lineHeight={R.fontSize.xs()} // 显式设置行高确保垂直居中
          color="$textMuted"
          letterSpacing={2}
          textTransform="uppercase"
        >
          {(() => {
            const v = currentOffsetRef.current;
            const idx = Math.round(-v / ITEM_SPACING) + CENTER_INDEX;
            const clamped = Math.max(0, Math.min(ITEM_COUNT - 1, idx));
            const currentItem = items[clamped];
            if (!currentItem) return '';
            
            // 根据粒度显示不同的详细信息
            switch (internalUnit) {
              case 'Hour':
              case 'Day':
              case 'Week':
              case 'Month':
                return `${currentItem.date.getFullYear()}`;
              case 'Year':
                return '';
              default:
                return '';
            }
          })()}
        </Text>
      </Animated.View>

      {/* ===== 右侧粒度选择器 ===== */}
      <YStack
        position="absolute"
        right={R.spacing.xl()}
        top={SH * 0.33}
        gap={R.spacing.lg()}
        alignItems="flex-end"
        pointerEvents="box-none"
      >
        {/* 当前选中日期详细信息 (已移动到轮盘选中项旁) */}
        {/* ... (注释掉的代码保持不变) ... */}
        
        {TIME_UNITS.map((u) => {
          const isActive = u === internalUnit;
          
          // 为每个按钮创建动画值插值
          // 当 isActive 变化时，颜色和大小会平滑过渡
          return (
            <Pressable key={u} onPress={() => handleUnitChange(u)}>
              <YStack
                // @ts-ignore - web: transition
                style={{
                  transition: 'all 0.3s ease-out',
                  transform: [{ scale: isActive ? 1.15 : 1.0 }],
                }}
              >
                <Text
                  fontSize={R.fontSize.base()}
                  fontWeight={isActive ? '700' : '400'}
                  fontFamily={isActive ? 'PlayfairDisplay_700Bold' : 'Roboto_400Regular'}
                  color={isActive ? '$creamGold' : '$textMuted'}
                  opacity={isActive ? 1 : 0.45}
                  // @ts-ignore - web: transition
                  style={{
                    transition: 'all 0.3s ease-out',
                  }}
                >
                  {u}
                </Text>
              </YStack>
            </Pressable>
          );
        })}
      </YStack>

      {/* ===== 关闭按钮 ===== */}
      <Pressable
        onPress={handleClose}
        style={[styles.closeBtn, { top: headerSafe + 12 }]}
      >
        <X size={22} color="#A8A8B0" />
      </Pressable>

      {/* ===== 顶部提示 (已移除) ===== */}
      {/* <YStack
        position="absolute"
        left={R.layout.pagePaddingH()}
        top={headerSafe + 12}
        pointerEvents="none"
      >
        <Text fontSize={R.fontSize.xs()} color="$textMuted" letterSpacing={1.5} textTransform="uppercase">
          Select a time
        </Text>
      </YStack> */}
      </Animated.View>
    </YStack>
  );
}

// ============================================================
// 样式
// ============================================================

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 27, 46, 0.2)', // 20% 半透明
    overflow: 'hidden', // 防止溢出产生滚动条
    // @ts-ignore - web only: 高斯模糊
    backdropFilter: 'blur(20px)',
    // @ts-ignore
    WebkitBackdropFilter: 'blur(20px)',
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(45, 44, 64, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
