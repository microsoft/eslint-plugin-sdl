// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const pluginTypescript = require("@typescript-eslint/eslint-plugin");

module.exports = () => {
  return [
    {
      languageOptions: {
        parserOptions: {
          ecmaVersion: 6,
          sourceType: "module",
          ecmaFeatures: {
            jsx: true
          }
        }
      }
    },
    {
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        parserOptions: {
          parser: "@typescript-eslint/parser"
        }
      },
      plugins: {
        "@typescript-eslint": pluginTypescript
      },
      rules: {
        "@typescript-eslint/no-implied-eval": "error",
        // @typescript-eslint/no-implied-eval offers more accurate results for typescript.
        // thus we turn the more generic rule off for ts and tsx files.
        // This also avoids duplicate hits.
        "no-implied-eval": "off"
      }
    }
  ];
};
