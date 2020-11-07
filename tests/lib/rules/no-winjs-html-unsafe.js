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
    'element.insertAdjacentHTMLUnsafe = "test";'
  ],
  invalid: [
    {
      code: `
        WinJS.Utilities.insertAdjacentHTMLUnsafe(element, position, text);
        WinJS.Utilities.setInnerHTMLUnsafe(element, text);
        WinJS.Utilities.setOuterHTMLUnsafe(element, text);
      `,
      errors: [
        { messageId: "default", line: 2, type: 'CallExpression' },
        { messageId: "default", line: 3, type: 'CallExpression' },
        { messageId: "default", line: 4, type: 'CallExpression' }
      ]
    }
  ]
});
