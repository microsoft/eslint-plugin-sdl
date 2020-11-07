// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shareable config for Node apps. 
 */

"use strict";

module.exports = {
    plugins: [
        "@microsoft/sdl",
        "node"
    ],
    rules: {
        "@microsoft/sdl/no-unsafe-alloc": "error",
        "node/no-deprecated-api": "error"
    }
}