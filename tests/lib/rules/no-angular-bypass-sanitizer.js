// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    "bypassSecurityTrustHtml('XSS')",
    "x.bypassSecurityTrustHtml()",
    "x.BypassSecurityTrustHtml('XSS')",
  ],
  invalid: [
    {
      code: "$('p').bypassSecurityTrustHtml('XSS');",
      errors: [
        {
          messageId: "noBypass",
          line: 1,
          endLine: 1,
          column: 1,
          endColumn: 38,
        },
      ],
    },
    {
      code: "$('p').bypassSecurityTrustResourceUrl('XSS')",
      errors: [{ messageId: "noBypass" }],
    },
    {
      code: "$('p').bypassSecurityTrustScript('XSS')",
      errors: [{ messageId: "noBypass" }],
    },
    {
      code: "$('p').bypassSecurityTrustStyle('XSS')",
      errors: [{ messageId: "noBypass" }],
    },
    {
      code: "$('p').bypassSecurityTrustUrl('XSS')",
      errors: [{ messageId: "noBypass" }],
    },
  ],
});
