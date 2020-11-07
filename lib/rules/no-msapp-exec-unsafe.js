// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow MSApp.execUnsafeLocalFunction method call
 * @author Antonios Katopodis
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
    docs:{
      description: "Calls to [`MSApp.execUnsafeLocalFunction()`](https://docs.microsoft.com/en-us/previous-versions/hh772324(v=vs.85)) bypass script injection validation and should be avoided.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-msapp-exec-unsafe.md"
    },
    messages: {
      default: 'Do not bypass script injection validation'
    }
  },
  create: function(context) {
    return {
      "CallExpression[arguments.length=1][callee.object.name='MSApp'][callee.property.name='execUnsafeLocalFunction']"(node) {
        context.report(
        {
          node: node, 
          messageId: "default"
        });
      }
    };
  }
};