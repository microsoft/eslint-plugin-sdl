// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
const testUtils = require("../test-utils");

var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    `
function documentLikeAPIFunction(){
  return {
    cookie:'fake.cookie'
  }
}
var document2 = documentLikeAPIFunction(); 
document2.cookie = '...'; 
document2.cookie = '...'; 
documentLikeAPIFunction().cookie = '...'
    `,
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
interface DocumentLikeAPI {
  cookie: string;
}
function documentLikeAPIFunction(): DocumentLikeAPI {
  return null;
}
function X() {
  // These usages are OK because they are not on the DOM document
  var document: DocumentLikeAPI = documentLikeAPIFunction();
  document.cookie = '...';
  document.cookie = '...';
}

documentLikeAPIFunction().cookie = '...';
`,
    },
  ],
  invalid: [
    {
      code: "document.cookie = '...'",
      errors: [{ messageId: "doNotUseCookies" }],
    },
    {
      code: "window.document.cookie = '...'",
      errors: [{ messageId: "doNotUseCookies" }],
    },
    {
      code: "this.window.document.cookie = '...'",
      errors: [{ messageId: "doNotUseCookies" }],
    },
    {
      code: "globalThis.window.document.cookie = '...'",
      errors: [{ messageId: "doNotUseCookies" }],
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
function documentFunction(): Document {
  return window.document;
}
documentFunction().cookie = '...';
      `,
      errors: [{ messageId: "doNotUseCookies" }],
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
namespace Sample {
    function method() {
        return document.cookie;
    }
}
      `,
      errors: [{ messageId: "doNotUseCookies" }],
    },
  ],
});
