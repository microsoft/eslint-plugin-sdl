// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow modifying sanitization allowed url list in AngularJS. Update fron the deprecate SanitizationWhitelist
 * @author Vivien Flouirac
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
             description: "Calls to [`$compileProvider.aHrefSanitizationTrustedUrlList`](https://docs.angularjs.org/api/ng/provider/$compileProvider#aHrefSanitizationTrustedUrlList) configure allowed Url list in AngularJS sanitizer and need to be reviewed.",
             url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-angular-sanitization-trusted-urls.md"
         },
         messages: {
            noSanitizationTrustedUrls: "Do not modify the trusted Urls list in AngularJS"
         }
     },
     create: function(context) {
         return {
             "CallExpression[arguments!=''][callee.object.name='$compileProvider'][callee.property.name=/(aHref|imgSrc)SanitizationTrustedUrlList/]"(node) {
                 context.report(
                 {
                     node: node,
                     messageId: "noSanitizationTrustedUrls"
                 });
             }
         };
     }
 };