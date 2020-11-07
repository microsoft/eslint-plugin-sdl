// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow bypassing Angular's built-in sanitizer
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
            description: "Calls to bypassSecurityTrustHtml, bypassSecurityTrustScript and similar methods bypass DomSanitizer in Angular and need to be reviewed.",
            url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-angular-bypass-sanitizer.md"
        },
        messages: {
            noBypass: "Do not bypass Angular's built-in sanitizer"
        }
    },
    create: function(context) {
        return {
            "CallExpression[arguments!=''][callee.property.name=/bypassSecurityTrust(Html|ResourceUrl|Script|Style|Url)/]"(node) {
                context.report(
                {
                    node: node,
                    messageId: "noBypass"
                });
            }
        };
    }
};