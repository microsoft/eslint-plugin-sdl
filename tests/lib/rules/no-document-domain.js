// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const testUtils = require("../test-utils");
const ruleId = path.parse(__filename).name;
const rule = require(path.join('../../../lib/rules/', ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: `
interface DocumentLikeAPI {
  domain: string;
}
function documentLikeAPIFunction(): DocumentLikeAPI {
  return null;
}
function main() {
  var document: DocumentLikeAPI = documentLikeAPIFunction();
  document.domain = 'somevalue';
}
      `
    }
  ],
  invalid: [
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: "var doc = window.document; doc.domain = 'somevalue';",
      errors: [{ messageId: "default" }]
    },
    {
      code: "document.domain = 'somevalue'",
      errors: [{ messageId: "default" }]
    },
    {
      code: "window.document.domain = 'somevalue'",
      errors: [{ messageId: "default" }]
    },
    {
      code: `
var somevalue = 'somevalue'; 
document.domain = somevalue;
window.document.domain = somevalue;
newWindow.document.domain = somevalue;
      `,
      errors: [
        { 
          line: 3,
          messageId: "default" 
        },
        {
          line: 4,
          messageId: "default" 
        },
        {
          line: 5,
          messageId: "default"
        }
      ]
    }
  ]
});