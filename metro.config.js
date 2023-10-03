// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require("expo/metro-config");

// // /** @type {import('expo/metro-config').MetroConfig} */
// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push("cjs");

// module.exports = defaultConfig;
const { getDefaultConfig } = require("@expo/metro-config");

module.exports = async function () {
   const defaultConfig = await getDefaultConfig(__dirname);

   // Aquí agregamos o modificamos los valores necesarios en defaultConfig
   defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

   // Filtremos "svg" de assetExts y lo agregamos a sourceExts
   defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg");
   defaultConfig.resolver.sourceExts.push("svg");

   // Agregamos "cjs" a assetExts
   defaultConfig.resolver.assetExts.push("cjs");

   return defaultConfig;
};
