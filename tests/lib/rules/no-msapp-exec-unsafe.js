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
    "test.execUnsafeLocalFunction = 'test'",
    "MSApp.execUnsafeLocalFunction()"
  ],
  invalid: [
    {
      code: "MSApp.execUnsafeLocalFunction(testfunc)",
      errors: [
        { messageId: "default", line: 1, type: 'CallExpression' }
      ]
    }
  ]
});
