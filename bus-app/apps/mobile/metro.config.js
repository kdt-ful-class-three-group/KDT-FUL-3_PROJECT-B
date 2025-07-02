const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = mergeConfig(getDefaultConfig(__dirname), {
  watchFolders: [
    path.resolve(__dirname, "../../packages/ui/src/components"),
    path.resolve(__dirname, "../../node_modules"),
  ],
  // 필요하다면 extraNodeModules도 추가할 수 있습니다.
});

module.exports = withNativeWind(config, { input: "./src/global.css" });