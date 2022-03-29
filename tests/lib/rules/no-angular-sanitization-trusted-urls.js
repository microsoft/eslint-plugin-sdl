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
    "$compileProvider.AHrefSanitizationTrustedUrlList ('.*')"
  ],
  invalid: [
    {
      code: "$compileProvider.aHrefSanitizationTrustedUrlList ('.*');",
      errors: [
        {
          messageId: "noSanitizationTrustedUrls",
          line: 1,
          endLine: 1,
          column: 1,
          endColumn: 56
        }
      ]
    },
    {
      code: "$compileProvider.imgSrcSanitizationTrustedUrlList('.*');",
      errors: [
        {
          messageId: "noSanitizationTrustedUrls",
          line: 1,
          endLine: 1,
          column: 1,
          endColumn: 56
        }
      ]
    }
  ]
});