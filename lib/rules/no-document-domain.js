// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow document.domain property
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
      description: "Writes to [`document.domain`](https://developer.mozilla.org/en-US/docs/Web/API/Document/domain) property must be reviewed to avoid bypass of [same-origin checks](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Changing_origin). Usage of top level domains such as `azurewebsites.net` is strictly prohibited.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-document-domain.md"
    },
    messages: {
      default: 'Do not write to document.domain property'
    }
  },
  create: function(context) {
    const fullTypeChecker = astUtils.getFullTypeChecker(context);
    return {
      "AssignmentExpression[operator='='][left.property.name='domain']"(node) {
        if (astUtils.isDocumentObject(node.left.object, context, fullTypeChecker)) {
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