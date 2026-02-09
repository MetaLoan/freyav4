/**
 * 全局时间选择器上下文
 * 
 * 用于在应用的任何地方打开全屏时间选择器
 * 选择器渲染在根层级，可以覆盖 TabBar
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CircularTimeSelector, TimeUnit } from '@/components/CircularTimeSelector';

interface TimeSelectorContextValue {
  selectedTime: Date;
  timeUnit: TimeUnit;
  openSelector: () => void;
  setSelectedTime: (time: Date) => void;
  setTimeUnit: (unit: TimeUnit) => void;
}

const TimeSelectorContext = createContext<TimeSelectorContextValue | null>(null);

export function TimeSelectorProvider({ children }: { children: ReactNode }) {
  const [selectedTime, setSelectedTime] = useState(() => new Date());
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('Day');
  const [isOpen, setIsOpen] = useState(false);

  const openSelector = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleTimeChange = useCallback((time: Date) => {
    setSelectedTime(time);
  }, []);

  const handleTimeUnitChange = useCallback((unit: TimeUnit) => {
    setTimeUnit(unit);
  }, []);

  return (
    <TimeSelectorContext.Provider
      value={{
        selectedTime,
        timeUnit,
        openSelector,
        setSelectedTime,
        setTimeUnit,
      }}
    >
      {children}
      
      {/* 全局时间选择器 - 渲染在根层级 */}
      <CircularTimeSelector
        visible={isOpen}
        selectedTime={selectedTime}
        timeUnit={timeUnit}
        onTimeChange={handleTimeChange}
        onTimeUnitChange={handleTimeUnitChange}
        onClose={handleClose}
      />
    </TimeSelectorContext.Provider>
  );
}

export function useTimeSelector() {
  const context = useContext(TimeSelectorContext);
  if (!context) {
    throw new Error('useTimeSelector must be used within TimeSelectorProvider');
  }
  return context;
}
