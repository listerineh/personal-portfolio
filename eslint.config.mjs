import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...storybook.configs['flat/recommended'],
  {
    // Convention: a leading underscore marks an intentionally unused binding.
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Node build/maintenance scripts are CommonJS.
    files: ['scripts/**/*.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  globalIgnores([
    '.next/**',
    '.next-verify/**',
    'node_modules/**',
    'out/**',
    'build/**',
    'storybook-static/**',
    'public/docs/**',
    'public/sw.js',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
    '.agents/**',
    '.impeccable/**',
  ]),
]);
