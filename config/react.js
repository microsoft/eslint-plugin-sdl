// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const pluginReact = require("eslint-plugin-react");

module.exports = (pluginSdl) => {
  return [
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      }
    },
    {
      plugins: {
        react: pluginReact
      },
      rules: {
        "react/no-danger": "error",
        "react/jsx-no-target-blank": [
          "error",
          {
            allowReferrer: false,
            enforceDynamicLinks: "always",
            warnOnSpreadAttributes: true
          }
        ],
        "react/iframe-missing-sandbox": "error"
      }
    },
    {
      plugins: {
        "@microsoft/sdl": pluginSdl
      }
    }
  ];
};
