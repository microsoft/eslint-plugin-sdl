// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shareable config for Electron apps. 
 */

"use strict";

module.exports = {
  plugins: [
    "@microsoft/sdl"
  ],
  rules: {
    "@microsoft/sdl/no-electron-node-integration": "error"
  }
}