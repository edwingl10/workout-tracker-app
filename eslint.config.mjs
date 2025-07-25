import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import _import from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import next from '@next/eslint-plugin-next';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      'plugin:react/recommended',
      'plugin:@next/next/recommended',
      'prettier',
    ),

    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      react,
      import: fixupPluginRules(_import),
      'jsx-a11y': jsxA11Y,
      'react-hooks': fixupPluginRules(reactHooks),
      prettier,
      '@next/next': next,
      '@typescript-eslint': tseslint,
      '@stylistic': stylistic,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: { version: 'detect' },
    },

    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': ['error', { explicitSpread: 'ignore' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
]);
