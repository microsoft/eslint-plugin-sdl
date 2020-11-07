// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join('../../../lib/rules/', ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    "aHrefSanitizationWhitelist('.*')",
    "x.aHrefSanitizationWhitelist('.*')",
    "$compileProvider.aHrefSanitizationWhitelist()",
    "$compileProvider.AHrefSanitizationWhitelist('.*')"
  ],
  invalid: [
    {
      code: "$compileProvider.aHrefSanitizationWhitelist('.*');",
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
      code: "$compileProvider.imgSrcSanitizationWhitelist('.*');",
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