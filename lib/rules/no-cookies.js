// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow usage of HTTP cookies
 * @author Antonios Katopodis
 */

"use strict";

const astUtils = require("../ast-utils");

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
    return {
      "MemberExpression[property.name='cookie']"(node) {
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