// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

// Generates shareable config for legacy AngularJS (https://angularjs.org/) apps.
module.exports = (pluginSdl) => {
  return [
    {
      plugins: {
        "@microsoft/sdl": pluginSdl
      },
      rules: {
        "@microsoft/sdl/no-angularjs-enable-svg": "error",
        "@microsoft/sdl/no-angularjs-sanitization-whitelist": "error",
        "@microsoft/sdl/no-angularjs-bypass-sce": "error"
      }
    }
  ];
};
