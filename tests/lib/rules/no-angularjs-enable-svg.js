// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    "enableSvg()",
    "enableSvg(true)",
    "$sanitizeProvider.enableSvg()",
    "$sanitizeProvider.enableSvg(false)",
    "$sanitizeProvider.enableSvg(0)",
    "$sanitizeProvider.EnableSvg(0)"
  ],
  invalid: [
    {
      code: "$sanitizeProvider.enableSvg(true)",
      errors: [{ messageId: "doNotEnableSVG" }]
    },
    {
      code: "$sanitizeProvider.enableSvg(1)",
      errors: [{ messageId: "doNotEnableSVG" }]
    }
  ]
});
