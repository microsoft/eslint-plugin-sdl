// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shareable config for common JavaScript apps. 
 */

"use strict";

module.exports = {
  plugins: [
    "@microsoft/sdl"
  ],
  rules: {
    "no-caller": "error",
    "no-delete-var": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "@microsoft/sdl/no-cookies": "error",
    "@microsoft/sdl/no-document-domain": "error",
    "@microsoft/sdl/no-document-write": "error",
    "@microsoft/sdl/no-html-method": "error",
    "@microsoft/sdl/no-inner-html": "error",
    "@microsoft/sdl/no-insecure-url": "error",
    "@microsoft/sdl/no-msapp-exec-unsafe": "error",
    "@microsoft/sdl/no-postmessage-star-origin": "error",
    "@microsoft/sdl/no-winjs-html-unsafe": "error"
  }
}