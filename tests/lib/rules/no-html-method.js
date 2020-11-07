// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join('../../../lib/rules/', ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();
const testUtils = require("../test-utils");

ruleTester.run(ruleId, rule, {
  valid: [
    "test.html = 'test'",
    "test.html()",
    "test.html('','')",
    "element.html('');",
    "element.html(null);"
  ],
  invalid: [
    {
      code: "$('p').html('XSS')",
      errors: [{ messageId: "default", line: 1 }]
    },
    {
      code: "$(selector).html(sample_function())",
      errors: [{ messageId: "default", line: 1 }]
    },
    {
      parser: testUtils.tsParser,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
      },
      env: {
      },
      code: `
        import $ from "jquery";
        test.html('XSS');  
      `,
      errors: [
        { messageId: "default", line: 3 }
      ]
    }
  ]
});