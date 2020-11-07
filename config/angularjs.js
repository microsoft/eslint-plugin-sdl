// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shareable config for AngularJS apps. 
 */

"use strict";

module.exports = {
  plugins: [
    "@microsoft/sdl"
  ],
  rules: {
    "@microsoft/sdl/no-angularjs-enable-svg": "error",
    "@microsoft/sdl/no-angularjs-sanitization-whitelist": "error",
    "@microsoft/sdl/no-angularjs-bypass-sce": "error"
  }
}