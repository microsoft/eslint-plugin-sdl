// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

module.exports = (pluginSdl) => {
  return [
    {
      plugins: {
        "@microsoft/sdl": pluginSdl
      },
      rules: {
        "@microsoft/sdl/no-electron-node-integration": "error"
      }
    }
  ];
};