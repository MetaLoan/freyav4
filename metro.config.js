const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Tamagui 优化配置
config.resolver.sourceExts.push('mjs');

// 配置路径别名 @/ 指向项目根目录
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname),
};

module.exports = config;
