// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow WinJS.Utilities.setInnerHTMLUnsafe or WinJS.Utilities.setOuterHTMLUnsafe method call
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
      description: "Calls to [`WinJS.Utilities.setInnerHTMLUnsafe()`](https://docs.microsoft.com/en-us/previous-versions/windows/apps/br211696(v=win.10)) and similar methods do not perform any input validation and should be avoided. Use [`WinJS.Utilities.setInnerHTML()`](https://docs.microsoft.com/en-us/previous-versions/windows/apps/br211697(v=win.10)) instead.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-winjs-html-unsafe.md"
    },
    messages: {
      default: 'Do not set HTML using unsafe methods from WinJS.Utilities'
    }
  },
  create: function(context) {
    return {
      "CallExpression[callee.object.object.name='WinJS'][callee.object.property.name='Utilities'][callee.property.name=/(insertAdjacent|setInner|setOuter)HTMLUnsafe/]"(node) {
        context.report(
        {
          node: node,
          messageId: "default"
        });
      }
    };
  }
};