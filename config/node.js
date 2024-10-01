// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const pluginN = require("eslint-plugin-n");

module.exports = (pluginSdl) => {
  return [
    {
      plugins: {
        n: pluginN
      },
      rules: {
        "n/no-deprecated-api": "error"
      }
    },
    {
      plugins: {
        "@microsoft/sdl": pluginSdl
      },
      rules: {
        "@microsoft/sdl/no-unsafe-alloc": "error"
      }
    }
  ];
};
