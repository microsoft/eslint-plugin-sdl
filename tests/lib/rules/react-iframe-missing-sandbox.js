// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join('../../../lib/rules/', ruleId));
const RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  }
});

ruleTester.run(ruleId, rule, {
  valid: [
    { code: '<div sandbox="__unknown__" />;' },
    { code: '<iframe sandbox="" />;' },
    { code: '<iframe src="foo.htm" sandbox></iframe>' },
    { code: '<iframe src="foo.htm" sandbox sandbox></iframe>' },
    { code: '<iframe sandbox={""} />' },
    { code: '<iframe sandbox="allow-forms"></iframe>' },
    { code: '<iframe sandbox="allow-modals"></iframe>' },
    { code: '<iframe sandbox="allow-orientation-lock"></iframe>' },
    { code: '<iframe sandbox="allow-pointer-lock"></iframe>' },
    { code: '<iframe sandbox="allow-popups"></iframe>' },
    { code: '<iframe sandbox="allow-popups-to-escape-sandbox"></iframe>' },
    { code: '<iframe sandbox="allow-presentation"></iframe>' },
    { code: '<iframe sandbox="allow-same-origin"></iframe>' },
    { code: '<iframe sandbox="allow-scripts"></iframe>' },
    { code: '<iframe sandbox="allow-top-navigation"></iframe>' },
    { code: '<iframe sandbox="allow-top-navigation-by-user-activation"></iframe>' },
    { code: '<iframe sandbox="allow-forms allow-modals"></iframe>' },
    { code: '<iframe sandbox="allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin allow-top-navigation"></iframe>' }
  ],
  invalid: [
    {
      code: '<iframe></iframe>;',
      errors: [{ messageId: 'attributeMissing' }]
    },
    {
      code: '<iframe/>;',
      errors: [{ messageId: 'attributeMissing' }]
    },
    {
      code: '<iframe sandbox="__unknown__"></iframe>',
      errors: [{ messageId: 'invalidValue', data: { value: '__unknown__' } }]
    },
    {
      code: '<iframe sandbox="allow-popups __unknown__"/>',
      errors: [{ messageId: 'invalidValue', data: { value: '__unknown__' } }]
    },
    {
      code: '<iframe sandbox="__unknown__ allow-popups"/>',
      errors: [{ messageId: 'invalidValue', data: { value: '__unknown__' } }]
    },
    {
      code: '<iframe sandbox=" allow-forms __unknown__ allow-popups __unknown__  "/>',
      errors: [
        { messageId: 'invalidValue', data: { value: '__unknown__' } },
        { messageId: 'invalidValue', data: { value: '__unknown__' } }
      ]
    },
    {
      code: '<iframe sandbox="allow-scripts allow-same-origin"></iframe>;',
      errors: [{ messageId: 'invalidCombination' }]
    },
    {
      code: '<iframe sandbox="allow-same-origin allow-scripts"/>;',
      errors: [{ messageId: 'invalidCombination' }]
    }
  ]
});