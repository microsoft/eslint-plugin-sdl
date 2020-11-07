// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow enabling SVG in AngularJS apps
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
        docs: {
            category: "Security",
            description: "Calls to $sanitizeProvider.enableSvg(true) increase attack surface of the application by enabling SVG support in AngularJS sanitizer and need to be reviewed.",
            url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-angularjs-enable-svg.md"
        },
        messages: {
            doNotEnableSVG: "Do not enable SVG support in AngularJS"
        }
    },
    create: function (context) {
        return {
            "CallExpression[callee.object.name='$sanitizeProvider'][callee.property.name='enableSvg']"(node) {
                // Known false positives
                if (
                    (node.arguments != undefined &&
                    node.arguments.length != 1) ||
                    (
                        node.arguments[0].type == "Literal" && (
                            node.arguments[0].value == "false" || node.arguments[0].value == "0"
                        )
                    )) 
                {
                    return;
                }
                context.report(
                    {
                        node: node,
                        messageId: "doNotEnableSVG"
                    });
            }
        };
    }
};

// TODO: Add rules for $sanitizeProvider.addValidElements() and $sanitizeProvider.addValidAttrs()