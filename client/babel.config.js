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
				"module:react-native-dotenv",
				{
					moduleName: "@env",
					path: ".env",
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true,
				},
			],
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
		],
	};
};
