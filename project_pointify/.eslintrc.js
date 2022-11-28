module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': 0
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'no-console': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/jsx-filename-extension': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'import/no-cycle': 'off',
        'array-callback-return': 'off',
      },
    },
  ],
};
