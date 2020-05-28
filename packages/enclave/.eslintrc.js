module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "google",
    "plugin:@typescript-eslint/eslint-recommended",
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    tsconfigRootDir: './',
  },
  "rules": {
    'require-jsdoc': 'off',
    'no-unused-vars': 'warn',
    'new-cap': 'off',
    'prefer-rest-params': 'off',
  }
};