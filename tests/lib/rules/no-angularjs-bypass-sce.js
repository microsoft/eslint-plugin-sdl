// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    "trustAsHtml()",
    "$sce.trustAsHtml()",
    "$sce.trustAsHtml('')",
    "$sce.TrustAsHtml('XSS')",
    "x.trustAsHtml('XSS')",
    "$sceProvider.enabled()",
    "$sceProvider.enabled(true)",
    "$sceProvider.enabled(1)"
  ],
  invalid: [
    {
      code: "$sceDelegate.trustAs($sce.HTML, 'XSS')",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sce.trustAs($sce.HTML, 'XSS')",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sce.trustAsCss('XSS')",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sce.trustAsHtml('XSS')",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sce.trustAsJs('XSS')",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sce.trustAsResourceUrl('XSS')",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sce.trustAsUrl('XSS')",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sceProvider.enabled(false)",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sceProvider.enabled(0)",
      errors: [{ messageId: "doNotBypass" }]
    },
    {
      code: "$sceProvider.enabled(true != true)",
      errors: [{ messageId: "doNotBypass" }]
    }
  ]
});
