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
    "var test = element.innerHTML",
    "var test = element.outerHTML",
    "document.body.innerHTML = ''",
    "document.test",
    "element.insertAdjacentHTML()",
    {
      languageOptions: testUtils.tsParserOptions,
      code: `
        class Test {
          innerHTML: string;
          outerHTML: string;
          constructor(test: string) {
              this.innerHTML = test;
              this.outerHTML = test;
          }
        };
        let test = new Test("test");
        test.innerHTML = test;
        test.outerHTML = test;
      `
    }
  ],
  invalid: [
    // TypeScript with full type information
    {
      languageOptions: testUtils.tsParserOptions,
      code: `
        var element = document.getElementById(id);
        element.innerHTML = 'test';
        element.outerHTML = 'test';
        element.insertAdjacentHTML('beforebegin', 'foo');
      `,
      errors: [
        { messageId: "noInnerHtml", line: 3 },
        { messageId: "noInnerHtml", line: 4 },
        { messageId: "noInsertAdjacentHTML", line: 5 }
      ]
    },
    {
      code: `
        element.innerHTML = 'test';
        parent.child.innerHTML += 'test';
      `,
      errors: [
        { messageId: "noInnerHtml", line: 2 },
        { messageId: "noInnerHtml", line: 3 }
      ]
    },
    {
      code: `
        element.outerHTML = 'test';
        parent.child.outerHTML += 'test';
      `,
      errors: [
        { messageId: "noInnerHtml", line: 2 },
        { messageId: "noInnerHtml", line: 3 }
      ]
    },
    {
      code: "element.insertAdjacentHTML('beforebegin', 'foo')",
      errors: [{ messageId: "noInsertAdjacentHTML", line: 1 }]
    }
  ]
});