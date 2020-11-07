// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow bypassing Strict Contextual Escaping (SCE) in AngularJS
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
            description: "Calls to $sceProvider.enabled(false), $sceDelegate.trustAs(), $sce.trustAs() and relevant shorthand methods (e.g. trustAsHtml or trustAsJs) bypass Strict Contextual Escaping (SCE) in AngularJS and need to be reviewed.",
            url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-angularjs-bypass-sce.md"
        },
        messages: {
            doNotBypass: "Do not bypass Strict Contextual Escaping (SCE) in AngularJS"
        }
    },
    create: function (context) {

        function reportIt(node) {
            context.report({
                node: node,
                messageId: "doNotBypass"
            });
        }

        return {
            "CallExpression[arguments!=''][callee.object.name='$sceProvider'][callee.property.name='enabled']"(node) {
                // Known false positives
                if (node.arguments == undefined || node.arguments.length != 1 || (node.arguments[0].type == "Literal" && /true|1/.test(node.arguments[0].value))){
                    return;
                }
                return reportIt(node)
            },
            "CallExpression[arguments!=''][callee.object.name='$sceDelegate'][callee.property.name='trustAs']": reportIt,
            "CallExpression[arguments!=''][callee.object.name='$sce'][callee.property.name=/trustAs(Css|Html|Js|ResourceUrl|Url)?/]"(node) {
                // Known false positives
                if (
                    node.arguments
                    && node.arguments.length === 1
                    && node.arguments[0].type === "Literal"
                    && node.arguments[0].value === ""
                ) {
                    return;
                }

                return reportIt(node);
            }
        };
    }
};

// TODO: Review https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider#resourceUrlWhitelist and https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider#resourceUrlBlacklist
