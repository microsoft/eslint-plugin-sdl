// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow assignment to innerHTML or outerHTML properties
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
      description: "Assignments to [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)/[outerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) properties or calls to [insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) method manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-inner-html.md"
    },
    messages: {
      noInnerHtml: 'Do not write to DOM directly using innerHTML/outerHTML property',
      noInsertAdjacentHTML: 'Do not write to DOM using insertAdjacentHTML method'
    }
  },
  create: function (context) {
    const fullTypeChecker = astUtils.getFullTypeChecker(context);

    function mightBeHTMLElement(node) {
      const type = astUtils.getNodeTypeAsString(fullTypeChecker, node, context);
      return type.match(/HTML.*Element/) || type === "any";
    }

    return {
      "CallExpression[arguments.length=2] > MemberExpression.callee[property.name='insertAdjacentHTML']"(node) {
        // Ignore known false positives
        if (
          node.parent != undefined
          && node.parent.arguments != undefined
          && node.parent.arguments.length >= 1
          && node.parent.arguments[1] != undefined 
          // element.insertAdjacentHTML('')
          && node.parent.arguments[1].type === 'Literal' && node.parent.arguments[1].value === ''
        ) {
          return;
        }

        if (mightBeHTMLElement(node.object)) {
          context.report({
            node: node,
            messageId: "noInsertAdjacentHTML"
          });
        }
      },
      "AssignmentExpression[left.type='MemberExpression'][left.property.name=/innerHTML|outerHTML/]"(node) {
        // Ignore known false positives
        if (
          node.right != undefined 
          // element.innerHTML = ''
          && node.right.type === 'Literal' && node.right.value === ''
        ) {
          return;
        }

        if (mightBeHTMLElement(node.left.object)) {
          context.report({
            node: node,
            messageId: "noInnerHtml"
          });
        }
      }
    };
  }
};
