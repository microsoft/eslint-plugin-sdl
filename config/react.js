// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shareable config for React apps. 
 */

"use strict";

module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "@microsoft/sdl"
  ],
  rules: {
    "react/no-danger": "error",
    "@microsoft/sdl/react-iframe-missing-sandbox": "error",
    "react/jsx-no-target-blank": ["error",
     {
      allowReferrer: false,
      enforceDynamicLinks: 'always',
      warnOnSpreadAttributes: true,
     }
    ]
  }
}
