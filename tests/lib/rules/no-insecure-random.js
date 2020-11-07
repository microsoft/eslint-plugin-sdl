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
      
      code:`
      require('./node_modules/not-unsafe-random');
      require('eslint');
      require('test');
      require('random-package');
      require('random-float2');
      require('random2-seed');
    `
    },
    {
      parserOptions: testUtils.moduleParserOptions,
      code:`
        import './node_modules/untest';
        import 'random';
        import 'random-3';
        import 'eslint';
        import 'eslint-plugin-sdl';
        import 'testing';
      `
    },
    {
      
      code:`
        cryptos.pseudoRandomBytes();
        pseudoRandomBytes();
        pseudoRandomByte();
        cryptos.pseudoRondomBytes();
      `
    },
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: `
      function random(){}

      random();

      Math.Random;
      Math.random;
      `
    },
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code:`
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
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
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
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: `
      function notMath() : Math{
        return Math;
      }
    
      notMath().random();
      `,
      errors: [
        { messageId: "default", line: 6 }
      ]
    },
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: `
        crypto.pseudoRandomBytes();
      `,
      errors: [
        { messageId: "default", line: 2 }
      ]
    },
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: `
      function notCrypto() : Crypto{
        return crypto;
      }
    
      notCrypto().pseudoRandomBytes();
      `,
      errors: [
        { messageId: "default", line: 6 }
      ]
    },
    {
      parserOptions: testUtils.moduleParserOptions,
      code:`
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
      parserOptions: testUtils.moduleParserOptions,
      code:`
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
      code:`
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