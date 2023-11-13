module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '^~(.+)': './src/\\1',
        },
      },
    ],
  ],
  overrides: [
    {
      test: fileName => !fileName.includes('node_modules'),
      plugins: [
        [require('@babel/plugin-proposal-class-properties'), {loose: false}],
      ],
    },
  ],
};
