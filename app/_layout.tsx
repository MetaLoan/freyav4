import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from '../providers/TamaguiProvider';
import { TimeSelectorProvider } from '../contexts/TimeSelectorContext';
import { TelegramSDK } from '../utils/telegram';
import { isTelegram } from '../utils/platform';
import { 
  PlayfairDisplay_400Regular, 
  PlayfairDisplay_700Bold 
} from '@expo-google-fonts/playfair-display';
import { 
  Roboto_400Regular, 
  Roboto_500Medium, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// 防止启动画面自动隐藏
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // 衬线体 - 用于标题
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    // 无衬线体 - 用于正文
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  useEffect(() => {
    // 字体加载完成后隐藏启动画面
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // 初始化 Telegram Mini App
    if (isTelegram) {
      const telegram = TelegramSDK.getInstance();
      if (telegram.isAvailable()) {
        const webApp = telegram.getRaw();
        webApp.ready();
        webApp.expand();
        
        // 同步安全区域到 CSS 变量
        telegram.syncSafeAreaToCSSVariables();
        
        // 监听安全区域变化
        if (webApp.onEvent) {
          webApp.onEvent('viewportChanged', () => {
            telegram.syncSafeAreaToCSSVariables();
          });
          webApp.onEvent('safeAreaChanged', () => {
            telegram.syncSafeAreaToCSSVariables();
          });
          webApp.onEvent('contentSafeAreaChanged', () => {
            telegram.syncSafeAreaToCSSVariables();
          });
        }
      }
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider>
        <TimeSelectorProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#25272E',
              },
              animation: 'fade',
            }}
          >
            {/* Tab 主页面组 */}
            <Stack.Screen name="(tabs)" />
            {/* 欢迎/登录页（独立于 Tab） */}
            <Stack.Screen
              name="welcome"
              options={{
                animation: 'slide_from_bottom',
              }}
            />
          </Stack>
        </TimeSelectorProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
