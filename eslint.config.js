import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';
import * as firebaseRulesParser from '@firebase/eslint-plugin-security-rules/parser';

export default tseslint.config(
  {
    ignores: ['dist/**/*']
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Standard app rules
    },
  },
  {
    files: ['firestore.rules', 'DRAFT_firestore.rules'],
    languageOptions: {
      parser: firebaseRulesParser,
    },
    plugins: {
      '@firebase/security-rules': firebaseRulesPlugin
    },
    rules: {
      ...firebaseRulesPlugin.configs['flat/recommended'].rules
    }
  }
);
