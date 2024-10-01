// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const ruleId = path.parse(__filename).name;
const rule = require(path.join("../../../lib/rules/", ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();
const testUtils = require("../test-utils");

ruleTester.run(ruleId, rule, {
  valid: [
    "Math.Random;",
    "Math.random;",
    "math.random();",
    "random();",
    {
      code: `
      Math.Random;
      Math.random;
      math.random();
      random();
      `
    },
    {
      code: `
      require('./node_modules/not-unsafe-random');
      require('eslint');
      require('test');
      require('random-package');
      require('random-float2');
      require('random2-seed');
    `
    },
    {
      languageOptions: testUtils.es6LanguageOptions,
      code: `
        import './node_modules/untest';
        import 'random';
        import 'random-3';
        import 'eslint';
        import 'eslint-plugin-sdl';
        import 'testing';
      `
    },
    {
      code: `
        cryptos.pseudoRandomBytes();
        pseudoRandomBytes();
        pseudoRandomByte();
        cryptos.pseudoRondomBytes();
      `
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
      function random(){}

      random();

      Math.Random;
      Math.random;
      `
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
        function pseudoRandomBytes(){}
        function pseudoRandomByte(){}

        pseudoRandomBytes();
        pseudoRandomByte();
        cryptos.pseudoRondomBytes();
        cryptos.pseudoRondomBytes();
      `
    }
  ],
  invalid: [
    {
      code: `
        Math.random();
        crypto.pseudoRandomBytes();
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 3 }
      ]
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
      Math.random();
      this.Math.random();
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 3 }
      ]
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
      function notMath() : Math{
        return Math;
      }
    
      notMath().random();
      `,
      errors: [{ messageId: "default", line: 6 }]
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
        crypto.pseudoRandomBytes();
      `,
      errors: [{ messageId: "default", line: 2 }]
    },
    {
      languageOptions: testUtils.tsLanguageOptions,
      code: `
      function notCrypto() : Crypto{
        return crypto;
      }
    
      notCrypto().pseudoRandomBytes();
      `,
      errors: [{ messageId: "default", line: 6 }]
    },
    {
      languageOptions: testUtils.es6LanguageOptions,
      code: `
      import './node_modules/unique-random';
      import 'chance';
      import 'random-number';
      import 'random-int';
      import 'random-float';
      import 'random-seed';
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 3 },
        { messageId: "default", line: 4 },
        { messageId: "default", line: 5 },
        { messageId: "default", line: 6 },
        { messageId: "default", line: 7 }
      ]
    },
    {
      languageOptions: testUtils.es6LanguageOptions,
      code: `
      import * as chance1 from 'chance';
      import defaultExport from 'chance';
      import { chance } from 'chance';
      import { chance as chance2 } from 'chance'; 
      import { chance3, chance4 } from 'chance';
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 3 },
        { messageId: "default", line: 4 },
        { messageId: "default", line: 5 },
        { messageId: "default", line: 6 }
      ]
    },
    {
      code: `
        require('./node_modules/unique-random');
        require('**/chance.js');
        require('random-number');
        require('random-int');
        require('random-float');
        require('random-seed');
      `,
      errors: [
        { messageId: "default", line: 2 },
        { messageId: "default", line: 3 },
        { messageId: "default", line: 4 },
        { messageId: "default", line: 5 },
        { messageId: "default", line: 6 },
        { messageId: "default", line: 7 }
      ]
    }
  ]
});
