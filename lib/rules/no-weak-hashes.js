// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow document.write or document.writeln method call
 * @author Vivien Flouirac
 */

"use strict";

const astUtils = require("../ast-utils");
const badHashes = [
    'RSA-MD4',
    'RSA-MD5',
    'RSA-MDC2',
    'RSA-RIPEMD160',
    'RSA-SHA',
    'RSA-SHA1',
    'RSA-SHA1-2',
    'md4',
    'md5',
    'mdc2',
    'ripemd',
    'ripemd160',
    'rmd160',
    'sha',
    'sha1',
];
var required;

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
            description: "Prevent usage of weak hashing algorithm from nodejs crypto",
            url: ""
        },
        messages: {
            default: "Do not use weak hashes"
        }
    },
    create: function (context) {
        return{
            "CallExpression[callee.property.name='createHash'][arguments!='']"(node) {

                if ( required == node.callee.object.name) {
                    if (badHashes.includes(node.arguments[0].value)) {
                        context.report(
                            {
                                node: node,
                                messageId: "default"
                            });
                    }
                }
            },
            "AssignmentExpression[right.callee.name='require']"(node){
                if(node.right.arguments[0].value=='crypto')
                    required = node.left.name;
            }
        };
    }
};