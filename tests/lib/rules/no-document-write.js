// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require("path");
const testUtils = require("../test-utils");
const ruleId = path.parse(__filename).name;
const rule = require(path.join('../../../lib/rules/', ruleId));
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run(ruleId, rule, {
  valid: [
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: `     
        interface DocumentLikeAPI {
          write: ((arg : string) => void);
          writeln: ((arg : string) => void);
        }
        function documentLikeAPIFunction() : DocumentLikeAPI {
          return {
            write: () => {},
            writeln: () => {},
          };
        }
      `
    },
    {
      code: `
        function documentLikeAPIFunction() {
          return {
            write: function(){},
            writeln: function(){}
          };
        }
        var documentAPI = documentLikeAPIFunction();
        documentAPI.write('...');
        documentAPI.writeln('...');
        documentLikeAPIFunction().write('...');
        documentLikeAPIFunction().writeln('...');
        // wrong # of args
        document.write();
        document.write('', '');
        document.writeln();
        document.writeln('', '');
      `
    }
  ],
  invalid: [
    {
      parser: testUtils.tsParser,
      parserOptions: testUtils.tsParserOptions,
      code: `
        var doc = document; 
        doc.write('...');
        doc.writeln('...');
        function documentFunction() : Document {
          return window.document;
        }
        documentFunction().write('...');
        documentFunction().writeln('...');        
      `,
      errors: [
        { messageId: "default", line: 3 },
        { messageId: "default", line: 4 },
        { messageId: "default", line: 8 },
        { messageId: "default", line: 9 }
      ]
    },
    {
      code: `
        document.write('...');
        document.writeln('...');
        window.document.write('...');
        window.document.writeln('...');
        newWindow.document.write('...');
        newWindow.document.writeln('...');
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
