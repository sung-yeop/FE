module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unused-vars': 'on',
    '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '^_'}],
  },
};
