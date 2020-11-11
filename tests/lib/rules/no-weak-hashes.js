// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";
const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join('../../../lib/rules/', ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
      {
          code:`
          crypto.createHash('sha256');
          `
      },
      {
          code:`
          crypto.createHash();`
      },
      {
        code:`
        crypto.createHash('rmd160');`
    }
  ],
  invalid: [
    {
      code: `
         crypto = require('crypto');
         crypto.createHash('sha');
      `,
      errors: [
        { messageId: "default", line: 3 }
      ]
    },
    {
        code: `
           crypto = require('crypto');
           crypto.createHash('rmd160');
        `,
        errors: [
          { messageId: "default", line: 3 }
        ]
      },
      {
        code: `
           crypto = require('crypto');
           crypto.createHash('mdc2');
        `,
        errors: [
          { messageId: "default", line: 3 }
        ]
      },
      {
        code: `
           crypto = require('crypto');
           crypto.createHash('md5');
        `,
        errors: [
          { messageId: "default", line: 3 }
        ]
    }
  ]
});