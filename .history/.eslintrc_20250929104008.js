// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  // 解析 Vue 语法需要的解析器
  parser: 'vue-eslint-parser',
  // 配置 JavaScript 解析器（如 @babel/eslint-parser 或 @typescript-eslint/parser）
  parserOptions: {
    parser: '@babel/eslint-parser', // 或 '@typescript-eslint/parser'（如果用 TS）
    sourceType: 'module',
  },
  // 继承 Vue 官方推荐规则
  extends: [
    'plugin:vue/vue3-essential', // 核心规则，包含对 defineProps 等宏的支持
    'eslint:recommended',
    // 其他扩展（如 prettier 相关）
  ],
  // 声明 Vue 宏为全局变量，避免 no-undef 错误
  globals: {
    defineOptions: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    // 其他自定义规则
  },
};