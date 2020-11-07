// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Default SDL required config for all applications. 
 */

"use strict";

module.exports = {
  plugins: [
    "@microsoft/sdl"
  ],
  extends: [
    "plugin:@microsoft/sdl/angular",
    "plugin:@microsoft/sdl/angularjs",
    "plugin:@microsoft/sdl/common",
    "plugin:@microsoft/sdl/electron",
    "plugin:@microsoft/sdl/node",
    "plugin:@microsoft/sdl/react"
  ]
}