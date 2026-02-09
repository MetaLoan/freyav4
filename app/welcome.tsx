/**
 * 欢迎页面 / 登录页面
 * 
 * 参考 Astra AI 设计，展示应用价值主张并提供登录/注册入口
 */

import { YStack, XStack, Text, Input, Button, ScrollView, Image } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { R, getScreenHeight } from '@/src/config/responsive';
import { GradientBackground } from '@/components/GradientBackground';

export default function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // TODO: 实现登录逻辑
  };

  const handleGoogleLogin = () => {
    console.log('Google Login');
    // TODO: 实现 Google 登录
  };

  const handleSignUp = () => {
    console.log('Navigate to Sign Up');
    // TODO: 导航到注册页面
  };

  const handleForgotPassword = () => {
    console.log('Navigate to Forgot Password');
    // TODO: 导航到忘记密码页面
  };

  return (
    <GradientBackground flex={1}>
      <StatusBar style="light" />
      
      <YStack
        flex={1}
        height={getScreenHeight()}
      >
          {/* 背景图片 - 绝对定位到页面顶部，保证顶部永不截断 */}
          <YStack
            position="absolute"
            top={0}
            left="5%"
            width="90%"
            height={R.verticalScale(300)}
            zIndex={0}
          >
            <Image
              source={require('../assets/welcome-bg.png')}
              width="100%"
              height="100%"
              resizeMode="contain"
            />
          </YStack>

          {/* 内容区域 */}
          <YStack
            flex={1}
            paddingHorizontal={R.layout.pagePaddingH()}
            paddingBottom={R.layout.pagePaddingT()}
            zIndex={1}
            maxWidth={R.layout.contentMaxWidth}
            alignSelf="center"
            width="100%"
          >
            {/* 图片占位 - 可收缩，保证短屏不撑爆 */}
            <YStack height={R.verticalScale(300)} flexShrink={1} minHeight={0} />

            {/* 上弹性空间 - 把标题推到图片和表单的中间 */}
            <YStack flex={1} minHeight={R.spacing.md()} />

            {/* 1. 主标题区域 */}
            <YStack gap={R.spacing.sm()}>
              <Text
                fontSize={R.fontSize.hero()}
                lineHeight={R.fontSize.hero() * 1.2}
                fontFamily="$heading"
                color="$color"
                textAlign="center"
              >
                Welcome to Freya
              </Text>
              
              <Text
                fontSize={R.fontSize.base()}
                lineHeight={R.fontSize.base() * 1.5}
                color="$textSecondary"
                textAlign="center"
                paddingHorizontal={R.spacing.md()}
              >
                Discover the wisdom in your stars.
              </Text>
            </YStack>

            {/* 下弹性空间 - 和上面等分，实现居中 */}
            <YStack flex={1} minHeight={R.spacing.md()} />

            {/* 2. 登录表单 */}
            <YStack gap={R.spacing.md()}>
              {/* Email 输入框 */}
              <YStack gap={R.spacing.xs()}>
                <Text
                  fontSize={R.fontSize.sm()}
                  color="$textSecondary"
                  paddingLeft={R.spacing.sm()}
                >
                  Email
                </Text>
                <Input
                  placeholder="Enter your email"
                  placeholderTextColor="$textMuted"
                  value={email}
                  onChangeText={setEmail}
                  height={R.input.md.height()}
                  paddingHorizontal={R.input.md.paddingH()}
                  fontSize={R.fontSize.base()}
                  backgroundColor="rgba(255, 255, 255, 0.1)"
                  borderWidth={1}
                  borderColor="rgba(255, 255, 255, 0.3)"
                  borderRadius={R.radius.md()}
                  color="$color"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  hoverStyle={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  focusStyle={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                />
              </YStack>

              {/* Password 输入框 */}
              <YStack gap={R.spacing.xs()}>
                <Text
                  fontSize={R.fontSize.sm()}
                  color="$textSecondary"
                  paddingLeft={R.spacing.sm()}
                >
                  Password
                </Text>
                <Input
                  placeholder="Enter your password"
                  placeholderTextColor="$textMuted"
                  value={password}
                  onChangeText={setPassword}
                  height={R.input.md.height()}
                  paddingHorizontal={R.input.md.paddingH()}
                  fontSize={R.fontSize.base()}
                  backgroundColor="rgba(255, 255, 255, 0.1)"
                  borderWidth={1}
                  borderColor="rgba(255, 255, 255, 0.3)"
                  borderRadius={R.radius.md()}
                  color="$color"
                  secureTextEntry
                  hoverStyle={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  focusStyle={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                />
                
                {/* 忘记密码链接 */}
                <XStack justifyContent="flex-end" paddingTop={R.spacing.xs()}>
                  <Text
                    fontSize={R.fontSize.sm()}
                    color="$creamGold"
                    onPress={handleForgotPassword}
                    textDecorationLine="underline"
                  >
                    Forgot Password?
                  </Text>
                </XStack>
              </YStack>

              {/* 登录按钮 */}
              <Button
                height={R.button.lg.height()}
                backgroundColor="$creamGold"
                borderRadius={R.radius.pill()}
                hoverStyle={{
                  backgroundColor: '$creamGold',
                }}
                pressStyle={{
                  backgroundColor: '$creamGoldDark',
                  scale: 0.98,
                }}
                onPress={handleLogin}
              >
                <Text
                  fontSize={R.button.lg.fontSize()}
                  color="$bgDeep"
                  fontWeight="600"
                >
                  Log In
                </Text>
              </Button>
            </YStack>

            {/* 3. 底部注册和第三方登录 */}
            <YStack gap={R.spacing.sm()} marginTop={R.spacing.lg()}>
              {/* 注册提示 */}
              <XStack justifyContent="center" gap={R.spacing.xs()}>
                <Text fontSize={R.fontSize.base()} color="$textSecondary">
                  Don't have account?
                </Text>
                <Text
                  fontSize={R.fontSize.base()}
                  color="$color"
                  fontWeight="600"
                  onPress={handleSignUp}
                  textDecorationLine="underline"
                >
                  Sign Up
                </Text>
              </XStack>

              {/* 分割线 */}
              <XStack alignItems="center" gap={R.spacing.md()}>
                <YStack flex={1} height={1} backgroundColor="$divider" />
                <Text fontSize={R.fontSize.sm()} color="$textMuted">
                  Or
                </Text>
                <YStack flex={1} height={1} backgroundColor="$divider" />
              </XStack>

              {/* Google 登录按钮 */}
              <Button
                height={R.button.lg.height()}
                backgroundColor="$bgCardAlpha"
                borderRadius={R.radius.pill()}
                borderWidth={1}
                borderColor="$border"
                hoverStyle={{
                  backgroundColor: '$bgCardAlpha',
                  borderColor: '$border',
                }}
                pressStyle={{
                  backgroundColor: '$bgCard',
                  scale: 0.98,
                }}
                onPress={handleGoogleLogin}
              >
                <XStack alignItems="center" gap={R.spacing.md()}>
                  <Text fontSize={R.fontSize.lg()}>G</Text>
                  <Text
                    fontSize={R.button.lg.fontSize()}
                    color="$color"
                    fontWeight="500"
                  >
                    Continue with Google
                  </Text>
                </XStack>
              </Button>
            </YStack>
          </YStack>
      </YStack>
    </GradientBackground>
  );
}
