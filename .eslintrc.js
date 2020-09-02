module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-hooks',
  ],
  rules: {
    semi: [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
};
