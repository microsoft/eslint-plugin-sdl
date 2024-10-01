// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const testUtils = require("../test-utils");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    "window.postMessage()",
    "window.postMessage = ''",
    "window.postMessage(1)",
    "window.postMessage(1, 2, 3, 4)",
    "window.postMessage('data', 'https://target.domain')",
    "window.postMessage('data', 'https://target.domain', 'menubar=yes')",
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
class WindowLike {
  postMessage(): void {
  };
}
function main() {
  var w: WindowLike = new WindowLike();
  w.postMessage('test', '*');
}
      `,
    },
  ],
  invalid: [
    {
      code: `
        any.postMessage(message, "*");
        any.postMessage(message, "*", "menubar=yes");
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 3 },
      ],
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
        window.frames[0].postMessage(message, "*");
        var w1 = window.open(url);
        w1.postMessage(message, "*");
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 4 },
      ],
    },
  ],
});
