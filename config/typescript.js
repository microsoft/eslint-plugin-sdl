// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shareable config for TypeScript applications. 
 */

"use strict";

module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    "@typescript-eslint"
  ],
  overrides: [
    {
      files: [
        "**/*.{ts,tsx}"
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-implied-eval": "error",
        // @typescript-eslint/no-implied-eval offers more accurate results for typescript.
        // thus we turn the more generic rule off for ts and tsx files.
        // This also avoids duplicate hits.
        "no-implied-eval": "off" 
      }
    }
  ]
}