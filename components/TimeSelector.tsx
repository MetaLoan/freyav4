/**
 * 时间选择器组件
 * 
 * 水平滑动的日期/时间选择器，带动画药丸背景
 * 支持 Hour / Day / Week / Month / Year 五种时间粒度
 * 
 * 参考 V3 的 TimeSelector 重写为 React Native / Tamagui 版本
 */

import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import {
  ScrollView,
  Animated,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  Platform,
  Easing,
} from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import { R } from '@/src/config/responsive';

// ============================================================
// 类型定义
// ============================================================

export type TimeUnit = 'Hour' | 'Day' | 'Week' | 'Month' | 'Year';

export interface TimeSelectorProps {
  /** 当前选中的时间 */
  selectedTime: Date;
  /** 当前时间粒度 */
  timeUnit: TimeUnit;
  /** 时间变更回调 */
  onTimeChange: (time: Date) => void;
  /** 时间粒度变更回调 */
  onTimeUnitChange: (unit: TimeUnit) => void;
  /** 是否显示时间粒度切换 */
  showUnitSelect?: boolean;
  /** 是否显示日期标题 */
  showTitle?: boolean;
}

// ============================================================
// 常量
// ============================================================

const TIME_UNITS: TimeUnit[] = ['Hour', 'Day', 'Week', 'Month', 'Year'];
const ITEM_COUNT = 41; // 前后各 20 + 中心 1
const CENTER_INDEX = Math.floor(ITEM_COUNT / 2);
const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ============================================================
// 工具函数
// ============================================================

/** 格式化时间标签 */
function formatTimeLabel(date: Date, unit: TimeUnit): string {
  switch (unit) {
    case 'Hour':
      return `${date.getHours().toString().padStart(2, '0')}:00`;
    case 'Day':
      return date.getDate().toString();
    case 'Week': {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
      return `W${weekNumber}`;
    }
    case 'Month':
      return MONTH_NAMES_SHORT[date.getMonth()];
    case 'Year':
      return date.getFullYear().toString();
    default:
      return date.getDate().toString();
  }
}

/** 格式化完整日期标题 */
function formatDateTitle(date: Date, unit: TimeUnit): string {
  switch (unit) {
    case 'Hour':
      return `${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} · ${date.getHours().toString().padStart(2, '0')}:00`;
    case 'Day':
      return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    case 'Week': {
      const startOfWeek = new Date(date);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${MONTH_NAMES_SHORT[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${MONTH_NAMES_SHORT[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${date.getFullYear()}`;
    }
    case 'Month':
      return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
    case 'Year':
      return `${date.getFullYear()}`;
    default:
      return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  }
}

/** 格式化副标题 */
function formatSubLabel(date: Date, unit: TimeUnit): string {
  switch (unit) {
    case 'Hour':
      // 显示 Feb 2026
      return `${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getFullYear()}`;
    case 'Day':
      // 显示 Feb 2026
      return `${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getFullYear()}`;
    case 'Week': {
      // 显示 Feb9-Feb15
      const startOfWeek = new Date(date);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${MONTH_NAMES_SHORT[startOfWeek.getMonth()]}${startOfWeek.getDate()}-${MONTH_NAMES_SHORT[endOfWeek.getMonth()]}${endOfWeek.getDate()}`;
    }
    case 'Month':
      // 显示 2026
      return `${date.getFullYear()}`;
    case 'Year':
      return '';
    default:
      return '';
  }
}

/** 比较两个日期是否相同（根据粒度） */
function isSameTime(a: Date, b: Date, unit: TimeUnit): boolean {
  switch (unit) {
    case 'Hour':
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() && a.getHours() === b.getHours();
    case 'Day':
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    case 'Week': {
      // 计算两个日期所在周数
      const getWeekStart = (d: Date) => {
        const dd = new Date(d);
        const day = dd.getDay();
        dd.setDate(dd.getDate() - day + (day === 0 ? -6 : 1));
        dd.setHours(0, 0, 0, 0);
        return dd.getTime();
      };
      return getWeekStart(a) === getWeekStart(b);
    }
    case 'Month':
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
    case 'Year':
      return a.getFullYear() === b.getFullYear();
    default:
      return a.getTime() === b.getTime();
  }
}

/** 根据时间粒度和偏移量生成日期 */
function offsetDate(base: Date, unit: TimeUnit, offset: number): Date {
  const d = new Date(base);
  switch (unit) {
    case 'Hour':
      d.setHours(d.getHours() + offset);
      break;
    case 'Day':
      d.setDate(d.getDate() + offset);
      break;
    case 'Week':
      d.setDate(d.getDate() + offset * 7);
      break;
    case 'Month':
      d.setMonth(d.getMonth() + offset);
      break;
    case 'Year':
      d.setFullYear(d.getFullYear() + offset);
      break;
  }
  return d;
}

// ============================================================
// 时间项
// ============================================================

interface TimeItem {
  date: Date;
  label: string;
  subLabel: string;
  isSelected: boolean;
  isToday: boolean;
}

function generateTimeItems(selectedTime: Date, unit: TimeUnit): TimeItem[] {
  const now = new Date();
  const items: TimeItem[] = [];

  for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
    const date = offsetDate(selectedTime, unit, i);
    const label = formatTimeLabel(date, unit);
    const subLabel = formatSubLabel(date, unit);
    const isSelected = i === 0;
    const isToday = isSameTime(date, now, unit);

    items.push({ date, label, subLabel, isSelected, isToday });
  }

  return items;
}

// ============================================================
// 时间按钮子组件
// ============================================================

interface TimeButtonProps {
  item: TimeItem;
  index: number;
  isVisualActive: boolean;
  onPress: (index: number, date: Date) => void;
  onLayout: (index: number, x: number, width: number) => void;
}

const TimeButton = React.memo(function TimeButton({
  item,
  index,
  isVisualActive,
  onPress,
  onLayout,
}: TimeButtonProps) {
  const buttonMinWidth = R.scale(48);
  const dotSize = R.scale(3);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    onLayout(index, x, width);
  }, [index, onLayout]);

  const handlePress = useCallback(() => {
    onPress(index, item.date);
  }, [index, item.date, onPress]);

  return (
    <Pressable
      onLayout={handleLayout}
      onPress={handlePress}
      style={{
        minWidth: buttonMinWidth,
        height: R.scale(44), // 增加高度以容纳两行
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: R.spacing.md(),
      }}
    >
      <YStack alignItems="center" gap={0}>
        <Text
          fontSize={R.fontSize.sm()}
          fontWeight="500"
          color={isVisualActive ? '$color' : '$textMuted'}
          opacity={isVisualActive ? 1 : 0.6}
        >
          {item.label}
        </Text>
        
        {/* 副标签 - 仅在激活状态显示 */}
        {isVisualActive && item.subLabel ? (
          <Text
            fontSize={R.fontSize.xs() * 0.85} // 稍微小一点
            fontWeight="400"
            color="$textSecondary"
            opacity={0.8}
            marginTop={-2}
          >
            {item.subLabel}
          </Text>
        ) : null}
      </YStack>

      {/* 底部小圆点（非选中项，标记今天） */}
      {!isVisualActive && item.isToday && (
        <YStack
          position="absolute"
          bottom={R.scale(2)}
          width={dotSize}
          height={dotSize}
          borderRadius={dotSize / 2}
          backgroundColor="$error"
        />
      )}
      {!isVisualActive && !item.isToday && (
        <YStack
          position="absolute"
          bottom={R.scale(2)}
          width={dotSize}
          height={dotSize}
          borderRadius={dotSize / 2}
          backgroundColor="$textMuted"
          opacity={0.4}
        />
      )}
    </Pressable>
  );
});

// ============================================================
// 时间粒度切换子组件
// ============================================================

interface UnitSelectorProps {
  current: TimeUnit;
  onChange: (unit: TimeUnit) => void;
}

function UnitSelector({ current, onChange }: UnitSelectorProps) {
  const currentIndex = TIME_UNITS.indexOf(current);
  const animIndex = useRef(new Animated.Value(currentIndex)).current;

  useEffect(() => {
    Animated.spring(animIndex, {
      toValue: currentIndex,
      useNativeDriver: true,
      damping: 20,
      stiffness: 150,
      mass: 0.8,
    }).start();
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) onChange(TIME_UNITS[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < TIME_UNITS.length - 1) onChange(TIME_UNITS[currentIndex + 1]);
  };

  return (
    <XStack alignItems="center" gap={R.spacing.xs()}>
      <Pressable
        onPress={handlePrev}
        hitSlop={10}
        style={{ opacity: currentIndex === 0 ? 0.2 : 1, padding: 4 }}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} color="$textMuted" />
      </Pressable>

      <XStack
        width={160} // Fixed width for the wheel window
        height={32}
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {TIME_UNITS.map((unit, index) => {
          const inputRange = [index - 1, index, index + 1];
          
          const translateX = animIndex.interpolate({
            inputRange,
            outputRange: [60, 0, -60],
          });

          const scale = animIndex.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = animIndex.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          const isSelected = currentIndex === index;
          
          return (
            <Animated.View
              key={unit}
              style={{
                position: 'absolute',
                left: '50%', // 明确居中定位
                marginLeft: -30, // 宽度的一半
                transform: [{ translateX }, { scale }],
                opacity,
                zIndex: isSelected ? 10 : 0, // 恢复 zIndex 确保交互正确
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Pressable onPress={() => onChange(unit)}>
                {/* 使用 Animated.Text 确保样式更新 */}
                <Animated.Text
                  style={{
                    fontSize: R.fontSize.sm(),
                    fontWeight: '600',
                    color: unit === current ? '#E4D5A8' : '#7A7A82',
                  }}
                >
                  {unit}
                </Animated.Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </XStack>

      <Pressable
        onPress={handleNext}
        hitSlop={10}
        style={{ opacity: currentIndex === TIME_UNITS.length - 1 ? 0.2 : 1, padding: 4 }}
        disabled={currentIndex === TIME_UNITS.length - 1}
      >
        <ChevronRight size={20} color="$textMuted" />
      </Pressable>
    </XStack>
  );
}

// ============================================================
// 主组件
// ============================================================

export function TimeSelector({
  selectedTime,
  timeUnit,
  onTimeChange,
  onTimeUnitChange,
  showUnitSelect = true,
  showTitle = true,
}: TimeSelectorProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const pillAnimX = useRef(new Animated.Value(0)).current;
  const pillAnimW = useRef(new Animated.Value(R.scale(48))).current;
  const fadeAnim = useRef(new Animated.Value(1)).current; // 容器透明度动画
  const buttonLayouts = useRef<Map<number, { x: number; width: number }>>(new Map());
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const isAnimating = useRef(false);
  const isSwitchingUnit = useRef(false); // 标记是否正在切换单位

  // 内部显示状态，用于实现切换过渡
  const [displayState, setDisplayState] = useState({ unit: timeUnit, time: selectedTime });

  // 监听外部 props 变化，处理过渡动画
  useEffect(() => {
    if (timeUnit !== displayState.unit) {
      // Unit 变化：执行淡出 -> 更新状态 -> (Layout) -> 淡入
      if (isSwitchingUnit.current) return;
      isSwitchingUnit.current = true;
      
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start(() => {
        // 动画结束后更新内部状态，触发重绘
        setDisplayState({ unit: timeUnit, time: selectedTime });
      });
    } else if (selectedTime !== displayState.time) {
      // Time 变化：直接更新，无需淡入淡出（保持滑动体验）
      setDisplayState(prev => ({ ...prev, time: selectedTime }));
    }
  }, [timeUnit, selectedTime]);

  // 生成时间列表（使用内部状态）
  const timeItems = generateTimeItems(displayState.time, displayState.unit);

  // 当 displayUnit 变化时，重置初始化状态
  useEffect(() => {
    setIsInitialized(false);
    buttonLayouts.current.clear();
  }, [displayState.unit]);

  // 当 displayTime 变化时，静默复位到中心
  useLayoutEffect(() => {
    // 如果还没初始化，跳过
    if (!isInitialized) return;

    // 找到中心项的布局
    const centerLayout = buttonLayouts.current.get(CENTER_INDEX);
    if (centerLayout && scrollViewRef.current && containerWidth > 0) {
      // 1. 停止当前动画
      pillAnimX.stopAnimation();
      pillAnimW.stopAnimation();

      // 2. 瞬间重置药丸位置到中心
      pillAnimX.setValue(centerLayout.x);
      pillAnimW.setValue(centerLayout.width);

      // 3. 瞬间重置 ScrollView 到中心
      const scrollTo = centerLayout.x + centerLayout.width / 2 - containerWidth / 2;
      scrollViewRef.current.scrollTo({ x: Math.max(0, scrollTo), animated: false });
    }
  }, [displayState.time, containerWidth, isInitialized]);

  // 处理按钮布局信息收集
  const handleButtonLayout = useCallback((index: number, x: number, width: number) => {
    buttonLayouts.current.set(index, { x, width });

    // 所有按钮布局完成后，初始化位置
    if (buttonLayouts.current.size >= ITEM_COUNT && !isInitialized) {
      const centerLayout = buttonLayouts.current.get(CENTER_INDEX);
      if (centerLayout && scrollViewRef.current && containerWidth > 0) {
        // 设置药丸初始位置
        pillAnimX.setValue(centerLayout.x);
        pillAnimW.setValue(centerLayout.width);

        // 滚动到中心项
        const scrollTo = centerLayout.x + centerLayout.width / 2 - containerWidth / 2;
        scrollViewRef.current.scrollTo({ x: Math.max(0, scrollTo), animated: false });

        setIsInitialized(true);
        
        // 如果是切换单位导致的重排，布局完成后执行淡入
        if (isSwitchingUnit.current) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }).start(() => {
            isSwitchingUnit.current = false;
          });
        }
      }
    }
  }, [isInitialized, containerWidth, pillAnimX, pillAnimW, fadeAnim]);

  // 安全网：如果布局回调长时间未完成（例如 Web 端优化），强制显示
  useEffect(() => {
    if (isSwitchingUnit.current) {
      const timer = setTimeout(() => {
        if (isSwitchingUnit.current) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            isSwitchingUnit.current = false;
            // 如果还没初始化，也强制初始化一下（虽然位置可能不对，但至少能看到）
            if (!isInitialized) setIsInitialized(true);
          });
        }
      }, 500); // 500ms 超时
      return () => clearTimeout(timer);
    }
  }, [displayState.unit]); // 依赖 displayState.unit 变化（即切换开始）

  // 处理点击选择
  const handleTimeSelect = useCallback((index: number, date: Date) => {
    if (index === CENTER_INDEX || isAnimating.current) return;

    isAnimating.current = true;
    const targetLayout = buttonLayouts.current.get(index);

    if (targetLayout) {
      // 动画药丸到目标位置
      Animated.parallel([
        Animated.timing(pillAnimX, {
          toValue: targetLayout.x,
          useNativeDriver: false,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(pillAnimW, {
          toValue: targetLayout.width,
          useNativeDriver: false,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start(() => {
        // 动画结束后，更新数据
        onTimeChange(date);
        isAnimating.current = false;
      });

      // 同时滚动让目标项居中
      if (scrollViewRef.current && containerWidth > 0) {
        const scrollTo = targetLayout.x + targetLayout.width / 2 - containerWidth / 2;
        scrollViewRef.current.scrollTo({
          x: Math.max(0, scrollTo),
          animated: true,
        });
      }
    }
  }, [containerWidth, onTimeChange, pillAnimX, pillAnimW]);

  // 获取 ScrollView 容器宽度
  const handleContainerLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  const pillHeight = R.scale(44); // 增加药丸高度
  const pillRadius = R.radius.pill();

  return (
    <YStack gap={R.spacing.sm()}>
      {/* 顶部：时间粒度切换（移除原来的日期标题） */}
      <XStack
        alignItems="center"
        justifyContent="center" // 居中显示
        paddingHorizontal={R.layout.pagePaddingH()}
      >
        {showUnitSelect && (
          <UnitSelector current={timeUnit} onChange={onTimeUnitChange} />
        )}
      </XStack>

      {/* 时间滚动选择器 */}
      <YStack position="relative" overflow="hidden">
        <Animated.View style={{ opacity: fadeAnim }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onLayout={handleContainerLayout}
            contentContainerStyle={{
              paddingHorizontal: R.spacing.sm(),
              alignItems: 'center',
            }}
            scrollEventThrottle={16}
          >
            {/* 动画药丸背景 */}
            {isInitialized && (
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: pillHeight,
                  borderRadius: pillRadius,
                  backgroundColor: 'rgba(228, 213, 168, 0.18)',
                  transform: [{ translateX: pillAnimX }],
                  width: pillAnimW,
                }}
              />
            )}

            {/* 时间按钮列表 */}
            {timeItems.map((item, idx) => (
              <TimeButton
                key={`${displayState.unit}-${item.date.getTime()}`}
                item={item}
                index={idx}
                isVisualActive={idx === CENTER_INDEX}
                onPress={handleTimeSelect}
                onLayout={handleButtonLayout}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* 左侧渐变遮罩 */}
        <YStack
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          width={R.spacing.xl()}
          pointerEvents="none"
          // 使用半透明背景模拟渐变（跨平台兼容）
          opacity={0.8}
          style={{
            // @ts-ignore - web only
            background: 'linear-gradient(to right, #25272E, transparent)',
          }}
        />
        {/* 右侧渐变遮罩 */}
        <YStack
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          width={R.spacing.xl()}
          pointerEvents="none"
          opacity={0.8}
          style={{
            // @ts-ignore - web only
            background: 'linear-gradient(to left, #25272E, transparent)',
          }}
        />
      </YStack>
    </YStack>
  );
}
