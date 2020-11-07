// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow call to html() method
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
    docs:{
      description: "Direct calls to method `html()` often (e.g. in jQuery framework) manipulate DOM without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-html-method.md"
    },
    messages: {
      default: 'Do not write to DOM directly using jQuery html() method'
    }
  },
  create: function(context) {
    const fullTypeChecker = astUtils.getFullTypeChecker(context);
    return {
      // TODO: 
      // - Cover similar methods that can manipulate DOM such as append(string), jQuery(string)
      // - Improve rule with type information from TypeScript parser
      // - Consider ignoring all Literals?
      "CallExpression[arguments.length=1] > MemberExpression.callee[property.name='html']"(node) {
        // Known false positives
        if (
          // element.html("")
          node.parent.arguments[0].type === "Literal"
          && (
            node.parent.arguments[0].value === ""
            || node.parent.arguments[0].value === null
          )
        ) {
          return;
        }
        context.report(
        { 
          node: node,
          messageId: "default" 
        }); 
      }
    };
  }
};