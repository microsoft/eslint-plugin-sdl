// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Disallows usage of insecure protocols in URL strings
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const DEFAULT_BLOCKLIST = [
    /^(ftp|http|telnet|ws):\/\//i
];

const DEFAULT_EXCEPTIONS = [     // TODO: add more typical false positives such as XML schemas after more testing
    /^http:(\/\/|\\u002f\\u002f)schemas\.microsoft\.com(\/\/|\\u002f\\u002f)?.*/i,
    /^http:(\/\/|\\u002f\\u002f)schemas\.openxmlformats\.org(\/\/|\\u002f\\u002f)?.*/i,
    /^http:(\/|\\u002f){2}localhost(:|\/|\\u002f)*/i
];

module.exports = {
    defaultBlocklist: DEFAULT_BLOCKLIST,
    defaultExceptions: DEFAULT_EXCEPTIONS,
    meta: {
        type: "suggestion",
        fixable: "code",
        schema: [
            {
                type: "object",
                properties: {
                    blocklist: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    exceptions: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                },
                additionalProperties: false
            }
        ],
        docs: {
            category: "Security",
            description: "Insecure protocols such as [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) should be replaced by their encrypted counterparts ([HTTPS](https://en.wikipedia.org/wiki/HTTPS), [FTPS](https://en.wikipedia.org/wiki/FTPS)) to avoid sending (potentially sensitive) data over untrusted network in plaintext.",
            url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-insecure-url.md"
        },
        messages: {
            doNotUseInsecureUrl: "Do not use insecure URLs"
        }
    },
    create: function (context) {
        const options = context.options[0] || {};
        const blocklist = (options.blocklist || DEFAULT_BLOCKLIST).map((pattern) => { return new RegExp(pattern, "i"); });
        const exceptions = (options.exceptions || DEFAULT_EXCEPTIONS).map((pattern) => { return new RegExp(pattern, "i"); });

        function matches(patterns, value) {
            return patterns.find((re) => { return re.test(value) }) !== undefined;
        }

        return {
            "Literal"(node) {
                if (typeof node.value === "string") {
                    // Add an exception for xmlns attributes
                    if(node.parent && node.parent.type === "JSXAttribute" && node.parent.name && node.parent.name.name === "xmlns")
                    {
                        // Do nothing
                    }
                    else if (matches(blocklist, node.value) && !matches(exceptions, node.value)) {
                        context.report({
                            node: node,
                            messageId: "doNotUseInsecureUrl"
                        });
                    }
                }
            },
            "TemplateElement"(node) {
                if (typeof node.value.raw === "string" && typeof node.value.cooked === "string") {
                    const rawStringText = node.value.raw;
                    const cookedStringText = node.value.cooked;

                    if ((matches(blocklist, rawStringText) && !matches(exceptions, rawStringText)) ||
                        (matches(blocklist, cookedStringText) && !matches(exceptions, cookedStringText))) {
                        context.report({
                            node: node,
                            messageId: "doNotUseInsecureUrl"
                        });
                    }
                }
            }
        };
    },
};