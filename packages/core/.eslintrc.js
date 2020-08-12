module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  ignorePatterns: ['node_modules/'],
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 'off',
    'no-unused-vars': 'off',
    'new-cap': 'warn',
    'prefer-rest-params': 'warn',
  }
};
