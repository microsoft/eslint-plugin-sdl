// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const path = require("path");
const pluginSecurity = require("eslint-plugin-security");

const pkg = require(path.join("..", "package.json"));

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version
  },
  rules: {
    "no-angular-bypass-sanitizer": require("./rules/no-angular-bypass-sanitizer"),
    "no-angular-sanitization-trusted-urls": require("./rules/no-angular-sanitization-trusted-urls"),
    "no-angularjs-bypass-sce": require("./rules/no-angularjs-bypass-sce"),
    "no-angularjs-enable-svg": require("./rules/no-angularjs-enable-svg"),
    "no-angularjs-sanitization-whitelist": require("./rules/no-angularjs-sanitization-whitelist"),
    "no-cookies": require("./rules/no-cookies"),
    "no-document-domain": require("./rules/no-document-domain"),
    "no-document-write": require("./rules/no-document-write"),
    "no-electron-node-integration": require("./rules/no-electron-node-integration"),
    "no-html-method": require("./rules/no-html-method"),
    "no-inner-html": require("./rules/no-inner-html"),
    "no-insecure-random": require("./rules/no-insecure-random"),
    "no-insecure-url": require("./rules/no-insecure-url"),
    "no-msapp-exec-unsafe": require("./rules/no-msapp-exec-unsafe"),
    "no-postmessage-star-origin": require("./rules/no-postmessage-star-origin"),
    "no-unsafe-alloc": require("./rules/no-unsafe-alloc"),
    "no-winjs-html-unsafe": require("./rules/no-winjs-html-unsafe"),
    "react-iframe-missing-sandbox": require("./rules/react-iframe-missing-sandbox")
  },
  // Filled in later in order to reference plugin itself.
  configs: {}
};

plugin.configs["angular"] = require("../config/angular")(plugin);
plugin.configs["angularjs"] = require("../config/angularjs")(plugin);
plugin.configs["common"] = require("../config/common")(plugin);
plugin.configs["electron"] = require("../config/electron")(plugin);
plugin.configs["node"] = require("../config/node")(plugin);
plugin.configs["react"] = require("../config/react")(plugin);
plugin.configs["typescript"] = require("../config/react")(plugin);

plugin.configs["required"] = [
  ...plugin.configs["angular"],
  ...plugin.configs["angularjs"],
  ...plugin.configs["common"],
  ...plugin.configs["electron"],
  ...plugin.configs["node"],
  ...plugin.configs["react"]
];

plugin.configs["recommended"] = [
  ...plugin.configs["required"],
  ...plugin.configs["typescript"],
  {
    plugins: {
      security: pluginSecurity
    }
  }
];

module.exports = plugin;
