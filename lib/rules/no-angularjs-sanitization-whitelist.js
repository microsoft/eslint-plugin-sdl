// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow modifying sanitization whitelist in AngularJS
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
            description: "Calls to [`$compileProvider.aHrefSanitizationWhitelist`](https://docs.angularjs.org/api/ng/provider/$compileProvider#aHrefSanitizationWhitelist) or [`$compileProvider.imgSrcSanitizationWhitelist`](https://docs.angularjs.org/api/ng/provider/$compileProvider#imgSrcSanitizationWhitelist) configure whitelists in AngularJS sanitizer and need to be reviewed.",
            url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-angularjs-sanitization-whitelist.md"
        },
        messages: {
            noSanitizationWhitelist: "Do not modify sanitization whitelist in AngularJS"
        }
    },
    create: function (context) {
        return {
            "CallExpression[arguments!=''][callee.object.name='$compileProvider'][callee.property.name=/(aHref|imgSrc)SanitizationWhitelist/]"(node) {
                context.report(
                    {
                        node: node,
                        messageId: "noSanitizationWhitelist"
                    });
            }
        };
    }
};