// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
const testUtils = require("../test-utils");

/**
 * Notes:
 * - ES2015/ES6 introduced template literals (``). This is considered in parserOptions for relevant tests.
 */

let ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
    valid: [
        {   // should allow https,ftps strings in variables
            code: `
                var x = 'https://www.example.com'
                var y = 'ftps://www.example.com'
            `
        },
        {   // should allow https,ftps template strings in variables
            code: `
                var x = \`https://www.template-examples.com\`
                var y = \`ftps://www.template-file-examples.com\`
            `,
            languageOptions: testUtils.es6LanguageOptions
        },
        {   // should allow https,ftps multipart template strings in variables
            code: `
                var x = \`https://www.\${multipartExample}.com\`
                var y = \`ftps://www.\${multipartExample}.com\`
            `,
            languageOptions: testUtils.es6LanguageOptions
        },
        {   // should allow http,ftp in middle of string
            code: "var x = 'The protocol may be http://, https://, ftp:// or ftps://'"
        },
        {   // should allow https,ftps strings in default values
            code: `
                function f(x : string = 'https://www.example.com') {}
                function f(y : string = 'ftps://www.example.com') {}
            `,
            languageOptions: testUtils.tsLanguageOptions,
        },
        {   // should allow user-provided exceptions matches, regardless of upper/lower-case
            code: `
                var a1 = 'http://www.allow-example.com'
                var a2 = 'HtTp://www.allow-example.com/path'
                var b1 = 'FTP://www.allow-file-example.com'
                var c1 = 'LDaP://www.allow-ldap-example.com'
            `,
            options: [{
                exceptions: ["HTTP:\/\/www\.allow-example\.com\/?.*", "FtP:\/\/www\.allow-file-example\.com", "LdaP:\/\/www\.allow-ldap-example\.com"]
            }]
        },
        {   // should allow user-provided exceptions for variable name matches, regardless of upper/lower-case
            code: `
                var insecureURL = 'http://www.allow-example.com'
                var InSeCuReURL = 'ftp://www.allow-example.com/path'
            `,
            options: [{
                varExceptions: ["insecure?.*"]
            }]
        },
        {
            // should allow xml namespaces, as they are not accessed by the browser
            code: `
                const someSvg: React.FC = () => {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    );
                };
            `,
            languageOptions: testUtils.tsReactLanguageOptions,
        },
        {
            // should allow localhost
            code: `
                var x = "http://localhost/test";
                var y = "http://localhost";
            `
        },
        {
            // should allow xml namespaces for XHTML and SVG even if outside of jsx xmlns attribute
            code: `
                var x = "http://www.w3.org/1999/xhtml";
                var y = "http://www.w3.org/2000/svg";
            `
        },
    ],
    invalid: [
        {   // should ban http,ftp strings in variables
            code: `
                var x1 = 'http://www.examples.com'
                var x2 = 'HTTP://www.examples.com'
                var y1 = 'ftp://www.file-examples.com'
                var y2 = 'FTP://www.file-examples.com'
            `,
            output: `
                var x1 = "https://www.examples.com"
                var x2 = "https://www.examples.com"
                var y1 = 'ftp://www.file-examples.com'
                var y2 = 'FTP://www.file-examples.com'
            `,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 2},
                { messageId: "doNotUseInsecureUrl", line: 3},
                { messageId: "doNotUseInsecureUrl", line: 4},
                { messageId: "doNotUseInsecureUrl", line: 5}
            ],
        },
        {   // should ban http,ftp template strings in variables
            code: `
                var x1 = \`http://www.template-examples.com\`
                var x2 = \`HTTP://www.template-examples.com\`
                var y1 = \`ftp://www.file-examples.com\`
                var y2 = \`FTP://www.file-examples.com\`
            `,
            output: `
                var x1 = \`https://www.template-examples.com\`
                var x2 = \`https://www.template-examples.com\`
                var y1 = \`ftp://www.file-examples.com\`
                var y2 = \`FTP://www.file-examples.com\`
            `,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 2},
                { messageId: "doNotUseInsecureUrl", line: 3},
                { messageId: "doNotUseInsecureUrl", line: 4},
                { messageId: "doNotUseInsecureUrl", line: 5}
            ],
            languageOptions: testUtils.es6LanguageOptions
        },
        {   // should ban http,ftp multipart template strings in variables
            code: `
                var x1 = \`http://www.\${multipartExample}.com\`;
                var y1 = \`ftp://www.\${multipartExample}.com\`;
            `,
            output: `
                var x1 = \`https://www.\${multipartExample}.com\`;
                var y1 = \`ftp://www.\${multipartExample}.com\`;
            `,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 2},
                { messageId: "doNotUseInsecureUrl", line: 3},
            ],
            languageOptions: testUtils.es6LanguageOptions
        },
        {   // should ban http,ftp strings in default values
            code: `
                function f(x : string = 'http://www.example.com') {}
                function f(y : string = 'ftp://www.example.com') {}
            `,
            output: `
                function f(x : string = "https://www.example.com") {}
                function f(y : string = 'ftp://www.example.com') {}
            `,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 2},
                { messageId: "doNotUseInsecureUrl", line: 3},
            ],
            languageOptions: testUtils.tsLanguageOptions,
        },
        {   // should ban user-provided blacklist matches, regardless of upper/lower-case
            code: `
                var a1 = 'http://www.ban-example.com'
                var a2 = 'HTTP://www.ban-example.com/path'
                var b1 = 'FtP://www.ban-file-example.com'
                var c1 = 'LDAp://www.ban-ldap-example.com'
            `,
            output: `
                var a1 = "https://www.ban-example.com"
                var a2 = "https://www.ban-example.com/path"
                var b1 = 'FtP://www.ban-file-example.com'
                var c1 = 'LDAp://www.ban-ldap-example.com'
            `,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 2},
                { messageId: "doNotUseInsecureUrl", line: 3},
                { messageId: "doNotUseInsecureUrl", line: 4},
                { messageId: "doNotUseInsecureUrl", line: 5}
            ],
            options: [{
                blocklist: ["htTp:\/\/www\.ban-example\.com\/?.*", "fTp:\/\/www\.ban-file-example\.com\/?.*", "lDAp:\/\/www\.ban-ldap-example\.com\/?.*"]
            }]
        },
        {
            // should ban any other xml attribute with urls in them
            code: `
                const someSvg: React.FC = () => {
                    return (
                        <svg someOtherAttribute="http://ban-example.com/">
                        </svg>
                    );
                };
            `,
            output: `
                const someSvg: React.FC = () => {
                    return (
                        <svg someOtherAttribute="https://ban-example.com/">
                        </svg>
                    );
                };
            `,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 4},
            ],
            languageOptions: testUtils.tsReactLanguageOptions,
        },
        {
            // should escape the url string correctly
            code: `var a1 = "http://moz\ti\tlla.org";`,
            output: `var a1 = "https://moz\\ti\\tlla.org";`,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 1},
            ],
        },
        {
            // should fix url in `` correctly
            code: "var x1 = `http://foo${multipartExample} http://${multipartExample}.com`;",
            output: "var x1 = `https://foo${multipartExample} http://${multipartExample}.com`;",
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 1},
            ],

            languageOptions: testUtils.es6LanguageOptions
        },
        {
            // should escape the string and fix it properly in ``
            code: `var a1 = \`http://moz\ti\tlla.org\`;`,
            output: `var a1 = \`https://moz\\ti\\tlla.org\`;`,
            errors: [
                { messageId: "doNotUseInsecureUrl", line: 1},
            ],

            languageOptions: testUtils.es6LanguageOptions
        },
    ]
});