// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
      description: "When calling [`Buffer.allocUnsafe`](https://nodejs.org/api/buffer.html#buffer_static_method_buffer_allocunsafe_size) and [`Buffer.allocUnsafeSlow`](https://nodejs.org/api/buffer.html#buffer_static_method_buffer_allocunsafeslow_size), the allocated memory is not wiped-out and can contain old, potentially sensitive data.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-unsafe-alloc.md"
    },
    messages: {
      default: 'Do not allocate uninitialized buffers in Node.js'
    }
  },
  create: function (context) {
    return {
      "MemberExpression[object.name='Buffer'][property.name=/allocUnsafe|allocUnsafeSlow/]"(node) {
        // Known false positives
        if (
          node.parent != undefined &&
          node.parent.arguments != undefined &&
          node.parent.arguments.length != undefined &&
          // Buffer.allocUnsafe(0);
          node.parent.type === 'CallExpression' &&
          node.parent.arguments.length == 1 && 
          node.parent.arguments[0] != undefined &&
          node.parent.arguments[0].type === 'Literal' && 
          node.parent.arguments[0].value == '0'
        ) {
          return;
        }
        context.report({
          node: node,
          messageId: "default"
        });
      }
    };
  }
};