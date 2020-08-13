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
    'no-unused-vars': 'off', // warn으로 설정할 경우, 사용하지 않은 import들을 정상적으로 잡지 못함
    'new-cap': 'warn',
    'prefer-rest-params': 'warn',
  }
};
