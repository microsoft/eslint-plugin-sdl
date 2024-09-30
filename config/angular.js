// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

// Generates shareable config for modern Angular (https://angular.dev/) apps. 
module.exports = (pluginSdl) => {
  return [
    {
      plugins: {
        "@microsoft/sdl": pluginSdl
      },
      rules: {
        "@microsoft/sdl/no-angular-bypass-sanitizer": "error"
      }
    }
  ];
};