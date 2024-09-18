// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow usage of HTTP cookies
 * @author Antonios Katopodis
 */

"use strict";

const astUtils = require("../ast-utils");
const ESLintUtils = require("@typescript-eslint/utils").ESLintUtils;

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
      description: "HTTP cookies are an old client-side storage mechanism with inherent risks and limitations. Use Web Storage, IndexedDB or other more modern methods instead.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-cookies.md"
    },
    messages: {
      doNotUseCookies: "Do not use HTTP cookies in modern applications"
    }
  },
  create: function (context) {
    const fullTypeChecker = astUtils.getFullTypeChecker(context);
    fullTypeChecker && console.log("config1: " + JSON.stringify(ESLintUtils.getParserServices(context).program.getCompilerOptions()));
    return {
      "MemberExpression[property.name='cookie']"(node) {
        fullTypeChecker && console.log("config2: " + JSON.stringify(ESLintUtils.getParserServices(context).program.getCompilerOptions()));
        if (astUtils.isDocumentObject(node.object, context, fullTypeChecker)) {
          context.report({
            node: node,
            messageId: "doNotUseCookies"
          });
        }
      }
    };
  }
};