// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shareable config for Angular apps. 
 */

"use strict";

module.exports = {
    plugins: [
        "@microsoft/sdl"
    ],
    rules: {
        "@microsoft/sdl/no-angular-bypass-sanitizer": "error"
    }
}