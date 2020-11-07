// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow enabling Node.js integration in Electron apps
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    meta: {
        type: "suggestion",
        fixable: "code",
        schema: [],
        docs: {
            category: "Security",
            description: "[Node.js Integration](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) must not be enabled in any renderer that loads remote content to avoid remote code execution attacks.",
            url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-electron-node-integration.md"
        },
        messages: {
            default: "Do not enable Node.js Integration for Remote Content"
        }
    },
    create: function(context) {
        return {
            "NewExpression[callee.name=/BrowserWindow|BrowserView/] > ObjectExpression.arguments > Property.properties[key.name=webPreferences] > ObjectExpression.value > Property.properties[key.name=/nodeIntegration|nodeIntegrationInWorker|nodeIntegrationInSubFrames/][value.value='true']"(node) {
                context.report(
                {
                    node: node,
                    messageId: "default"
                });
            }
        };
    }
};