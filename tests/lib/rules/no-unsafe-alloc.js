// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";
const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: ["foo.allocUnsafe", "Buffer.allocUnsafe(0)", "Buffer.allocUnsafeSlow(0)"],
  invalid: [
    {
      code: `
        var buf1 = Buffer.allocUnsafe(10);
        var buf2 = Buffer.allocUnsafeSlow(10)
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 3 },
      ],
    },
  ],
});
