module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
