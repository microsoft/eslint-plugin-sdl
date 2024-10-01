// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    {
      code: `
        var mainWindow = new BrowserWindow({
          webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false
          }
        });
        var view = new BrowserView({
          webPreferences: {
            nodeIntegration: false
          }
        });
      `
    }
  ],
  invalid: [
    {
      code: `
        var mainWindow = new BrowserWindow({
          webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
          }
        });
      `,
      errors: [
        { messageId: "default", line: 4 },
        { messageId: "default", line: 5 },
        { messageId: "default", line: 6 }
      ]
    },
    {
      code: `
        var view = new BrowserView({
          webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
          }
        });
      `,
      errors: [
        { messageId: "default", line: 4 },
        { messageId: "default", line: 5 },
        { messageId: "default", line: 6 }
      ]
    }
  ]
});
