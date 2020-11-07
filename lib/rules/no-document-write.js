// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow document.write or document.writeln method call
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
      description: "Calls to document.write or document.writeln manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-document-write.md"
    },
    messages: {
      default: 'Do not write to DOM directly using document.write or document.writeln methods'
    }
  },
  create: function(context) {
    const fullTypeChecker = astUtils.getFullTypeChecker(context);
    return {
      "CallExpression[arguments.length=1][callee.property.name=/write|writeln/]"(node) {
        if (astUtils.isDocumentObject(node.callee.object, context, fullTypeChecker)) {
          context.report(
          {
            node: node,
            messageId: "default"
          });
        }
      }
    };
  }
};