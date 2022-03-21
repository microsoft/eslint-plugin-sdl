// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join('../../../lib/rules/', ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    "aHrefSanitizationTrustedUrlList ('.*')",
    "x.aHrefSanitizationTrustedUrlList ('.*')",
    "$compileProvider.aHrefSanitizationTrustedUrlList ()",
    "$compileProvider.aHrefSanitizationTrustedUrlList ('.*')"
  ],
  invalid: [
    {
      code: "$compileProvider.aHrefSanitizationTrustedUrlList ('.*');",
      errors: [
        {
          messageId: "noSanitizationWhitelist",
          line: 1,
          endLine: 1,
          column: 1,
          endColumn: 50
        }
      ]
    },
    {
      code: "$compileProvider.imgSrcSanitizationTrustedUrlList('.*');",
      errors: [
        {
          messageId: "noSanitizationWhitelist",
          line: 1,
          endLine: 1,
          column: 1,
          endColumn: 51
        }
      ]
    }
  ]
});