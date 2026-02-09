/**
 * Tab 导航布局
 * 
 * 包含 4 个主要页面：首页、探索、星盘、我的
 * 使用自定义 TabBar 组件，匹配 Celestial Elegance 设计风格
 */

import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="chart" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
