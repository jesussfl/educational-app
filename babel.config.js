module.exports = function (api) {
   api.cache(true);
   return {
      presets: ["babel-preset-expo"],
      // env: {
      //    development: {
      //       plugins: ["transform-react-jsx-source"],
      //    },
      // },
      plugins: [
         [
            "module-resolver",
            {
               alias: {
                  "@components": "./src/components",
                  "@utils": "./src/utils",
                  "@assets": "./assets",
               },
            },
         ],
         ["react-native-reanimated/plugin"],
      ],
   };
};
