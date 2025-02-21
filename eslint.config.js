import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-max-props-per-line': ['error', { maximum: 1 }], // 한 줄에 하나의 prop만
      'react/jsx-first-prop-new-line': ['error', 'multiline'], // 여러 prop일 때 새 줄에서 시작
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'] // 닫는 괄호 위치
    }
  }
);
