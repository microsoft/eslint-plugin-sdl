// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow * as target origin in window.postMessage
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
      description: "Always provide specific target origin, not * when sending data to other windows using [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Security_concerns) to avoid data leakage outside of trust boundary.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-postmessage-star-origin.md"
    },
    messages: {
      default: 'Do not use * as target origin when sending data to other windows'
    }
  },
  create: function (context) {
    const fullTypeChecker = astUtils.getFullTypeChecker(context);
    return {
      "CallExpression[arguments.length>=2][arguments.length<=3][callee.property.name=postMessage]"(node) {

        // Check that second argument (target origin) is Literal "*"
        if (!(node.arguments[1].type === 'Literal' && node.arguments[1].value == '*')) {
          return;
        }

        // Check that object type is Window when full type information is available
        if (fullTypeChecker) {
          const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(node.callee.object);
          const tsType = fullTypeChecker.getTypeAtLocation(tsNode);
          const type = fullTypeChecker.typeToString(tsType);
          if (type !== "any" && type !== "Window") {
            return;
          }
        }

        context.report({
          node: node,
          messageId: "default"
        });
      }
    };
  }
};